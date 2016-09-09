(function() {
  function AppServiceProviderImageResolver($q, proTopAlertService, FilesApi) {

    let _resolve = (token) => {
      let _deferred = $q.defer()
      if (token !== null) {
        FilesApi.fileInfoPath({
          token: token
        }).$promise.then((response)=> {
          _deferred.resolve(response.meta.downloadUrl)
        }, () => {
          _deferred.resolve(null)
        })
      } else {
        _deferred.resolve('')
      }

      return _deferred.promise
    }

    return {
      resolve: _resolve
    }
  }


  angular.module('profitelo.services.resolvers.app.service-provider-image-resolver', [
    'profitelo.swaggerResources',
    'profitelo.directives.pro-top-alert-service',
    'c7s.ng.userAuth',
    'profitelo.services.login-state'
  ])
    .service('AppServiceProviderImageResolver', AppServiceProviderImageResolver)

}())
