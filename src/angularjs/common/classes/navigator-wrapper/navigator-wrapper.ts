import * as _ from 'lodash';

export class NavigatorWrapper {

  public static readonly frontCamera: string = 'user';
  public static readonly backCamera: string = 'environment';
  private navigator: any;

  private static videoConstraints: MediaStreamConstraints = {
    video: {
      width: { min: 320, ideal: 640, max: 640 },
      height: { min: 240, ideal: 480, max: 480 },
      frameRate: 30
    }
  };

  private static audioConstraints: MediaStreamConstraints = {
    audio: {
      echoCancelation: true
    }
  };
  private videoInputIdArray: string[] = [];

  static $inject = [];

  constructor() {
    this.navigator = window['navigator'];
    this.navigator.getUserMedia =
      this.navigator.getUserMedia || this.navigator.mozGetUserMedia || this.navigator.webkitGetUserMedia;

    if (typeof this.navigator.mediaDevices !== 'object') {
      this.navigator.mediaDevices = {};
    }

    if (this.navigator.mediaDevices.getUserMedia) {
      this.navigator.getUserMedia = (arg: MediaStreamConstraints, t: any, c: any): Promise<MediaStream> =>
        this.navigator.mediaDevices.getUserMedia(arg).then(t).catch(c);
    }

    if (typeof this.navigator.mediaDevices.enumerateDevices !== 'undefined') {
      this.navigator.mediaDevices.enumerateDevices().then(this.recognizeDevices);
    }
  }

  private recognizeDevices = (deviceInfos: MediaDeviceInfo[]): void => {
    this.videoInputIdArray =
      deviceInfos
        .filter(deviceInfo => deviceInfo.kind === 'videoinput')
        .map(deviceInfo => deviceInfo.deviceId);
  }

  public getUserMediaStream = (config: MediaStreamConstraints): Promise<MediaStream> =>
    new Promise((resolve, reject): void => {
      this.navigator.getUserMedia(
        config,
        (stream: MediaStream) => resolve(stream),
        (err: any) => reject(err)
      );
    })

  public static getAllConstraints = (): MediaStreamConstraints =>
    Object.assign(NavigatorWrapper.audioConstraints, NavigatorWrapper.videoConstraints)

  public getAllConstraintsWithToggledCamera = (facingMode: string, cameraIndex: number): MediaStreamConstraints => {
    const defaultVideoConstraints: MediaStreamConstraints = _.cloneDeep(NavigatorWrapper.videoConstraints);

    if (typeof defaultVideoConstraints.video === 'object') {
      defaultVideoConstraints.video.facingMode = facingMode;
      defaultVideoConstraints.video.deviceId = this.videoInputIdArray[cameraIndex];
    }
    return _.merge({}, _.cloneDeep(NavigatorWrapper.audioConstraints), defaultVideoConstraints);
  }
}
