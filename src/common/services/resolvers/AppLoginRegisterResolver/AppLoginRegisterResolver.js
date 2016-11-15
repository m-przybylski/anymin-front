(function() {
  function AppLoginRegisterResolver(loginStateService, $state, $filter, $q, $timeout, proTopAlertService, RegistrationApi) {


    let _resolve = () => {

      let _deferred = $q.defer()

      let _handleError = () => {
        _deferred.reject()
        $timeout(()=>{
          $state.go('app.login.account')
        })
      }

      let _account = loginStateService.getAccountObject()

      if (_account.phoneNumber.number === null) {
        proTopAlertService.warning({
          message: $filter('translate')('REGISTER.ENTER_PHONE_NUMBER_FIRST'),
          timeout: 3
        })
        _handleError()
      } else {
        RegistrationApi.requestVerification({
          msisdn: _account.phoneNumber.prefix + _account.phoneNumber.number
        }).$promise.then((response) => {
          _deferred.resolve({
            sessionId: response.sessionId,
            accountObject: _account
          })
        }, (error) => {
          proTopAlertService.warning({
            message: $filter('translate')('INTERFACE.API_ERROR'),
            timeout: 3
          })
          _handleError()
        })
      }

      return _deferred.promise
    }

    return {
      resolve: _resolve
    }
  }


  angular.module('profitelo.services.resolvers.app.login.register', [
    'profitelo.swaggerResources',
    'profitelo.services.login-state',
    'profitelo.services.pro-top-alert-service'
  ])
  .service('AppLoginRegisterResolver', AppLoginRegisterResolver)

}())
