// tslint:disable:max-file-line-count
import {
  Alerts,
  AlertService,
  CallFactory,
  CommunicatorService,
  CurrentExpertCall,
  IConnected,
  LoggerFactory,
  NavigatorWrapper,
  SoundsService,
} from '@anymind-ng/core';
import { Injectable, Injector } from '@angular/core';
import { iif, of, race, Subject } from 'rxjs';
import { BusinessCall, Call, callEvents, CallReason, Session } from 'machoke-sdk';
import { Config } from '../../../../config';
import { ID } from 'machoke-sdk/dist/protocol/protocol';
import {
  GetAccountDetails,
  GetExpertSueDetails,
  GetSessionWithAccount,
  ServiceUsageEventService,
} from '@anymind-ng/api';
import { first, takeUntil, switchMap } from 'rxjs/operators';
import EndReason = callEvents.EndReason;
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { Logger } from '@platform/core/logger';
import { Router } from '@angular/router';
import { ExpertCallService } from '@platform/core/services/call/expert-call.service';
import { CreateIncomingCallComponent } from '@platform/shared/components/modals/call-modals/incoming-call/incoming-call.component';
import { CreateCallSummaryComponent } from '@platform/shared/components/modals/call-modals/call-summary/call-summary.component';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { httpCodes } from '@platform/shared/constants/httpCodes';
import { INCOMING_CALL } from '@platform/shared/components/modals/call-modals/incoming-call/token';
import { PushNotificationService } from './push-notifications.service';

@Injectable()
export class CallInvitationService extends Logger {
  private readonly callRejectedEvent$ = new Subject<void>();
  private readonly callAnsweredOnOtherDeviceEvent$ = new Subject<void>();
  private readonly pullableCallEvent$ = new Subject<void>();
  private navigatorWrapper = new NavigatorWrapper();
  private session?: Session;
  private expertSessionDetails: GetAccountDetails;

