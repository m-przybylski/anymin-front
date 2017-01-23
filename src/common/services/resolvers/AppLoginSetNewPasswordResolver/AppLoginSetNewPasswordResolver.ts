(function() {
  function AppLoginSetNewPasswordResolver($state, $filter, $timeout, $q, loginStateService, topAlertService, RecoverPasswordApi) {


    let _resolve = (stateParams) => {

      let _deferred = $q.defer()

      let _smsTokenPath = () => {
        _deferred.resolve({
          method: 'SMS',
          payload: {
            msisdn: loginStateService.getFullPhoneNumber(),
            token: stateParams.token  
          }
        })
      }

      let _emailTokenPath = () => {

        RecoverPasswordApi.postRecoverPasswordVerifyEmail({
          token: stateParams.token
        }).$promise.then(() => {
          _deferred.resolve({
            method: 'EMAIL',
            payload: {
              token: stateParams.token
            }
          })
        }, () => {
          _deferred.reject()
          topAlertService.warning({
            message: $filter('translate')('LOGIN.FORGOT_PASSWORD.BAD_EMAIL_TOKEN'),
            timeout: 5
          })
          $timeout(() => {
            $state.go('app.login.account')
          })
        })
        
        
      }

      if (stateParams.token.length === 0) {
        _deferred.reject()

        topAlertService.warning({
          message: 'No token. Try again'
        })
         
        $timeout(() => {
          $state.go('app.login.account')
        })
        
      } else {

        if (stateParams.method === 'sms') {
          _smsTokenPath()
        } else {
          _emailTokenPath()
        }
        
      }

      return _deferred.promise
    }

    return {
      resolve: _resolve
    }
  }


  angular.module('profitelo.services.resolvers.app.login.set-new-password', [
    'profitelo.swaggerResources',
    'profitelo.services.top-alert',
    'profitelo.services.login-state'
  ])
  .service('AppLoginSetNewPasswordResolver', AppLoginSetNewPasswordResolver)

}())
