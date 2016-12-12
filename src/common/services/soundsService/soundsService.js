(function() {

  function service($log, _) {

    const path = '/assets/sounds/'

    const soundFiles = {
      callIncoming: 'call_incoming.wav',
      callConnecting: 'call_connecting.mp3',
      callEnded: 'call_ended.wav',
      callRejected: 'call_rejected.wav',
      messageNew: 'message_new.mp3'
    }

    const soundPaths = _.mapValues(soundFiles, _filename => path+_filename)

    const soundObjects = _.mapValues(soundPaths, _path => new Audio(_path))

    let callIncomingSoundCount = 0
    let isCallConnecting = false

    const setAudioLoop = audio => {
      audio.addEventListener('ended', () => {
        audio.currentTime = 0
        audio.play()
      }, false)
    }

    setAudioLoop(soundObjects.callIncoming)
    setAudioLoop(soundObjects.callConnecting)

    const callIncomingSound = () => {

      const play = () => {
        if (callIncomingSoundCount === 0) {
          soundObjects.callIncoming.play()
        }
        ++callIncomingSoundCount
      }

      const stop = () => {
        if (callIncomingSoundCount === 1) {
          callIncomingSoundCount = 0
          soundObjects.callIncoming.pause()
          soundObjects.callIncoming.currentTime = 0
        } else if (callIncomingSoundCount > 1) {
          --callIncomingSoundCount
        } else {
          $log.warn('Call incoming sound is already stopped')
        }
      }

      return {
        play: play,
        stop: stop
      }
    }

    const callConnectingSound = () => {

      const play = () => {
        if (!isCallConnecting) {
          isCallConnecting = true
          soundObjects.callConnecting.play()
        }
      }

      const stop = () => {
        if (isCallConnecting) {
          isCallConnecting = false
          soundObjects.callConnecting.pause()
          soundObjects.callConnecting.currentTime = 0
        }
      }

      return {
        play: play,
        stop: stop
      }
    }

    const playMessageNew = () =>
      soundObjects.messageNew.play()

    const playCallRejected = () =>
      soundObjects.callRejected.play()

    const playCallEnded = () =>
      soundObjects.callEnded.play()

    return {
      callIncomingSound: callIncomingSound,
      playMessageNew: playMessageNew,
      playCallRejected: playCallRejected,
      playCallEnded: playCallEnded,
      callConnectingSound: callConnectingSound
    }
  }

  angular.module('profitelo.services.sounds', [
    'lodash'
  ])
    .service('soundsService', service)

}())
