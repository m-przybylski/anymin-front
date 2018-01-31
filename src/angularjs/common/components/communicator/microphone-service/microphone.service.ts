import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export enum MicrophoneStateEnum {
  GOOD,
  MUTED
}

export class MicrophoneService {

  private microphoneStatusEmitter: BehaviorSubject<MicrophoneStateEnum> = new BehaviorSubject(MicrophoneStateEnum.GOOD);

  static $inject = [];

  constructor() {
  }

  public onMicrophoneStatusChange = (fn: (m: MicrophoneStateEnum) => void): void => {
    this.microphoneStatusEmitter.subscribe(fn);
  }

  public startAudioStreamListening = (track: MediaStreamTrack): void => {
    track.muted && this.microphoneStatusEmitter.next(MicrophoneStateEnum.MUTED);
    track.onmute = (): void => this.microphoneStatusEmitter.next(MicrophoneStateEnum.MUTED);
    track.onunmute = (): void => this.microphoneStatusEmitter.next(MicrophoneStateEnum.GOOD);
  }

}
