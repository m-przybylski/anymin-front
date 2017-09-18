import {TimerService} from '../../../services/timer/timer.service';
import {RatelApi} from 'profitelo-api-ng/api/api';
import {GetService, MoneyDto, RatelCallDetails, ServiceUsageEvent} from 'profitelo-api-ng/model/models';
import * as RatelSdk from 'ratel-sdk-js';
import {CallbacksService} from '../../../services/callbacks/callbacks.service';
import {CallbacksFactory} from '../../../services/callbacks/callbacks.factory';
import {TimerFactory} from '../../../services/timer/timer.factory';
import {MediaStreamConstraintsWrapper} from '../../../classes/media-stream-constraints-wrapper';
import {StreamManager} from '../../../classes/stream-manager';
import {MessageRoom} from './message-room';
import {SoundsService} from '../../../services/sounds/sounds.service';

export enum CallState {
  NEW,
  INCOMING,
  REJECTED,
  PENDING,
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

  protected callbacks: CallbacksService

  protected static readonly events = {
    onAnswered: 'onAnswered',
    onRejected: 'onRejected',
    onEnd: 'onEnd',
    onActiveDevice: 'onActiveDevice',
    onInvited: 'onInvited',
    onJoined: 'onJoined',
    onLeft: 'onLeft',
    onRemoteStream: 'onRemoteStream',
    onLocalStream: 'onLocalStream',
    onTimeCostChange: 'onTimeCostChange',
    onVideoStart: 'onVideoStart',
    onVideoStop: 'onVideoStop'
  }

  constructor(callbacksFactory: CallbacksFactory,
              soundsService: SoundsService,
              protected ratelCall: RatelSdk.BusinessCall,
              private timerFactory: TimerFactory,
              private service: GetService,
              private sue: ServiceUsageEvent,
              private RatelApi: RatelApi) {
    this.callbacks = callbacksFactory.getInstance(Object.keys(CurrentCall.events))
    this.registerCallbacks();
    this.createTimer(service.price, this.serviceFreeMinutesCount)
    this.messageRoom = new MessageRoom(callbacksFactory, soundsService);
  }

  public getMessageRoom = (): MessageRoom =>
    this.messageRoom

  public setBusinessRoom = (room: RatelSdk.BusinessRoom): Promise<void> =>
    this.messageRoom.setRoom(room)

  public getRatelCallId = (): RatelSdk.protocol.ID =>
    this.ratelCall.id

  public getSueId = (): string =>
    this.sue.id

  protected setLocalStream = (localStream: MediaStream): void => {
    this.localStream = localStream;
    this.streamManager = new StreamManager(this.localStream, new MediaStreamConstraintsWrapper());
  }

  public onEnd = (cb: () => void): void =>
    this.callbacks.methods.onEnd(cb);

  public getService = (): GetService =>
    this.service;

  public hangup = (): ng.IPromise<RatelCallDetails> =>
    this.RatelApi.postRatelStopCallRoute(this.sue.id)

  public startAudio = (): Promise<void> => {
    if (this.streamManager) {
      return this.streamManager.addAudio().then(this.updateLocalStream);
    }
    else {
      return Promise.reject('No streamManager')
    }
  }

  public startVideo = (): Promise<void> => {
    if (this.streamManager) {
      return this.streamManager.addVideo().then(this.updateLocalStream);
    }
    else {
      return Promise.reject('No streamManager')
    }
  }

  public stopVideo = (): Promise<void> => {
    if (this.streamManager) {
      return this.streamManager.removeVideo().then(this.updateLocalStream);
    }
    else {
      return Promise.reject('No streamManager')
    }
  }

  public stopAudio = (): void => {
    if (this.streamManager) this.updateLocalStream(this.streamManager.removeAudio());
  }

  public onTimeCostChange = (cb: (data: { time: number, money: MoneyDto }) => void): void =>
    this.callbacks.methods.onTimeCostChange(cb)

  public onVideoStart = (cb: () => void): void =>
    this.callbacks.methods.onVideoStart(cb)

  public onVideoStop = (cb: () => void): void =>
    this.callbacks.methods.onVideoStop(cb)

  public onRemoteStream = (cb: (stream: MediaStream) => void): void =>
    this.callbacks.methods.onRemoteStream(cb)

  protected setState = (state: CallState): void => {
    this.state = state;
  }

  protected onAnswered = (cb: () => void): void => {
    this.callbacks.methods.onAnswered(cb);
  }

  protected startTimer = (): void => {
    if (this.timer) this.timer.start(this.onTimeMoneyChange)
  }

  protected stopTimer = (): void => {
    if (this.timer) this.timer.stop()
  }

  public pauseTimer = (): void => {
    if (this.timer) this.timer.pause()
  }

  public resumeTimer = (): void => {
    if (this.timer) this.timer.resume()
  }

  private updateLocalStream = (mediaStream: MediaStream): void => {
    if (this.localStream) {
      this.ratelCall.removeStream(this.localStream);
    }
    this.localStream = mediaStream;
    this.ratelCall.addStream(mediaStream);
    this.callbacks.notify(CurrentCall.events.onLocalStream, mediaStream)
  }

  public getRemoteStream = (): MediaStream | undefined => this.remoteStream

  public getLocalStream = (): MediaStream | undefined => this.localStream

  public onLocalStream = (cb: (stream: MediaStream) => void): void => {
    this.callbacks.methods.onLocalStream(cb);
  }

  private registerCallbacks = (): void => {
    this.ratelCall.onAnswered(() => this.callbacks.notify(CurrentCall.events.onAnswered, null))
    this.ratelCall.onRejected(() => this.callbacks.notify(CurrentCall.events.onRejected, null))
    this.ratelCall.onEnd(() => {
      this.stopLocalStream();
      this.stopTimer()
      this.setState(CallState.ENDED)
      this.callbacks.notify(CurrentCall.events.onEnd, null);
    })
    this.ratelCall.onActiveDevice(() => this.callbacks.notify(CurrentCall.events.onActiveDevice, null))
    this.ratelCall.onInvited(() => this.callbacks.notify(CurrentCall.events.onInvited, null))
    this.ratelCall.onJoined(() => this.callbacks.notify(CurrentCall.events.onJoined, null))
    this.ratelCall.onLeft(() => {
        this.callbacks.notify(CurrentCall.events.onLeft, null)
      }
    )
    this.ratelCall.onRemoteStream((_id, stream) => {
      this.remoteStream = stream;
      this.callbacks.notify(CurrentCall.events.onRemoteStream, stream);

      if (stream.getVideoTracks().length === 0 && this.isRemoteVideo) {
        this.isRemoteVideo = false;
        this.callbacks.notify(CurrentCall.events.onVideoStop, null);
      }
      else if (stream.getVideoTracks().length > 0 && !this.isRemoteVideo) {
        this.isRemoteVideo = true;
        this.callbacks.notify(CurrentCall.events.onVideoStart, null);
      }
    })

    this.ratelCall.onOffline(() => {
      this.pauseTimer()
    })
    this.ratelCall.onOnline(() => {
      this.resumeTimer()
    })
  }

  private createTimer = (price: MoneyDto, freeMinutesCount: number): TimerService =>
    this.timer = this.timerFactory.getInstance(
      price, freeMinutesCount, CurrentCall.moneyChangeNotificationInterval)

  private onTimeMoneyChange = (timeMoneyTuple: { time: number, money: MoneyDto }): void =>
    this.callbacks.notify(CurrentCall.events.onTimeCostChange, timeMoneyTuple)

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
