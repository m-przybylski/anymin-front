import { CurrentClientCall } from './call/current-client-call';
import { GetExpertSueDetails, GetProfile, GetSueRatelCall, RatelService } from '@anymind-ng/api';
import { BusinessCall } from 'machoke-sdk';
import { LoggerFactory } from '../factories/logger.factory';
import { LoggerService } from './logger.service';
import { CommunicatorService } from './communicator.service';
import { MicrophoneService } from './microphone.service';
import { Injectable } from '@angular/core';
import { CurrentExpertCall } from './call/current-expert-call';
import { TimerFactory } from '../factories/timer.factory';
import { NetworkConnectionService } from './network-connection.service';
import { AlertService } from './alert/alert.service';

@Injectable({ providedIn: 'root' })
export class CallFactory {
  private expertLogger: LoggerService;
  private clientLogger: LoggerService;

  constructor(
    private ratelService: RatelService,
    private communicatorService: CommunicatorService,
    private microphoneService: MicrophoneService,
    private timerFactory: TimerFactory,
    private networkConnectionService: NetworkConnectionService,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    this.expertLogger = loggerFactory.createLoggerService('CurrentExpertCall');
    this.clientLogger = loggerFactory.createLoggerService('CurrentClientCall');
  }

  public createClientCall = (
    expert: GetProfile,
    call: BusinessCall,
    callDetails: GetSueRatelCall,
    localMediaTracks: ReadonlyArray<MediaStreamTrack>,
  ): CurrentClientCall =>
    new CurrentClientCall(
      expert,
      callDetails,
      call,
      this.clientLogger,
      this.communicatorService,
      this.microphoneService,
      localMediaTracks,
      this.timerFactory.createTimerService(),
      this.networkConnectionService,
      this.alertService,
    );

  public createExpertCall = (call: BusinessCall, expertSueDetails: GetExpertSueDetails): CurrentExpertCall =>
    new CurrentExpertCall(
      expertSueDetails,
      this.ratelService,
      this.timerFactory.createTimerService(),
      call,
      this.communicatorService,
      this.expertLogger,
      this.microphoneService,
      this.networkConnectionService,
      this.alertService,
    );
}
