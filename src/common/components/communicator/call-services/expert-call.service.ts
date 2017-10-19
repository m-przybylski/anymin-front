import {CommunicatorService} from '../communicator.service';
import {ServiceApi, RatelApi} from 'profitelo-api-ng/api/api';
import * as RatelSdk from 'ratel-sdk-js';
import {ModalsService} from '../../../services/modals/modals.service';
import {CallbacksFactory} from '../../../services/callbacks/callbacks.factory';
import {CallbacksService} from '../../../services/callbacks/callbacks.service';
import {SoundsService} from '../../../services/sounds/sounds.service';
import {CurrentExpertCall} from '../models/current-expert-call';
import {NavigatorWrapper} from '../../../classes/navigator-wrapper';
import {TimerFactory} from '../../../services/timer/timer.factory';
import {MediaStreamConstraintsWrapper} from '../../../classes/media-stream-constraints-wrapper';
import {CallActiveDevice} from 'ratel-sdk-js/dist/protocol/wire-events'

export class ExpertCallService {

  private navigatorWrapper: NavigatorWrapper = new NavigatorWrapper();

  private currentExpertCall?: CurrentExpertCall;

  private callingModal: ng.ui.bootstrap.IModalInstanceService;

  private callbacks: CallbacksService;

  private static readonly events = {
    onNewCall: 'onNewCall',
    onCallPull: 'onCallPull',
    onCallTaken: 'onCallTaken'
  };

  /* @ngInject */
  constructor(private ServiceApi: ServiceApi,
              private timerFactory: TimerFactory,
              private modalsService: ModalsService,
              private soundsService: SoundsService,
              private $log: ng.ILogService,
              private callbacksFactory: CallbacksFactory,
              private RatelApi: RatelApi,
              private communicatorService: CommunicatorService) {

    this.callbacks = callbacksFactory.getInstance(Object.keys(ExpertCallService.events))
    communicatorService.onCallInvitation(this.onExpertCallIncoming)
  }

  public onNewCall = (cb: (currentExpertCall: CurrentExpertCall) => void): void => {
    this.callbacks.methods.onNewCall(cb);
  }

  public onCallPull = (cb: (currentExpertCall: CurrentExpertCall) => void): void => {
    this.callbacks.methods.onCallPull(cb);
  }

  public onCallTaken =
    (cb: (activeDevice: CallActiveDevice) => void): void => this.callbacks.methods.onCallTaken(cb)

  private onExpertCallIncoming = (callInvitation: RatelSdk.events.CallInvitation): void => {
    if (!this.currentExpertCall) {
      this.ServiceApi.getIncomingCallDetailsRoute(callInvitation.call.id).then((incomingCallDetails) => {

        const currentExpertCall = new CurrentExpertCall(this.timerFactory, this.callbacksFactory, callInvitation,
          incomingCallDetails, this.soundsService, this.RatelApi);

        this.currentExpertCall = currentExpertCall;

        this.currentExpertCall.onEnd(this.onExpertCallDisappearBeforeAnswering);

        this.soundsService.callIncomingSound().play()

        this.currentExpertCall.onCallTaken(this.onCurrentExpertCallTaken)

        this.callingModal = this.modalsService.createIncomingCallModal(
          incomingCallDetails.service,
          () => this.answerCall(currentExpertCall),
          () => this.rejectCall(currentExpertCall)
        )
      })
    } else {
      this.$log.info('Received callInvitation but there is a call already')
    }
  }

  public pullCall = (): void => {
    this.navigatorWrapper.getUserMediaStream(MediaStreamConstraintsWrapper.getDefault())
    .then(localStream => {
      if (this.currentExpertCall) return this.currentExpertCall.pull(localStream)
      else throw new Error('Call does not exist')
    }, this.onGetUserMediaStreamFailure)
    .then(() => {
      if (this.currentExpertCall) this.onCallPulled(this.currentExpertCall)
      else throw new Error('Call does not exist')
    })
    .catch((error) => {
      this.$log.error(error);
    })
  }

  private onCurrentExpertCallTaken = (activeDevice: CallActiveDevice): void => {
    if (activeDevice.device !== this.communicatorService.getClientDeviceId()) {
      this.soundsService.callIncomingSound().stop()
      this.callingModal.dismiss();
      this.callbacks.notify(ExpertCallService.events.onCallTaken, activeDevice)
    }
  }

  private onExpertCallDisappearBeforeAnswering = (): void => {
    this.currentExpertCall = undefined;
    this.callingModal.dismiss();
    this.soundsService.callIncomingSound().stop()
    this.soundsService.playCallRejected();
  }

  private answerCall = (currentExpertCall: CurrentExpertCall): Promise<void> =>
    this.navigatorWrapper.getUserMediaStream(MediaStreamConstraintsWrapper.getDefault())
    .then(localStream => currentExpertCall.answer(localStream), this.onGetUserMediaStreamFailure)
    .then(() => this.onCallAnswered(currentExpertCall))
    .catch(this.onAnswerCallError);

  private onGetUserMediaStreamFailure = (err: any): void => {
    this.$log.error(err);
    alert('Accept the user media to answer the call!');
  }

  private onCallPulled = (currentExpertCall: CurrentExpertCall): void => {
    this.callbacks.notify(ExpertCallService.events.onCallPull, currentExpertCall);
    currentExpertCall.onEnd(() => this.onExpertCallEnd(currentExpertCall));
    this.ServiceApi.getIncomingCallDetailsRoute(currentExpertCall.getRatelCallId()).then((incomingCallDetails) => {
      currentExpertCall.setStartTime(Date.parse(String(incomingCallDetails.sue.answeredAt)))
      const session = this.communicatorService.getClientSession()
      if (!session) throw new Error('Session not available')
      if (incomingCallDetails.sue.ratelRoomId)
        session.chat.getRoom(incomingCallDetails.sue.ratelRoomId).then((businessRoom) => {
          currentExpertCall.setRoom(businessRoom as RatelSdk.BusinessRoom)
        })
    })
  }

  private onCallAnswered = (currentExpertCall: CurrentExpertCall): ng.IPromise<void> => {
    this.callbacks.notify(ExpertCallService.events.onNewCall, currentExpertCall);
    this.soundsService.callIncomingSound().stop();
    currentExpertCall.onEnd(() => this.onExpertCallEnd(currentExpertCall));
    return this.RatelApi.postRatelCreateRoomRoute(currentExpertCall.getSueId()).then((room) => {
      const session = this.communicatorService.getClientSession()
      if (!session) throw new Error('Session not available');
      session.chat.getRoom(room.id).then((businessRoom) =>
        currentExpertCall.setBusinessRoom(businessRoom as RatelSdk.BusinessRoom));
    });
  }

  private onAnswerCallError = (err: any): void =>
    this.$log.error(err);

  private rejectCall = (currentExpertCall: CurrentExpertCall): void => {
    currentExpertCall.reject().then(() => {
      this.soundsService.callIncomingSound().stop();
      this.soundsService.playCallRejected();
      this.currentExpertCall = undefined;
    });
  }

  private onExpertCallEnd = (currentExpertCall: CurrentExpertCall): void => {
    this.soundsService.playCallEnded();
    this.modalsService.createExpertConsultationSummaryModal(currentExpertCall.getService().id);
    this.currentExpertCall = undefined;
  }
}
