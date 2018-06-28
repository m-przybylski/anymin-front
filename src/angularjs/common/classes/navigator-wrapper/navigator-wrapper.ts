// tslint:disable:readonly-array
// tslint:disable:newline-before-return
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';

export class NavigatorWrapper {

  public static readonly frontCamera = 'user';
  public static readonly backCamera = 'environment';

  public static videoConstraints: MediaStreamConstraints = {
    video: {
      width: { min: 320, ideal: 640, max: 640 },
      height: { min: 240, ideal: 480, max: 480 },
      frameRate: 30
    }
  };

  public static audioConstraints: MediaStreamConstraints = {
    audio: {
      echoCancelation: true
    }
  };
  private videoInputIdArray: string[] = [];

  constructor() {
    window.navigator.mediaDevices.enumerateDevices().then(this.recognizeDevices);
  }

  public static getAllConstraints = (): MediaStreamConstraints =>
    // tslint:disable-next-line:prefer-object-spread
    Object.assign(NavigatorWrapper.audioConstraints, NavigatorWrapper.videoConstraints)

  public getVideoInputDevices = (): string[] =>
    this.videoInputIdArray

  public hasMoreThanOneCamera = (): Promise<boolean> =>
    window.navigator.mediaDevices.enumerateDevices()
      .then(this.recognizeDevices)
      .then(() => this.videoInputIdArray.length > 1)

  public getUserMediaStream = (config: MediaStreamConstraints): Promise<MediaStream> =>
    window.navigator.mediaDevices.getUserMedia(config)

  public getAllConstraintsWithToggledCamera = (facingMode: string, cameraIndex: number): MediaStreamConstraints => {
    const defaultVideoConstraints: MediaStreamConstraints = _.cloneDeep(NavigatorWrapper.videoConstraints);

    if (typeof defaultVideoConstraints.video === 'object') {
      defaultVideoConstraints.video.facingMode = facingMode;
      defaultVideoConstraints.video.deviceId = this.videoInputIdArray[cameraIndex];
    }
    return _.merge({}, _.cloneDeep(NavigatorWrapper.audioConstraints), defaultVideoConstraints);
  }

  private recognizeDevices = (deviceInfos: MediaDeviceInfo[]): void => {
    this.videoInputIdArray =
      deviceInfos
        .filter(deviceInfo => deviceInfo.kind === 'videoinput')
        .map(deviceInfo => deviceInfo.deviceId);
  }
}
