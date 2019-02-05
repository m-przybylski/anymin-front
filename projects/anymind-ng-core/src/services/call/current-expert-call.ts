import { BusinessCall, CallReason, BusinessRoom, callEvents, Session } from 'machoke-sdk';
import { CallState, CurrentCall } from './current-call';
import { TimerService } from '../timer.service';
import { RatelService, GetExpertSueDetails } from '@anymind-ng/api';
import { MicrophoneService } from '../microphone.service';
import { CommunicatorService } from '../communicator.service';
import { LoggerService } from '../logger.service';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CallDetails } from './call-details';
import { NetworkConnectionService } from '../network-connection.service';
import { AlertService } from '../alert/alert.service';

export class CurrentExpertCall extends CurrentCall {
  constructor(
    private expertSueCallDetails: GetExpertSueDetails,
    private ratelService: RatelService,
    timerService: TimerService,
    call: BusinessCall,
    communicatorService: CommunicatorService,
    loggerService: LoggerService,
    microphoneService: MicrophoneService,
    networkConnectionService: NetworkConnectionService,
    alertService: AlertService,
  ) {
    super(
      call,
      loggerService,
      new CallDetails(
        expertSueCallDetails.sueId,
        expertSueCallDetails.ratelRoomId,
        expertSueCallDetails.servicePrice,
        expertSueCallDetails.freeSeconds,
      ),
      communicatorService,
      microphoneService,
      timerService,
      networkConnectionService,
      alertService,
    );

    this.callAnsweredOnOtherDevice$.subscribe(this.handleActiveDeviceEvent);
  }

  public answer = (session: Session, localMediaTracks: ReadonlyArray<MediaStreamTrack>): Promise<void> => {
    this.setLocalMediaTracks(localMediaTracks);

    return this.ratelCall
      .answer(localMediaTracks)
      .then(this.handleCallAnswer)
      .then(() => this.ratelService.postRatelCreateRoomRoute(this.getSueId()).toPromise())
      .then(room => session.machoke.getRoom(room.id))
      .then(businessRoom => this.joinRoom(businessRoom as BusinessRoom));
  };

  public reject = (): Promise<void> => this.ratelCall.reject(CallReason.CallRejected).then(this.handleCallReject);

  public get callAnsweredOnOtherDevice$(): Observable<callEvents.CallHandledOnDevice> {
    return this.ratelCall.activeDevice$.pipe(takeUntil(this.callDestroyed$));
  }

  public getServiceName = (): string => this.expertSueCallDetails.serviceName;

  public getExpertSueDetails = (): GetExpertSueDetails => this.expertSueCallDetails;

  private handleCallAnswer = (): void => {
    this.setState(CallState.PENDING);
    this.startTimer();
  };

  private handleCallReject = (): void => {
    this.setState(CallState.REJECTED);
  };

  private handleActiveDeviceEvent = (activeDevice: callEvents.CallHandledOnDevice): void => {
    this.logger.debug('CurrentCall: received onActiveDevice, call was answered on other device', activeDevice);
    this.setState(CallState.PENDING_ON_OTHER_DEVICE);
  };
}
