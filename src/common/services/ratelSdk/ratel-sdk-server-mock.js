/* istanbul ignore next */
(function() {

  angular.module('ratel.mock', [
    'commonConfig'
  ]).factory('backendUrl', CommonConfig => CommonConfig.getAllData().urls.backend)

  const _RatelSDK = RatelSDK

  function hook(url, payload) {
    const baseUrl = angular.injector(['ng', 'ratel.mock']).get('backendUrl')

    const request = new XMLHttpRequest()
    request.open('POST', baseUrl + url, true)
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        console.log(JSON.parse(request.responseText))
      } else {
        console.log(request.responseText)
      }
    }
    request.onerror = function() {
      console.log('error connecting server')
    }

    request.send(JSON.stringify(payload))
  }

  function startHook(call) {
    call.getUsers().then(users => {
      if (users.length === 2) {
        let clientId, expertId, serviceId
        users.forEach(user => {
          const parts = user.split('_')
          if (parts.length === 1) {
            clientId = parts[0]
          } else if (parts.length === 2) {
            serviceId = parts[0]
            expertId = parts[1]
          } else {
            console.log('bad user id: ' + user)
          }
        })
        hook('/ratel/hook/start', {
          callId: call.id,
          clientId: clientId,
          expertId: expertId,
          serviceId: serviceId,
          timestamp: Date.now()
        })
      } else {
        console.log('expected 2 users in call, got: ' + users.length)
      }
    })
  }

  function stopHook(call) {
    hook('/ratel/hook/stop', {
      callId: call.id,
      timestamp: Date.now()
    })
  }

  function wrapCall(call) {
    const onHeartBeatTimers = []

    call.onHeartBeat = cb => onHeartBeatTimers.push(setInterval(() => cb(Date.now()), 20000))

    const _leave = call.leave
    call.leave = reason => {
      call.stopStreams()

      while (onHeartBeatTimers.length > 0) {
        clearInterval(onHeartBeatTimers.pop())
      }

      stopHook(call)

      return _leave.call(call, reason)
    }

    const _onJoined = call.onJoined
    call.onJoined = cb => _onJoined.call(call, callJoined => {
      startHook(call)
      cb(callJoined)
    })
    call.onJoined(_ => startHook(call))

    return call
  }

  function wrapChat(chat, session) {
    const _onCall = chat.onCall
    chat.onCall = cb => _onCall.call(chat, callInvitation => {
      callInvitation.call = wrapCall(callInvitation.call, session)
      cb(callInvitation)
    })

    const _createDirectCall = chat.createDirectCall
    chat.createDirectCall = sessionId => new Promise((resolve, reject) => {
      _createDirectCall.call(chat, sessionId).then(call => resolve(wrapCall(call, session)))
    })

    return chat
  }

  function wrapSession(session) {
    session.chat = wrapChat(session.chat, session)
    return session
  }

  window.RatelSDK = {
    withSignedAuth: (sessionData, artichokeConfig) =>
      _RatelSDK.withSignedAuth(sessionData, artichokeConfig).then(wrapSession)
  }
}())
