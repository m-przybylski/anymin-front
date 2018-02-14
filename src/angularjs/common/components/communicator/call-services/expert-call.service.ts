// tslint:disable:max-file-line-count
import { CommunicatorService, LoggerService, IConnected } from '@anymind-ng/core';
import { ServiceApi, RatelApi } from 'profitelo-api-ng/api/api';
import { GetExpertSueDetails } from 'profitelo-api-ng/model/models';
import { ModalsService } from '../../../services/modals/modals.service';
import { SoundsService } from '../../../services/sounds/sounds.service';
import { ExpertCall } from '../models/current-expert-call';
import { TimerFactory } from '../../../services/timer/timer.factory';
import { RtcDetectorService } from '../../../services/rtc-detector/rtc-detector.service';
import { MediaStreamConstraintsWrapper } from '../../../classes/media-stream-constraints-wrapper';
import { MicrophoneService } from '../microphone-service/microphone.service';
import { EventsService } from '../../../services/events/events.service';
import { SessionServiceWrapper } from '../../../services/session/session.service';
import { CallActiveDevice } from 'ratel-sdk-js/dist/protocol/wire-events';
import { CallEnd } from 'ratel-sdk-js/dist/protocol/events';
import { Message } from 'ratel-sdk-js/dist/message';
import { BusinessCall, Session, Call, callType, CallReason } from 'ratel-sdk-js';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { PullableCall } from '../models/pullable-call';
import { UpgradeService } from '../../../services/upgrade/upgrade.service';
import { Config } from '../../../../../config';

export class ExpertCallService {

  public static $inject = ['ServiceApi', 'timerFactory', 'modalsService', 'soundsService', 'rtcDetectorService',
    'RatelApi', 'communicatorService', 'microphoneService', 'logger', 'upgradeService',
    'eventsService', 'sessionServiceWrapper'];

  private readonly newCallEvent = new Subject<ExpertCall>();
  private readonly pullableCallEvent = new Subject<PullableCall>();

  constructor(private ServiceApi: ServiceApi,
              private timerFactory: TimerFactory,
              private modalsService: ModalsService,
              private soundsService: SoundsService,
              private rtcDetectorService: RtcDetectorService,
              private RatelApi: RatelApi,
              private communicatorService: CommunicatorService,
              private microphoneService: MicrophoneService,
              private logger: LoggerService,
              private upgradeService: UpgradeService,
              eventsService: EventsService,
              sessionServiceWrapper: SessionServiceWrapper) {
    communicatorService.connectionEstablishedEvent$.subscribe(this.checkIncomingCalls);
    communicatorService.connectionEstablishedEvent$.subscribe(this.checkPullableCalls);
    communicatorService.callInvitationEvent$.subscribe(
      (inv) => this.onExpertCallIncoming(inv.session, inv.callInvitation.call));

    sessionServiceWrapper.getSession().then(() => communicatorService.authenticate().subscribe());
    eventsService.on('login', () => {
      sessionServiceWrapper.getSession(true).then(() => {
        communicatorService.authenticate().subscribe();
      });
    });
    eventsService.on('logout', () => {
      communicatorService.disconnect();
    });
  }

  public get newCall$(): Observable<ExpertCall> {
    return this.newCallEvent;
  }

  public get pullableCall$(): Observable<PullableCall> {
    return this.pullableCallEvent;
  }

  private getCallMessages = (call: Call): ng.IPromise<Message[]> =>
    this.upgradeService.toIPromise(call.getMessages())

  private handlePullableCall = (session: Session, call: BusinessCall): void => {
    this.logger.debug('ExpertCallService: Handling pullable call for', call);

    const pullCallback = (): ng.IPromise<ExpertCall> => {
      this.logger.debug('ExpertCallService: PULLING');

      return this.rtcDetectorService.getMedia(MediaStreamConstraintsWrapper.getDefault()).then(localStream =>
        this.ServiceApi.getSueDetailsForExpertRoute(call.id).then((expertSueDetails) => {

          const currentExpertCall = new ExpertCall(expertSueDetails, session, this.timerFactory,
            call, this.communicatorService, this.RatelApi, this.ServiceApi, this.microphoneService, this.logger);

          return this.getCallMessages(call).then(callMsgs =>
            this.upgradeService.toIPromise(currentExpertCall.pull(localStream, callMsgs).then(() => {
              currentExpertCall.onEnd(() => this.onAnsweredCallEnd(currentExpertCall));
              currentExpertCall.onCallTaken(() => this.handlePullableCall(session, call));
              this.logger.debug('ExpertCallService: Call was pulled successfully, emitting new call');
              this.newCallEvent.next(currentExpertCall);

              return currentExpertCall;
            }))
          );
        })
      );
    };

    this.pullableCallEvent.next(new PullableCall(pullCallback, call));
  }

