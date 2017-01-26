namespace profitelo.services.navigator {

  export interface INavigatorService {
    getUserMediaStream(): ng.IPromise<MediaStream>
  }

  class NavigatorService implements INavigatorService {

    private navigator: any

    private static videoConstraints = {
      video: {
        width: 320,
        height: 200,
        frameRate: 15
      }
    }

    private static audioConstraints = {
      audio: {
        echoCancellation: true
      }
    }

    constructor(private $q: ng.IQService) {
      this.navigator = window["navigator"]
      this.navigator.getUserMedia =
        this.navigator.getUserMedia || this.navigator.mozGetUserMedia || this.navigator.webkitGetUserMedia

      if (typeof this.navigator.mediaDevices !== 'object') {
        this.navigator.mediaDevices = {}
      }

      if (this.navigator.mediaDevices.getUserMedia) {
        this.navigator.getUserMedia = (arg, t, c) => {
          return this.navigator.mediaDevices.getUserMedia(arg).then(t).catch(c)
        }
      }
    }

    public getUserMediaStream = () => {
      return this.getUserMediaStreamByConfig(NavigatorService.getAllConstraints)
    }

    private getUserMediaStreamByConfig = (configFunction) => {
      const deferred = this.$q.defer()

      this.navigator.getUserMedia(
        configFunction(),
        stream => deferred.resolve(stream),
        err => deferred.reject(err)
      )

      return deferred.promise
    }

    private static getAllConstraints = () => {
      return Object.assign(NavigatorService.audioConstraints, NavigatorService.videoConstraints)
    }
  }

  angular.module('profitelo.services.navigator', [])
  .service('navigatorService', NavigatorService)
}