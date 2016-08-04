(function() {
  function proRatelService($log, $q, $timeout, User, RatelApi, ServiceApi) {

    navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia

    if (navigator.mediaDevices.getUserMedia) {
      navigator.getUserMedia = function(arg, t, c) {
        return navigator.mediaDevices.getUserMedia(arg).then(t).catch(c)
      }
    }

    // ratel server config, const for now. will be default in sdk
    const artichokeConfig = {
      url: 'artichoke.ratel.io',
      debug: true
    }

    let _ratelSessions = []

    // angular video elements registered from directives
    let remoteStreamVideoElement = null
    let localStreamVideoElement = null

    // lets proBottomCommunicator grasp new session object created from calls
    let callbacks = {
      onDirectRoom: null,
      onNewMessage: null,
      onNewCall: null,
      onRoomJoin: null,
      onRoomHistory: null
    }

    callbacks.call = (callback, payload) => {
      if (angular.isFunction(callbacks[callback])) {
        callbacks[callback](payload)
      }
    }

    
    // TODO: add function body
    let _removeOtherRatelCalls = () => {

      let deferred = $q.defer()
      
      deferred.resolve()
      
      return deferred.promise
      
    }
    
    

    let _createRatelSession = (ratelSession) => {

      let onMessage = (message, cb) => ratelSession.chat.onMessage(message, cb)

      ratelSession.call = null
      ratelSession.roomId = null

      ratelSession.createDirectRoom = userId => {
        ratelSession.chat.createDirectRoom(userId).then(room => {
          ratelSession.roomId = room.id

          ratelSession.chat.getChatHistory(ratelSession.roomId).then(history => callbacks.call('onRoomHistory', history))
          callbacks.call('onDirectRoom', ratelSession)

        })
      }

      ratelSession.createCallStream = () => {
        
        function showLocalStream(stream) {
          ratelSession.localStream = stream
          localStreamVideoElement.attr('src', window.URL.createObjectURL(ratelSession.localStream))
        }

        function showRemoteStream(stream) {
          ratelSession.remoteStream = stream
          remoteStreamVideoElement.attr('src', window.URL.createObjectURL(ratelSession.remoteStream))
        }

        function endCall() {
          if (ratelSession.localStream) {
            if (ratelSession.localStream.stop) {
              ratelSession.localStream.stop()
            } else {
              ratelSession.localStream.getTracks().map((track) => {
                track.stop()
              })
            }
            ratelSession.localStream = null
            ratelSession.remoteStream = null
          }
        }


        function getLocalStream() {
          let deferred = $q.defer()
          
          navigator.getUserMedia({
            'video': true,
            'audio': true
          }, stream => {
            showLocalStream(stream)
            deferred.resolve(stream)
          }, error => deferred.reject(error))
          
          return deferred.promise
        }

        ratelSession.chat.onRemoteStream(stream => showRemoteStream(stream))

        ratelSession.call = {
          showRemoteStream: showRemoteStream,
          getLocalStream: getLocalStream,
          endCall: endCall
        }

        return ratelSession.call
      }


      ratelSession.sendMessage = (message) => {
        ratelSession.chat.sendMessage(ratelSession.roomId, message)
      }


      ratelSession.chat.onConnect(() => {
        $log.debug(ratelSession.id + ' Connected to artichoke!')
      })

      onMessage('message', message => {

        callbacks.call('onNewMessage', {
          message: message,
          socket: ratelSession.id
        })

      })

      onMessage('call_offer', callOffer => {
        
        // TODO: change to confirmation modal
        if (confirm(callOffer.user + ' is calling, answer?')) {
          _removeOtherRatelCalls().then(() => {
            ratelSession.createCallStream(callOffer.user).getLocalStream().then(stream => {

              ratelSession.chat.answerCall(callOffer, stream)

              callbacks.call('onDirectRoom', ratelSession)

            }, error => console.log('Could not start stream: ' + error))  
          })
        } else {
          console.log('Rejecting call...')
          ratelSession.chat.rejectCall(callOffer)
        }
      })

      onMessage('call_answer', message => {
        $log.debug(message.user + ' answered the call!')
        ratelSession.createDirectRoom(message.user)
      })

      onMessage('call_hangup', message => {
        $log.error(message.user + ' hang up, reason: ' + message.reason)
      })

      onMessage('room_action', message => {
        if (!ratelSession.roomId) {
          ratelSession.roomId = message.room

          ratelSession.chat.getChatHistory(ratelSession.roomId).then(history => callbacks.call('onRoomHistory', history))

          callbacks.call('onDirectRoom', ratelSession)

        }
      })

      onMessage('roster_add', message => {
        $log.debug('User ' + message.user + ' added to roster.')
      })

      onMessage('msg_received', message => {
        $log.debug('Received ack for message id: ' + message.id)
      })

      onMessage('msg_delivered', message => {
        $log.debug('Message delivery ack for id: ' + message.id)
      })

      ratelSession.chat.connect()

      _ratelSessions[ratelSession.id] = ratelSession

    }


    let api = {
      authenticate: () => {

        let _ratelRegisterConfig = []

        $q.all([
          RatelApi.getRatelAuthConfig().$promise,
          ServiceApi.getProfileServices({accountId: User.getData('id')}).$promise
        ]).then(configs => {

          let ratelConfig = JSON.parse(angular.toJson(configs[0]))
          let servicesConfig = JSON.parse(angular.toJson(configs[1]))


          // register as an user
          _ratelRegisterConfig.push(RatelSDK.withSignedAuth({
            organizationId: ratelConfig.organizationId,
            sessionId: ratelConfig.sessionId,
            signature: ratelConfig.signature,
            timestamp: ratelConfig.timestamp
          }, artichokeConfig))

          // and as an expert for all consultations
          servicesConfig.forEach(service => {
            _ratelRegisterConfig.push(RatelSDK.withSignedAuth({
              organizationId: ratelConfig.organizationId,
              sessionId: 's' + service.id + 'u' + service.ownerId,
              signature: ratelConfig.signature,
              timestamp: ratelConfig.timestamp
            }, artichokeConfig))
          })

          $q.all(_ratelRegisterConfig).then(registeredConfigs => {
            registeredConfigs.forEach(session => {
              _createRatelSession(session)
            })
          })

        })

      },
      startRatelCall: (serviceObject, sessionId = User.getData('id')) => {

        let deferred = $q.defer()

        let userTmpId = 's' + serviceObject.id + 'u' + serviceObject.ownerId

        let session = _ratelSessions[sessionId]

        _removeOtherRatelCalls().then(() => {

          session.createCallStream().getLocalStream().then(stream => {

            session.chat.offerCall(userTmpId, stream)

            callbacks.call('onNewCall', session)

            deferred.resolve(session)

          }, error => console.log('Could not start stream: ' + error))
        })

        return deferred.promise

      },
      bindLocalStreamElement: (element) => {
        localStreamVideoElement = element
      },
      bindRemoteStreamElement: (element) => {
        remoteStreamVideoElement = element
      }
    }

    for (let callback in callbacks) {
      if (!angular.isFunction(callback)) {
        api[callback] = cb => {
          callbacks[callback] = (message) => $timeout(() => cb(message))
        }
      }
    }

    return api

  }

  angular.module('profitelo.services.pro-ratel-service', [
    'pascalprecht.translate',
    'c7s.ng.userAuth',
    'profitelo.swaggerResources'
  ])
    .service('proRatelService', proRatelService)

}())
