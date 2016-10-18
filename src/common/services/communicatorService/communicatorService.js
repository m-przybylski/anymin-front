(function () {

  class SessionStorage {
    constructor() {
      this._client = undefined
      this._expert = {}
    }

    getClientSession() {
      return this._client
    }

    setClientSession(v) {
      this._client = v
    }

    addExpertSession(v) {
      this._expert[String(v.id)] = v
    }

    removeExpertSession(v) {
      delete this._expert[String(v.id)]
    }
  }

  function service($log, $q, UtilsService, User, RatelApi, ServiceApi, ratelSdk) {

    const events = {
      onCall: 'onCall',
      onRoom: 'onRoom',
    }

    const callbacks = UtilsService.callbacksFactory(Object.keys(events))

    /*function authenticate(config) {
      return ratelSdk.withSignedAuth(config).then(ratelSession => new Session(ratelSession))
    }*/

    const ratelSessions = new SessionStorage()

    const _createRatelConnection = (session, service) => {

      const chat = session.chat

      chat.onError(message => {
        $log.debug('WS onError', message)
      })

      chat.onConnect(hello => {
        $log.debug(session.id + ' Connected to artichoke!')
        $log.debug('hello', hello)
      })

      chat.onStatusChange(presence => {
        $log.info('ratel user ' + presence.user + ' is ' + presence.status)
      })

      /*chat.onRoom(roomInvitation => {
        ratelSessions.currentSession.room = roomInvitation.room
        ratelSessions.currentSession.room.onMessage(message => {
          callbacks.notify(events.onNewMessage, message)
        })
        ratelSessions.currentSession.room.getHistory().then(history => callbacks.notify(events.onRoomHistory, history))
        callbacks.notify(events.onDirectRoom, ratelSessions.currentSession)
      })*/

      chat.onCall(callInvitation =>
        callbacks.notify(events.onCall, {invitation: callInvitation, service: service}))

      chat.connect()
    }

    const _authenticate = () => {
      const _ratelRegisterConfigs = []

      return $q.all([
        RatelApi.getRatelAuthConfig().$promise,
        ServiceApi.getProfileServices({accountId: User.getData('id')}).$promise
      ]).then(configs => {
        const [clientConfig, services] = configs.map(x => JSON.parse(angular.toJson(x)))

        // register as a client
        _ratelRegisterConfigs.push(
          ratelSdk.withSignedAuth(clientConfig).then(session => {
            ratelSessions.setClientSession(session)

            console.log(ratelSessions.getClientSession())
            _createRatelConnection(session, null)
          })
        )

        // and as an expert for all services
        services.forEach(service => {
          _ratelRegisterConfigs.push(
            RatelApi.getRatelAuthConfig({serviceId: service.id}).$promise.then(expertConfig => {
              return ratelSdk.withSignedAuth(expertConfig).then(session => {
                ratelSessions.addExpertSession(session)
                _createRatelConnection(session, service)
              })
            })
          )
        })

        return $q.all(_ratelRegisterConfigs)
      })
    }

    const api = {
      authenticate: _authenticate,
      getClientSession: () => ratelSessions.getClientSession()
    }

    return angular.extend(api, callbacks.methods)
  }

  angular.module('profitelo.services.communicatorService', [
    'c7s.ng.userAuth',
    'profitelo.swaggerResources',
    'profitelo.services.dialog-service',
    'ratelSdk',
    'profitelo.services.utils'
  ])
    .service('communicatorService', service)

}())
