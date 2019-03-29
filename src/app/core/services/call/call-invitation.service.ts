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
import { EMPTY, iif, Observable, of, race, Subject } from 'rxjs';
import { BusinessCall, Call, callEvents, CallReason } from 'machoke-sdk';
import { GetExpertSueDetails, GetSessionWithAccount, PushService, ServiceUsageEventService } from '@anymind-ng/api';
import { catchError, finalize, first, mergeMap, switchMap, take, takeUntil } from 'rxjs/operators';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Logger } from '@platform/core/logger';
import { Router } from '@angular/router';
import { CreateIncomingCallComponent } from '@platform/shared/components/modals/call-modals/incoming-call/incoming-call.component';
import { CreateCallSummaryComponent } from '@platform/shared/components/modals/call-modals/call-summary/call-summary.component';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { httpCodes } from '@platform/shared/constants/httpCodes';
import { INCOMING_CALL } from '@platform/shared/components/modals/call-modals/incoming-call/token';
import { PushNotificationService } from './push-notifications.service';
import { selectNewSession } from '@platform/core/utils/select-new-session';
import { CallService } from '@platform/core/services/call/call.service';
import { CallSessionService } from '@platform/core/services/call/call-session.service';
import EndReason = callEvents.EndReason;

@Injectable()
export class CallInvitationService extends Logger {
  private readonly callRejectedEvent$ = new Subject<void>();
  private readonly callAnsweredOnOtherDeviceEvent$ = new Subject<void>();
  private readonly pullableCallEvent$ = new Subject<void>();
  private readonly callAnswered$ = new Subject<void>();

  private navigatorWrapper = new NavigatorWrapper();
  private missingCallCounter = 0;
  private unregisterFactory?: () => Observable<void>;

  constructor(
    private communicatorService: CommunicatorService,
    private soundsService: SoundsService,
    private serviceUsageEventService: ServiceUsageEventService,
    private callFactory: CallFactory,
    private modalsService: NgbModal,
    private router: Router,
    private callService: CallService,
    private store: Store<fromCore.IState>,
    private alertService: AlertService,
    private pushNotificationService: PushNotificationService,
    private injector: Injector,
    private callSessionService: CallSessionService,
    private pushService: PushService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('CallInvitationService'));

    /**
     * start listening for connection established from SDK
     */
    this.communicatorService.connectionEstablishedEvent$.subscribe(connected => {
      this.checkIncomingCalls(connected);
      this.checkPullableCalls(connected);
      this.handlePushNotificationRegistration();
    });

