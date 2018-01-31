import { ServiceApi, RatelApi } from 'profitelo-api-ng/api/api';
import * as RatelSdk from 'ratel-sdk-js';
import { ModalsService } from '../../../services/modals/modals.service';
import { SoundsService } from '../../../services/sounds/sounds.service';
import { CurrentExpertCall } from '../models/current-expert-call';
import { TimerFactory } from '../../../services/timer/timer.factory';
import { CallActiveDevice } from 'ratel-sdk-js/dist/protocol/wire-events';
import { RtcDetectorService } from '../../../services/rtc-detector/rtc-detector.service';
import { MediaStreamConstraintsWrapper } from '../../../classes/media-stream-constraints-wrapper';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Call } from 'ratel-sdk-js/dist/protocol/wire-entities';
import { MicrophoneService } from '../microphone-service/microphone.service';
import { TranslatorService } from '../../../services/translator/translator.service';
import { CommunicatorService, Connected } from '@anymind-ng/core';
import { EventsService } from '../../../services/events/events.service';
import { SessionServiceWrapper } from '../../../services/session/session.service';

// tslint:disable:member-ordering
export class ExpertCallService {

  private currentExpertCall?: CurrentExpertCall;

  private callingModal: ng.ui.bootstrap.IModalInstanceService;
  private onEndSubscription?: Subscription;

  private missedCallAlertMessage: string = this.translatorService.translate('COMMUNICATOR.MISSED_CALL_ALERT_MESSAGE');

  private readonly events = {
    onNewCall: new Subject<CurrentExpertCall>(),
    onCallPull: new Subject<CurrentExpertCall>(),
    onCallTaken: new Subject<CallActiveDevice>(),
    onCallActive: new Subject<Call[]>(),
    onCallEnd: new Subject<CurrentExpertCall>(),
    onDisconnectCall: new Subject<void>()
  };

  public static $inject = ['ServiceApi', 'timerFactory', 'modalsService', 'soundsService', '$log', 'rtcDetectorService',
    'RatelApi', 'communicatorService', 'microphoneService', 'translatorService', 'eventsService',
    'sessionServiceWrapper'];

