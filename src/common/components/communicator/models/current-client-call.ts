import * as RatelSdk from 'ratel-sdk-js';
import {RatelApi} from 'profitelo-api-ng/api/api';
import {ServiceUsageEvent, GetProfile, GetService} from 'profitelo-api-ng/model/models';
import {CallState, CurrentCall} from './current-call';
import {TimerFactory} from '../../../services/timer/timer.factory';
import {SoundsService} from '../../../services/sounds/sounds.service';
import {CommunicatorService} from '../communicator.service'

export class CurrentClientCall extends CurrentCall {

  constructor(timerFactory: TimerFactory,
              call: RatelSdk.BusinessCall,
              localStream: MediaStream,
              service: GetService,
              sue: ServiceUsageEvent,
              soundsService: SoundsService,
              RatelApi: RatelApi,
              communicatorService: CommunicatorService,
              private expert: GetProfile) {

    super(soundsService, call, timerFactory, service, sue, communicatorService, RatelApi);
    this.setLocalStream(localStream);
    this.ratelCall.addStream(localStream);

    this.setState(CallState.NEW);

    call.onRejected(() => {
      this.events.onRejected.next()
      this.setState(CallState.REJECTED)
    });
    call.onAnswered(() => {
      this.startTimer()
      this.events.onAnswered.next()
      this.setState(CallState.PENDING)
    });

  }

  public getExpert = (): GetProfile => this.expert

  public onAnswered = (cb: () => void): void => {
    this.events.onAnswered.subscribe(cb);
  }

  public onRejected = (cb: () => void): void => {
    this.events.onRejected.subscribe(cb);
  }

}
