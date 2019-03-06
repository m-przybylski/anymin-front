// tslint:disable:max-file-line-count
import { GetService, MoneyDto } from '@anymind-ng/api';
import { BusinessCall, BusinessRoom, protocol, CallReason, callEvents } from 'machoke-sdk';
import { CommunicatorService } from '../communicator.service';
import { Subject, Observable, ReplaySubject, merge } from 'rxjs';
import { LoggerService } from '../logger.service';
import { ITimeMoney, TimerService } from '../timer.service';
import { MicrophoneService } from '../microphone.service';
import { MessageRoom } from '../models/message-room';
import { takeUntil, mapTo, map, filter, first, take } from 'rxjs/operators';
import { NavigatorWrapper } from '../models/navigator-wrapper';
import { MediaStreamVideoConstraintsWrapper } from '../media-stream-video-constraints-wrapper';
import { CallDetails } from './call-details';
import DeviceOffline = callEvents.DeviceOffline;
import { NetworkConnectionService } from '../network-connection.service';
import { AlertService } from '../alert/alert.service';

export enum CallState {
  NEW,
  CANCELLED,
  REJECTED,
  PENDING,
  ENDED,
  PENDING_ON_OTHER_DEVICE,
}

export enum CallDestroyedReason {
  PeerConnectionEnd,
}

export abstract class CurrentCall {
  private readonly callDestroyEvent: Observable<CallDestroyedReason | void>;

  private readonly timeCostChangeEvent = new Subject<ITimeMoney>();
  private readonly messageRoomEvent = new ReplaySubject<MessageRoom>(1);
  private readonly remoteMediaTrackEvent = new ReplaySubject<MediaStreamTrack>(parseInt('2', 10));
  private readonly localMediaTrackEvent = new ReplaySubject<MediaStreamTrack>(parseInt('2', 10));

  private state = CallState.NEW;
  private localMediaTracks: ReadonlyArray<MediaStreamTrack> = [];
  private readonly mediaStreamVideoConstraintsWrapper = new MediaStreamVideoConstraintsWrapper();
  private readonly navigator = new NavigatorWrapper();

  constructor(
    protected ratelCall: BusinessCall,
    protected logger: LoggerService,
    private callDetails: CallDetails,
    private communicatorService: CommunicatorService,
    private microphoneService: MicrophoneService,
    private timerService: TimerService,
    networkConnectionService: NetworkConnectionService,
    alertService: AlertService,
  ) {
    const peerConnectionEnd$ = this.ratelCall.peerState$.pipe(filter(connectionState => connectionState === 'failed'));

    this.callDestroyEvent = merge(
      this.communicatorService.connectionLostEvent$,
      this.ratelCall.end$.pipe(mapTo(undefined)),
      this.ratelCall.rejected$.pipe(mapTo(undefined)),
      this.ratelCall.left$.pipe(mapTo(undefined)),
      peerConnectionEnd$.pipe(mapTo(CallDestroyedReason.PeerConnectionEnd)),
    ).pipe(first());

    this.callDestroyEvent
      // Hangup the call with ConnectionDropped reason if p2p connection drops or fails
      .subscribe((reason?: CallDestroyedReason) => this.cleanupCallObject(reason));

    this.ratelCall.remoteTrack$
      .pipe(takeUntil(this.callDestroyEvent))
      .subscribe(track => this.handleNewRemoteTrack(track));

    networkConnectionService.change$
      .pipe(
        takeUntil(this.callDestroyEvent),
        take(1),
      )
      .subscribe(() => {
        if (this.state === CallState.PENDING || this.state === CallState.NEW) {
          alertService.pushDangerAlert('ALERT.CONSULTATION_CONNECTION_BROKEN', undefined, { isStatic: true });
        }
      });
  }

  public getState(): CallState {
    return this.state;
  }

  public hangup(reason: CallReason): Promise<void> {
    return this.ratelCall.leave(reason).then(
      () => {
        this.logger.debug('Left the call successfully, cleaning call object');
        this.cleanupCallObject();
      },
      err => this.logger.warn('Leave failed with error: ', err),
    );
  }

  public getService(): GetService | undefined {
    return this.callDetails.service;
  }

  public getCallDetails(): CallDetails {
    return this.callDetails;
  }

  public unmute(): void {
    return this.localMediaTracks.filter(track => track.kind === 'audio').forEach(track => (track.enabled = true));
  }

  public startVideo(): void {
    this.localMediaTracks.filter(track => track.kind === 'video').forEach(track => (track.enabled = true));
    this.notifyVideoChangeToPeer(true);
  }

  public stopVideo(): void {
    this.localMediaTracks.filter(track => track.kind === 'video').forEach(track => (track.enabled = false));
    this.notifyVideoChangeToPeer(false);
  }

  public mute(): void {
    return this.localMediaTracks.filter(track => track.kind === 'audio').forEach(track => (track.enabled = false));
  }

