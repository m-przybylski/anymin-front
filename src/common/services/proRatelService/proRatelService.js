/* istanbul ignore next */
(function() {
  function proRatelService($rootScope, $interval, $log, $q, $timeout, User, RatelApi, ServiceApi, DialogService) {

    navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia

    if (typeof navigator.mediaDevices !== 'object') {
      navigator.mediaDevices = {}
    }

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
    
    let _timer
    let _count
    const _cost = 345

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
      onRoomHistory: null,
      onHangup: null,
      onStartedCall: null
    }

    callbacks.call = (callback, payload) => {
      if (angular.isFunction(callbacks[callback])) {
        callbacks[callback](payload)
      }
    }

    let pendingConnectionModal = {}


    // TODO: add function body
    let _removeOtherRatelCalls = () => {

      let deferred = $q.defer()

      deferred.resolve()

      return deferred.promise

    }


    let _createRatelConnection = (ratelSession) => {

      ratelSession.chat.onError(message => {
        $log.debug('WS onError', message)
      })

      let onRatelMessage = (message, cb) => ratelSession.chat.onMessage(message, cb)

      ratelSession.call = null
      ratelSession.roomId = null
      ratelSession.peerId = null

      ratelSession.createDirectRoom = userId => {
        ratelSession.chat.createDirectRoom(userId).then(room => {
          ratelSession.roomId = room.id

          ratelSession.chat.getChatHistory(ratelSession.roomId).then(history => callbacks.call('onRoomHistory', history))
          callbacks.call('onDirectRoom', ratelSession)

        })
      }

      ratelSession.hangup = (peerId = ratelSession.peerId) => {
        ratelSession.chat.hangupCall(peerId, 'hangup')
        ratelSession.call.endCall()
        callbacks.call('onHangup', null)
      }

      ratelSession.mute = () => {
        ratelSession.localStream.getAudioTracks()[0].enabled = !(ratelSession.localStream.getAudioTracks()[0].enabled)
        return !(ratelSession.localStream.getAudioTracks()[0].enabled)
      }

      ratelSession.stopVideo = () => {
        ratelSession.localStream.getVideoTracks()[0].enabled = !(ratelSession.localStream.getVideoTracks()[0].enabled)
        return !(ratelSession.localStream.getVideoTracks()[0].enabled)
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

      onRatelMessage('message', message => {

        callbacks.call('onNewMessage', {
          message: message,
          socket: ratelSession.id
        })

      })

      onRatelMessage('presence', message => {
        $log.info('ratel user ' + message.sender + ' is ' + message.status)
      })

      onRatelMessage('call_offer', callOffer => {


        let tmpScope = $rootScope.$new()

        tmpScope.caller = callOffer.user

        tmpScope.pickUpCall = () => {
          _removeOtherRatelCalls().then(() => {
            ratelSession.peerId = callOffer.user
            ratelSession.createCallStream(callOffer.user).getLocalStream().then(stream => {

              ratelSession.chat.answerCall(callOffer, stream)
              callbacks.call('onStartedCall', ratelSession)
              callbacks.call('onDirectRoom', ratelSession)

            }, error => $log.error('Could not start stream: ' + error))
          })
        }

        tmpScope.rejectCall = () => {
          ratelSession.chat.rejectCall(callOffer)
        }


        DialogService.openDialog({
          controller: 'proClientAdviceModalController',
          templateUrl: 'components/communicator/modals/pro-client-advice-modal-controller/pro-client-advice-modal-controller.tpl.html',
          scope: tmpScope
        })


      })

      onRatelMessage('call_answer', message => {
        $log.debug(message.user + ' answered the call!')
        ratelSession.peerId = message.user
        if (pendingConnectionModal.close) {
          pendingConnectionModal.close()
        }
        ratelSession.createDirectRoom(message.user)
        callbacks.call('onStartedCall', ratelSession)
      })

      onRatelMessage('call_hangup', message => {
        // ratelSession.hangup(message.user)
        ratelSession.call.endCall()
        callbacks.call('onHangup', null)
        if (pendingConnectionModal.close) {
          pendingConnectionModal.close()
        }
      })

      onRatelMessage('room_action', message => {
        if (!ratelSession.roomId) {
          ratelSession.roomId = message.room

          ratelSession.chat.getChatHistory(ratelSession.roomId).then(history => callbacks.call('onRoomHistory', history))

          callbacks.call('onDirectRoom', ratelSession)
        }
      })

      onRatelMessage('roster_add', message => {
        $log.debug('User ' + message.user + ' added to roster.')
      })

      onRatelMessage('msg_received', message => {
        $log.debug('Received ack for message id: ' + message.id)
      })

      onRatelMessage('hello', message => {
        $log.debug('Ratel Hello!: ', message)
      })

      onRatelMessage('msg_delivered', message => {
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
              _createRatelConnection(session)
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

            pendingConnectionModal = DialogService.openDialog({
              templateUrl: 'components/communicator/modals/pro-call-awaits/pro-call-awaits.tpl.html'
            })

            session.chat.offerCall(userTmpId, stream)

            callbacks.call('onNewCall', session)

            deferred.resolve(session)

          }, error => $log.error('Could not start stream: ' + error))
        })

        return deferred.promise

      },
      startTimer: (cb) => {
        _count = Date.now() / 1000
        _timer = $interval(() => {
          cb({
            time: Date.now() / 1000 - _count,
            cost: _cost / 60 * parseInt((Date.now() / 1000 - _count), 10)
          })
        }, 500)
      },
      stopTimer: () => {
        $interval.cancel(_timer)
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
          // needs to be wrapped around $timeout for angular digest loop context
          callbacks[callback] = (message) => $timeout(() => cb(message))
        }
      }
    }

    return api

  }


  angular.module('profitelo.services.pro-ratel-service', [
    'pascalprecht.translate',
    'c7s.ng.userAuth',
    'profitelo.swaggerResources',
    'profitelo.components.communicator.modals.pro-client-advice-modal-controller',
    'profitelo.services.dialog-service'
  ])
    .service('proRatelService', proRatelService)

}())
