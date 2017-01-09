(function () {

  function service($q: ng.IQService) {

    navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia

    if (typeof navigator.mediaDevices !== 'object') {
      navigator.mediaDevices = new MediaDevices()
    }

    if (navigator.mediaDevices.getUserMedia) {
      navigator.getUserMedia = (arg, t, c) => {
        return navigator.mediaDevices.getUserMedia(arg).then(t).catch(c)
      }
    }

    const getAudioConstraints = () =>
      ({
        audio: {
          echoCancellation: true
        }
      })

    const getVideoConstraints = () =>
      ({
        video: {
          width: 320,
          height: 200,
          frameRate: 15
        }
      })

    const getAllConstraints = () =>
      Object.assign(getAudioConstraints(), getVideoConstraints())

    const getUserMediaStreamByConfig = (configFunction) => {
      const deferred = $q.defer()

      navigator.getUserMedia(
        configFunction(),
        stream => deferred.resolve(stream),
        err => deferred.reject(err)
      )

      return deferred.promise
    }

    const getUserMediaStream = () =>
      getUserMediaStreamByConfig(getAllConstraints)

    const getUserVideoStream = () =>
      getUserMediaStreamByConfig(getVideoConstraints)

    const getUserAudioStream = () =>
      getUserMediaStreamByConfig(getAudioConstraints)

    return {
      getUserMediaStream: getUserMediaStream,
      getUserAudioStream: getUserAudioStream,
      getUserVideoStream: getUserVideoStream,
      getVideoConstraints: getVideoConstraints,
      getAudioConstraints: getAudioConstraints,
      getAllConstraints: getAllConstraints
    }
  }

  angular.module('profitelo.services.navigator', [])
    .service('navigatorService', service)

}())
