import * as _ from 'lodash'
import { NavigatorWrapper } from './navigator-wrapper/navigator-wrapper';

export class MediaStreamConstraintsWrapper {

  private actualConstraints: MediaStreamConstraints
  private navigatorWrapper: NavigatorWrapper;
  private currentCamera: string = NavigatorWrapper.frontCamera
  private currentCameraIndex: number = 0

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

  static $inject = [];

  constructor() {
    this.actualConstraints = _.cloneDeep(MediaStreamConstraintsWrapper.getDefault())
    this.navigatorWrapper = new NavigatorWrapper()
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

  public toggleCamera = (): void => {
    this.currentCameraIndex = this.currentCameraIndex === 0 ? 1 : 0;
    this.currentCamera =
      this.currentCamera === NavigatorWrapper.frontCamera ? NavigatorWrapper.backCamera : NavigatorWrapper.frontCamera;

    this.actualConstraints.video =
      _.cloneDeep(this.navigatorWrapper.getAllConstraintsWithToggledCamera(this.currentCamera
        , this.currentCameraIndex).video);
  }
}
