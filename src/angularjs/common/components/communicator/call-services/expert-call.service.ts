// tslint:disable:readonly-array
// tslint:disable:no-shadowed-variable
// tslint:disable:deprecation
// tslint:disable:max-file-line-count
import {
  CommunicatorService,
  IConnected,
  CurrentExpertCall,
  CallFactory,
  NavigatorWrapper,
  LoggerService,
} from '@anymind-ng/core';
import { GetExpertSueDetails } from 'profitelo-api-ng/model/models';
import { ModalsService } from '../../../services/modals/modals.service';
import { SoundsService } from '../../../services/sounds/sounds.service';
import { EventsService } from '../../../services/events/events.service';
import { SessionServiceWrapper } from '../../../services/session/session.service';
import { BusinessCall, Session, Call, CallReason, callEvents, protocol } from 'ratel-sdk-js';
import { first, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { PullableCall } from '../models/pullable-call';
import { Config } from '../../../../../config';
import { httpCodes } from '../../../classes/http-codes';
import { ServiceUsageEventApi } from 'profitelo-api-ng/api/ServiceUsageEventApi';
import EndReason = callEvents.EndReason;
import { ReplaySubject } from 'rxjs/Rx';

export class ExpertCallService {
  public static $inject = [
    'ServiceUsageEventApi',
    'modalsService',
    'soundsService',
    'communicatorService',
    'logger',
    'callFactory',
    'eventsService',
    'sessionServiceWrapper',
  ];

  private readonly newCallEvent = new Subject<CurrentExpertCall>();
  private readonly pullableCallEvent = new ReplaySubject<PullableCall>(1);
  private readonly callRejectedEvent = new Subject<void>();
  private navigatorWrapper = new NavigatorWrapper();
  private callAnsweredOnOtherDeviceEvent$ = new Subject<void>();

  constructor(
    private ServiceUsageEventApi: ServiceUsageEventApi,
    private modalsService: ModalsService,
    private soundsService: SoundsService,
    private communicatorService: CommunicatorService,
    private logger: LoggerService,
    private callFactory: CallFactory,
    eventsService: EventsService,
    sessionServiceWrapper: SessionServiceWrapper,
  ) {
    communicatorService.connectionEstablishedEvent$.subscribe(this.checkIncomingCalls);
    communicatorService.connectionEstablishedEvent$.subscribe(this.checkPullableCalls);
    communicatorService.callInvitationEvent$.subscribe(inv =>
      this.onExpertCallIdIncoming(inv.session, inv.callInvitation.callId),
    );

    sessionServiceWrapper
      .getSession()
      .then(sessionAccount =>
        communicatorService.authenticate(sessionAccount.session.accountId, sessionAccount.session.apiKey).subscribe(),
      );
    eventsService.on('login', () => {
      sessionServiceWrapper.getSession(true).then(sessionAccount => {
        communicatorService.authenticate(sessionAccount.session.accountId, sessionAccount.session.apiKey).subscribe();
      });
    });
    eventsService.on('logout', () => {
      communicatorService.disconnect();
    });
  }

  public get newCall$(): Observable<CurrentExpertCall> {
    return this.newCallEvent;
  }

  public get pullableCall$(): Observable<PullableCall> {
    return this.pullableCallEvent;
  }

  private handlePullableCall = (call: BusinessCall): void => {
    this.logger.debug('ExpertCallService: Handling pullable call for', call);

    this.pullableCallEvent.next(new PullableCall(call));
  };

  private checkPullableCalls = (connected: IConnected): void => {
    connected.session.chat.getActiveCalls().then(
      activeCalls => {
        this.logger.debug('ExpertCallService: Received active calls', activeCalls);
        if (activeCalls.length > Config.communicator.maxSimultaneousCallsCount) {
          this.logger.debug(
            'ExpertCallService: Abnormal state - received more than 1 active calls, choosing first',
            activeCalls,
          );
        }
        const activeCall = activeCalls[0];
        if (activeCall) {
          if (BusinessCall.isBusiness(activeCall)) {
            this.handlePullableCall(activeCall);
          } else {
            this.logger.warn('ActiveCallBarService: Abnormal state - Active call is not BusinessCall, aborting');
          }
        }
      },
      err => this.logger.warn('ActiveCallBarService: Could not get active calls', err),
    );
  };

  private checkIncomingCalls = (connected: IConnected): void => {
    this.logger.debug('ExpertCallService: Reconnected, checking incoming calls');
    connected.session.chat.getCallsWithPendingInvitations().then(
      incomingCalls => {
        this.logger.debug('ExpertCallService: Received incoming calls', incomingCalls);
        if (incomingCalls.length > Config.communicator.maxSimultaneousCallsCount) {
          this.logger.debug(
            'ExpertCallService: Abnormal state - received more incoming calls than 1, choosing first',
            incomingCalls,
          );
        }
        const incomingCall = incomingCalls[0];
        if (incomingCall) {
          this.onExpertCallIncoming(incomingCall);
        }
      },
      err => this.logger.warn('ExpertCallService: Could not load incoimg calls after successful connection', err),
    );
  };

  private onExpertCallIncoming = (call: Call): void => {
    if (BusinessCall.isBusiness(call)) {
      this.onExpertBusinessCallIncoming(call);
    } else {
      this.logger.error('ExpertCallService: Incoming call was not of BusinessCall type, rejecting', call);
      call
        .reject(CallReason.CallRejected)
        .then(
          () => this.logger.debug('ExpertCallService: Unsupported call invitation leave successful'),
          err => this.logger.error('ExpertCallService: Can not leave unsupported call invitation', err),
        );
    }
  };

  private onExpertCallIdIncoming = (session: Session, callId: protocol.ID): Promise<void> =>
    session.chat
      .getCall(callId)
      .then(
        call => this.onExpertCallIncoming(call),
        err => this.logger.error('ExpertCallService: Can not leave unsupported call invitation', err),
      );

  private onExpertBusinessCallIncoming = (call: BusinessCall): void => {
    this.ServiceUsageEventApi.getSueDetailsForExpertRoute(call.id).then(
      expertSueDetails => {
        this.soundsService.callIncomingSound().play();

        const callingModal = this.modalsService.createIncomingCallModal(
          expertSueDetails,
          modal => this.handleAnswerCallInvitation(modal, expertSueDetails, call),
          modal => this.rejectCallInvitation(modal, call),
        );

        this.communicatorService.connectionLostEvent$
          .pipe(first())
          .subscribe(() => this.handleConnectionLostWhileCallIncoming(callingModal));

        // FIXME unsubscribe when answered
        // Client went offline when calling
        call.offline$.subscribe(offline => this.handleClientWentOfflineBeforeAnswering(offline, call, callingModal));
        // Call was answered on the other device
        call.activeDevice$.subscribe(active => this.handleCallAnsweredOnOtherDevice(active, callingModal, call));
        // Client ended the call when calling
        call.end$
          .pipe(takeUntil(this.callRejectedEvent))
          .pipe(takeUntil(this.newCallEvent))
          .pipe(takeUntil(this.callAnsweredOnOtherDeviceEvent$))
          .subscribe(end => this.handleCallEndedBeforeAnswering(end, callingModal));
      },
      err => {
        if (err.status === httpCodes.unauthorized) {
          this.logger.error('ExpertCallService: Unauthorized to get incoming call details', call, err);
        } else {
          this.logger.error(
            'ExpertCallService: Error when getting incoming call details, rejecting the call',
            call,
            err,
          );
          call.reject(CallReason.CallRejected);
        }
      },
    );
  };

  private handleConnectionLostWhileCallIncoming = (callingModal: ng.ui.bootstrap.IModalInstanceService): void => {
    this.soundsService.callIncomingSound().stop();
    callingModal.close();
  };

  private handleClientWentOfflineBeforeAnswering = (
    offlineEvent: callEvents.DeviceOffline,
    call: BusinessCall,
    callingModal: ng.ui.bootstrap.IModalInstanceService,
  ): void => {
    this.logger.debug('ExpertCallService: Client went offline when calling, rejecting call', offlineEvent);
    call.reject(CallReason.CallRejected);
    callingModal.close();
    this.soundsService.callIncomingSound().stop();
    this.soundsService
      .playCallRejected()
      .catch(err => this.logger.warn('ExpertCallService: could not play rejected sound', err));
  };

  private handleCallAnsweredOnOtherDevice = (
    callActiveDevice: callEvents.CallHandledOnDevice,
    callingModal: ng.ui.bootstrap.IModalInstanceService,
    call: BusinessCall,
  ): void => {
    this.callAnsweredOnOtherDeviceEvent$.next();
    this.logger.debug('ExpertCallService: Call was answered on other device', callActiveDevice);
    callingModal.close();
    this.soundsService.callIncomingSound().stop();
    this.handlePullableCall(call);
  };

  private handleCallEndedBeforeAnswering = (
    callEnd: callEvents.Ended,
    callingModal: ng.ui.bootstrap.IModalInstanceService,
  ): void => {
    this.logger.debug('ExpertCallService: Call was ended before expert answer', callEnd);
    if (callEnd.reason !== EndReason.CallRejected) {
      callingModal.closed.then(this.showMissedCallAlert);
    }
    callingModal.close();
    this.soundsService.callIncomingSound().stop();
    this.soundsService
      .playCallRejected()
      .catch(err => this.logger.warn('ExpertCallService: could not play rejected sound', err));
  };

  private handleAnswerCallInvitation = (
    callingModal: ng.ui.bootstrap.IModalServiceInstance,
    incomingCallDetails: GetExpertSueDetails,
    call: BusinessCall,
  ): void => {
    this.navigatorWrapper.getUserMediaStream(NavigatorWrapper.getAllConstraints()).then(
      localStream => {
        const currentMediaTracks = localStream.getTracks();
        currentMediaTracks.filter(track => track.kind === 'video').forEach(track => (track.enabled = false));

        const currentExpertCall = this.callFactory.createExpertCall(call, incomingCallDetails);
        currentExpertCall.answer(currentMediaTracks).then(
          () => {
            // FIXME unsubscribe when call end or taken.
            currentExpertCall.end$.subscribe(() => this.onAnsweredCallEnd(currentExpertCall));
            currentExpertCall.callTaken$.subscribe(() => this.handlePullableCall(call));
            this.newCallEvent.next(currentExpertCall);
            this.soundsService.callIncomingSound().stop();
            callingModal.close();
          },
          err => {
            this.soundsService.callIncomingSound().stop();
            callingModal.close();
            this.logger.error('ExpertCallService: Could not answer the call', err);
          },
        );
      },
      err => this.logger.warn('ExpertCallService: Could not get user media', err),
    );
  };

  private rejectCallInvitation = (callingModal: ng.ui.bootstrap.IModalServiceInstance, call: BusinessCall): void => {
    this.logger.debug('ExpertCallService: Rejecting call invitation', call);
    // Clear callbacks registered in `incoming` state
    this.callRejectedEvent.next();

    call.reject(CallReason.CallRejected).then(
      () => {
        this.soundsService.callIncomingSound().stop();
        callingModal.close();
        this.soundsService
          .playCallRejected()
          .then(
            () => this.logger.debug('ExpertCallService: Played call rejected'),
            err => this.logger.warn('ExpertCallService: could not play call rejected', err),
          );
        this.logger.debug('ExpertCallService: Call was successfully rejected');
      },
      err => {
        this.soundsService.callIncomingSound().stop();
        callingModal.close();
        this.logger.error('ExpertCallService: Error when rejecting the call', err);
      },
    );
  };

  private onAnsweredCallEnd = (currentExpertCall: CurrentExpertCall): void => {
    this.modalsService.createExpertConsultationSummaryModal(currentExpertCall.getSueId());
    this.soundsService
      .playCallEnded()
      .then(
        () => this.logger.debug('ExpertCallService: call end sound played'),
        err => this.logger.warn('ExpertCallService: Cannot play call end sound', err),
      );
  };

  private showMissedCallAlert = (): void => {
    this.modalsService.createInfoAlertModal('COMMUNICATOR.MISSED_CALL_ALERT_MESSAGE');
  };
}
