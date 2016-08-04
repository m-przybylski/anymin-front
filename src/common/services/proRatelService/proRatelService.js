(function () {
  function proRatelService($log, $rootScope, $q, $timeout, User, RatelApi, ServiceApi) {

    navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia

    if (navigator.mediaDevices.getUserMedia) {
      navigator.getUserMedia = function (arg, t, c) {
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

    let _removeOtherRatelCalls = () => {

    }

    let _createRatelSession = (ratelSession) => {

      let onMessage = (message, cb) => ratelSession.chat.onMessage(message, cb)

      ratelSession.calls = []
      ratelSession.callbacks = {}

      ratelSession.makeCall = (peer) => {

        var call = calls[peer]
        if (call) {
          return call
        }

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
              ratelSession.localStream.getTracks().map(function (track) {
                track.stop()
              })
            }
            ratelSession.localStream = null
            ratelSession.remoteStream = null
          }
        }


        function createLocalStream(onLocalStream) {
          navigator.getUserMedia({
            'video': true,
            'audio': true
            }, stream => {
              console.log('Local stream started!')
              showLocalStream(stream)
              onLocalStream(stream)
            }, error => {
              console.log('Could not start stream: ' + error)
            })
        }

        ratelSession.chat.onRemoteStream(stream => showRemoteStream(stream))

        ratelSession.calls[peer] = {
          peer: peer,
          showRemoteStream: showRemoteStream,
          createLocalStream: createLocalStream,
          endCall: endCall
        }

        return ratelSession.calls[peer]
      }

      ratelSession.sendMessage = (message, roomId) => {
        ratelSession.chat.sendMessage(roomId, message)
      }



      ratelSession.chat.onConnect(() => {
        $log.debug(ratelSession.id + ' Connected to artichoke!')
      })

      onMessage('message', message => {

        if (angular.isFunction(ratelSession.callbacks.onNewMessage)) {
          ratelSession.callbacks.onNewMessage({
            message: message,
            socket: ratelSession.id
          })
        }
      })

      onMessage('call_offer', callOffer => {
        console.log(callOffer.user + ' is calling...')

        if (confirm(callOffer.user + ' is calling, answer?')) {
          _removeOtherRatelCalls()
          ratelSession.makeCall(callOffer.user).createLocalStream(stream => {
            ratelSession.chat.answerCall(callOffer, stream)
            if (angular.isFunction(ratelSession.callbacks.onNewCall)) {
              ratelSession.callbacks.onNewCall(stream, callOffer.user)
            }
          })
        } else {
          console.log('Rejecting call...')
          ratelSession.chat.rejectCall(callOffer)
        }
      })

      onMessage('call_answer', message => {
        $log.debug(message.user + ' answered the call!')
      })

      onMessage('call_hangup', message => {
        $log.error(message.user + ' hang up, reason: ' + message.reason)
      })

      onMessage('room_action', message => {
        $log.debug('room_action', message)
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


    return {
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
      startConversation: (serviceObject, sessionId = User.getData('id')) => {

        let deferred = $q.defer()

        let userTmpId = 's' + serviceObject.id + 'u' + serviceObject.ownerId

        let session = _ratelSessions[sessionId]

        session.chat.createDirectRoom(userTmpId).then(room => {

          session.makeCall(room.id).createLocalStream(stream => {
            session.chat.offerCall(userTmpId, stream)
            deferred.resolve({
              session: session,
              room: room
            })
          })

        })

        return deferred.promise

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
      },
      onNewCall: (cb) => {
        if (angular.isFunction(cb)) {
          callbacks.onNewCall = (stream) => {
            $timeout(() => {
              cb(stream)
            })
          }
        }
      },
      bindLocalStreamElement: (element) => {
        localStreamVideoElement = element
      },
      bindRemoteStreamElement: (element) => {
        remoteStreamVideoElement = element
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
