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

    let _removeCall = (peer) => {
      console.log('Removing a call object.')
      var call = calls[peer]
      if (call) {
        call.stopStreams()
        document.getElementById('call-container').removeChild(call.box)
        delete calls[peer]
      }
    }
    
    let _makeCall = (peer) => {
      console.log('Creating a call object.')
      var call = calls[peer]
      if (call) {
        return call
      }

      var box = document.createElement('div')

      var localVideo = document.createElement('video')
      localVideo.className = 'video-stream'
      localVideo.id = 'local-video'
      localVideo.autoplay = true
      box.appendChild(localVideo)

      var removeVideo = document.createElement('video')
      removeVideo.className = 'video-stream'
      removeVideo.id = 'remote-video'
      removeVideo.autoplay = true
      box.appendChild(removeVideo)

      var end = document.createElement('button')
      end.innerHTML = 'Hangup call'
      end.onclick = function() {
        console.log( 'Ending call with ' + peer + '...')
        session.chat.hangupCall(peer, 'hangup')
        _removeCall(peer)
      }
      box.appendChild(end)

      document.getElementById('call-container').appendChild(box)

      var localStream = undefined
      var remoteStream = undefined

      function showRemoteStream(stream) {
        remoteStream = stream
        removeVideo.src = window.URL.createObjectURL(stream)
      }

      function showLocalStream(stream) {
        localStream = stream
        localVideo.src = window.URL.createObjectURL(stream)
      }

      function stopStreams() {
        if (localStream) {
          if (localStream.stop) {
            localStream.stop()
          } else {
            localStream.getTracks().map(function(t) { t.stop() })
          }
          localStream = undefined
          remoteStream = undefined
        }
      }

      function createLocalStream(onLocalStream) {
        navigator.getUserMedia(
          {'video': f.elements[3].checked,
            'audio': f.elements[2].checked},
          function(stream) {
            console.log('Local stream started!')
            showLocalStream(stream)
            onLocalStream(stream)
          }, function(error) {
            console.log('Could not start stream: ' + error)
          })
      }

      session.chat.onRemoteStream(function(stream) {
        console.log('Remote stream started!')
        showRemoteStream(stream)
      })

      calls[peer] = {
        box: box,
        peer: peer,
        showRemoteStream: showRemoteStream,
        createLocalStream: createLocalStream,
        stopStreams: stopStreams
      }

      return calls[peer]
    }
    
    let _assignCallBacks = (ratelSession) => {
      
      ratelSession.calls = {}
      
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

      ratelSession.chat.onMessage('call_offer', function(m) {
        console.log(m.user + ' is calling...')
        // if(confirm(m.user + ' is calling, answer?')) {
        //   makeCall(m.user).createLocalStream(function(stream) {
        //     ratelSession.chat.answerCall(m, stream)
        //   })
        // } else {
        //   console.log('Rejecting call...')
        //   session.chat.rejectCall(m)
        // }
      })

      ratelSession.chat.onMessage('call_answer', function(m) {
        console.log(m.user + ' answered the call!')
      })

      ratelSession.chat.onMessage('call_hangup', function(m) {
        console.log(m.user + ' hang up, reason: ' + m.reason)
      })

      ratelSession.chat.onMessage('room_action', message => {
        $log.debug('room_action', message)
      })

      ratelSession.chat.onMessage('roster_add', function(m) {
        console.log('User ' + m.user + ' added to roster.')
      })

      ratelSession.chat.onMessage('msg_received', function(m) {
        console.log('Received ack for message id: ' + m.id)
      })

      ratelSession.chat.onMessage('msg_delivered', function(m) {
        console.log('Message delivery ack for id: ' + m.id)
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
      initCall: (serviceObject) => {
        
      },
      sendNewMessage: (message, roomId, socket = _userId) => {
        $log.debug(roomId)
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
