import * as RatelSdk from 'ratel-sdk-js';
import {RatelApi} from 'profitelo-api-ng/api/api';
import {ServiceUsageEvent, GetProfile, GetService} from 'profitelo-api-ng/model/models';
import {CallbacksFactory} from '../../../services/callbacks/callbacks.factory';
import {CallState, CurrentCall} from './current-call';
import {TimerFactory} from '../../../services/timer/timer.factory';
import {SoundsService} from '../../../services/sounds/sounds.service';

export class CurrentClientCall extends CurrentCall {

  constructor(timerFactory: TimerFactory,
              callbacksFactory: CallbacksFactory,
              call: RatelSdk.BusinessCall,
              localStream: MediaStream,
              service: GetService,
              sue: ServiceUsageEvent,
              soundsService: SoundsService,
              RatelApi: RatelApi,
              private expert: GetProfile) {

    super(callbacksFactory, soundsService, call, timerFactory, service, sue, RatelApi);
    this.setLocalStream(localStream);
    this.ratelCall.addStream(localStream);

    this.setState(CallState.NEW);

    call.onRejected(() => {
      this.callbacks.notify(CurrentCall.events.onRejected)
      this.setState(CallState.REJECTED)
    });
    call.onAnswered(() => {
      this.startTimer()
      this.callbacks.notify(CurrentCall.events.onAnswered)
      this.setState(CallState.PENDING)
    });

  }

  public getExpert = (): GetProfile => this.expert

  public onAnswered = (cb: () => void): void => {
    this.callbacks.methods.onAnswered(cb);
  }

  public onRejected = (cb: () => void): void => {
    this.callbacks.methods.onRejected(cb);
  }

}