  constructor(private ServiceApi: ServiceApi,
              private timerFactory: TimerFactory,
              private modalsService: ModalsService,
              private soundsService: SoundsService,
              private $log: ng.ILogService,
              private rtcDetectorService: RtcDetectorService,
              private RatelApi: RatelApi,
              private communicatorService: CommunicatorService,
              private microphoneService: MicrophoneService,
              private translatorService: TranslatorService,
              eventsService: EventsService,
              sessionServiceWrapper: SessionServiceWrapper) {
    communicatorService.callInvitationEvent$.subscribe(this.onExpertCallIncoming);
    communicatorService.connectionEstablishedEvent$.subscribe(this.updateActiveCallStatus);
    communicatorService.connectionLostEvent$.subscribe(this.notifyOnDisconnectCall);

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

  private updateActiveCallStatus = (connected: Connected): void => {
    connected.session.chat.getActiveCalls().then((activeCalls) => {
      if (activeCalls[0]) {
        this.ServiceApi.getIncomingCallDetailsRoute(activeCalls[0].id).then((incomingCallDetails) => {
          this.currentExpertCall = new CurrentExpertCall(incomingCallDetails, this.timerFactory, activeCalls[0],
            this.soundsService, this.communicatorService, this.RatelApi, this.microphoneService);
          this.currentExpertCall.onEnd(() => {
            this.events.onCallEnd.next();
            this.currentExpertCall = undefined;
          });
          this.currentExpertCall.onSuspendedCallEnd(this.onSuspendedCallEnd);
          this.currentExpertCall.onCallTaken(this.onCurrentExpertCallTaken);
          this.events.onCallActive.next(activeCalls);
        });
      } else this.$log.debug('No active call exists');
    });
  }

  private notifyOnDisconnectCall = (): void =>
    this.events.onDisconnectCall.next()

  public onDisconnectCall = (cb: () => void): Subscription =>
    this.events.onDisconnectCall.subscribe(cb)

  public onNewCall = (cb: (currentExpertCall: CurrentExpertCall) => void): Subscription =>
    this.events.onNewCall.subscribe(cb)

  public onCallPull = (cb: (currentExpertCall: CurrentExpertCall) => void): Subscription =>
    this.events.onCallPull.subscribe(cb)

  public onCallTaken = (cb: (activeDevice: CallActiveDevice) => void): Subscription =>
    this.events.onCallTaken.subscribe(cb)

  public onCallActive = (cb: (activeCalls: Call[]) => void): Subscription => this.events.onCallActive.subscribe(cb);

  public onCallEnd = (cb: () => void): Subscription => this.events.onCallEnd.subscribe(cb);

  private onExpertCallIncoming = (callInvitation: RatelSdk.events.CallInvitation): void => {
    if (!this.currentExpertCall) {
      this.ServiceApi.getIncomingCallDetailsRoute(callInvitation.call.id).then((incomingCallDetails) => {

        const currentExpertCall = new CurrentExpertCall(incomingCallDetails, this.timerFactory, callInvitation.call,
          this.soundsService, this.communicatorService, this.RatelApi, this.microphoneService);

        this.currentExpertCall = currentExpertCall;

        this.onEndSubscription = this.currentExpertCall.onEnd(this.onExpertCallDisappearBeforeAnswering);
        this.currentExpertCall.onSuspendedCallEnd(this.onSuspendedCallEnd);

        this.soundsService.callIncomingSound().play();

        this.currentExpertCall.onCallTaken(this.onCurrentExpertCallTaken);

        this.callingModal = this.modalsService.createIncomingCallModal(
          incomingCallDetails.service,
          () => this.answerCall(currentExpertCall),
          () => this.rejectCall(currentExpertCall)
        );
      });
    } else {
      this.$log.info('Received callInvitation but there is a call already');
    }
  }

  public pullCall = (): void => {
    this.rtcDetectorService.getMedia(MediaStreamConstraintsWrapper.getDefault())
      .then(localStream => {
        if (this.currentExpertCall) {
          this.currentExpertCall.pull(localStream);
          this.onCallPulled(this.currentExpertCall);
        } else throw new Error('Call does not exist');
      }, this.onGetUserMediaStreamFailure)
      .catch((error) => {
        this.$log.error(error);
      });
  }

  private onCurrentExpertCallTaken = (activeDevice: CallActiveDevice): void => {
    if (activeDevice.device !== this.communicatorService.getDeviceId()) {
      this.soundsService.callIncomingSound().stop();
      this.dismissCallingModal();
      this.events.onCallTaken.next(activeDevice);
      if (this.currentExpertCall && this.onEndSubscription) {
        this.onEndSubscription.unsubscribe();
        this.onEndSubscription  = this.currentExpertCall.onEnd(() => {
          this.events.onCallEnd.next();
        });
      }
    }
  }

  private onSuspendedCallEnd = (): void => {
    this.soundsService.playCallEnded();
    if (this.currentExpertCall)
      this.modalsService.createExpertConsultationSummaryModal(this.currentExpertCall.getService().id);
    else
      this.$log.error('call does not exist');
    this.currentExpertCall = undefined;
  }

  private onExpertCallDisappearBeforeAnswering = (): void => {
    this.currentExpertCall = undefined;
    this.dismissCallingModal();
    this.events.onCallEnd.next();
    this.soundsService.callIncomingSound().stop();
    this.soundsService.playCallRejected();
    this.callingModal.closed.then(this.showMissedCallAlert);
  }

  private answerCall = (currentExpertCall: CurrentExpertCall): ng.IPromise<void> =>
    this.rtcDetectorService.getMedia(MediaStreamConstraintsWrapper.getDefault())
      .then(localStream => {
        if (this.currentExpertCall) {
          this.events.onNewCall.next(currentExpertCall);
          currentExpertCall.answer(localStream);
          this.onCallAnswered(currentExpertCall);
        } else {
          localStream.getTracks().forEach(t => t.stop());
        }
      }, this.onGetUserMediaStreamFailure)
      .catch(this.onAnswerCallError)

  private onGetUserMediaStreamFailure = (err: any): void => {
    this.$log.debug(err);
  }

  private onCallPulled = (currentExpertCall: CurrentExpertCall): ng.IPromise<void> => {
    this.onEndSubscription = currentExpertCall.onEnd(() => this.onExpertCallEnd(currentExpertCall));
    return this.ServiceApi.getIncomingCallDetailsRoute(currentExpertCall.getRatelCallId())
      .then((incomingCallDetails) => {
        currentExpertCall.startTimer(incomingCallDetails.sue.freeSeconds);
        currentExpertCall.setStartTime(Date.parse(String(incomingCallDetails.sue.answeredAt)));
        const session = this.communicatorService.getSession();
        if (!session) throw new Error('Session not available');
        if (incomingCallDetails.sue.ratelRoomId)
          session.chat.getRoom(incomingCallDetails.sue.ratelRoomId).then(businessRoom => {
            currentExpertCall.setRoom(businessRoom as RatelSdk.BusinessRoom);
            this.events.onCallPull.next(currentExpertCall);
          });
      });
  }

  private onCallAnswered = (currentExpertCall: CurrentExpertCall): ng.IPromise<void> => {
    if (this.onEndSubscription) this.onEndSubscription.unsubscribe();
    this.soundsService.callIncomingSound().stop();
    this.onEndSubscription = currentExpertCall.onEnd(() => this.onExpertCallEnd(currentExpertCall));
    return this.RatelApi.postRatelCreateRoomRoute(currentExpertCall.getSueId()).then((room) => {
      const session = this.communicatorService.getSession();
      if (!session) throw new Error('Session not available');
      session.chat.getRoom(room.id).then(businessRoom =>
        currentExpertCall.setBusinessRoom(businessRoom as RatelSdk.BusinessRoom));
    });
  }

  private onAnswerCallError = (err: any): void =>
    this.$log.error(err)

  private rejectCall = (currentExpertCall: CurrentExpertCall): void => {
    currentExpertCall.reject().then(() => {
      this.soundsService.callIncomingSound().stop();
      this.soundsService.playCallRejected();
      this.currentExpertCall = undefined;
    });
  }

  private onExpertCallEnd = (currentExpertCall?: CurrentExpertCall): void => {
    this.soundsService.playCallEnded();
    this.events.onCallEnd.next();
    this.dismissCallingModal();
    if (currentExpertCall) this.modalsService.createExpertConsultationSummaryModal(currentExpertCall.getService().id);
    this.currentExpertCall = undefined;
  }

  private dismissCallingModal = (): void => {
    if (this.callingModal) this.callingModal.close();
  }

  private showMissedCallAlert = (): void => {
    alert(this.missedCallAlertMessage);
  }
}
