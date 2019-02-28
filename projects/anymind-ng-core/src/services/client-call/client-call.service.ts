import { RatelService, GetSUERatelCall } from '@anymind-ng/api';
import * as MachokeSDK from 'machoke-sdk';
import { Injectable, Optional } from '@angular/core';
import { ReplaySubject, Observable, Subject, merge } from 'rxjs';
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

@Injectable()
export class ClientCallService {
  protected static readonly events = {
    onNewCall: new ReplaySubject<CurrentClientCall>(1),
    callRemotelyHangup: new Subject<CallState>(),
    callOwnHangup: new Subject<CallState>(),
  };

  private navigatorWrapper: NavigatorWrapper;
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
    @Optional() navigatorWrapper: NavigatorWrapper,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('ClientCallService');
    this.communicatorService.connectionEstablishedEvent$.subscribe(connection => {
      this.connection = connection;
    });
    this.navigatorWrapper =
      (navigatorWrapper as NavigatorWrapper | null) === null
        ? new NavigatorWrapper()
        : (this.navigatorWrapper = navigatorWrapper);
  }

  public onCallRemotelyHangup(): Observable<CallState> {
    return ClientCallService.events.callRemotelyHangup;
  }

  public onCallOwnHangup(): Observable<CallState> {
    return ClientCallService.events.callOwnHangup;
  }

  public onNewCall(): Observable<CurrentClientCall> {
    return ClientCallService.events.onNewCall;
  }

  public isCallInProgress(): boolean {
    return typeof this.call !== 'undefined';
  }

  public callServiceId(
    serviceId: string,
    expertId: string,
    expertAccountId: string,
  ): Promise<CurrentClientCall | void> {
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

    this.call = this.createCall(serviceId, expertId, expertAccountId)
      .then(currentClientCall => this.onCreateCallSuccess(currentClientCall))
      .then(currentClientCall => this.startCall(currentClientCall))
      .catch(err => this.onStartCallError(err));

    return this.call;
  }

  public get hangup$(): Observable<void> {
    return this.hangupEvent;
  }

  public handleMyOwnHangup(call: CurrentClientCall): void {
    const callState = call.getState();
    this.hangupEvent.next();
    this.call = undefined;
    this.soundsService.playCallEnded();
    this.soundsService.callConnectingSound().stop();
    this.currentMediaTracks.forEach(track => track.stop());
    ClientCallService.events.callOwnHangup.next(callState);
    this.logger.debug('Call ended with callState: ', callState);
  }

  private createCall(serviceId: string, expertId: string, expertAccountId: string): Promise<CurrentClientCall> {
    return this.navigatorWrapper.getUserMediaStream(NavigatorWrapper.getAllConstraints()).then(
      stream => {
        this.currentMediaTracks = [...this.currentMediaTracks, ...stream.getTracks()];

        this.currentMediaTracks.filter(track => track.kind === 'video').forEach(track => (track.enabled = false));

        return this.createRatelCall(expertId, serviceId).then(sueRatelCall =>
          this.getRatelCallById(sueRatelCall.callDetails.id, expertAccountId, stream.getTracks()).then(ratelCall =>
            this.callFactory.createClientCall(sueRatelCall.expert, ratelCall, sueRatelCall, stream.getTracks()),
          ),
        );
      },
      err => this.handleMediaStreamError(err),
    );
  }

  private handleMediaStreamError(err: { code: number; message: string; name: string }): Promise<any> {
    this.logger.warn('ClientCallService: get media error', err);
    switch (err.name) {
      case 'NotFoundError':
        this.alertService.pushDangerAlert('ALERT.MISSING_CAMERA_PERMISSION');
        break;
      default:
        this.alertService.pushDangerAlert('ALERT.CANNOT_ACCESS_CAMERA');
    }

    return Promise.reject(err);
  }

  private createRatelCall(expertId: string, serviceId: string): Promise<GetSUERatelCall> {
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
  }

  private getRatelCallById(
    ratelCallId: string,
    peerId: string,
    tracks: ReadonlyArray<MediaStreamTrack>,
  ): Promise<MachokeSDK.BusinessCall> {
    if (!this.connection) {
      throw new Error('There is no ratel session');
    }

    return this.connection.session.machoke.getPrestartedCall(ratelCallId, peerId, tracks) as Promise<
      MachokeSDK.BusinessCall
    >;
  }

  private onCreateCallSuccess(call: CurrentClientCall): CurrentClientCall {
    const joinRoom = this.onRoomInvitation(call);
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
        takeUntil(merge(call.callDestroyed$, this.hangup$)),
      )
      .subscribe(joinRoom);

    return call;
  }

  private onRoomInvitation(call: CurrentClientCall): ((roomInvitationWithSession: IRoomInvitation) => void) {
    return (roomInvitationWithSession): Promise<void> => {
      if (this.connection === undefined) {
        return Promise.reject('No connection');
      }

      // FIXME check invitation ID
      return this.connection.session.machoke
        .getRoom(roomInvitationWithSession.roomInvitation.roomId)
        .then(room =>
          call.joinRoom(room as MachokeSDK.BusinessRoom).catch(err => {
            this.logger.error(err);
          }),
        )
        .catch(er => this.logger.error('Could not get room for received invitation', er));
    };
  }

  private startCall(call: CurrentClientCall): Promise<CurrentClientCall> {
    const deviceId = this.getDeviceId();

    return this.ratelService
      .postStartCallRoute(call.getSueId(), deviceId, undefined)
      .toPromise()
      .then(() => call);
  }

  // tslint:disable-next-line:no-any
  private onStartCallError(err: any): void {
    this.logger.warn('onStartCallError err: ', err);
    this.call = undefined;
    this.soundsService.callConnectingSound().stop();
    this.soundsService.playCallRejected();
    this.currentMediaTracks.forEach(track => track.stop());
    throw new Error(err.error.code);
  }

  private onCallDestroyedRemotely(call: CurrentClientCall): void {
    this.call = undefined;
    this.currentMediaTracks.forEach(track => track.stop());
    const callState = call.getState();
    this.logger.debug(`ClientCallService: finalizing call, reason: ${CallState[callState]}`);
    ClientCallService.events.callRemotelyHangup.next(callState);
  }

  private onCallAnswered(): void {
    this.soundsService.callConnectingSound().stop();
  }

  private getDeviceId(): string {
    if (!this.connection) {
      this.alertService.pushDangerAlert('ALERT.SOMETHING_WENT_WRONG');
      this.logger.error('There is no deviceId');
      window.location.reload(true);
      throw new Error('There is no deviceId');
    } else {
      return this.connection.hello.deviceId;
    }
  }
}
