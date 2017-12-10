import * as RatelSdk from 'ratel-sdk-js';
import {GetIncomingCallDetails} from 'profitelo-api-ng/model/models';
import {RatelApi} from 'profitelo-api-ng/api/api';
import {CallState, CurrentCall} from './current-call';
import {TimerFactory} from '../../../services/timer/timer.factory';
import {SoundsService} from '../../../services/sounds/sounds.service';
import {CommunicatorService} from '../communicator.service'
import {Call} from 'ratel-sdk-js/dist/protocol/wire-entities'

export class CurrentExpertCall extends CurrentCall {

  constructor(timerFactory: TimerFactory,
              call: Call,
              incomingCallDetails: GetIncomingCallDetails,
              soundsService: SoundsService,
              communicatorService: CommunicatorService,
              RatelApi: RatelApi) {

    super(soundsService, call as RatelSdk.BusinessCall, timerFactory,
      incomingCallDetails.service, incomingCallDetails.sue, communicatorService, RatelApi);
    this.setState(CallState.INCOMING)
    this.onCallTaken(() => {
      this.setState(CallState.PENDING_ON_OTHER_DEVICE)
    })
  }

  public answer = (localStream: MediaStream): Promise<void> => {
    this.setLocalStream(localStream);
    return this.ratelCall.answer(localStream).then(this.onAnswer);
  }

  public pull = (localStream: MediaStream): Promise<void> => {
    this.setLocalStream(localStream)
    return this.pullCall(localStream).then(() => {
      this.setState(CallState.PENDING);
    })
  }

  public reject = (): Promise<void> => this.ratelCall.reject('rejected').then(this.onReject);

  private onAnswer = (): void => {
    this.events.onAnswered.next();
    this.setState(CallState.PENDING);
    this.startTimer();
  }

  private onReject = (): void => {
    this.setState(CallState.REJECTED);
  }
}
