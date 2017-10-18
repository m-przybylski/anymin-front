export class NavigatorWrapper {

  private navigator: any

  private static videoConstraints: MediaStreamConstraints = {
    video: {
      width: { min: 320, ideal: 640, max: 640 },
      height: { min: 240, ideal: 480, max: 480 },
      frameRate: 30
    }
  }

  private static audioConstraints: MediaStreamConstraints = {
    audio: {
      echoCancelation: true
    }
  }

  constructor() {
    this.navigator = window['navigator']
    this.navigator.getUserMedia =
      this.navigator.getUserMedia || this.navigator.mozGetUserMedia || this.navigator.webkitGetUserMedia

    if (typeof this.navigator.mediaDevices !== 'object') {
      this.navigator.mediaDevices = {}
    }

    if (this.navigator.mediaDevices.getUserMedia) {
      this.navigator.getUserMedia = (arg: MediaStreamConstraints, t: any, c: any): Promise<MediaStream> =>
        this.navigator.mediaDevices.getUserMedia(arg).then(t).catch(c)
    }
  }

  public getUserMediaStream = (config: MediaStreamConstraints): Promise<MediaStream> =>
    new Promise((resolve, reject): void => {
      this.navigator.getUserMedia(
        config,
        (stream: MediaStream) => resolve(stream),
        (err: any) => reject(err)
      )
    })

  public static getAllConstraints = (): MediaStreamConstraints =>
    Object.assign(NavigatorWrapper.audioConstraints, NavigatorWrapper.videoConstraints)
}
