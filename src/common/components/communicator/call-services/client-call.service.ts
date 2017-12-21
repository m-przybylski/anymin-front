import {ServiceApi, RatelApi} from 'profitelo-api-ng/api/api';
import {GetSUERatelCall} from 'profitelo-api-ng/model/models';
import {CommunicatorService} from '../communicator.service';
import * as RatelSdk from 'ratel-sdk-js';
import {CurrentClientCall} from '../models/current-client-call';
import {SoundsService} from '../../../services/sounds/sounds.service';
import {NavigatorWrapper} from '../../../classes/navigator-wrapper';
import {ModalsService} from '../../../services/modals/modals.service';
import {TimerFactory} from '../../../services/timer/timer.factory';
import {MediaStreamConstraintsWrapper} from '../../../classes/media-stream-constraints-wrapper';
import {ProfiteloWebsocketService} from '../../../services/profitelo-websocket/profitelo-websocket.service'
import {CallState} from '../models/current-call'
import {Subject} from 'rxjs/Subject'
import {Subscription} from 'rxjs/Subscription'
import {MicrophoneService} from '../microphone-service/microphone.service'

export class ClientCallService {

  private navigatorWrapper = new NavigatorWrapper();

  private call?: ng.IPromise<void | CurrentClientCall>;

  private readonly onNewCallSubject = new Subject<CurrentClientCall>()

  /* @ngInject */
  constructor(private communicatorService: CommunicatorService,
              private $log: ng.ILogService,
              private timerFactory: TimerFactory,
              private ServiceApi: ServiceApi,
              private RatelApi: RatelApi,
              private soundsService: SoundsService,
              private modalsService: ModalsService,
              private $q: ng.IQService,
              private profiteloWebsocket: ProfiteloWebsocketService,
              private microphoneService: MicrophoneService) {
  }

  public onNewCall = (cb: (call: CurrentClientCall) => void): Subscription =>
    this.onNewCallSubject.subscribe(cb);

  public callServiceId = (serviceId: string, expertId?: string): ng.IPromise<void | CurrentClientCall> => {
    if (this.call) return this.$q.reject('There is a call already');

    if (!serviceId) return this.$q.reject('serviceId must be defined');

    if (!this.communicatorService.getClientSession()) return this.$q.reject('There is no client session');

    this.call = this.createCall(serviceId, expertId)
    .then(this.onCreateCallSuccess)
    .then(this.startCall)
    .catch(this.onStartCallError)

    return this.call;
  }

  public onOneMinuteLeftWarning = (callback: () => void): Subscription =>
    this.profiteloWebsocket.onOneMinuteLeftWarning(callback)

  public onNewFinancialOperation = (callback: (data: any) => void): Subscription =>
    this.profiteloWebsocket.onNewFinancialOperation(callback)

  private onSuspendedCallEnd = (serviceId: string): void => {
    this.modalsService.createClientConsultationSummaryModal(serviceId)
    this.call = undefined
    this.soundsService.callConnectingSound().stop()
    this.soundsService.playCallEnded()
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
    return this.RatelApi.postStartCallRoute(call.getSueId(), deviceId).then(() => call);
  }

  private onCreateCallSuccess = (call: CurrentClientCall): CurrentClientCall => {
    this.onNewCallSubject.next(call);
    this.soundsService.callConnectingSound().play();
    call.onRejected(this.onConsultationUnavailable);
    call.onEnd(() => this.onCallEnd(call.getService().id));
    call.onAnswered(this.onCallAnswered);
    call.onSuspendedCallEnd(() => {
      this.onSuspendedCallEnd(call.getService().id)
    })
    this.communicatorService.onRoomInvitation((roomInvitation) => {
      if (roomInvitation.room.name === call.getRatelCallId() && !call.getMessageRoom().room) {
        call.setBusinessRoom(roomInvitation.room as RatelSdk.BusinessRoom).catch(this.$log.error)
      } else {
        this.$log.error('Received roomInvitation name does not match current callId or room already exist');
      }
    })
    return call;
  }

  private createCall = (serviceId: string, expertId?: string): ng.IPromise<CurrentClientCall> =>
    this.ServiceApi.postServiceUsageRequestRoute(serviceId, {expertId})
    .then((sur) =>
      this.getUserMediaStream()
      .then((stream) =>
        this.createRatelCall(sur.expert.id, sur.service.id).then((sueRatelCall) =>
          this.getRatelCallById(sueRatelCall.callDetails.id).then(ratelCall =>
            new CurrentClientCall(this.timerFactory, ratelCall, stream,
              sur.service, sueRatelCall.sue, this.soundsService, this.RatelApi,
              this.communicatorService, this.microphoneService, sur.expert)))
      )
    )

  private createRatelCall = (expertId: string,
                             serviceId: string): ng.IPromise<GetSUERatelCall> => {

    const deviceId = this.communicatorService.getClientDeviceId();
    if (!deviceId) throw new Error('There is no ratel deviceId');

    return this.RatelApi.postCreateCallRoute({
      expertId,
      serviceId
    }, deviceId)
  }

  private getUserMediaStream = (): ng.IPromise<MediaStream> => {
    const defer = this.$q.defer<MediaStream>();
    this.navigatorWrapper.getUserMediaStream(MediaStreamConstraintsWrapper.getDefault())
      .then(defer.resolve, defer.reject)
    return defer.promise
  }

  private getRatelCallById = (ratelCallId: string): ng.IPromise<RatelSdk.BusinessCall> => {
    const session = this.communicatorService.getClientSession();
    if (!session) throw new Error('There is no ratel session');
    const defer = this.$q.defer<RatelSdk.BusinessCall>();
    session.chat.getCall(ratelCallId).then(call => defer.resolve(<RatelSdk.BusinessCall>call), defer.reject)
    return defer.promise
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
    this.call = undefined;
  }

  private onCallEnd = (serviceId: string): void => {
    if (this.call)
      this.call
      .then((call) => {
        if (call && call.getState() !== CallState.CANCELLED)
          this.modalsService.createClientConsultationSummaryModal(serviceId)
      })
      .finally(() => {
        this.call = undefined
        this.soundsService.callConnectingSound().stop()
        this.soundsService.playCallEnded()
      })
    else
      this.$log.error('Call does not exist')
  }

  private onCallAnswered = (): void => {
    this.soundsService.callConnectingSound().stop()
  }
}
