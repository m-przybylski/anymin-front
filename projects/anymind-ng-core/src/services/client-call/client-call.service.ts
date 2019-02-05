import { RatelService, GetSUERatelCall } from '@anymind-ng/api';
import * as MachokeSDK from 'machoke-sdk';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, Subject } from 'rxjs';
import { CurrentClientCall } from '../call/current-client-call';
import { NavigatorWrapper } from '../models/navigator-wrapper';
import { CommunicatorService, IConnected, IRoomInvitation } from '../communicator.service';
import { LoggerService } from '../logger.service';
import { CallFactory } from '../call.factory';
import { SoundsService } from '../sounds.service';
import { AlertService } from '../alert/alert.service';
import { LoggerFactory } from '../../factories/logger.factory';
import { take, takeUntil } from 'rxjs/operators';
import { CallState } from '../call/current-call';

// tslint:disable:max-file-line-count

@Injectable()
export class ClientCallService {
  protected static readonly events = {
    onNewCall: new ReplaySubject<CurrentClientCall>(1),
    callRemotelyHangup: new Subject<CallState>(),
    callOwnHangup: new Subject<CallState>(),
  };

  private navigatorWrapper = new NavigatorWrapper();
  private call?: Promise<CurrentClientCall | void>;
  private currentMediaTracks: ReadonlyArray<MediaStreamTrack> = [];
  private connection?: IConnected;
  private hangupEvent = new Subject<void>();
  private logger: LoggerService;

  constructor(
    private communicatorService: CommunicatorService,
    private callFactory: CallFactory,
    private soundsService: SoundsService,
    private ratelService: RatelService,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('ClientCallService');
    this.communicatorService.connectionEstablishedEvent$.subscribe(connection => (this.connection = connection));
  }

  public getConnection = (): IConnected | undefined => this.connection;

  public onCallRemotelyHangup = (): Observable<CallState> => ClientCallService.events.callRemotelyHangup;

  public onCallOwnHangup = (): Observable<CallState> => ClientCallService.events.callOwnHangup;

  public onNewCall = (): Observable<CurrentClientCall> => ClientCallService.events.onNewCall;

  public isCallInProgress = (): boolean => typeof this.call !== 'undefined';

  public callServiceId = (serviceId: string, expertId: string): Promise<CurrentClientCall | void> => {
    if (this.call) {
      this.logger.error('Cannot start a call, there is one already');

      return Promise.reject('There is a call already');
    }

    if (!serviceId) {
      return Promise.reject('serviceId must be defined');
    }

    if (!this.connection) {
      return Promise.reject('There is no client session');
    }
    this.call = this.createCall(serviceId, expertId)
      .then(this.onCreateCallSuccess)
      .then(this.startCall)
      .catch(this.onStartCallError);

    return this.call;
  };

  public get hangup$(): Observable<void> {
    return this.hangupEvent;
  }

  public handleMyOwnHangup = (call: CurrentClientCall): void => {
    const callState = call.getState();
    this.hangupEvent.next();
    this.call = undefined;
    this.soundsService.playCallEnded();
    this.soundsService.callConnectingSound().stop();
    this.currentMediaTracks.forEach(track => track.stop());
    ClientCallService.events.callOwnHangup.next(callState);
    this.logger.debug('Call ended with callState: ', callState);
  };

  private createCall = (serviceId: string, expertId: string): Promise<CurrentClientCall> =>
    this.navigatorWrapper.getUserMediaStream(NavigatorWrapper.getAllConstraints()).then(stream => {
      this.currentMediaTracks = [...this.currentMediaTracks, ...stream.getTracks()];

      this.currentMediaTracks.filter(track => track.kind === 'video').forEach(track => (track.enabled = false));

      return this.createRatelCall(expertId, serviceId).then(sueRatelCall =>
        this.getRatelCallById(sueRatelCall.callDetails.id, expertId, stream.getTracks()).then(ratelCall =>
          this.callFactory.createClientCall(sueRatelCall.expert, ratelCall, sueRatelCall, stream.getTracks()),
        ),
      );
    }, this.handleMediaStreamError);

