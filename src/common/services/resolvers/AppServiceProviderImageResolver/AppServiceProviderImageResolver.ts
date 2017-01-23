(function() {
  function AppServiceProviderImageResolver($q, FilesApi) {

    let _resolve = (token) => {
      let _deferred = $q.defer()
      if (token !== null) {
        FilesApi.fileInfoPath({
          token: token
        }).$promise.then((response) => {
          if (angular.isDefined(response) && angular.isDefined(response.previews)) {
            _deferred.resolve(response.previews[0]) // TODO change
          } else {
            _deferred.resolve(null)
          }
        }, () => {
          _deferred.resolve(null)
        })
      } else {
        _deferred.resolve(null)
      }

      return _deferred.promise
    }

    return {
      resolve: _resolve
    }
  }


  angular.module('profitelo.services.resolvers.app.service-provider-image-resolver', [
    'profitelo.swaggerResources',
    'profitelo.services.top-alert',
    'c7s.ng.userAuth',
    'profitelo.services.login-state'
  ])
    .service('AppServiceProviderImageResolver', AppServiceProviderImageResolver)

}())