  constructor(
    private communicatorService: CommunicatorService,
    private soundsService: SoundsService,
    private serviceUsageEventService: ServiceUsageEventService,
    private callFactory: CallFactory,
    private modalsService: NgbModal,
    private router: Router,
    private callService: ExpertCallService,
    private store: Store<fromCore.IState>,
    private alertService: AlertService,
    private pushNotificationService: PushNotificationService,
    private injector: Injector,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory);
  }

  public unregisterFromPushNotifications = (): Promise<void> => {
    const session = this.session;
    if (session) {
      return this.pushNotificationService
        .getDeviceId()
        .toPromise()
        .then(id => session.chat.unregisterFromPushNotifications(id));
    } else {
      return Promise.reject('There is no session');
    }
  };

  public initialize = (): void => {
    this.pushNotificationService.pushChange$.subscribe(
      enabled => {
        if (enabled && this.session) {
          this.handlePushNotificationRegistration(this.session);
        } else {
          this.unregisterFromPushNotifications()
            .then(() => this.loggerService.info('Unregistered from push'))
            .catch(err => this.loggerService.warn('Unregistered from push failed', err));
        }
      },
      err => this.loggerService.warn('push change FAILED', err),
    );

    this.communicatorService.connectionEstablishedEvent$.subscribe(connected => {
      this.checkIncomingCalls(connected);
      this.checkPullableCalls(connected);
      this.handlePushNotificationRegistration(connected.session);
      this.session = connected.session;
    });

    this.communicatorService.callInvitationEvent$.subscribe(inv =>
      this.onExpertCallIdIncoming(inv.session, inv.callInvitation.callId),
    );

    this.store
      .pipe(
        select(fromCore.getSession),
        switchMap(sessionAccount =>
          iif(
            () => sessionAccount !== undefined,
            of(() => {
              if (sessionAccount) {
                this.pushNotificationService.initialize();
                this.pushNotificationService.registerForPushNotifications().subscribe();
                this.expertSessionDetails = sessionAccount.account.details;
              }

              return this.connectToCallWebsocket(sessionAccount);
            }),
            of(() => {
              if (this.session) {
                this.communicatorService.disconnect(this.session);
              }
            }),
          ),
        ),
      )
      .subscribe(websocketFunction => {
        websocketFunction();
      });
  };

  private handlePushNotificationRegistration = (session: Session): void => {
    this.pushNotificationService.isPushNotificationsEnabled().subscribe(
      pushEnabled => {
        if (pushEnabled) {
          this.pushNotificationService.getDeviceId().subscribe(
            deviceId => {
              if (deviceId) {
                session.chat
                  .registerForPushNotifications(deviceId)
                  .then(() => this.loggerService.debug('Registered for push in Artichoke'))
                  .catch(err => this.loggerService.warn('Registration for webpush failed', err));
              } else {
                this.loggerService.error('Push notification id is not set');
              }
            },
            err => this.loggerService.warn('getDeviceId failed', err),
          );
        } else {
          this.loggerService.warn('Push notification is disabled');
        }
      },
      err => this.loggerService.warn('isPushNotificationsEnabled failed', err),
    );
  };

  private handlePullableCall = (call: BusinessCall): void => {
    this.loggerService.debug('CallInvitationService: Handling pullable call for', call);

    this.pullableCallEvent$.next();
  };

  private connectToCallWebsocket = (sessionAccount?: GetSessionWithAccount): void => {
    if (sessionAccount) {
      this.communicatorService
        .authenticate(sessionAccount.session.accountId, sessionAccount.session.apiKey)
        .pipe(first())
        .subscribe();
    }
  };

  private checkPullableCalls = (connected: IConnected): void => {
    connected.session.chat.getActiveCalls().then(
      activeCalls => {
        this.loggerService.debug('Received active calls', activeCalls);
        if (activeCalls.length > Config.communicator.maxSimultaneousCallsCount) {
          this.loggerService.debug('Abnormal state - received more than 1 active calls, choosing first', activeCalls);
        }
        const activeCall = activeCalls[0];
        if (activeCall) {
          if (BusinessCall.isBusiness(activeCall)) {
            this.handlePullableCall(activeCall);
          } else {
            this.loggerService.warn('Abnormal state - Active call is not BusinessCall, aborting');
          }
        }
      },
      err => this.loggerService.warn('Could not get active calls', err),
    );
  };

  private checkIncomingCalls = (connected: IConnected): void => {
    this.loggerService.debug('Reconnected, checking incoming calls');
    connected.session.chat.getCallsWithPendingInvitations().then(
      incomingCalls => {
        this.loggerService.debug('Received incoming calls', incomingCalls);
        if (incomingCalls.length > Config.communicator.maxSimultaneousCallsCount) {
          this.loggerService.debug(
            'Abnormal state - received more incoming calls than 1, choosing first',
            incomingCalls,
          );
        }
        const incomingCall = incomingCalls[0];
        if (incomingCall) {
          this.onExpertCallIncoming(incomingCall);
        }
      },
      err => this.loggerService.warn('Could not load incoming calls after successful connection', err),
    );
  };

  private onExpertCallIncoming = (call: Call): void => {
    if (BusinessCall.isBusiness(call)) {
      this.onExpertBusinessCallIncoming(call);
    } else {
      this.loggerService.error('Incoming call was not of BusinessCall type, rejecting', call);
      call
        .reject(CallReason.CallRejected)
        .then(
          () => this.loggerService.debug('Unsupported call invitation leave successful'),
          err => this.loggerService.error('Can not leave unsupported call invitation', err),
        );
    }
  };

  private onExpertCallIdIncoming = (session: Session, callId: ID): Promise<void> =>
    session.chat
      .getCall(callId)
      .then(
        call => this.onExpertCallIncoming(call),
        err => this.loggerService.error('Can not leave unsupported call invitation', err),
      );

  private onExpertBusinessCallIncoming = (call: BusinessCall): void => {
    this.serviceUsageEventService.getSueDetailsForExpertRoute(call.id).subscribe(
      expertSueDetails => {
        this.soundsService.callIncomingSound().play();

        const options: NgbModalOptions = {
          injector: Injector.create({
            providers: [
              {
                provide: INCOMING_CALL,
                useValue: {
                  serviceName: expertSueDetails.serviceName,
                },
              },
            ],
            parent: this.injector,
          }),
          windowClass: 'modal--is-dark',
          keyboard: false,
        };

        const callingModal = this.modalsService.open(CreateIncomingCallComponent, options);
        callingModal.result.then(
          isAnswerActionCalledFromUI => {
            if (isAnswerActionCalledFromUI) {
              this.handleAnswerCallInvitation(expertSueDetails, call);
            } else {
              this.loggerService.debug('Modal closed by external event');
            }
          },
          () => {
            this.rejectCallInvitation(call);
          },
        );

        // Client went offline when calling
        call.offline$.subscribe(offline => this.handleClientWentOfflineBeforeAnswering(offline, call, callingModal));
        // Call was answered on the other device
        call.activeDevice$.subscribe(active => this.handleCallAnsweredOnOtherDevice(active, callingModal, call));
        // Client ended the call when calling
        call.end$
          .pipe(
            takeUntil(this.callRejectedEvent$),
            takeUntil(call.answered$),
            takeUntil(this.callAnsweredOnOtherDeviceEvent$),
          )
          .subscribe(end => this.handleCallEndedBeforeAnswering(end, callingModal));

        this.communicatorService.connectionLostEvent$
          .pipe(first())
          .subscribe(() => this.handleConnectionLostWhileCallIncoming(callingModal));
      },
      err => {
        if (err.status === httpCodes.notFound) {
          this.loggerService.error('Unauthorized to get incoming call details', call, err);
        } else {
          this.loggerService.error('Error when getting incoming call details, rejecting the call', call, err);
          call.reject(CallReason.CallRejected).catch(error => {
            this.loggerService.warn('Can not reject call', error);
          });
        }
      },
    );
  };

  private handleConnectionLostWhileCallIncoming = (callingModal: NgbModalRef): void => {
    this.soundsService.callIncomingSound().stop();
    callingModal.close();
  };

  private handleClientWentOfflineBeforeAnswering = (
    offlineEvent: callEvents.DeviceOffline,
    call: BusinessCall,
    callingModal: NgbModalRef,
  ): void => {
    this.loggerService.debug('Client went offline when calling, rejecting call', offlineEvent);
    call.reject(CallReason.CallRejected).catch(error => {
      this.loggerService.warn('Can not reject call', error);
    });
    callingModal.close();
    this.soundsService.callIncomingSound().stop();
    this.soundsService.playCallRejected().catch(err => this.loggerService.warn('could not play rejected sound', err));
  };

  private handleCallAnsweredOnOtherDevice = (
    callActiveDevice: callEvents.CallHandledOnDevice,
    callingModal: NgbModalRef,
    call: BusinessCall,
  ): void => {
    this.callAnsweredOnOtherDeviceEvent$.next();
    this.loggerService.debug('Call was answered on other device', callActiveDevice);
    callingModal.close();
    this.soundsService.callIncomingSound().stop();
    this.handlePullableCall(call);
  };

  private handleCallEndedBeforeAnswering = (callEnd: callEvents.Ended, callingModal: NgbModalRef): void => {
    this.loggerService.debug('Call was ended before expert answer', callEnd);
    if (callEnd.reason !== EndReason.CallRejected) {
      callingModal.close();
      this.showMissedCallAlert();
    }
    callingModal.close();
    this.soundsService.callIncomingSound().stop();
    this.soundsService.playCallRejected().catch(err => this.loggerService.warn('could not play rejected sound', err));
  };

  private handleAnswerCallInvitation = (incomingCallDetails: GetExpertSueDetails, call: BusinessCall): void => {
    this.navigatorWrapper.getUserMediaStream(NavigatorWrapper.getAllConstraints()).then(
      localStream => {
        const currentMediaTracks = localStream.getTracks();
        currentMediaTracks.filter(track => track.kind === 'video').forEach(track => (track.enabled = false));
        const session = this.session;
        const currentExpertCall = this.callFactory.createExpertCall(
          call,
          incomingCallDetails,
          this.expertSessionDetails,
        );
        if (session) {
          currentExpertCall.answer(session, currentMediaTracks).then(
            () => {
              race(currentExpertCall.callDestroyed$, this.callService.hangupCall$)
                .pipe(first())
                .subscribe(() => this.onAnsweredCallEnd(currentExpertCall));

              this.soundsService.callIncomingSound().stop();
              void this.router.navigate(['communicator', call.id]).then(isRedirectSuccessful => {
                if (!isRedirectSuccessful) {
                  this.loggerService.warn('Error when redirect to communicator');
                  this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
                }
              });
              this.callService.pushCallEvent({
                currentExpertCall,
                session,
              });
            },
            err => {
              this.soundsService.callIncomingSound().stop();
              this.loggerService.error('ExpertCallService: Could not answer the call', err);
            },
          );
        } else {
          this.loggerService.error('ExpertCallService: Session is undefined');
        }
      },
      err => this.loggerService.warn('CallInvitationService: Could not get user media', err),
    );
  };

  private rejectCallInvitation = (call: BusinessCall): void => {
    this.loggerService.debug('Rejecting call invitation', call);
    // Clear callbacks registered in `incoming` state
    this.callRejectedEvent$.next();

    call.reject(CallReason.CallRejected).then(
      () => {
        this.soundsService.callIncomingSound().stop();
        this.soundsService
          .playCallRejected()
          .then(
            () => this.loggerService.debug('Played call rejected'),
            err => this.loggerService.warn('could not play call rejected', err),
          );
        this.loggerService.debug('Call was successfully rejected');
      },
      err => {
        this.soundsService.callIncomingSound().stop();
        this.loggerService.error('Error when rejecting the call', err);
      },
    );
  };

  private onAnsweredCallEnd = (currentExpertCall: CurrentExpertCall): void => {
    const summaryModal = this.modalsService.open(CreateCallSummaryComponent);
    summaryModal.componentInstance.currentCall = currentExpertCall;
    this.soundsService
      .playCallEnded()
      .then(
        () => this.loggerService.debug('CallInvitationService: call end sound played'),
        err => this.loggerService.warn('CallInvitationService: Cannot play call end sound', err),
      );
  };

  private showMissedCallAlert = (): void => {
    // TODO Wait for design
  };
}
