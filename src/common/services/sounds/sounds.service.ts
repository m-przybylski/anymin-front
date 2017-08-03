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

  private setAudioLoop = (audio: HTMLAudioElement): void => {
    audio.addEventListener('ended', () => {
      audio.currentTime = 0
      audio.play()
    }, false)
  }

  public callIncomingSound = (): ISoundObject => {

    const play = (): void => {
      if (this.callIncomingSoundCount === 0) {
        this.soundObjects.callIncoming.play()
      }
      ++this.callIncomingSoundCount
    }

    const stop = (): void => {
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
      play,
      stop
    }
  }

  public callConnectingSound = (): ISoundObject => {

    const play = (): void => {
      if (!this.isCallConnecting) {
        this.isCallConnecting = true
        this.soundObjects.callConnecting.play()
      }
    }

    const stop = (): void => {
      if (this.isCallConnecting) {
        this.isCallConnecting = false
        this.soundObjects.callConnecting.pause()
        this.soundObjects.callConnecting.currentTime = 0
      }
    }

    return {
      play,
      stop
    }
  }

  public playMessageNew = (): void =>
    this.soundObjects.messageNew.play()

  public playCallRejected = (): void =>
    this.soundObjects.callRejected.play()

  public playCallEnded = (): void =>
    this.soundObjects.callEnded.play()
}
