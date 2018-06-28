// tslint:disable:no-shadowed-variable
// tslint:disable:no-any
// tslint:disable:newline-before-return
// tslint:disable:member-ordering
// tslint:disable:max-file-line-count
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import { TimerService } from '../../../services/timer/timer.service';
import { RatelApi } from 'profitelo-api-ng/api/api';
import { MoneyDto, RatelCallDetails, PostTechnicalProblem } from 'profitelo-api-ng/model/models';
import { Session, callEvents, BusinessCall, BusinessRoom, protocol } from 'ratel-sdk-js';
import { TimerFactory } from '../../../services/timer/timer.factory';
import { MediaStreamVideoConstraintsWrapper } from '../../../classes/media-stream-constraints-wrapper';
import { MessageRoom } from './message-room';
import { Subject, Observable, ReplaySubject, Subscription } from 'rxjs';
import { MicrophoneService } from '../microphone-service/microphone.service';
import { CommunicatorService, IConnected, LoggerService } from '@anymind-ng/core';
import { ServiceUsageEventApi } from 'profitelo-api-ng/api/ServiceUsageEventApi';
import { takeUntil } from 'rxjs/operators';
import { EventsService } from '../../../services/events/events.service';
import { NavigatorWrapper } from '../../../classes/navigator-wrapper/navigator-wrapper';

export enum CallState {
  REJECTED,
  PENDING,
  PENDING_ON_OTHER_DEVICE,
  CANCELLED,
  ENDED
}

export interface ICallDetails {
  sueId: string;
  serviceId: string;
  servicePrice: MoneyDto;
  serviceName: string;
  ratelRoomId?: string;
}

export class CurrentCall {

  protected readonly events = {
    onEnd: new Subject<void>(),
    onCallTaken: new Subject<callEvents.CallHandledOnDevice>(),
    onInvited: new Subject<void>(),
    onJoined: new Subject<void>(),
    onLeft: new Subject<void>(),
    onRemoteMediaTrack: new ReplaySubject<MediaStreamTrack>(1),
    onLocalMediaTrack: new ReplaySubject<MediaStreamTrack>(1),
    onTimeCostChange: new ReplaySubject<{ time: number, money: MoneyDto }>(1),
    onParticipantOnline: new Subject<void>(),
    onParticipantOffline: new ReplaySubject<void>(1)
  };

  protected timer: TimerService;
  private state: CallState;
  private localMediaTracks: ReadonlyArray<MediaStreamTrack> = [];
  private readonly messageRoomEvent = new ReplaySubject<MessageRoom>(1);
  private ngUnsubscribe = new Subject<void>();
  private mediaStreamVideoConstraintsWrapper = new MediaStreamVideoConstraintsWrapper();
  private navigator = new NavigatorWrapper();

  constructor(protected ratelCall: BusinessCall,
              private session: Session,
              private timerFactory: TimerFactory,
              private callDetails: ICallDetails,
              private communicatorService: CommunicatorService,
              protected RatelApi: RatelApi,
              private microphoneService: MicrophoneService,
              private ServiceUsageEventApi: ServiceUsageEventApi,
              protected logger: LoggerService,
              private eventsService: EventsService) {
    this.registerCallbacks();
    this.createTimer(callDetails.servicePrice);
    this.eventsService.on('logout', () => {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    });
  }

  public forceEndCall = (): void => {
    this.stopTracks(this.localMediaTracks);
    this.stopTimer();
    this.events.onEnd.next();
  }

  public get messageRoom$(): Observable<MessageRoom> {
    return this.messageRoomEvent;
  }

  public getSession = (): Session =>
    this.session

  public joinRoom = (room: BusinessRoom): Promise<void> =>
    room.join().then(() => this.messageRoomEvent.next(new MessageRoom(room)))

  public setRoom = (room: BusinessRoom): void =>
    this.messageRoomEvent.next(new MessageRoom(room))

  public getRatelCallId = (): protocol.ID =>
    this.ratelCall.id

  public getSueId = (): string =>
    this.callDetails.sueId

  public getRatelRoomId = (): string | undefined =>
    this.callDetails.ratelRoomId

  public onEnd = (cb: () => void): Subscription =>
    this.events.onEnd.subscribe(cb)

  public getCallDetails = (): ICallDetails =>
    this.callDetails

  public hangup = (): ng.IPromise<RatelCallDetails> =>
    this.RatelApi.postRatelStopCallRoute(this.callDetails.sueId)

  public changeCamera = (): Promise<void> =>
    this.startNewVideoStream(this.mediaStreamVideoConstraintsWrapper.toggleCamera())

  public startVideo = (): Promise<void> =>
    this.startNewVideoStream(this.mediaStreamVideoConstraintsWrapper.getConstraints())

  public stopVideo = (): void =>
    this.localMediaTracks
      .filter(track => track.kind === 'video')
      .forEach(track => {
        this.ratelCall.removeTrack(track);
        track.stop();
      })

  public mute = (): void =>
    this.localMediaTracks
      .filter(track => track.kind === 'audio')
      .forEach(track => track.enabled = false)

