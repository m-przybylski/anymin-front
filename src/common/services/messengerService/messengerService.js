(function() {

  function service(UtilsService, communicatorService) {

    const events = {
    }

    const callbacks = UtilsService.callbacksFactory(Object.keys(events))

    /*
    const _createRatelConnection = (session, _service) => {

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

      chat.onRoom(roomInvitation => {
       ratelSessions.currentSession.room = roomInvitation.room
       ratelSessions.currentSession.room.onMessage(message => {
       callbacks.notify(events.onNewMessage, message)
       })
       ratelSessions.currentSession.room.getHistory().then(history => callbacks.notify(events.onRoomHistory, history))
       callbacks.notify(events.onDirectRoom, ratelSessions.currentSession)
       })

      chat.onCall(callInvitation =>
        callbacks.notify(events.onCall, {invitation: callInvitation, service: _service}))

      chat.connect()
    }
    */

    /*
    const _startCall = (_serviceId) => {

      return ServiceApi.addServiceUsageRequest({serviceId: _serviceId}).$promise.then(config => {
        const session = communicatorService.getClientSession()

        session.chat.createDirectCall(config.ratelId).then(_call => {

          _call.onJoined(callJoined => {
            $log.debug(callJoined.user + ' answered the call!')
            callbacks.notify(events.onCallStarted, call)
          })
          _call.onLeft(_ => {
            _onClientHangup()
          })
        })

        /!*session.chat.createDirectRoom(config.ratelId).then(room => {
         session.room = room
         session.room.onMessage(message => {
         callbacks.notify(events.onNewMessage, message)
         })
         session.room.getHistory().then(history => callbacks.notify(events.onRoomHistory, history))
         callbacks.notify(events.onDirectRoom, session)
         })*!/

        $q.resolve(session)
      }, (err) => {
        return $q.resolve(null)
      })
    }
    */

    return {}
  }

  angular.module('profitelo.services.messenger', [
    'profitelo.services.communicatorService',
    'profitelo.services.utils'
  ])
    .service('messengerService', service)

}())
