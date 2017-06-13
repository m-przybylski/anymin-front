import {ServiceApi, RatelApi} from 'profitelo-api-ng/api/api';
import {CommunicatorService} from '../communicator.service';
import {CallbacksService} from '../../../services/callbacks/callbacks.service';
import {CallbacksFactory} from '../../../services/callbacks/callbacks.factory';
import * as RatelSdk from 'ratel-sdk-js';
import {CurrentClientCall} from '../models/current-client-call';
import {SoundsService} from '../../../services/sounds/sounds.service';
import {UserService} from '../../../services/user/user.service';
import {NavigatorWrapper} from '../../../classes/navigator-wrapper';
import {ModalsService} from '../../../services/modals/modals.service';
import {TimerFactory} from '../../../services/timer/timer.factory';
import {MediaStreamConstraintsWrapper} from '../../../classes/media-stream-constraints-wrapper';

export class ClientCallService {

  private navigatorWrapper = new NavigatorWrapper();

  private call?: ng.IPromise<CurrentClientCall>;
  private callbacks: CallbacksService;

  private static readonly events = {
    onNewCall: 'onNewCall',
  };

  /* @ngInject */
  constructor(private communicatorService: CommunicatorService,
              private $log: ng.ILogService,
              private timerFactory: TimerFactory,
              private ServiceApi: ServiceApi,
              private RatelApi: RatelApi,
              private soundsService: SoundsService,
              private userService: UserService,
              private modalsService: ModalsService,
              private callbacksFactory: CallbacksFactory,
              private $q: ng.IQService) {

    this.callbacks = callbacksFactory.getInstance(Object.keys(ClientCallService.events))
  }

  public onNewCall = (cb: (call: CurrentClientCall) => void): void => {
    this.callbacks.methods.onNewCall(cb);
  }

  public callServiceId = (serviceId: string, expertId?: string): ng.IPromise<CurrentClientCall> => {

    if (this.call) return this.$q.reject('There is a call already');

    if (!serviceId) return this.$q.reject('serviceId must be defined');

    if (!this.communicatorService.getClientSession()) return this.$q.reject('There is no client session');

    this.call = this.createCall(serviceId, expertId)
      .then(this.onCreateCallSuccess)
      .then(this.startCall)
      .catch(this.onStartCallError);

    return this.call;
  }

  private onStartCallError = (err: any): void => {
    this.call = undefined;
    this.onConsultationUnavailable()
    this.$log.error('ClientCallService: ' + err)
    throw new Error(err);
  }

  private startCall = (call: CurrentClientCall): ng.IPromise<CurrentClientCall> => {
    const deviceId = this.communicatorService.getClientDeviceId();
    if (!deviceId) throw new Error('There is no ratel deviceId');
    return this.RatelApi.postStartCallRoute(call.getId(), deviceId).then(() => call);
  }

  private onCreateCallSuccess = (call: CurrentClientCall): CurrentClientCall => {
    this.callbacks.notify(ClientCallService.events.onNewCall, call);
    this.soundsService.callConnectingSound().play();
    call.onRejected(this.onConsultationUnavailable);
    call.onEnd(() => this.onCallEnd(call.getService().id));
    call.onAnswered(this.onCallAnswered);
    this.communicatorService.onRoomInvitation((roomInvitation) => {
      if (roomInvitation.room.name === call.getId()) {
        call.setBusinessRoom(roomInvitation.room as RatelSdk.BusinessRoom).catch(this.$log.error)
      } else {
        this.$log.error('Received roomInvitation name does not match current callId');
      }
    })
    return call;
  }

  private createCall = (serviceId: string, expertId?: string): ng.IPromise<CurrentClientCall> =>
    this.ServiceApi.addServiceUsageRequestRoute(serviceId, {expertId: expertId})
      .then((sur) =>
        this.navigatorWrapper.getUserMediaStream(MediaStreamConstraintsWrapper.getDefault())
          .then((stream) =>
            this.userService.getUser().then(user =>
              this.createRatelCall(user.id, sur.expert.id, sur.service.id).then((call) =>
                new CurrentClientCall(this.$q, this.timerFactory, this.callbacksFactory, call, stream,
                  sur.service, this.soundsService, this.RatelApi, sur.expert))
            )
          )
      )

  private createRatelCall = (userId: string, expertId: string,
                             serviceId: string): ng.IPromise<RatelSdk.BusinessCall> => {

    const session = this.communicatorService.getClientSession();
    if (!session) throw new Error('There is no ratel session');

    const deviceId = this.communicatorService.getClientDeviceId();
    if (!deviceId) throw new Error('There is no ratel deviceId');

    return this.RatelApi.postCreateCallRoute({
      clientId: userId,
      expertId: expertId,
      serviceId: serviceId
    }, deviceId).then((call) => session.chat.getCall(call.callDetails.id))
  }

  private onConsultationUnavailable = (): void => {
    this.soundsService.callConnectingSound().stop()
    this.soundsService.playCallRejected()
    this.modalsService.createServiceUnavailableModal(() => {
      // TODO
      // https://git.contactis.pl/itelo/profitelo/issues/893
    }, () => {
      // Add mixpanel event integration
    });
  }

  private onCallEnd = (serviceId: string): void => {
    this.call = undefined;
    this.modalsService.createClientConsultationSummaryModal(serviceId)
    this.soundsService.callConnectingSound().stop()
    this.soundsService.playCallEnded()
  }

  private onCallAnswered = (): void => {
    this.soundsService.callConnectingSound().stop();
  }
}
