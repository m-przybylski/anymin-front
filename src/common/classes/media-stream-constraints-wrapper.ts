export class MediaStreamConstraintsWrapper {

  private actualConstraints: MediaStreamConstraints

  private static videoConstraints: MediaStreamConstraints = {
    video: {
      width: 320,
      height: 200,
      frameRate: 15
    }
  }

  private static audioConstraints: MediaStreamConstraints = {
    audio: {
      echoCancelation: true
    }
  }

  constructor() {
    this.actualConstraints = MediaStreamConstraintsWrapper.getDefault();
  }

  public static getDefault = (): MediaStreamConstraints =>
    MediaStreamConstraintsWrapper.audioConstraints;

  public addAudio = (): void => {
    this.actualConstraints = Object.assign(this.actualConstraints, MediaStreamConstraintsWrapper.audioConstraints);
  }

  public removeAudio = (): void => {
    if (this.actualConstraints.audio)
      delete this.actualConstraints.audio;
  }

  public addVideo = (): void => {
    this.actualConstraints = Object.assign(this.actualConstraints, MediaStreamConstraintsWrapper.videoConstraints);
  }

  public removeVideo = (): void => {
    if (this.actualConstraints.video)
      delete this.actualConstraints.video;
  }

  public getConstraints = (): MediaStreamConstraints => {
    return this.actualConstraints;
  }
}
