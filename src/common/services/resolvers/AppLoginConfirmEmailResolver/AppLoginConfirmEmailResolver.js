(function() {
  function AppLoginConfirmEmailResolverService($q, $rootScope, $timeout, $filter, $state, proTopAlertService, User, UserRoles, AccountApi, SessionApi) {
    
    let _resolve = (stateParams) => {
      let _deferred = $q.defer()

      let _handleBadToken = () => {
        _deferred.reject()
        proTopAlertService.error({
          message: $filter('translate')('LOGIN.EMAIL_CONFIRMATION_FAIL'),
          timeout: 4
        })
        $timeout(() => {
          $state.go('app.login.account')
        })
      }

      let _handleGoodToken = (apiKey) => {

        User.setApiKeyHeader(apiKey)
        SessionApi.check().$promise.then((response) => {

          _deferred.resolve()

          delete response.$promise
          delete response.$resolved
          User.setData(response)
          User.setData({role: UserRoles.getRole('user')})

          proTopAlertService.success({
            message: $filter('translate')('LOGIN.EMAIL_CONFIRMATION_SUCCESS'),
            timeout: 4
          })

          $timeout(() => {
            $rootScope.loggedIn = true
            $state.go('app.dashboard.start')
          })

        }, _handleBadToken)


      }

      let _verifyEmailToken = (token) => {

        AccountApi.postAccountVerifyEmail({
          token: token
        }).$promise.then((response) => {
          _handleGoodToken(response.apiKey)
        }, _handleBadToken)

      }

      if (stateParams.token === '') {
        _handleBadToken()
      } else {
        _verifyEmailToken(stateParams.token)
      }


      return _deferred.promise
    }
    
    return {
      resolve: _resolve
    } 
  }

  angular.module('profitelo.services.resolvers.app.login.confirm-email', [
    'profitelo.swaggerResources',
    'profitelo.services.pro-top-alert-service',
    'c7s.ng.userAuth',     
    'profitelo.directives.interface.pro-alert'
  ])
  .service('AppLoginConfirmEmailResolverService', AppLoginConfirmEmailResolverService)

  
}())
