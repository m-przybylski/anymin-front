(function() {
  function AppLoginSetNewPasswordResolver($state, $timeout, $q, proTopAlertService) {


    let _resolve = (stateParams) => {

      let _deferred = $q.defer()

      if (stateParams.token.length === '') {
        _deferred.reject()

        proTopAlertService.warning({
          message: 'No token. Try again'
        })
         
        $timeout(() => {
          $state.go('app.login.account')
        })
        
      } else {
        console.log('dupa')
        // TODO api call to check if code is correct
        _deferred.resolve({
          userId: 21312390432
        })
      }

      return _deferred.promise
    }

    return {
      resolve: _resolve
    }
  }


  angular.module('profitelo.services.resolvers.app.login.set-new-password', [
    'profitelo.swaggerResources',
    'profitelo.directives.pro-top-alert-service'
  ])
  .service('AppLoginSetNewPasswordResolver', AppLoginSetNewPasswordResolver)

}())
