// tslint:disable-next-line:import-blacklist
import { merge, cloneDeep } from 'lodash';
import { BrowserUtils } from 'machoke-sdk';

export class NavigatorWrapper {
  public static readonly frontCamera: string = 'user';
  public static readonly backCamera: string = 'environment';

  public static readonly audioConstraints: MediaStreamConstraints = {
    audio: true,
  };

  private videoInputIdArray: ReadonlyArray<string> = [];

  constructor() {
    if (BrowserUtils.isBrowserSupported()) {
      window.navigator.mediaDevices.enumerateDevices().then(this.recognizeDevices);
    }
  }

  public static getVideoConstraints(): MediaStreamConstraints {
    const videoConstraints = NavigatorWrapper.getBrowserVideoConstraints();

    return {
      video: {
        facingMode: NavigatorWrapper.frontCamera,
        width: { ideal: videoConstraints.width },
        height: { ideal: videoConstraints.height },
      },
    };
  }

  public static getAllConstraints(): MediaStreamConstraints {
    return merge({}, NavigatorWrapper.audioConstraints, NavigatorWrapper.getVideoConstraints());
  }

  public getVideoInputDevices = (): ReadonlyArray<string> => this.videoInputIdArray;

  public getUserMediaStream = (constraints: MediaStreamConstraints): Promise<MediaStream> =>
    window.navigator.mediaDevices.getUserMedia(constraints);

  public getAllConstraintsWithToggledCamera = (facingMode: string, cameraIndex: number): MediaStreamConstraints => {
    const defaultVideoConstraints: MediaStreamConstraints = cloneDeep(NavigatorWrapper.getVideoConstraints());

    if (typeof defaultVideoConstraints.video === 'object') {
      defaultVideoConstraints.video.facingMode = facingMode;
      defaultVideoConstraints.video.deviceId = this.videoInputIdArray[cameraIndex];
    }

    return merge({}, cloneDeep(NavigatorWrapper.audioConstraints), defaultVideoConstraints);
  };

  private static getBrowserVideoConstraints(): { height: number; width: number } {
    return BrowserUtils.isSafari()
      ? {
          height: 480,
          width: 640,
        }
      : {
          height: 720,
          width: 1280,
        };
  }

  private recognizeDevices = (deviceInfos: ReadonlyArray<MediaDeviceInfo>): void => {
    this.videoInputIdArray = deviceInfos
      .filter(deviceInfo => deviceInfo.kind === 'videoinput')
      .map(deviceInfo => deviceInfo.deviceId);
  };
}
