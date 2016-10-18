(function() {
  const _RatelSDK = RatelSDK

  navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia

  if (typeof navigator.mediaDevices !== 'object') {
    navigator.mediaDevices = {}
  }

  if (navigator.mediaDevices.getUserMedia) {
    navigator.getUserMedia = (arg, t, c) => {
      return navigator.mediaDevices.getUserMedia(arg).then(t).catch(c)
    }
  }

  const artichokeConfig = {
    debug: true,
    hostname: 'v0.1.1.artichoke.ratel.io'
  }

  function wrapCall(call) {
    const _leave = call.leave
    call.leave = reason => {
      call.stopStreams()
      return _leave.call(call, reason)
    }
    call.hangup = () => call.leave('hangup')

    const _join = call.join
    call.join = () => {
      call.getLocalStream(
        stream => _join.call(call, stream),
        error => console.log(error)
      )
    }

    const _onRemoteStream = call.onRemoteStream
    call.onRemoteStream = cb => _onRemoteStream.call(call, (peer, stream) => {
      call.remoteStream = stream
      if (call.remoteStreamVideoElement) {
        call.remoteStreamVideoElement.attr('src', window.URL.createObjectURL(call.remoteStream))
      }
      cb(peer, stream)
    })
    call.onRemoteStream(_ => _)


    const _onLeft = call.onLeft
    call.onLeft = cb => _onLeft.call(call, callLeft => {
      if (call.direct) {
        call.getUsers().then(users => {
          console.log(users)
          if (users.length < 2) {
            call.leave('ended')
            call.stopStreams()
          }
        })
      }
      cb(callLeft)
    })
    call.onLeft(_ => _)

    call.setLocalStreamElement = element => {
      call.localStreamVideoElement = element
      if (call.localStream) {
        call.localStreamVideoElement.attr('src', window.URL.createObjectURL(call.localStream))
      }
    }

    call.setRemoteStreamElement = element => {
      call.remoteStreamVideoElement = element
      if (call.remoteStream) {
        call.remoteStreamVideoElement.attr('src', window.URL.createObjectURL(call.remoteStream))
      }
    }

    call.getLocalStream = (t, c) => navigator.getUserMedia({
      'video': true,
      'audio': true
    }, stream => {
      call.localStream = stream
      if (call.localStreamVideoElement) {
        call.localStreamVideoElement.attr('src', window.URL.createObjectURL(call.localStream))
      }
      t(stream)
    }, c)

    call.stopStreams = () => {
      if (call.localStream) {
        if (call.localStream.stop) {
          call.localStream.stop()
        } else {
          call.localStream.getTracks().forEach(t => t.stop())
        }
      }

      call.localStream = null
      call.remoteStream = null
    }

    call.toggleAudio = () => {
      const audio = call.localStream.getAudioTracks()[0]
      return audio.enabled = !audio.enabled
    }

    call.toggleVideo = () => {
      const video = call.localStream.getVideoTracks()[0]
      return video.enabled = !video.enabled
    }

    return call
  }

  function wrapChat(chat) {
    const _onCall = chat.onCall
    chat.onCall = cb => _onCall.call(chat, callInvitation => {
      callInvitation.call = wrapCall(callInvitation.call)
      cb(callInvitation)
    })

    const _createDirectCall = chat.createDirectCall
    chat.createDirectCall = sessionId => new Promise((resolve, reject) => {
      _createDirectCall.call(chat, sessionId).then(call => {
        call = wrapCall(call)
        call.getLocalStream(
          stream => {
            call.addLocalStream(stream)
            resolve(call)
          },
          error => reject(error)
        )
      })
    })

    return chat
  }

  function wrapSession(session) {
    session.chat = wrapChat(session.chat)

    return session
  }

  window.RatelSDK = {
    withSignedAuth: sessionData => _RatelSDK.withSignedAuth(sessionData, artichokeConfig).then(wrapSession)
  }
}())