  private checkPullableCalls = (connected: IConnected): void => {
    connected.session.chat.getActiveCalls().then((activeCalls) => {
      this.logger.debug('ExpertCallService: Received active calls', activeCalls);
      if (activeCalls.length > Config.communicator.maxSimultaneousCallsCount) {
        this.logger.debug('ExpertCallService: Abnormal state - received more than 1 active calls, choosing first',
          activeCalls);
      }
      const activeCall = activeCalls[0];
      if (activeCall) {
        if (callType.isBusiness(activeCall)) {
          this.handlePullableCall(connected.session, activeCall);
        } else {
          this.logger.warn('ActiveCallBarService: Abnormal state - Active call is not BusinessCall, aborting');
        }
      }
    }, (err) => this.logger.warn('ActiveCallBarService: Could not get active calls', err));
  }

  private checkIncomingCalls = (connected: IConnected): void => {
    this.logger.debug('ExpertCallService: Reconnected, checking incoming calls');
    connected.session.chat.getCallsWithPendingInvitations().then((incomingCalls) => {
      this.logger.debug('ExpertCallService: Received incoming calls', incomingCalls);
      if (incomingCalls.length > Config.communicator.maxSimultaneousCallsCount) {
        this.logger.debug('ExpertCallService: Abnormal state - received more incoming calls than 1, choosing first',
          incomingCalls);
      }
      const incomingCall = incomingCalls[0];
      if (incomingCall) {
        this.onExpertCallIncoming(connected.session, incomingCall);
      }
    }, (err) => this.logger.warn('ExpertCallService: Could not load incoimg calls after successful connection', err));
  }

  private onExpertCallIncoming = (session: Session, call: Call): void => {
    if (callType.isBusiness(call)) {
      this.onExpertBusinessCallIncoming(session, call);
    } else {
      this.logger.warn('ExpertCallService: Incoming call was not of BusinessCall type, rejecting');
      call.reject(CallReason.CallRejected).then(
        () => this.logger.debug('ExpertCallService: Unsupported call invitation leave successful'),
        (err) => this.logger.warn('ExpertCallService: Can not leave unsupported call invitation', err));
    }
  }

  private onExpertBusinessCallIncoming = (session: Session, call: BusinessCall): void => {
    this.ServiceApi.getSueDetailsForExpertRoute(call.id).then((expertSueDetails) => {

      this.soundsService.callIncomingSound().play();

      const callingModal = this.modalsService.createIncomingCallModal(
        expertSueDetails,
        (modal) => this.handleAnswerCallInvitation(modal, expertSueDetails, session, call),
        (modal) => this.rejectCallInvitation(modal, call)
      );

      this.communicatorService.connectionLostEvent$
        .pipe(first())
        .subscribe(() => this.handleConnectionLostWhileCallIncoming(callingModal));

      // Client went offline when calling
      call.onOffline((offline: Message) => this.handleClientWentOfflineBeforeAnswering(offline, call, callingModal));
      // Client timeouted when calling
      call.onLeft((left: Message) => this.handleClientLeftBeforeAnswering(left, expertSueDetails, callingModal));
      // Call was answered on the other device
      call.onActiveDevice((active: CallActiveDevice) =>
        this.handleCallAnsweredOnOtherDevice(active, callingModal, session, call));
      // Client ended the call when calling
      call.onEnd((end: CallEnd) => this.handleCallEndedBeforeAnswering(end, callingModal));

    }, (err) => {
      this.logger.warn('ExpertCallService: Could not get incoming call details, rejecting the call', err);
      call.reject(CallReason.CallRejected);
    });
  }

  private handleConnectionLostWhileCallIncoming = (callingModal: ng.ui.bootstrap.IModalInstanceService): void => {
    this.soundsService.callIncomingSound().stop();
    callingModal.close();
  }

  private handleClientWentOfflineBeforeAnswering = (offlineEvent: Message,
                                                    call: BusinessCall,
                                                    callingModal: ng.ui.bootstrap.IModalInstanceService): void => {
    this.logger.debug('ExpertCallService: Client went offline when calling, rejecting call', offlineEvent);
    call.reject(CallReason.CallRejected);
    callingModal.close();
    this.soundsService.callIncomingSound().stop();
    this.soundsService.playCallRejected().catch(
      (err) => this.logger.warn('ExpertCallService: could not play rejected sound', err));
  }

