// tslint:disable:no-empty
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export enum MicrophoneStateEnum {
  GOOD,
  MUTED
}

// tslint:disable:member-ordering
export class MicrophoneService {

  private microphoneStatusEmitter: BehaviorSubject<MicrophoneStateEnum> = new BehaviorSubject(MicrophoneStateEnum.GOOD);

  public static $inject = [];

  constructor() {
  }

  public onMicrophoneStatusChange = (fn: (m: MicrophoneStateEnum) => void): void => {
    this.microphoneStatusEmitter.subscribe(fn);
  }

  public startAudioStreamListening = (track: MediaStreamTrack): void => {
    if (track.muted) {
      this.microphoneStatusEmitter.next(MicrophoneStateEnum.MUTED);
    }
    track.onmute = (): void => this.microphoneStatusEmitter.next(MicrophoneStateEnum.MUTED);
    track.onunmute = (): void => this.microphoneStatusEmitter.next(MicrophoneStateEnum.GOOD);
  }

}
