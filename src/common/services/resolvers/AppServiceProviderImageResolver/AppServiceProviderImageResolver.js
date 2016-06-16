(function() {
  function AppServiceProviderImageResolver($q, proTopAlertService, FilesApi) {

    let _resolve = (token) => {
      let _deferred = $q.defer()

      FilesApi.fileInfoPath({
        token: token
      }).$promise.then((response)=> {
        _deferred.resolve(response)
      }, () => {
        _deferred.resolve(null)
      }, (error) => {
        proTopAlertService.error({
          message: 'error',
          timeout: 4
        })
      })

      _deferred.promise.then((result)=>{
        return result.meta.downloadUrl
      })

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
