export class NavigatorWrapper {

  private navigator: any

  constructor() {
    this.navigator = window['navigator']
    this.navigator.getUserMedia =
      this.navigator.getUserMedia || this.navigator.mozGetUserMedia || this.navigator.webkitGetUserMedia

    if (typeof this.navigator.mediaDevices !== 'object') {
      this.navigator.mediaDevices = {}
    }

    if (this.navigator.mediaDevices.getUserMedia) {
      this.navigator.getUserMedia = (arg: MediaStreamConstraints, t: any, c: any): Promise<MediaStream> => {
        return this.navigator.mediaDevices.getUserMedia(arg).then(t).catch(c)
      }
    }
  }

  public getUserMediaStream = (config: MediaStreamConstraints): Promise<MediaStream> => {
    return new Promise((resolve, reject): void => {
      this.navigator.getUserMedia(
        config,
        (stream: MediaStream) => resolve(stream),
        (err: any) => reject(err)
      )
    })
  }
}
