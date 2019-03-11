// tslint:disable-next-line:import-blacklist
import { mapValues } from 'lodash';
import { Injectable } from '@angular/core';

export interface ISoundObject {
  play(): void;

  stop(): void;
}

@Injectable({ providedIn: 'root' })
export class SoundsService {
  private static readonly path: string = './assets/sounds/';

  private static readonly soundFiles = {
    callIncoming: 'call_incoming.wav',
    callConnecting: 'call_connecting.mp3',
    callEnded: 'call_ended.wav',
    callRejected: 'call_rejected.wav',
    messageNew: 'message_new.mp3',
  };

  private soundPaths: {
    [name: string]: string;
  };

  private soundObjects: {
    [name: string]: HTMLAudioElement;
  };

  private isCallConnecting = false;

  constructor() {
    this.soundPaths = mapValues(SoundsService.soundFiles, filename => SoundsService.path + filename);
    this.soundObjects = mapValues(this.soundPaths, path => new Audio(path));
  }

  public callConnectingSound = (): ISoundObject => {
    const play = (): void => {
      if (!this.isCallConnecting) {
        this.isCallConnecting = true;
        this.soundObjects.callConnecting.loop = true;
        void this.soundObjects.callConnecting.play();
      }
    };

    const stop = (): void => {
      if (this.isCallConnecting) {
        this.isCallConnecting = false;
        this.soundObjects.callConnecting.loop = false;
        this.soundObjects.callConnecting.pause();
      }
    };

    return { play, stop };
  };

  public callIncomingSound = (): ISoundObject => {
    const play = (): void => {
      if (!this.isCallConnecting) {
        this.isCallConnecting = true;
        this.soundObjects.callIncoming.loop = true;
        void this.soundObjects.callIncoming.play();
      }
    };

    const stop = (): void => {
      if (this.isCallConnecting) {
        this.isCallConnecting = false;
        this.soundObjects.callIncoming.loop = false;
        this.soundObjects.callIncoming.pause();
      }
    };

    return { play, stop };
  };

  public playMessageNew = (): Promise<void> => this.soundObjects.messageNew.play();

  public playCallRejected = (): Promise<void> => this.soundObjects.callRejected.play();

  public playCallEnded = (): Promise<void> => this.soundObjects.callEnded.play();
}
