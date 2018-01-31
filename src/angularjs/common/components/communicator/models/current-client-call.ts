import * as RatelSdk from 'ratel-sdk-js';
import { RatelApi } from 'profitelo-api-ng/api/api';
import { ServiceUsageEvent, GetProfile, GetService } from 'profitelo-api-ng/model/models';
import { CallState, CurrentCall } from './current-call';
import { TimerFactory } from '../../../services/timer/timer.factory';
import { SoundsService } from '../../../services/sounds/sounds.service';
import { Subscription } from 'rxjs/Subscription';
import { MicrophoneService } from '../microphone-service/microphone.service';
import { CommunicatorService } from '@anymind-ng/core';

// tslint:disable:member-ordering
export class CurrentClientCall extends CurrentCall {

  public static $inject = ['timerFactory', 'call', 'localStream', 'service', 'sue', 'soundsService', 'RatelApi',
    'communicatorService', 'microphoneService', 'expert'];

  constructor(timerFactory: TimerFactory,
              call: RatelSdk.BusinessCall,
              localStream: MediaStream,
              service: GetService,
              sue: ServiceUsageEvent,
              soundsService: SoundsService,
              RatelApi: RatelApi,
              communicatorService: CommunicatorService,
              microphoneService: MicrophoneService,
              private expert: GetProfile) {

    super(soundsService, call, timerFactory, service, sue, communicatorService, RatelApi, microphoneService);
    this.setLocalStream(localStream);
    this.ratelCall.addStream(localStream);

    this.setState(CallState.NEW);

    call.onRejected(() => {
      this.events.onRejected.next();
      this.setState(CallState.REJECTED);
    });
    call.onAnswered(() => {
      this.startTimer();
      this.events.onAnswered.next();
      this.setState(CallState.PENDING);
    });

  }

  public getExpert = (): GetProfile => this.expert;

  public onAnswered = (cb: () => void): Subscription =>
    this.events.onAnswered.subscribe(cb)

  public onRejected = (cb: () => void): Subscription =>
    this.events.onRejected.subscribe(cb)

}
