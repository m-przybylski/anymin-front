import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export enum MicrophoneStateEnum {
  GOOD,
  MUTED,
}

@Injectable({ providedIn: 'root' })
export class MicrophoneService {
  private microphoneStatusEmitter: BehaviorSubject<MicrophoneStateEnum> = new BehaviorSubject(MicrophoneStateEnum.GOOD);

  public onMicrophoneStatusChange(fn: (m: MicrophoneStateEnum) => void): void {
    this.microphoneStatusEmitter.subscribe(fn);
  }

  public startAudioStreamListening(track: MediaStreamTrack): void {
    if (track.muted) {
      this.microphoneStatusEmitter.next(MicrophoneStateEnum.MUTED);
    }
    track.onmute = (): void => this.microphoneStatusEmitter.next(MicrophoneStateEnum.MUTED);
    track.onunmute = (): void => this.microphoneStatusEmitter.next(MicrophoneStateEnum.GOOD);
  }
}
