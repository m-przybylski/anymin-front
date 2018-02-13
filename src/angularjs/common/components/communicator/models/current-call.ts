// tslint:disable:max-file-line-count
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import { TimerService } from '../../../services/timer/timer.service';
import { RatelApi } from 'profitelo-api-ng/api/api';
import { GetService, MoneyDto, RatelCallDetails, ServiceUsageEvent } from 'profitelo-api-ng/model/models';
import * as RatelSdk from 'ratel-sdk-js';
import { Session } from 'ratel-sdk-js';
import { TimerFactory } from '../../../services/timer/timer.factory';
import { MediaStreamConstraintsWrapper } from '../../../classes/media-stream-constraints-wrapper';
import { StreamManager } from '../../../classes/stream-manager';
import { MessageRoom } from './message-room';
import { CallActiveDevice } from 'ratel-sdk-js/dist/protocol/wire-events';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';
import { MicrophoneService } from '../microphone-service/microphone.service';
import { CommunicatorService, IConnected, LoggerService } from '@anymind-ng/core';
import { Config } from '../../../../../config';

export enum CallState {
  REJECTED,
  PENDING,
  PENDING_ON_OTHER_DEVICE,
  CANCELLED,
  ENDED
}

export class CurrentCall {

  protected readonly events = {
    onEnd: new Subject<void>(),
    onCallTaken: new Subject<CallActiveDevice>(),
    onInvited: new Subject<void>(),
    onJoined: new Subject<void>(),
    onLeft: new Subject<void>(),
    onRemoteStream: new ReplaySubject<MediaStream>(1),
    onLocalStream: new Subject<MediaStream>(),
    onTimeCostChange: new ReplaySubject<{ time: number, money: MoneyDto }>(1),
    onVideoStart: new Subject<void>(),
    onVideoStop: new Subject<void>(),
    onParticipantOnline: new Subject<void>(),
    onParticipantOffline: new ReplaySubject<void>(1)
  };

  protected timer: TimerService;

  private state: CallState;

  private localStream?: MediaStream;

  private isRemoteVideo = false;

  private streamManager?: StreamManager;

  private readonly messageRoomEvent = new ReplaySubject<MessageRoom>(1);

  constructor(protected ratelCall: RatelSdk.BusinessCall,
              private session: Session,
              private timerFactory: TimerFactory,
              private service: GetService,
              private sue: ServiceUsageEvent,
              private communicatorService: CommunicatorService,
              protected RatelApi: RatelApi,
              private microphoneService: MicrophoneService,
              protected logger: LoggerService) {
    this.registerCallbacks();
    this.createTimer(service.price);
  }

  public get messageRoom$(): Observable<MessageRoom> {
    return this.messageRoomEvent;
  }

  public getSession = (): Session =>
    this.session

  public joinRoom = (room: RatelSdk.BusinessRoom): Promise<void> =>
    room.join().then(() => this.messageRoomEvent.next(new MessageRoom(room)))

  public setRoom = (room: RatelSdk.BusinessRoom): void =>
    this.messageRoomEvent.next(new MessageRoom(room))

  public getRatelCallId = (): RatelSdk.protocol.ID =>
    this.ratelCall.id

  public getSueId = (): string =>
    this.sue.id

  public getRatelRoomId = (): string | undefined =>
    this.sue.ratelRoomId

  public onEnd = (cb: () => void): Subscription =>
    this.events.onEnd.subscribe(cb)

  public getService = (): GetService =>
    this.service

  public hangup = (): ng.IPromise<RatelCallDetails> =>
    this.RatelApi.postRatelStopCallRoute(this.sue.id)

  public changeCamera = (): Promise<void> =>
    this.startEnvironmentVideo()

  public startEnvironmentVideo = (): Promise<void> => {
    if (this.streamManager) {
      return this.streamManager.changeCamera().then(stream =>
        this.updateLocalStream(stream, this.stopLocalStream));
    }
    else {
      return Promise.reject('No streamManager');
    }
  }

