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
import {CallActiveDevice} from 'ratel-sdk-js/dist/protocol/wire-events'
import {CommunicatorService} from '../communicator.service'
import * as _ from 'lodash'

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

  protected callbacks: CallbacksService

  protected static readonly events = {
    onAnswered: 'onAnswered',
    onRejected: 'onRejected',
    onEnd: 'onEnd',
    onCallTaken: 'onCallTaken',
    onInvited: 'onInvited',
    onJoined: 'onJoined',
    onLeft: 'onLeft',
    onRemoteStream: 'onRemoteStream',
    onLocalStream: 'onLocalStream',
    onTimeCostChange: 'onTimeCostChange',
    onVideoStart: 'onVideoStart',
    onVideoStop: 'onVideoStop',
    onParticipantOnline: 'onParticipantOnline',
    onParticipantOffline: 'onParticipantOffline',
    onSuspendedCallEnd: 'onSuspendedCallEnd'
  }

  constructor(callbacksFactory: CallbacksFactory,
              soundsService: SoundsService,
              protected ratelCall: RatelSdk.BusinessCall,
              private timerFactory: TimerFactory,
              private service: GetService,
              private sue: ServiceUsageEvent,
              private communicatorService: CommunicatorService,
              private RatelApi: RatelApi) {
    this.callbacks = callbacksFactory.getInstance(Object.keys(CurrentCall.events))
    this.registerCallbacks();
    this.createTimer(service.price, this.serviceFreeMinutesCount)
    this.messageRoom = new MessageRoom(callbacksFactory, soundsService);
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

  public onEnd = (cb: () => void): void => {
    this.callbacks.methods.onEnd(() => {
      this.stopLocalStream()
      cb()
    });
  }

  public onRejected = (cb: () => void): void =>
    this.callbacks.methods.onRejected(cb);

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

  public onTimeCostChange = (cb: (data: { time: number, money: MoneyDto }) => void): void =>
    this.callbacks.methods.onTimeCostChange(cb)

  public onVideoStart = (cb: () => void): void =>
    this.callbacks.methods.onVideoStart(cb)

  public onVideoStop = (cb: () => void): void =>
    this.callbacks.methods.onVideoStop(cb)

  public onRemoteStream = (cb: (stream: MediaStream) => void): void =>
    this.callbacks.methods.onRemoteStream(cb)

  public getState = (): CallState => this.state

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

  public onParticipantOnline = (cb: () => void): void => this.callbacks.methods.onParticipantOnline(cb)

  public onParticipantOffline = (cb: () => void): void => this.callbacks.methods.onParticipantOffline(cb)

  public onLeft = (cb: () => void): void => {
    this.callbacks.methods.onLeft(cb)
  }

  public onSuspendedCallEnd = (cb: () => void): void => this.callbacks.methods.onSuspendedCallEnd(cb)

  private updateLocalStream = (mediaStream: MediaStream, stopLocalStream?: () => void): void => {
    if (this.localStream) {
      this.ratelCall.removeStream(this.localStream);
    }
    if (stopLocalStream) stopLocalStream()
    this.localStream = mediaStream;
    this.ratelCall.addStream(mediaStream);
    this.callbacks.notify(CurrentCall.events.onLocalStream, mediaStream)
  }

  public getRemoteStream = (): MediaStream | undefined => this.remoteStream

  public getLocalStream = (): MediaStream | undefined => this.localStream

  public onLocalStream = (cb: (stream: MediaStream) => void): void => {
    this.callbacks.methods.onLocalStream(cb);
  }

  public onCallTaken =
    (cb: (activeDevice: CallActiveDevice) => void): void => this.callbacks.methods.onCallTaken(cb);

  private registerCallbacks = (): void => {
    this.ratelCall.onAnswered(() => this.callbacks.notify(CurrentCall.events.onAnswered, null))
    this.ratelCall.onRejected(() => this.callbacks.notify(CurrentCall.events.onRejected, null))
    this.ratelCall.onEnd(() => {
      this.stopLocalStream()
      this.stopTimer()
      this.setState(this.ratelCall.users.length > 0 ? CallState.ENDED : CallState.CANCELLED)
      this.callbacks.notify(CurrentCall.events.onEnd, null)
    })
    this.ratelCall.onActiveDevice(this.onActiveDevice)
    this.ratelCall.onInvited(() => this.callbacks.notify(CurrentCall.events.onInvited, null))
    this.ratelCall.onJoined(() => this.callbacks.notify(CurrentCall.events.onJoined, null))
    this.ratelCall.onLeft((reason) => {
        if (reason.context.reason === 'connection_dropped') {
          this.hangup()
        }
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
      this.callbacks.notify(CurrentCall.events.onParticipantOffline, null)
    })

    this.ratelCall.onOnline(() => {
      this.resumeTimer()
      this.callbacks.notify(CurrentCall.events.onParticipantOnline, null)
    })

    this.communicatorService.onReconnectActiveCalls((activeCalls) => {
      if (!_.find(activeCalls, (activeCall) => activeCall.id === this.ratelCall.id)) {
        this.stopLocalStream()
        this.stopTimer()
        this.setState(CallState.ENDED)
        this.callbacks.notify(CurrentCall.events.onSuspendedCallEnd, null)
      }
    })
  }

  private onActiveDevice = (activeDevice: CallActiveDevice): void => {
    this.stopLocalStream()
    this.stopTimer()
    this.callbacks.notify(CurrentCall.events.onCallTaken, activeDevice)
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
