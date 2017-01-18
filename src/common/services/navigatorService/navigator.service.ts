(function () {
  navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia

  if (typeof navigator.mediaDevices !== 'object') {
    navigator.mediaDevices = <MediaDevices>{}
  }

  if (navigator.mediaDevices.getUserMedia) {
    navigator.getUserMedia = (arg, t, c) => {
      return navigator.mediaDevices.getUserMedia(arg).then(t).catch(c)
    }
  }
})()

module profitelo.services.navigator {

  export let navigator

  export interface INavigatorService {
    getUserMediaStream(): ng.IPromise<MediaStream>
  }

  class NavigatorService implements INavigatorService {

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
    }

    public getUserMediaStream() {
      return this.getUserMediaStreamByConfig(NavigatorService.getAllConstraints)
    }

    private getUserMediaStreamByConfig(configFunction) {
      const deferred = this.$q.defer()

      navigator.getUserMedia(
        configFunction(),
        stream => deferred.resolve(stream),
        err => deferred.reject(err)
      )

      return deferred.promise
    }

    private static getAllConstraints() {
      return Object.assign(NavigatorService.audioConstraints, NavigatorService.videoConstraints)
    }
  }

  angular.module('profitelo.services.navigator', [])
  .service('navigatorService', NavigatorService)
}