  public startAudio = (): Promise<void> => {
    if (this.streamManager) {
      return this.streamManager.addAudio().then((mediaStream) =>
        this.updateLocalStream(mediaStream, this.stopLocalStream));
    }
    else {
      return Promise.reject('No streamManager');
    }
  }

  public startVideo = (): Promise<void> => {
    if (this.streamManager) {
      return this.streamManager.addVideo().then((mediaStream) =>
        this.updateLocalStream(mediaStream, this.stopLocalStream));
    }
    else {
      return Promise.reject('No streamManager');
    }
  }

  public stopVideo = (): Promise<void> => {
    if (this.streamManager) {
      return this.streamManager.removeVideo().then((mediaStream) =>
        this.updateLocalStream(mediaStream, this.stopLocalStream));
    }
    else {
      return Promise.reject('No streamManager');
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

  public getState = (): CallState => this.state;

  public startTimer = (freeSeconds = 0): void => {
    this.timer.start(this.emitTimeMoneyChange, freeSeconds);
  }

  public setStartTime = (time: number): void => {
    this.timer.setStartTime(time);
  }

  public pullCall = (mediaStream: MediaStream): Promise<void> => this.ratelCall.pull(mediaStream);

  public onParticipantOnline = (cb: () => void): Subscription =>
    this.events.onParticipantOnline.subscribe(cb)

  public onParticipantOffline = (cb: () => void): Subscription =>
    this.events.onParticipantOffline.subscribe(cb)

  public onLeft = (cb: () => void): Subscription =>
    this.events.onLeft.subscribe(cb)

  public getLocalStream = (): MediaStream | undefined => this.localStream;

  public onLocalStream = (cb: (stream: MediaStream) => void): Subscription =>
    this.events.onLocalStream.subscribe(cb)

  public onCallTaken = (cb: (activeDevice: CallActiveDevice) => void): Subscription =>
    this.events.onCallTaken.subscribe(cb)

  protected stopTimer = (): void => {
    this.timer.stop();
  }

  protected setLocalStream = (localStream: MediaStream): void => {
    // tslint:disable-next-line:strict-type-predicates
    if (typeof localStream.getAudioTracks()[0] !== 'undefined') {
      this.microphoneService.startAudioStreamListening(localStream.getAudioTracks()[0]);
    }
    this.localStream = localStream;
    this.streamManager = new StreamManager(this.localStream, new MediaStreamConstraintsWrapper());
  }

  protected setState = (state: CallState): void => {
    this.state = state;
  }

  protected isClientOnline = (callMsgs: RatelSdk.Message[]): boolean => {
    const clientMessages = callMsgs.filter(this.isCallMessageNotMine);
    const reversed = clientMessages.slice().reverse();

    for (const msg of reversed) {
      switch (msg.tag) {
        case 'DEVICE_ONLINE':
          return true;
        case 'DEVICE_OFFLINE':
          return false;
        case 'CALL_TRANSFERRED':
          return true;
        default:
      }
    }
    return true;
  }

  private updateLocalStream = (mediaStream: MediaStream, stopLocalStream?: () => void): void => {
    if (this.localStream) {
      this.ratelCall.removeStream(this.localStream);
    }
    if (stopLocalStream) stopLocalStream();
    this.localStream = mediaStream;
    this.ratelCall.addStream(mediaStream);
    this.events.onLocalStream.next(mediaStream);
  }

  private registerCallbacks = (): void => {
    this.ratelCall.onEnd(() => {
      this.stopLocalStream();
      this.stopTimer();
      this.setState(this.ratelCall.users.length > 0 ? CallState.ENDED : CallState.CANCELLED);
      this.events.onEnd.next();
    });
    this.ratelCall.onActiveDevice(this.onActiveDevice);
    this.ratelCall.onInvited(() => this.events.onInvited.next());
    this.ratelCall.onJoined(() => this.events.onJoined.next());
    this.ratelCall.onLeft((reason) => {
      this.setState(CallState.ENDED);
        if (reason.context.reason === 'connection_dropped') {
          this.hangup();
        }
      }
    );
    this.ratelCall.onRemoteStream((_id, stream) => {
      this.logger.debug('CurrentCall: Received remote stream');
      this.events.onRemoteStream.next(stream);

      if (stream.getVideoTracks().length === 0 && this.isRemoteVideo) {
        this.isRemoteVideo = false;
        this.events.onVideoStop.next();
      }
      else if (stream.getVideoTracks().length > 0 && !this.isRemoteVideo) {
        this.isRemoteVideo = true;
        this.events.onVideoStart.next();
      }
    });

    this.ratelCall.onOffline((msg) => {
      this.logger.debug('CurrentCall: user went offline', msg);
      if (msg.userId !== this.session.id) {
        this.logger.debug('CurrentCall: Participant went offline');
        this.timer.pause();
        this.events.onParticipantOffline.next(undefined);
      }
    });

    this.ratelCall.onOnline((msg) => {
      this.logger.debug('CurrentCall: user went online', msg);
      if (msg.userId !== this.session.id) {
        this.logger.debug('CurrentCall: Participant went online');
        this.timer.resume();
        this.events.onParticipantOnline.next();
      }
    });

    // Check if call still exists
    this.communicatorService.connectionEstablishedEvent$.subscribe((connected: IConnected) => {
      this.logger.debug('CurrentCall: Reconnected checking if call was pending');
      if (this.state === CallState.PENDING) {
        this.logger.debug('CurrentCall: Reconnected in pending call, checking active calls');
        connected.session.chat.getActiveCalls().then((activeCalls) => {
          const call = _.find(activeCalls, (activeCall) => activeCall.id === this.ratelCall.id);
          if (call) {
            // TODO update call length
            // https://git.contactis.pl/itelo/profitelo-frontend/issues/421
          } else { // Call no longer exists, propagate call end
            this.stopLocalStream();
            this.stopTimer();
            this.setState(CallState.ENDED);
            this.events.onEnd.next();
          }
        });
      }
    });

    this.communicatorService.connectionEstablishedEvent$.subscribe(this.handleConnectionBack);
    this.communicatorService.connectionLostEvent$.subscribe(() => this.timer.pause());
  }

  private handleConnectionBack = (): void => {
    this.ratelCall.getMessages().then(callMsgs => {
      this.logger.debug('CurrentCall: handling connection back, call msgs', callMsgs);
      if (this.isMyCallPulled(callMsgs)) {
        this.logger.debug('CurrentCall: call was pulled on other device, stopping');
        this.stopLocalStream();
        this.stopTimer();
        this.setState(CallState.PENDING_ON_OTHER_DEVICE);
        this.events.onCallTaken.next();
      } else if (this.isClientOnline(callMsgs)) {
        this.logger.debug('CurrentCall: call was not pulled, client is online - resuming');
        // FIXME update the timer with all the events
        this.timer.resume();
        this.events.onParticipantOnline.next();
      } else {
        this.logger.debug('CurrentCall: call was not pulled but client is offline - propagating onParticipantOffline');
        this.events.onParticipantOffline.next(undefined);
      }
    });
  }

  private isCallMessageMine = (msg: RatelSdk.Message): boolean =>
    this.session.id === msg.userId

  private isCallMessageNotMine = (msg: RatelSdk.Message): boolean =>
    this.session.id !== msg.userId

  private isMyCallPulled = (callMsgs: RatelSdk.Message[]): boolean => {
    const myMessages = callMsgs.filter(this.isCallMessageMine);
    const reversed = myMessages.slice().reverse();

    for (const msg of reversed) {
      if (msg.tag === 'DEVICE_OFFLINE') {
        return false;
      } else if (msg.tag === 'CALL_TRANSFERRED') {
        return true;
      }
    }
    return false;
  }

  private onActiveDevice = (activeDevice: CallActiveDevice): void => {
    this.logger.debug('CurrentCall: received onActiveDevice, call was pulled on other device', activeDevice);
    this.stopLocalStream();
    this.stopTimer();
    this.setState(CallState.PENDING_ON_OTHER_DEVICE);
    this.events.onCallTaken.next(activeDevice);
  }

  private createTimer = (price: MoneyDto): TimerService =>
    this.timer = this.timerFactory.getInstance(
      price, Config.communicator.moneyChangeInterval)

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
