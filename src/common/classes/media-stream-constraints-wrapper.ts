import * as _ from 'lodash'

export class MediaStreamConstraintsWrapper {

  private actualConstraints: MediaStreamConstraints

  private static readonly videoConstraints: MediaStreamConstraints = {
    video: {
      width: 320,
      height: 200,
      frameRate: 15
    }
  }

  private static readonly audioConstraints: MediaStreamConstraints = {
    audio: {
      echoCancelation: true
    }
  }

  constructor() {
    this.actualConstraints = _.cloneDeep(MediaStreamConstraintsWrapper.getDefault())
  }

  public static getDefault = (): MediaStreamConstraints =>
    MediaStreamConstraintsWrapper.audioConstraints;

  public addAudio = (): void => {
    this.actualConstraints.audio = MediaStreamConstraintsWrapper.audioConstraints.audio
  }

  public removeAudio = (): void => {
    if (this.actualConstraints.audio)
      delete this.actualConstraints.audio;
  }

  public addVideo = (): void => {
    this.actualConstraints.video = MediaStreamConstraintsWrapper.videoConstraints.video
    }

  public removeVideo = (): void => {
    if (this.actualConstraints.video)
      delete this.actualConstraints.video;
  }

  public getConstraints = (): MediaStreamConstraints => this.actualConstraints
}
