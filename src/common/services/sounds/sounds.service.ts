import * as _ from 'lodash'

export interface ISoundObject {
  play(): void
  stop(): void
}

export class SoundsService {

  private static path = '/assets/sounds/'

  private static soundFiles = {
    callIncoming: 'call_incoming.wav',
    callConnecting: 'call_connecting.mp3',
    callEnded: 'call_ended.wav',
    callRejected: 'call_rejected.wav',
    messageNew: 'message_new.mp3'
  }

  private soundPaths: any
  private soundObjects: {
    callIncoming: HTMLAudioElement
    callConnecting: HTMLAudioElement
    messageNew: HTMLAudioElement
    callRejected: HTMLAudioElement
    callEnded: HTMLAudioElement
  }

  private callIncomingSoundCount = 0
  private isCallConnecting = false

  /* @ngInject */
  constructor(private $log: ng.ILogService, ) {

    this.soundPaths = _.mapValues(SoundsService.soundFiles, filename => SoundsService.path + filename)
    this.soundObjects = _.mapValues(this.soundPaths, path => new Audio(path))

    this.setAudioLoop(this.soundObjects.callIncoming)
    this.setAudioLoop(this.soundObjects.callConnecting)
  }

  private setAudioLoop = (audio: HTMLAudioElement) => {
    audio.addEventListener('ended', () => {
      audio.currentTime = 0
      audio.play()
    }, false)
  }

  public callIncomingSound = () => {

    const play = () => {
      if (this.callIncomingSoundCount === 0) {
        this.soundObjects.callIncoming.play()
      }
      ++this.callIncomingSoundCount
    }

    const stop = () => {
      if (this.callIncomingSoundCount === 1) {
        this.callIncomingSoundCount = 0
        this.soundObjects.callIncoming.pause()
        this.soundObjects.callIncoming.currentTime = 0
      } else if (this.callIncomingSoundCount > 1) {
        --this.callIncomingSoundCount
      } else {
        this.$log.warn('Call incoming sound is already stopped')
      }
    }

    return {
      play: play,
      stop: stop
    }
  }

  public callConnectingSound = () => {

    const play = () => {
      if (!this.isCallConnecting) {
        this.isCallConnecting = true
        this.soundObjects.callConnecting.play()
      }
    }

    const stop = () => {
      if (this.isCallConnecting) {
        this.isCallConnecting = false
        this.soundObjects.callConnecting.pause()
        this.soundObjects.callConnecting.currentTime = 0
      }
    }

    return {
      play: play,
      stop: stop
    }
  }

  public playMessageNew = () =>
    this.soundObjects.messageNew.play()

  public playCallRejected = () =>
    this.soundObjects.callRejected.play()

  public playCallEnded = () =>
    this.soundObjects.callEnded.play()
}


