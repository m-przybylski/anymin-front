import {TimerService} from '../../../services/timer/timer.service';
import {RatelApi} from 'profitelo-api-ng/api/api';
import {GetService, MoneyDto, RatelCallDetails, ServiceUsageEvent} from 'profitelo-api-ng/model/models';
import * as RatelSdk from 'ratel-sdk-js';
import {TimerFactory} from '../../../services/timer/timer.factory';
import {MediaStreamConstraintsWrapper} from '../../../classes/media-stream-constraints-wrapper';
import {StreamManager} from '../../../classes/stream-manager';
import {MessageRoom} from './message-room';
import {SoundsService} from '../../../services/sounds/sounds.service';
import {CallActiveDevice} from 'ratel-sdk-js/dist/protocol/wire-events'
import {CommunicatorService} from '../communicator.service'
import * as _ from 'lodash'
import {Subject} from 'rxjs'
import {Subscription} from 'rxjs/Subscription'

export enum CallState {
  NEW,
  INCOMING,
  REJECTED,
  PENDING,
  CANCELLED,
  ENDED
}

export class CurrentCall {

  private timer: TimerService;

  private state: CallState;

  private messageRoom: MessageRoom;

  private localStream?: MediaStream;
  private remoteStream?: MediaStream;

  private isRemoteVideo = false;

  private streamManager?: StreamManager;

  private serviceFreeMinutesCount: number = 0

  private static readonly moneyChangeNotificationInterval: number = 1000

  protected readonly events = {
    onAnswered: new Subject<void>(),
    onRejected: new Subject<void>(),
    onEnd: new Subject<void>(),
    onCallTaken: new Subject<CallActiveDevice>(),
    onInvited: new Subject<void>(),
    onJoined: new Subject<void>(),
    onLeft: new Subject<void>(),
    onRemoteStream: new Subject<MediaStream>(),
    onLocalStream: new Subject<MediaStream>(),
    onTimeCostChange: new Subject<{ time: number, money: MoneyDto }>(),
    onVideoStart: new Subject<void>(),
    onVideoStop: new Subject<void>(),
    onParticipantOnline: new Subject<void>(),
    onParticipantOffline: new Subject<void>(),
    onSuspendedCallEnd: new Subject<void>(),
  }

  constructor(soundsService: SoundsService,
              protected ratelCall: RatelSdk.BusinessCall,
              private timerFactory: TimerFactory,
              private service: GetService,
              private sue: ServiceUsageEvent,
              private communicatorService: CommunicatorService,
              private RatelApi: RatelApi) {
    this.registerCallbacks();
    this.createTimer(service.price, this.serviceFreeMinutesCount)
    this.messageRoom = new MessageRoom(soundsService);
  }

  public getMessageRoom = (): MessageRoom =>
    this.messageRoom

  public setBusinessRoom = (room: RatelSdk.BusinessRoom): Promise<void> =>
    this.messageRoom.joinRoom(room)

  public setRoom = (room: RatelSdk.BusinessRoom): void => this.messageRoom.setRoom(room)

  public getRatelCallId = (): RatelSdk.protocol.ID =>
    this.ratelCall.id

  public getSueId = (): string =>
    this.sue.id

  protected setLocalStream = (localStream: MediaStream): void => {
    this.localStream = localStream;
    this.streamManager = new StreamManager(this.localStream, new MediaStreamConstraintsWrapper());
  }

  public onEnd = (cb: () => void): Subscription =>
    this.events.onEnd.subscribe(() => {
      this.stopLocalStream()
      cb()
    });

  public onRejected = (cb: () => void): Subscription =>
    this.events.onRejected.subscribe(cb);

  public getService = (): GetService =>
    this.service;

  public hangup = (): ng.IPromise<RatelCallDetails> =>
    this.RatelApi.postRatelStopCallRoute(this.sue.id)

  public startAudio = (): Promise<void> => {
    if (this.streamManager) {
      return this.streamManager.addAudio().then((mediaStream) =>
        this.updateLocalStream(mediaStream, this.stopLocalStream));
    }
    else {
      return Promise.reject('No streamManager')
    }
  }

  public startVideo = (): Promise<void> => {
    if (this.streamManager) {
      return this.streamManager.addVideo().then((mediaStream) =>
        this.updateLocalStream(mediaStream, this.stopLocalStream));
    }
    else {
      return Promise.reject('No streamManager')
    }
  }

  public stopVideo = (): Promise<void> => {
    if (this.streamManager) {
      return this.streamManager.removeVideo().then((mediaStream) =>
        this.updateLocalStream(mediaStream, this.stopLocalStream));
    }
    else {
      return Promise.reject('No streamManager')
    }
  }

  public stopAudio = (): void => {
    if (this.streamManager) this.updateLocalStream(this.streamManager.removeAudio());
  }

  public onTimeCostChange = (cb: (data: { time: number, money: MoneyDto }) => void): Subscription =>
    this.events.onTimeCostChange.subscribe(cb)

  public onVideoStart = (cb: () => void): Subscription =>
    this.events.onVideoStart.subscribe(cb)

