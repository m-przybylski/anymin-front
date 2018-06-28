// tslint:disable:no-any
// tslint:disable:member-ordering
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';

export interface ISoundObject {
  play(): void;
  stop(): void;
}

// tslint:disable:member-ordering
export class SoundsService {

  private static path = '/assets/sounds/';

  private static soundFiles = {
    callIncoming: 'call_incoming.wav',
    callConnecting: 'call_connecting.mp3',
    callEnded: 'call_ended.wav',
    callRejected: 'call_rejected.wav',
    messageNew: 'message_new.mp3'
  };

  private soundPaths: any;
  private soundObjects: {
    callIncoming: HTMLAudioElement
    callConnecting: HTMLAudioElement
    messageNew: HTMLAudioElement
    callRejected: HTMLAudioElement
    callEnded: HTMLAudioElement
  };

  private callIncomingSoundCount = 0;
  private isCallConnecting = false;

  public static $inject = ['$log'];

    constructor(private $log: ng.ILogService) {

    this.soundPaths = _.mapValues(SoundsService.soundFiles, filename => SoundsService.path + filename);
    this.soundObjects = _.mapValues(this.soundPaths, path => new Audio(path));

    this.setAudioLoop(this.soundObjects.callIncoming);
    this.setAudioLoop(this.soundObjects.callConnecting);
  }

  private setAudioLoop = (audio: HTMLAudioElement): void => {
    audio.addEventListener('ended', () => {
      audio.currentTime = 0;
      // FIXME
      // tslint:disable-next-line:no-floating-promises
      audio.play();
    }, false);
  }

  public callIncomingSound = (): ISoundObject => {

    const play = (): void => {
      if (this.callIncomingSoundCount === 0) {
        // FIXME
        // tslint:disable-next-line:no-floating-promises
        this.soundObjects.callIncoming.play();
      }
      ++this.callIncomingSoundCount;
    };

    const stop = (): void => {
      if (this.callIncomingSoundCount === 1) {
        this.callIncomingSoundCount = 0;
        this.soundObjects.callIncoming.pause();
        this.soundObjects.callIncoming.currentTime = 0;
      } else if (this.callIncomingSoundCount > 1) {
        --this.callIncomingSoundCount;
      } else {
        this.$log.warn('Call incoming sound is already stopped');
      }
    };

    return {
      play,
      stop
    };
  }

  public callConnectingSound = (): ISoundObject => {

    const play = (): void => {
      if (!this.isCallConnecting) {
        this.isCallConnecting = true;
        // FIXME
        // tslint:disable-next-line:no-floating-promises
        this.soundObjects.callConnecting.play();
      }
    };

    const stop = (): void => {
      if (this.isCallConnecting) {
        this.isCallConnecting = false;
        this.soundObjects.callConnecting.pause();
        this.soundObjects.callConnecting.currentTime = 0;
      }
    };

    return {
      play,
      stop
    };
  }

  public playMessageNew = (): Promise<void> =>
    this.soundObjects.messageNew.play()

  public playCallRejected = (): Promise<void> =>
    this.soundObjects.callRejected.play()

  public playCallEnded = (): Promise<void> =>
    this.soundObjects.callEnded.play()
}
