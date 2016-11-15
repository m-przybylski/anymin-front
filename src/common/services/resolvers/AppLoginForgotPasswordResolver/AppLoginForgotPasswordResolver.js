(function() {
  function AppLoginForgotPasswordResolverService($q, $timeout, $filter, $state, proTopAlertService, loginStateService, RecoverPasswordApi) {

    
    let _resolve = (stateParams) => {
      let _deferred = $q.defer()

      let _account = loginStateService.getAccountObject()

      let _handleError = () => {
        _deferred.reject()
        proTopAlertService.error({
          message: $filter('translate')('LOGIN.PASSWORD_RECOVERY.ERROR')
        })
        $timeout(()=>{
          $state.go('app.login.account')
        })
      }

      let _requestPasswordRecovery = (method) => {
        return RecoverPasswordApi.postRecoverPassword({
          method: method,
          msisdn: _account.phoneNumber.prefix + '' + _account.phoneNumber.number
        }).$promise
      }

      let _noEmailRecoveryPath = () => {
        _requestPasswordRecovery('SMS').then(()=> {
          _deferred.resolve({
            accountObject: _account,
            recoveryMethod: 'SMS'
          })
        }, _handleError)
      }

      if (_account.phoneNumber.number === null) {
        _handleError()
      } else {
        if (stateParams.method === 'sms') {
          _noEmailRecoveryPath()
        } else {
          _requestPasswordRecovery('EMAIL').then(()=> {
            _deferred.resolve({
              accountObject: _account,
              recoveryMethod: 'EMAIL'
            })
          }, _noEmailRecoveryPath)
        }
      }

      return _deferred.promise
    }
    
    return {
      resolve: _resolve
    } 
  }

  angular.module('profitelo.services.resolvers.app.login.forgot-password', [
    'profitelo.swaggerResources',
    'profitelo.services.login-state',
    'profitelo.services.pro-top-alert-service'
  ])
  .service('AppLoginForgotPasswordResolverService', AppLoginForgotPasswordResolverService)

  
}())