  public joinRoom(room: BusinessRoom): Promise<void> {
    return room.join().then(() => this.messageRoomEvent.next(new MessageRoom(room)));
  }

  public getRatelCallId(): protocol.ID {
    return this.ratelCall.id;
  }

  public getSueId(): string {
    return this.callDetails.sueId;
  }

  public getRatelRoomId(): string | undefined {
    return this.callDetails.ratelRoomId;
  }

  public changeCamera(): Promise<void> {
    // Stop old video if there is one
    this.localMediaTracks.filter(track => track.kind === 'video').forEach(track => track.stop());
    this.localMediaTracks = this.localMediaTracks.filter(track => track.kind !== 'video');

    return this.navigator.getUserMediaStream(this.mediaStreamVideoConstraintsWrapper.toggleCamera()).then(stream => {
      const videoTrack = stream.getVideoTracks()[0];
      this.localMediaTracks = [...this.localMediaTracks, videoTrack];
      this.ratelCall.replaceTrackByKind(videoTrack);
      this.localMediaTrackEvent.next(videoTrack);
      this.notifyVideoChangeToPeer(true);
    });
  }

  public get messageRoom$(): Observable<MessageRoom> {
    return this.messageRoomEvent;
  }

  public get remoteVideoStatus$(): Observable<boolean> {
    return this.ratelCall.message$.pipe(
      map(msg => {
        try {
          return JSON.parse(msg).video;
        } catch (error) {
          this.logger.error('Can not parse JSON on message event', error);
        }
      }),
    );
  }

  /**
   * This event will be emitted and completed by particular events only once:
   * - when participant goes offline or leaves/rejects the call
   * - when we loose internet connection with artichoke
   * - when p2p connection will fail or drop
   * - when call ends
   * Important: this event won't be emitted if you hangup the call manually
   */
  public get callDestroyed$(): Observable<void | CallDestroyedReason> {
    return this.callDestroyEvent;
  }

  /**
   * Emitted by server end$ event
   */
  public get end$(): Observable<callEvents.Ended> {
    return this.ratelCall.end$;
  }

  public get participantDisconnected$(): Observable<DeviceOffline> {
    return this.ratelCall.offline$;
  }

  public get peerState$(): Observable<RTCIceConnectionState> {
    return this.ratelCall.peerState$;
  }

  public get timeCostChange$(): Observable<ITimeMoney> {
    return this.timeCostChangeEvent;
  }

  public get remoteMediaTrack$(): Observable<MediaStreamTrack> {
    return this.remoteMediaTrackEvent;
  }

  public get localMediaTrack$(): Observable<MediaStreamTrack> {
    return this.localMediaTrackEvent;
  }

  protected startTimer(): void {
    this.timerService
      .start(this.callDetails.price, this.callDetails.freeSeconds)
      .pipe(takeUntil(this.end$))
      .subscribe(value => this.emitTimeMoneyChange(value));
  }

  protected isVideoEnabled(): boolean {
    return this.localMediaTracks.filter(track => track.kind === 'video').some(track => track.enabled);
  }

  protected setLocalMediaTracks(localMediaTracks: ReadonlyArray<MediaStreamTrack>): void {
    localMediaTracks
      .filter(track => track.kind === 'audio')
      .forEach(track => this.microphoneService.startAudioStreamListening(track));
    this.localMediaTracks = localMediaTracks;
    localMediaTracks.forEach(track => this.localMediaTrackEvent.next(track));
  }

  protected setState(state: CallState): void {
    this.state = state;
  }

  protected notifyVideoChangeToPeer(enabled: boolean): void {
    this.ratelCall.broadcast(JSON.stringify({ video: enabled }));
  }

  private handleNewRemoteTrack(track: MediaStreamTrack): void {
    this.logger.debug('CurrentCall: Received remote media track');
    this.remoteMediaTrackEvent.next(track);
  }

  private cleanupCallObject(reason?: CallDestroyedReason): void {
    this.logger.debug(`Cleaning call object for call ${this.ratelCall.id}`);
    if (reason === CallDestroyedReason.PeerConnectionEnd) {
      this.logger.warn('P2P connection ended, hanging up the call');
      this.hangup(CallReason.ConnectionDropped);
    }

    if (this.state === CallState.PENDING) {
      this.setState(CallState.ENDED);
    } else if (this.state === CallState.NEW) {
      this.setState(CallState.CANCELLED);
    }
    this.timerService.stop();
    this.stopTracks(this.localMediaTracks);
  }

  private emitTimeMoneyChange(timeMoneyTuple: { time: number; money: MoneyDto }): void {
    return this.timeCostChangeEvent.next(timeMoneyTuple);
  }

  private stopTracks(tracks: ReadonlyArray<MediaStreamTrack>): void {
    return tracks.forEach(track => track.stop());
  }
}
