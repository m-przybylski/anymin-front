namespace profitelo.services.communicator {

  import ICallbacksFactory = profitelo.services.callbacks.ICallbacksFactory
  import ICallbacksService = profitelo.services.callbacks.ICallbacksService
  import IProfileApi = profitelo.api.IProfileApi
  import GetProfileWithServices = profitelo.api.GetProfileWithServices
  import IRatelApi = profitelo.api.IRatelApi
  import SignedAgent = profitelo.api.SignedAgent
  import GetService = profitelo.api.GetService

  export interface IConsultationInvitation {
    invitation: any
    service: GetService
  }

  export interface ICommunicatorService {
    authenticate(): ng.IPromise<any>
    getClientSession(): any
    findExpertSession(serviceId: string): any
    onCall(callback: (callInvitation: IConsultationInvitation) => void): void
    onRoom(callback: (roomInvitation: IConsultationInvitation) => void): void
  }

  class SessionStorage {

    // TODO: add types
    clientSession: any
    expertSessions: any

    constructor() {
      this.clientSession = null
      this.expertSessions = {}
    }

    getClientSession = () => {
      return this.clientSession
    }

    setClientSession = (session: any) => {
      this.clientSession = session
    }

    addExpertSession = (serviceId: string, session: any) => {
      this.expertSessions[String(serviceId)] = session
    }

    findExpertSession = (serviceId: string) => {
      return this.expertSessions[String(serviceId)]
    }

    removeExpertSession = (session: any) => {
      delete this.expertSessions[String(session.id)]
    }
  }

  class CommunicatorService implements ICommunicatorService {

    private commonConfig: any
    private chatConfig: any
    private callbacks: ICallbacksService
    private ratelSessions: SessionStorage

    private static events = {
      onCall: 'onCall',
      onRoom: 'onRoom'
    }

    constructor(private $log: ng.ILogService, private $q: ng.IQService, callbacksFactory: ICallbacksFactory,
                private User: any, private RatelApi: IRatelApi, private ProfileApi: IProfileApi, private ratelSdk: any,
                CommonConfig: ICommonConfig, private lodash: _.LoDashStatic) {

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
      return this.getServices(this.User.getData('id'))
      .then((services) =>
        this.$q.all(this.lodash.map(services, service =>
          this.RatelApi.getRatelAuthConfigRoute(service.id).then(
            (expertConfig) => this.onGetRatelExpertAuthConfig(expertConfig, service)))))
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

  angular.module('profitelo.services.communicator', [
    'c7s.ng.userAuth',
    'profitelo.api.RatelApi',
    'profitelo.api.ProfileApi',
    'profitelo.services.dialog',
    'commonConfig',
    'ratelSdk',
    'ngLodash',
    'profitelo.services.callbacks'
  ])
  .service('communicatorService', CommunicatorService)
}
