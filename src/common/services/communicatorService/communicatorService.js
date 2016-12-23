(function () {

  class SessionStorage {
    constructor() {
      this.clientSession = undefined
      this.expertSessions = {}
    }

    getClientSession() {
      return this.clientSession
    }

    setClientSession(session) {
      this.clientSession = session
    }

    addExpertSession(serviceId, session) {
      this.expertSessions[String(serviceId)] = session
    }

    findExpertSession(serviceId) {
      return this.expertSessions[String(serviceId)]
    }

    removeExpertSession(session) {
      delete this.expertSessions[String(session.id)]
    }
  }

  function service($log, $q, UtilsService, User, RatelApi, ProfileApi, ratelSdk, _, CommonConfig) {

    const commonConfig = CommonConfig.getAllData()

    const events = {
      onCall: 'onCall',
      onRoom: 'onRoom'
    }

    const ratelUrl = new URL(commonConfig.urls.communicator.ratel)
    const chatUrl = new URL(commonConfig.urls.communicator.chat)
    const resourceUrl = new URL(commonConfig.urls.communicator.resource)

    const chatConfig = {
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

    const callbacks = UtilsService.callbacksFactory(Object.keys(events))

    const ratelSessions = new SessionStorage()

    const createRatelConnection = (session, _service) => {

      const chat = session.chat

      chat.onBotUpdate(res =>
        $log.debug('Artichoke: onBotUpdate', res))

      chat.onCall(callInvitation =>
        callbacks.notify(events.onCall, {invitation: callInvitation, service: _service}))

      chat.onConnect(hello =>
        $log.debug('Artichoke: onConnect', session.id, hello))

      chat.onDisconnect(res =>
        $log.debug('Artichoke: onDisconnect', res))

      chat.onError(res =>
        $log.error('Artichoke: onError', res))

      chat.onHeartbeat(res =>
        $log.debug('Artichoke: onHeartBeat', res))

      chat.onStatusUpdate(presence =>
        $log.debug('Artichoke: onStatusUpdate', presence))

      chat.onRoom(roomInvitation =>
        callbacks.notify(events.onRoom, {invitation: roomInvitation, service: _service}))

      chat.connect()
    }

    const onCreateClientSession = (session) => {
      ratelSessions.setClientSession(session)
      createRatelConnection(session, null)
      $log.debug('Client session created', session)
    }

    const onCreateExpertSession = (session, service) => {
      ratelSessions.addExpertSession(service.id, session)
      createRatelConnection(session, service)
      $log.debug('Expert session created', session)
    }

    const onGetEmployersProfilesWithServices = (profilesWithServices) =>
      _.flatten(_.map(profilesWithServices, profile => profile.services))

    const getServices = (profileId) =>
      ProfileApi.getEmployersProfilesWithServices({profileId: profileId}).$promise
        .then(onGetEmployersProfilesWithServices)

    const onGetRatelClientAuthConfig = (clientConfig) =>
      ratelSdk.withSignedAuth(clientConfig.toJSON(), chatConfig)
        .then(onCreateClientSession)

    const authenticateClient = () =>
      RatelApi.getRatelAuthConfig().$promise
        .then(onGetRatelClientAuthConfig)

    const onGetRatelExpertAuthConfig = (expertConfig, service) =>
      ratelSdk.withSignedAuth(expertConfig, chatConfig)
        .then(session => onCreateExpertSession(session, service))

    const authenticateExpert = () =>
      getServices(User.getData('id')).then(services =>
        $q.all(_.map(services, service => RatelApi.getRatelAuthConfig({serviceId: service.id}).$promise
            .then(expertConfig =>onGetRatelExpertAuthConfig(expertConfig.toJSON(), service)))))

    const onAuthenticateError = (err) =>
      $log.error(err)

    const authenticate = () =>
      $q.all([
        authenticateClient(),
        authenticateExpert()
      ])
        .catch(onAuthenticateError)

    const api = {
      authenticate: authenticate,
      getClientSession: () => ratelSessions.getClientSession(),
      findExpertSession: (...args) => ratelSessions.findExpertSession(args)
    }

    return angular.extend(api, callbacks.methods)
  }

  angular.module('profitelo.services.communicator', [
    'c7s.ng.userAuth',
    'profitelo.swaggerResources',
    'profitelo.services.dialog-service',
    'commonConfig',
    'ratelSdk',
    'lodash',
    'profitelo.services.utils'
  ])
    .service('communicatorService', service)

}())