  public unmute = (): void =>
    this.localMediaTracks
      .filter(track => track.kind === 'audio')
      .forEach(track => track.enabled = true)

  public onTimeCostChange = (cb: (data: { time: number, money: MoneyDto }) => void): Subscription =>
    this.events.onTimeCostChange.subscribe(cb)

  public get remoteMediaTrack$(): Observable<MediaStreamTrack> {
    return this.events.onRemoteMediaTrack;
  }

  public getState = (): CallState => this.state;

  public startTimer = (freeSeconds = 0): void => {
    this.timer.start(this.emitTimeMoneyChange, freeSeconds);
  }

  public setDuration = (time: number): void => {
    this.timer.setCurrentDuration(time);
  }

  public pullCall = (audioTrack: MediaStreamTrack): Promise<void> => this.ratelCall.pull([audioTrack]);

  public onParticipantOnline = (cb: () => void): Subscription =>
    this.events.onParticipantOnline.subscribe(cb)

  public onParticipantOffline = (cb: () => void): Subscription =>
    this.events.onParticipantOffline.subscribe(cb)

  public onLeft = (cb: () => void): Subscription =>
    this.events.onLeft.subscribe(cb)

  public getLocalMediaTracks = (): ReadonlyArray<MediaStreamTrack> => this.localMediaTracks;

  public get localMediaTrack$(): Observable<MediaStreamTrack> {
    return this.events.onLocalMediaTrack;
  }

  public onCallTaken = (cb: (activeDevice: callEvents.CallHandledOnDevice) => void): Subscription =>
    this.events.onCallTaken.subscribe(cb)

  protected stopTimer = (): void => {
    this.timer.stop();
  }

  protected setLocalAudioTrack = (audioTrack: MediaStreamTrack): void => {
    this.microphoneService.startAudioStreamListening(audioTrack);
    this.localMediaTracks = [audioTrack];
  }

  protected setState = (state: CallState): void => {
    this.state = state;
  }

  protected isClientOnline = (callMsgs: ReadonlyArray<callEvents.CallEvent>): boolean => {
    const clientMessages = callMsgs.filter(this.isCallMessageNotMine);
    const reversed = clientMessages.slice().reverse();

    for (const msg of reversed) {
      switch (msg.tag) {
        case callEvents.DeviceOnline.tag:
          return true;
        case callEvents.DeviceOffline.tag:
          return false;
        case callEvents.CallHandledOnDevice.tag:
          return true;
        default:
      }
    }
    return true;
  }

  private handleOnEnd = (): void => {
    this.stopTracks(this.localMediaTracks);
    // Subscribe, because remote stream can come after call end when audio/video was changed when hanging up the call
    this.events.onLocalMediaTrack.subscribe(track => track.stop());
    this.events.onRemoteMediaTrack.subscribe(track => track.stop());
    this.stopTimer();
    this.setState(this.ratelCall.users.length > 0 ? CallState.ENDED : CallState.CANCELLED);
    this.events.onEnd.next();
  }

  private onNewRemoteMediaTrack = (mediaTrack: MediaStreamTrack): void => {
    this.logger.debug('CurrentCall: Received remote stream');
    this.events.onRemoteMediaTrack.next(mediaTrack);
  }

