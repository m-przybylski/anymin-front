import { CallState, CurrentCall } from './current-call';
import { BusinessCall, callEvents } from 'machoke-sdk';
import { GetProfile, GetSUERatelCall } from '@anymind-ng/api';
import { CommunicatorService } from '../communicator.service';
import { MicrophoneService } from '../microphone.service';
import { LoggerService } from '../logger.service';
import { TimerService } from '../timer.service';
import { CallDetails } from './call-details';
import { filter, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NetworkConnectionService } from '../network-connection.service';
import { AlertService } from '../alert/alert.service';

export class CurrentClientCall extends CurrentCall {
  constructor(
    private expert: GetProfile,
    clientCallDetails: GetSUERatelCall,
    call: BusinessCall,
    loggerService: LoggerService,
    communicatorService: CommunicatorService,
    microphoneService: MicrophoneService,
    localMediaTracks: ReadonlyArray<MediaStreamTrack>,
    timerService: TimerService,
    networkConnectionService: NetworkConnectionService,
    alertService: AlertService,
  ) {
    super(
      call,
      loggerService,
      new CallDetails(
        clientCallDetails.sue.id,
        clientCallDetails.sue.ratelRoomId,
        clientCallDetails.service.price,
        clientCallDetails.sue.freeSeconds,
        clientCallDetails.service,
      ),
      communicatorService,
      microphoneService,
      timerService,
      networkConnectionService,
      alertService,
    );

    this.setLocalMediaTracks(localMediaTracks);

    this.rejected$.subscribe(() => this.setState(CallState.REJECTED));

    this.answered$.subscribe(() => {
      this.startTimer();
      this.setState(CallState.PENDING);
    });

    call.peerState$
      .pipe(takeUntil(this.callDestroyed$))
      .pipe(filter(connectionState => connectionState === 'connected'))
      .subscribe(() => this.notifyVideoChangeToPeer(this.isVideoEnabled()));
  }

  public getExpert = (): GetProfile => this.expert;

  public get answered$(): Observable<callEvents.Answered> {
    return this.ratelCall.answered$.pipe(takeUntil(this.callDestroyed$));
  }

  public get rejected$(): Observable<callEvents.Rejected> {
    return this.ratelCall.rejected$.pipe(takeUntil(this.callDestroyed$));
  }
}