    this.communicatorService.callInvitationEvent$.subscribe(inv => this.onExpertCallIncoming(inv.call));
  }

  public unregisterFromPushNotifications(): Observable<never> {
    return this.unregisterFactory !== undefined
      ? this.unregisterFactory().pipe(
          mergeMap(() => EMPTY),
          catchError(() => EMPTY),
          finalize(() => (this.unregisterFactory = undefined)),
        )
      : EMPTY;
  }

  public initialize = (): void => {
    this.pushNotificationService.pushChange$.subscribe(
      enabled => {
        const callSession = this.callSessionService.getCallSession();
        if (enabled && callSession) {
          this.handlePushNotificationRegistration();
        } else {
          this.unregisterFromPushNotifications().subscribe(() => this.loggerService.info('Unregistered from push'));
        }
      },
      err => this.loggerService.warn('push change FAILED', err),
    );

    this.store
      .pipe(
        selectNewSession(),
        switchMap(sessionAccount =>
          iif(
            () => sessionAccount !== undefined,
            of(() => {
              if (sessionAccount) {
                this.pushNotificationService.initialize(sessionAccount);
              }

              return this.connectToCallWebsocket(sessionAccount);
            }),
            of(() => {
              if (this.callSessionService.getCallSession()) {
                this.communicatorService.disconnect();
                this.missingCallCounter = 0;
              }
            }),
          ),
        ),
      )
      .subscribe(websocketFunction => {
        websocketFunction();
      });
  };

  private handlePushNotificationRegistration = (): void => {
    /** watch for notifications changes */
    this.pushNotificationService.isPushNotificationsEnabled().subscribe(
      pushEnabled => {
        if (pushEnabled) {
          this.pushNotificationService.getDeviceId().subscribe(
            deviceId => {
              if (deviceId) {
                this.pushService
                  .postRegisterRoute({ pushId: deviceId, clientAppType: 'PLATFORM' })
                  .pipe(
                    catchError(err => {
                      this.loggerService.warn('Registration for webpush failed', err);

                      return of();
                    }),
                    take(1),
                  )
                  .subscribe(() => {
                    this.loggerService.debug('Registered for push in Artichoke');
                    this.unregisterFactory = (): Observable<void> => this.pushService.deleteUnregisterRoute(deviceId);
                  });
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
      this.communicatorService.authenticate(sessionAccount.session.accountId, sessionAccount.session.apiKey);
    }
  };

  private checkPullableCalls = (connected: IConnected): void => {
    connected.session.machoke.getActiveCall().then(
      maybeActiveCall => {
        this.loggerService.debug('Reconnected, checking active call', maybeActiveCall);
        if (maybeActiveCall) {
          if (BusinessCall.isBusiness(maybeActiveCall)) {
            this.handlePullableCall(maybeActiveCall);
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
    connected.session.machoke.getCallWithPendingInvitation().then(
      maybeIncomingCall => {
        this.loggerService.debug('Received incoming call', maybeIncomingCall);
        if (maybeIncomingCall) {
          this.onExpertCallIncoming(maybeIncomingCall);
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
                  clientName: expertSueDetails.clientDetails.nickname,
                  clientAvatar: expertSueDetails.clientDetails.avatar,
                },
              },
            ],
            parent: this.injector,
          }),
          windowClass: 'modal--is-dark',
          keyboard: false,
        };

        const callingModal = this.modalsService.open(CreateIncomingCallComponent, options);
        callingModal.componentInstance.answerCall = (): void => {
          this.navigatorWrapper.getUserMediaStream(NavigatorWrapper.getAllConstraints()).then(
            localStreams => {
              this.handleAnswerCallInvitation(localStreams, expertSueDetails, call);
              callingModal.close();
            },
            error => {
              this.loggerService.debug('Could not get user media stream: ', error);
              this.alertService.pushDangerAlert('COMMUNICATOR.BLOCKED_MEDIA');
            },
          );
        };

        callingModal.componentInstance.rejectCall = (): void => {
          this.rejectCallInvitation(call);
          callingModal.dismiss();
        };

        // Client went offline when calling
        call.offline$.subscribe(offline => this.handleClientWentOfflineBeforeAnswering(offline, call, callingModal));
        // Call was answered on the other device
        call.activeDevice$.subscribe(active => this.handleCallAnsweredOnOtherDevice(active, callingModal, call));
        // Client ended the call when calling
        call.end$
          .pipe(
            takeUntil(this.callRejectedEvent$),
            takeUntil(this.callAnswered$),
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

  private handleAnswerCallInvitation = (
    localStreams: MediaStream,
    incomingCallDetails: GetExpertSueDetails,
    call: BusinessCall,
  ): void => {
    const currentMediaTracks = localStreams.getTracks();
    currentMediaTracks.filter(track => track.kind === 'video').forEach(track => (track.enabled = false));
    const session = this.callSessionService.getCallSession();
    const currentExpertCall = this.callFactory.createExpertCall(call, incomingCallDetails);
    if (session) {
      currentExpertCall.answer(session, currentMediaTracks).then(
        () => {
          race(currentExpertCall.callDestroyed$, this.callService.hangupCall$)
            .pipe(first())
            .subscribe(() => this.onAnsweredCallEnd(currentExpertCall));
          this.callAnswered$.next();
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
          currentExpertCall.reject();
          currentExpertCall.hangup(CallReason.ConnectionDropped);
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          localStreams.getTracks().forEach(t => t.stop());
          this.soundsService.callIncomingSound().stop();
          this.loggerService.error('ExpertCallService: Could not answer the call', err);
        },
      );
    } else {
      this.loggerService.error('ExpertCallService: Session is undefined');
    }
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
    summaryModal.componentInstance.currentExpertCall = currentExpertCall;
    this.soundsService
      .playCallEnded()
      .then(
        () => this.loggerService.debug('CallInvitationService: call end sound played'),
        err => this.loggerService.warn('CallInvitationService: Cannot play call end sound', err),
      );
  };

  private showMissedCallAlert = (): void => {
    this.missingCallCounter++;
    if (this.missingCallCounter <= 1) {
      this.alertService
        .pushWarningAlert('COMMUNICATOR.MISSING_CALL_ALERT', undefined, {
          isStatic: true,
        })
        .subscribe(() => {
          this.missingCallCounter = 0;
        });
    } else {
      this.alertService
        .pushWarningAlert(
          'COMMUNICATOR.MISSING_CALLS_ALERT',
          { value: this.missingCallCounter },
          {
            isStatic: true,
          },
        )
        .subscribe(() => {
          this.missingCallCounter = 0;
        });
    }
  };
}