  private handleClientLeftBeforeAnswering = (callLeft: Message,
                                             incomingCallDetails: GetExpertSueDetails,
                                             callingModal: ng.ui.bootstrap.IModalInstanceService): void => {
    this.logger.debug('ExpertCallService: Client left from call invitation, ending call', callLeft);
    callingModal.close();
    this.soundsService.callIncomingSound().stop();
    this.soundsService.playCallRejected().catch(
      (err) => this.logger.warn('ExpertCallService: could not play rejected sound', err));
    this.RatelApi.postRatelStopCallRoute(incomingCallDetails.sueId).then(
      () => this.logger.debug('ExpertCallService: Call ended successfully'),
      (err) => this.logger.warn('ExpertCallService: Cannot end the call', err));
  }

  private handleCallAnsweredOnOtherDevice = (callActiveDevice: CallActiveDevice,
                                             callingModal: ng.ui.bootstrap.IModalInstanceService,
                                             session: Session,
                                             call: BusinessCall): void => {
    this.logger.debug('ExpertCallService: Call was answered on other device', callActiveDevice);
    callingModal.close();
    this.soundsService.callIncomingSound().stop();
    this.handlePullableCall(session, call);
  }

  private handleCallEndedBeforeAnswering = (callEnd: CallEnd,
                                            callingModal: ng.ui.bootstrap.IModalInstanceService): void => {
    this.logger.debug('ExpertCallService: Call was ended before expert answer', callEnd);
    if (callEnd.reason !== 'rejected') {
      callingModal.closed.then(this.showMissedCallAlert);
    }
    callingModal.close();
    this.soundsService.callIncomingSound().stop();
    this.soundsService.playCallRejected().catch(
      (err) => this.logger.warn('ExpertCallService: could not play rejected sound', err));
  }

  private handleAnswerCallInvitation = (callingModal: ng.ui.bootstrap.IModalServiceInstance,
                                        incomingCallDetails: GetExpertSueDetails,
                                        session: Session,
                                        call: BusinessCall): void => {
    this.rtcDetectorService.getMedia(MediaStreamConstraintsWrapper.getDefault()).then(
      localStream => {

        const currentExpertCall = new ExpertCall(incomingCallDetails, session, this.timerFactory,
          call, this.communicatorService, this.RatelApi, this.ServiceApi, this.microphoneService, this.logger);

        currentExpertCall.answer(localStream).then(
          () => {
            currentExpertCall.onEnd(() => this.onAnsweredCallEnd(currentExpertCall));
            currentExpertCall.onCallTaken(() => this.handlePullableCall(session, call));
            this.newCallEvent.next(currentExpertCall);
            this.soundsService.callIncomingSound().stop();
            callingModal.close();
          },
          (err) => {
            this.soundsService.callIncomingSound().stop();
            callingModal.close();
            this.logger.error('ExpertCallService: Could not answer the call', err);
          }
        );
      },
      (err) => this.logger.warn('ExpertCallService: Could not get user media', err));
  }

  private rejectCallInvitation = (callingModal: ng.ui.bootstrap.IModalServiceInstance,
                                  call: BusinessCall): void => {
    this.logger.debug('ExpertCallService: Rejecting call invitation', call);
    // Clear callbacks registered in `incoming` state
    call.onEnd(() => {
    });
    call.onLeft(() => {
    });

    call.reject(CallReason.CallRejected).then(
      () => {
        this.soundsService.callIncomingSound().stop();
        callingModal.close();
        this.soundsService.playCallRejected().then(
          () => this.logger.debug('ExpertCallService: Played call rejected'),
          (err) => this.logger.warn('ExpertCallService: could not play call rejected', err));
        this.logger.debug('ExpertCallService: Call was successfully rejected');
      },
      (err) => {
        this.soundsService.callIncomingSound().stop();
        callingModal.close();
        this.logger.error('ExpertCallService: Error when rejecting the call', err);
      });
  }

  private onAnsweredCallEnd = (currentExpertCall: ExpertCall): void => {
    this.modalsService.createExpertConsultationSummaryModal(currentExpertCall.getSueId());
    this.soundsService.playCallEnded().then(
      () => this.logger.debug('ExpertCallService: call end sound played'),
      (err) => this.logger.warn('ExpertCallService: Cannot play call end sound', err)
    );
  }

  private showMissedCallAlert = (): void => {
    this.modalsService.createInfoAlertModal('COMMUNICATOR.MISSED_CALL_ALERT_MESSAGE');
  }
}