  private registerCallbacks = (): void => {
    this.ratelCall.end$.subscribe(this.handleOnEnd);
    this.ratelCall.activeDevice$.subscribe(this.onActiveDevice);
    this.ratelCall.invited$.subscribe(() => this.events.onInvited.next());
    this.ratelCall.joined$.subscribe(() => this.events.onJoined.next());
    this.ratelCall.left$.subscribe((left) => {
        this.setState(CallState.ENDED);
        if (left.reason === 'connection_dropped') {
          this.hangup();
        }
      }
    );
    this.ratelCall.remoteTrack$.subscribe(({track}) => this.onNewRemoteMediaTrack(track));

    this.ratelCall.offline$.subscribe((msg) => {
      this.logger.debug('CurrentCall: user went offline', msg);
      if (msg.userId !== this.session.id) {
        this.logger.debug('CurrentCall: Participant went offline');
        this.timer.pause();
        this.events.onParticipantOffline.next(undefined);
        this.logger.debug('CurrentCall: Hanging up the call because participant went offline');
        this.hangup().catch(err =>
          this.logger.warn('CurrentCall: could not hangup the call when participant went offline', err));
        this.ServiceUsageEventApi.postTechnicalProblemRoute(this.getSueId(),
          {problemType: PostTechnicalProblem.ProblemTypeEnum.AUTODISCONNECT})
          .then(() => this.logger.debug('CurrentCall: participant auto disconnect reported'),
            () => this.logger.warn('CurrentCall: failed when reporting participant auto disconnect'));
      }
    });

    this.ratelCall.online$.subscribe((msg) => {
      this.logger.debug('CurrentCall: user went online', msg);
      if (msg.userId !== this.session.id) {
        this.logger.debug('CurrentCall: Participant went online');
        this.timer.resume();
        this.events.onParticipantOnline.next();
      }
    });

    // Check if call still exists
    // FIXME
    // remove this and handle it in this.handleConnectionBack when artichoke will return CALL_END in call.getMessages
    // https://git.contactis.pl/itelo/profitelo-frontend/issues/456
    this.communicatorService.connectionEstablishedEvent$.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((connected: IConnected) => {
        // This is a HACK to enable media after reconnection - it will be fixed in ratel-sdk-js v2
        this.ratelCall.remoteTrack$.subscribe(({track}) => this.onNewRemoteMediaTrack(track));
        this.logger.debug('CurrentCall: Reconnected checking if call was pending');
        if (this.state === CallState.PENDING) {
          this.logger.debug('CurrentCall: Reconnected in pending call, checking active calls');
          connected.session.chat.getActiveCalls().then((activeCalls) => {
            const call = _.find(activeCalls, (activeCall) => activeCall.id === this.ratelCall.id);
            if (call) {
              this.ServiceUsageEventApi.getSueDetailsForExpertRoute(this.ratelCall.id).then((callDetails) => {
                this.timer.setCurrentDuration(callDetails.callDuration);
              }).catch((err) => {
                this.logger.debug('CurrentCall: Error while getting call details', err);
              });
            } else { // Call no longer exists, propagate call end
              this.handleOnEnd();
            }
          });
        }
      });

    this.communicatorService.connectionEstablishedEvent$.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(this.handleConnectionBack);
    this.communicatorService.connectionLostEvent$.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.timer.pause());
  }

  private handleConnectionBack = (): void => {
    // This is a HACK to enable media after reconnection - it will be fixed in ratel-sdk-js v2
    this.ratelCall.remoteTrack$.subscribe(({track}) => this.onNewRemoteMediaTrack(track));
    this.ratelCall.getMessages().then(callMsgs => {
      this.logger.debug('CurrentCall: handling connection back, call msgs', callMsgs);
      if (this.isMyCallPulled(callMsgs)) {
        this.logger.debug('CurrentCall: call was pulled on other device, stopping');
        this.stopTracks(this.localMediaTracks);
        this.stopTimer();
        this.setState(CallState.PENDING_ON_OTHER_DEVICE);
        this.events.onCallTaken.next();
      } else if (this.isClientOnline(callMsgs)) {
        this.logger.debug('CurrentCall: call was not pulled, client is online - update call duration and resume');
        this.ServiceUsageEventApi.getSueDetailsForExpertRoute(this.ratelCall.id).then((callDetails) => {
          this.timer.setCurrentDuration(callDetails.callDuration);
          this.timer.resume();
          this.events.onParticipantOnline.next();
        }).catch((err) => {
          this.logger.debug('CurrentCall: Error while getting call details', err);
        });
      } else {
        this.logger.debug('CurrentCall: call was not pulled but client is offline - propagating onParticipantOffline');
        this.events.onParticipantOffline.next(undefined);
      }
    });
  }

  private isCallMessageMine = (msg: callEvents.CallEvent): boolean =>
    // FIXME
    this.session !== undefined && (this.session.id === (msg as any).authorId || this.session.id === (msg as any).userId)

  private isCallMessageNotMine = (msg: callEvents.CallEvent): boolean =>
    // FIXME
    this.session !== undefined && this.session.id !== (msg as any).authorId && this.session.id !== (msg as any).userId

  private isMyCallPulled = (callMsgs: ReadonlyArray<callEvents.CallEvent>): boolean => {
    const myMessages = callMsgs.filter(this.isCallMessageMine);
    const reversed = myMessages.slice().reverse();

    for (const msg of reversed) {
      if (msg.tag === callEvents.DeviceOffline.tag) {
        return false;
      } else if (msg.tag === callEvents.CallHandledOnDevice.tag) {
        return true;
      }
    }
    return false;
  }

  private onActiveDevice = (activeDevice: callEvents.CallHandledOnDevice): void => {
    this.logger.debug('CurrentCall: received onActiveDevice, call was pulled on other device', activeDevice);
    this.stopTracks(this.localMediaTracks);
    this.stopTimer();
    this.setState(CallState.PENDING_ON_OTHER_DEVICE);
    this.events.onCallTaken.next(activeDevice);
  }

  private createTimer = (price: MoneyDto): TimerService =>
    this.timer = this.timerFactory.getInstance(price)

  private emitTimeMoneyChange = (timeMoneyTuple: { time: number, money: MoneyDto }): void =>
    this.events.onTimeCostChange.next(timeMoneyTuple)

  private startNewVideoStream = (videoStreamConstraints: MediaStreamConstraints): Promise<void> =>
    this.navigator.getUserMediaStream(videoStreamConstraints).then(stream => {
      // Stop old video if there is one
      this.localMediaTracks
        .filter(track => track.kind === 'video')
        .forEach(track => track.stop());
      const videoTrack = stream.getVideoTracks()[0];
      this.localMediaTracks = [...this.localMediaTracks, videoTrack];
      this.ratelCall.addTrack(videoTrack);
      this.events.onLocalMediaTrack.next(videoTrack);
    })

  private stopTracks = (tracks: ReadonlyArray<MediaStreamTrack>): void => {
    tracks.forEach(track => track.stop());
  }
}
