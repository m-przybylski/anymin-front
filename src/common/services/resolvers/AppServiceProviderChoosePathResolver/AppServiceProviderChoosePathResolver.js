(function() {
  function AppServiceProviderChoosePathResolver($state, $q, proTopAlertService, User, ProfileApi) {

    let _resolve = () => {
      let _deferred = $q.defer()

      User.getStatus().then(() => {
        ProfileApi.getProfile({
          profileId: User.getData('id')
        }).$promise.then((response) => {
          if (!!response.expertDetails && !response.organizataionDetails) {
            $state.go('app.dashboard.service-provider.individual-path')
          } else if (response.organizataionDetails) {
            $state.go('app.dashboard.service-provider.company-path')
          } else {
            $state.go('app.dashboard.service-provider.company-path')
            // TODO when wizard is done
            // $state.go('app.dashboard.client.favourites')
          }
          _deferred.resolve(response)
        }, () => {
          _deferred.resolve(null)
        })
      }, (error) => {
        $state.go('app.dashboard')
        proTopAlertService.error({
          message: 'error',
          timeout: 4
        })
      })

      return _deferred.promise
    }

    return {
      resolve: _resolve
    }
  }

  angular.module('profitelo.services.resolvers.app.service-provider-choose-path', [
    'profitelo.swaggerResources',
    'profitelo.services.pro-top-alert-service',
    'c7s.ng.userAuth',
    'profitelo.services.login-state'
  ])
  .service('AppServiceProviderChoosePathResolver', AppServiceProviderChoosePathResolver)

}())