  private handleMediaStreamError = (err: { code: number; message: string; name: string }): Promise<any> => {
    this.logger.warn('ClientCallService: get media error', err);
    switch (err.name) {
      case 'NotFoundError':
        this.alertService.pushDangerAlert('ALERT.MISSING_CAMERA_PERMISSION');
        break;
      default:
        this.alertService.pushDangerAlert('ALERT.CANNOT_ACCESS_CAMERA');
    }

    return Promise.reject(err);
  };

  private createRatelCall = (expertId: string, serviceId: string): Promise<GetSUERatelCall> => {
    const deviceId = this.getDeviceId();

    return this.ratelService
      .postCreateCallRoute(
        {
          expertId,
          serviceId,
        },
        deviceId,
        undefined,
      )
      .toPromise();
  };

  private getRatelCallById = (
    ratelCallId: string,
    peerId: string,
    tracks: ReadonlyArray<MediaStreamTrack>,
  ): Promise<MachokeSDK.BusinessCall> => {
    if (!this.connection) {
      throw new Error('There is no ratel session');
    }

    return (
      this.connection.session.machoke
        .getPrestartedCall(ratelCallId, peerId, tracks)
        // tslint:disable-next-line:no-angle-bracket-type-assertion
        .then(call => <MachokeSDK.BusinessCall>call)
    );
  };

  private onCreateCallSuccess = (call: CurrentClientCall): CurrentClientCall => {
    ClientCallService.events.onNewCall.next(call);
    this.soundsService.callConnectingSound().play();
    call.callDestroyed$.subscribe(() => this.onCallDestroyedRemotely(call));
    call.answered$
      .pipe(
        take(1),
        takeUntil(call.callDestroyed$),
      )
      .subscribe(() => this.onCallAnswered());
    this.communicatorService.roomInvitationEvent$
      .pipe(
        take(1),
        takeUntil(call.callDestroyed$),
        takeUntil(this.hangup$),
      )
      .subscribe(this.onRoomInvitation(call));

    return call;
  };

  private onRoomInvitation = (call: CurrentClientCall): ((roomInvitationWithSession: IRoomInvitation) => void) => (
    roomInvitationWithSession,
  ): void => {
    // FIXME check invitation ID
    roomInvitationWithSession.session.machoke
      .getRoom(roomInvitationWithSession.roomInvitation.roomId)
      .then(room => {
        call.joinRoom(room as MachokeSDK.BusinessRoom).catch(this.logger.error.bind(this));
      })
      .catch(er => this.logger.error('Could not get room for received invitation', er));
  };

  private startCall = (call: CurrentClientCall): Promise<CurrentClientCall> => {
    const deviceId = this.getDeviceId();

    return this.ratelService
      .postStartCallRoute(call.getSueId(), deviceId, undefined)
      .toPromise()
      .then(() => call);
  };

  // tslint:disable-next-line:no-any
  private onStartCallError = (err: any): void => {
    this.logger.warn('onStartCallError err: ', err);
    this.call = undefined;
    this.soundsService.callConnectingSound().stop();
    this.soundsService.playCallRejected();
    this.currentMediaTracks.forEach(track => track.stop());
    throw new Error(err.error.code);
  };

  private onCallDestroyedRemotely = (call: CurrentClientCall): void => {
    this.call = undefined;
    this.currentMediaTracks.forEach(track => track.stop());
    const callState = call.getState();
    this.logger.debug(`ClientCallService: finalizing call, reason: ${CallState[callState]}`);
    ClientCallService.events.callRemotelyHangup.next(callState);
  };

  private onCallAnswered = (): void => {
    this.soundsService.callConnectingSound().stop();
  };

  private getDeviceId = (): string => {
    if (!this.connection) {
      this.alertService.pushDangerAlert('ALERT.SOMETHING_WENT_WRONG');
      this.logger.error('There is no deviceId');
      window.location.reload(true);
      throw new Error('There is no deviceId');
    } else {
      return this.connection.hello.deviceId;
    }
  };
}
