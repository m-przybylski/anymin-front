module profitelo.services.communicator {

  export interface IConsultationInvitation {
    invitation: any
    service: Service
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
    clientSession: Object
    expertSessions: Object

    constructor() {
      this.clientSession = undefined
      this.expertSessions = {}
    }

    getClientSession = () => {
      return this.clientSession
    }

    setClientSession = (session) => {
      this.clientSession = session
    }

    addExpertSession = (serviceId, session) => {
      this.expertSessions[String(serviceId)] = session
    }

    findExpertSession = (serviceId: string) => {
      return this.expertSessions[String(serviceId)]
    }

    removeExpertSession = (session) => {
      delete this.expertSessions[String(session.id)]
    }
  }

  class CommunicatorService implements ICommunicatorService {

    private commonConfig: any
    private chatConfig
    private callbacks: any
    private ratelSessions: SessionStorage

    private static events = {
      onCall: 'onCall',
      onRoom: 'onRoom'
    }

    constructor(private $log: ng.ILogService, private $q: ng.IQService, private utilsService, private User,
                private RatelApi, private ProfileApi, private ratelSdk, private CommonConfig: ICommonConfig,
                private lodash: _.LoDashStatic) {
      this.commonConfig = CommonConfig.getAllData()
      this.ratelSessions = new SessionStorage()
      this.callbacks = utilsService.callbacksFactory(Object.keys(CommunicatorService.events))
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

    private createRatelConnection = (session, _service) => {

      const chat = session.chat

      chat.onBotUpdate(res =>
        this.$log.debug('Artichoke: onBotUpdate', res))

      chat.onCall(callInvitation =>
        this.callbacks.notify(CommunicatorService.events.onCall, {invitation: callInvitation, service: _service}))

      chat.onConnect(hello =>
        this.$log.debug('Artichoke: onConnect', session.id, hello))

      chat.onDisconnect(res =>
        this.$log.debug('Artichoke: onDisconnect', res))

      chat.onError(res =>
        this.$log.error('Artichoke: onError', res))

      chat.onHeartbeat(res =>
        this.$log.debug('Artichoke: onHeartBeat', res))

      chat.onStatusUpdate(presence =>
        this.$log.debug('Artichoke: onStatusUpdate', presence))

      chat.onRoom(roomInvitation =>
        this.callbacks.notify(CommunicatorService.events.onRoom, {invitation: roomInvitation, service: _service}))

      chat.connect()
    }

    private onCreateClientSession = (session) => {
      this.ratelSessions.setClientSession(session)
      this.createRatelConnection(session, null)
      this.$log.debug('Client session created', session)
    }

    private onCreateExpertSession = (session, service) => {
      this.ratelSessions.addExpertSession(service.id, session)
      this.createRatelConnection(session, service)
      this.$log.debug('Expert session created', session)
    }

    private onGetEmployersProfilesWithServices = (profilesWithServices) => {
      return this.lodash.flatten(this.lodash.map(profilesWithServices, (profile: any) => profile.services))
    }

    private getServices = (profileId) => {
      return this.ProfileApi.getEmployersProfilesWithServices({profileId: profileId}).$promise
      .then(this.onGetEmployersProfilesWithServices)
    }

    private onGetRatelClientAuthConfig = (clientConfig) => {
      return this.ratelSdk.withSignedAuth(clientConfig.toJSON(), this.chatConfig)
      .then(this.onCreateClientSession)
    }

    private authenticateClient = () => {
      return this.RatelApi.getRatelAuthConfig().$promise
      .then(this.onGetRatelClientAuthConfig)
    }

    private onGetRatelExpertAuthConfig = (expertConfig, service) => {
      return this.ratelSdk.withSignedAuth(expertConfig, this.chatConfig)
      .then(session => this.onCreateExpertSession(session, service))
    }

    private authenticateExpert = () => {
      return this.getServices(this.User.getData('id'))
      .then((services: Array<Service>) =>
        this.$q.all(this.lodash.map(services, service =>
          this.RatelApi.getRatelAuthConfig({serviceId: service.id}).$promise.then(
            expertConfig => this.onGetRatelExpertAuthConfig(expertConfig.toJSON(), service)))))
    }

    private onAuthenticateError = (err) => {
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
    'profitelo.swaggerResources',
    'profitelo.services.dialog',
    'commonConfig',
    'ratelSdk',
    'ngLodash',
    'profitelo.services.utils'
  ])
  .service('communicatorService', CommunicatorService)
}
