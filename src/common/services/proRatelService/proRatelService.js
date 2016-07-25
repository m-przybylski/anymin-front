(function() {
  function proRatelService($log, $rootScope, $q, $timeout, User, RatelApi, ServiceApi) {

    const artichokeConfig = {
      url: 'artichoke.ratel.io',
      debug: true
    }

    let callbacks = {
      onNewMessage: null
    }
    
    let _ratelSessions = []
    let _userId
    let _ratelRegisterConfig = []

    let _sendNewMessage = (message, roomId, socket) => {
      _ratelSessions[socket].chat.sendMessage(roomId, message)
    }

    let _assignCallBacks = (ratelSession) => {

      
      ratelSession.chat.onConnect(() => {
        $log.debug('Connected to artichoke!')
      })

      ratelSession.chat.onMessage('message', message => {
        
        if (angular.isFunction(callbacks.onNewMessage)) {
          callbacks.onNewMessage({
            message: message,
            socket: ratelSession.id
          })
        }
      })

      ratelSession.chat.onMessage('room_action', message => {
        $log.debug('room_action', message)
      })

      ratelSession.chat.onMessage('roster_add', function(m) {
        console.log('User ' + m.user + ' added to roster.')
      })

      ratelSession.chat.connect()

      _ratelSessions[ratelSession.id] = ratelSession

    }


    return {
      authenticate: () => {

        _userId = User.getData('id')
        
        $q.all([
          RatelApi.getRatelAuthConfig().$promise,
          ServiceApi.getProfileServices({accountId: User.getData('id')}).$promise
        ]).then(configs => {

          let ratelConfig = JSON.parse(angular.toJson(configs[0]))
          let servicesConfig = JSON.parse(angular.toJson(configs[1]))


          // register as an user
          _ratelRegisterConfig.push(RatelSDK.withSignedAuth({
            organizationId: ratelConfig.organizationId,
            sessionId:      ratelConfig.sessionId,
            signature:      ratelConfig.signature,
            timestamp:      ratelConfig.timestamp
          }, artichokeConfig))

          // and as an expert for all consultations
          servicesConfig.forEach(service => {
            _ratelRegisterConfig.push(RatelSDK.withSignedAuth({
              organizationId: ratelConfig.organizationId,
              sessionId:      's' + service.id + 'u' + service.ownerId,
              signature:      ratelConfig.signature,
              timestamp:      ratelConfig.timestamp
            }, artichokeConfig))
          })

          $q.all(_ratelRegisterConfig).then(registeredConfigs => {
            registeredConfigs.forEach(session => {
              _assignCallBacks(session)
            })
          })
          
        })

      },
      startConversation: (serviceObject) => {
        
        _ratelSessions[_userId].chat.createDirectRoom('s' + serviceObject.id + 'u' + serviceObject.ownerId).then(room => {
          $log.debug(room)

          $rootScope.$broadcast('startConversation', _userId, room.id)
          
        })
        
      },
      sendNewMessage: (message, roomId, socket = _userId) => {
        _sendNewMessage(message, roomId, socket)
      },
      getRoomHistory: (roomId, socket) => {
        return _ratelSessions[socket].chat.getChatHistory(roomId)
      },
      onNewMessage: (cb) => {
        if (angular.isFunction(cb)) {
          callbacks.onNewMessage = (message) => {
            $timeout(() => {
              cb(message)
            })
          }
        }
      }
    }
  
  }
   
  angular.module('profitelo.services.pro-ratel-service', [
    'pascalprecht.translate',
    'c7s.ng.userAuth',
    'profitelo.swaggerResources'
  ])
  .service('proRatelService', proRatelService)

}())
