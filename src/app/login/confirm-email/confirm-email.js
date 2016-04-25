(function() {

  function ConfirmEmailResolver($state, $stateParams, $q, $filter, $timeout, proTopAlertService, User, UserRoles, AccountApi, SessionApi) {

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

    let _handleGoodToken = (response) => {

      User.setApiKeyHeader(response.apiKey)
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
          $state.go('app.dashboard.start')
        })

      }, _handleBadToken)


    }

    let _verifyEmailToken = (token) => {

      AccountApi.postAccountVerifyEmail({
        token: token
      }).$promise.then(_handleGoodToken, _handleBadToken)

    }

    if ($stateParams.token === '') {
      _handleBadToken()
    } else {
      _verifyEmailToken($stateParams.token)
    }


    return _deferred.promise

  }

  function config($stateProvider) {
    $stateProvider.state('app.login.confirm-email', {
      url: '/confirm-email/token/:token',
      resolve: {
        account: ConfirmEmailResolver
      }
    })
  }


  angular.module('profitelo.controller.login.confirm-email', [
    'ui.router',
    'profitelo.directives.pro-top-alert-service',
    'profitelo.swaggerResources',
    'c7s.ng.userAuth'
  ])
  .config(config)

}())