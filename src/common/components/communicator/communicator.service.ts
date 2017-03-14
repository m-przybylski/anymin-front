import {RatelApi, ProfileApi} from "profitelo-api-ng/api/api"
import {SignedAgent, GetService, GetProfileWithServices} from "profitelo-api-ng/model/models"
import {SessionStorage} from "./session-storage"
import {CallbacksService} from "../../services/callbacks/callbacks.service"
import {CallbacksFactory} from "../../services/callbacks/callbacks.factory"
import {UserService} from "../../services/user/user.service"
import {CommonConfig} from "../../../../generated_modules/common-config/common-config"

export interface IConsultationInvitation {
  invitation: any
  service: GetService
}

export class CommunicatorService {

  private commonConfig: any
  private chatConfig: any
  private callbacks: CallbacksService
  private ratelSessions: SessionStorage

  private static events = {
    onCall: 'onCall',
    onRoom: 'onRoom'
  }

  /* @ngInject */
  constructor(private $log: ng.ILogService, private $q: ng.IQService, callbacksFactory: CallbacksFactory,
              private userService: UserService, private RatelApi: RatelApi, private ProfileApi: ProfileApi,
               CommonConfig: CommonConfig, private lodash: _.LoDashStatic, private ratelSdk: any) {

    this.commonConfig = CommonConfig.getAllData()
    this.ratelSessions = new SessionStorage()
    this.callbacks = callbacksFactory.getInstance(Object.keys(CommunicatorService.events))
    this.setChatConfig()
  }

  private setChatConfig = () => {
    const ratelUrl = new URL(this.commonConfig.urls.communicator.ratel)
    const chatUrl = new URL(this.commonConfig.urls.communicator.chat)
    const resourceUrl = new URL(this.commonConfig.urls.communicator.resource)
    this.chatConfig = {
      debug: true,
      ratel: {
        protocol: ratelUrl.protocol,
        hostname: ratelUrl.hostname,
        port: ratelUrl.port,
      },
      chat: {
        protocol: chatUrl.protocol,
        hostname: chatUrl.hostname,
        port: chatUrl.port,
        rtc: {
          iceTransportPolicy: "relay",
          iceServers: [{
            urls: ["stun:turn.ratel.im:5349", "turn:turn.ratel.im:5349"],
            username: "test123",
            credential: "test456"
          }]
        }
      },
      resource: {
        protocol: resourceUrl.protocol,
        hostname: resourceUrl.hostname,
        port: resourceUrl.port
      }
    }
  }

  private createRatelConnection = (session: any, _service: GetService | null) => {

    const chat = session.chat

    chat.onBotUpdate((res: any) =>
      this.$log.debug('Artichoke: onBotUpdate', res))

    chat.onCall((callInvitation: any) =>
      this.callbacks.notify(CommunicatorService.events.onCall, {invitation: callInvitation, service: _service}))

    chat.onConnect((hello: any) =>
      this.$log.debug('Artichoke: onConnect', session.id, hello))

    chat.onDisconnect((res: any) =>
      this.$log.debug('Artichoke: onDisconnect', res))

    chat.onError((res: any) =>
      this.$log.error('Artichoke: onError', res))

    chat.onHeartbeat((res: any) =>
      this.$log.debug('Artichoke: onHeartBeat', res))

    chat.onStatusUpdate((presence: any) =>
      this.$log.debug('Artichoke: onStatusUpdate', presence))

    chat.onRoom((roomInvitation: any) =>
      this.callbacks.notify(CommunicatorService.events.onRoom, {invitation: roomInvitation, service: _service}))

    chat.connect()
  }

  private onCreateClientSession = (session: any) => {
    this.ratelSessions.setClientSession(session)
    this.createRatelConnection(session, null)
    this.$log.debug('Client session created', session)
  }

  private onCreateExpertSession = (session: any, service: GetService) => {
    this.ratelSessions.addExpertSession(service.id, session)
    this.createRatelConnection(session, service)
    this.$log.debug('Expert session created', session)
  }

  private onGetEmployersProfilesWithServices = (profilesWithServices: Array<GetProfileWithServices>) => {
    return this.lodash.flatten(this.lodash.map(profilesWithServices, profile => profile.services))
  }

  private getServices = (profileId: string) => {
    return this.ProfileApi.getEmployersProfilesWithServicesRoute(profileId)
      .then((response) => this.onGetEmployersProfilesWithServices(response))
  }

  private onGetRatelClientAuthConfig = (clientConfig: SignedAgent) => {
    return this.ratelSdk.withSignedAuth(clientConfig, this.chatConfig)
      .then(this.onCreateClientSession)
  }

  private authenticateClient = () => {
    return this.RatelApi.getRatelAuthConfigRoute()
      .then(this.onGetRatelClientAuthConfig)
  }

  private onGetRatelExpertAuthConfig = (expertConfig: SignedAgent, service: GetService) => {
    return this.ratelSdk.withSignedAuth(expertConfig, this.chatConfig)
      .then((session: any) => this.onCreateExpertSession(session, service))
  }

  private authenticateExpert = () => {
    this.userService.getUser().then(user => {
      return this.getServices(user.id)
        .then((services) =>
          this.$q.all(this.lodash.map(services, service =>
            this.RatelApi.getRatelAuthConfigRoute(service.id).then(
              (expertConfig) => this.onGetRatelExpertAuthConfig(expertConfig, service)))))
    })
  }

  private onAuthenticateError = (err: any) => {
    this.$log.error(err)
  }

  public authenticate = (): ng.IPromise<any> => {
    return this.$q.all([
      this.authenticateClient(),
      this.authenticateExpert()
    ])
      .catch(this.onAuthenticateError)
  }

  public getClientSession = () => {
    return this.ratelSessions.getClientSession()
  }

  public findExpertSession = (serviceId: string) => {
    return this.ratelSessions.findExpertSession(serviceId)
  }

  public onCall = (callback: (callInvitation: IConsultationInvitation) => void) => {
    this.callbacks.methods.onCall(callback)
  }

  public onRoom = (callback: (callInvitation: IConsultationInvitation) => void) => {
    this.callbacks.methods.onRoom(callback)
  }
}
