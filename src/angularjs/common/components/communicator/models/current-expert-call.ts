import * as RatelSdk from 'ratel-sdk-js';
import {GetIncomingCallDetails} from 'profitelo-api-ng/model/models';
import {RatelApi} from 'profitelo-api-ng/api/api';
import {CallState, CurrentCall} from './current-call';
import {TimerFactory} from '../../../services/timer/timer.factory';
import {SoundsService} from '../../../services/sounds/sounds.service';
import {Call} from 'ratel-sdk-js/dist/protocol/wire-entities'
import {MicrophoneService} from '../microphone-service/microphone.service'
import {CommunicatorService} from '@anymind-ng/core';

export class CurrentExpertCall extends CurrentCall {

  static $inject = ['timerFactory', 'call', 'incomingCallDetails', 'soundsService', 'communicatorService',
    'RatelApi', 'microphoneService'];

  constructor(private incomingCallDetails: GetIncomingCallDetails,
              timerFactory: TimerFactory,
              call: Call,
              soundsService: SoundsService,
              communicatorService: CommunicatorService,
              RatelApi: RatelApi,
              microphoneService: MicrophoneService) {

    super(soundsService, call as RatelSdk.BusinessCall, timerFactory,
      incomingCallDetails.service, incomingCallDetails.sue, communicatorService, RatelApi, microphoneService);
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
    this.startTimer(this.incomingCallDetails.sue.freeSeconds);
  }

  private onReject = (): void => {
    this.setState(CallState.REJECTED);
  }
}