  public onVideoStop = (cb: () => void): Subscription =>
    this.events.onVideoStop.subscribe(cb)

  public onRemoteStream = (cb: (stream: MediaStream) => void): Subscription =>
    this.events.onRemoteStream.subscribe(cb)

  public getState = (): CallState => this.state

  protected setState = (state: CallState): void => {
    this.state = state;
  }

  public onAnswered = (cb: () => void): Subscription =>
    this.events.onAnswered.subscribe(cb);

  protected startTimer = (): void => {
    if (this.timer) this.timer.start(this.emitTimeMoneyChange)
  }

  protected stopTimer = (): void => {
    if (this.timer) this.timer.stop()
  }

  public setStartTime = (time: number): void => {
    if (this.timer) this.timer.setStartTime(time)
  }

  public pauseTimer = (): void => {
    if (this.timer) this.timer.pause()
  }

  public resumeTimer = (): void => {
    if (this.timer) this.timer.resume()
  }

  public pullCall = (mediaStream: MediaStream): Promise<void> => this.ratelCall.pull(mediaStream)

  public onParticipantOnline = (cb: () => void): Subscription =>
    this.events.onParticipantOnline.subscribe(cb)

  public onParticipantOffline = (cb: () => void): Subscription =>
    this.events.onParticipantOffline.subscribe(cb)

  public onLeft = (cb: () => void): Subscription =>
    this.events.onLeft.subscribe(cb)

  public onSuspendedCallEnd = (cb: () => void): Subscription =>
    this.events.onSuspendedCallEnd.subscribe(cb)

  private updateLocalStream = (mediaStream: MediaStream, stopLocalStream?: () => void): void => {
    if (this.localStream) {
      this.ratelCall.removeStream(this.localStream);
    }
    if (stopLocalStream) stopLocalStream()
    this.localStream = mediaStream;
    this.ratelCall.addStream(mediaStream);
    this.events.onLocalStream.next(mediaStream)
  }

  public getRemoteStream = (): MediaStream | undefined => this.remoteStream

  public getLocalStream = (): MediaStream | undefined => this.localStream

  public onLocalStream = (cb: (stream: MediaStream) => void): Subscription =>
    this.events.onLocalStream.subscribe(cb);

  public onCallTaken = (cb: (activeDevice: CallActiveDevice) => void): Subscription =>
    this.events.onCallTaken.subscribe(cb)

  private registerCallbacks = (): void => {
    this.ratelCall.onAnswered(() => this.events.onAnswered.next())
    this.ratelCall.onRejected(() => this.events.onRejected.next())
    this.ratelCall.onEnd(() => {
      this.stopLocalStream()
      this.stopTimer()
      this.setState(this.ratelCall.users.length > 0 ? CallState.ENDED : CallState.CANCELLED)
      this.events.onEnd.next()
    })
    this.ratelCall.onActiveDevice(this.onActiveDevice)
    this.ratelCall.onInvited(() => this.events.onInvited.next())
    this.ratelCall.onJoined(() => this.events.onJoined.next())
    this.ratelCall.onLeft((reason) => {
        if (reason.context.reason === 'connection_dropped') {
          this.hangup()
        }
      }
    )
    this.ratelCall.onRemoteStream((_id, stream) => {
      this.remoteStream = stream;
      this.events.onRemoteStream.next(stream);

      if (stream.getVideoTracks().length === 0 && this.isRemoteVideo) {
        this.isRemoteVideo = false;
        this.events.onVideoStop.next();
      }
      else if (stream.getVideoTracks().length > 0 && !this.isRemoteVideo) {
        this.isRemoteVideo = true;
        this.events.onVideoStart.next();
      }
    })

    this.ratelCall.onOffline(() => {
      this.pauseTimer()
      this.events.onParticipantOffline.next()
    })

    this.ratelCall.onOnline(() => {
      this.resumeTimer()
      this.events.onParticipantOnline.next()
    })

    this.communicatorService.onReconnectActiveCalls((activeCalls) => {
      if (!_.find(activeCalls, (activeCall) => activeCall.id === this.ratelCall.id)) {
        this.stopLocalStream()
        this.stopTimer()
        this.setState(CallState.ENDED)
        this.events.onSuspendedCallEnd.next()
      }
    })
  }

  private onActiveDevice = (activeDevice: CallActiveDevice): void => {
    this.stopLocalStream()
    this.stopTimer()
    this.events.onCallTaken.next(activeDevice)
  }

  private createTimer = (price: MoneyDto, freeMinutesCount: number): TimerService =>
    this.timer = this.timerFactory.getInstance(
      price, freeMinutesCount, CurrentCall.moneyChangeNotificationInterval)

  private emitTimeMoneyChange = (timeMoneyTuple: { time: number, money: MoneyDto }): void =>
    this.events.onTimeCostChange.next(timeMoneyTuple)

  private stopLocalStream = (): void => {
    if (this.localStream) {
      if (this.localStream.stop) {
        this.localStream.stop();
      }
      else {
        this.localStream.getTracks().forEach(t => t.stop());
      }
    }
  }

}
