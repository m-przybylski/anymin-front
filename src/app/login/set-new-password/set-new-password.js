(function() {

  function SetNewPasswordController($state, $stateParams, validateToken, loginStateService) {

    console.log(validateToken)
    
    
  }

  function config($stateProvider) {
    $stateProvider.state('app.login.set-new-password', {
      url: '/set-new-password/:method/:token',
      controllerAs: 'vm',
      controller: 'SetNewPasswordController',
      templateUrl: 'login/set-new-password/set-new-password.tpl.html',
      resolve: {
        validateToken: ($stateParams, $state, stateDelay, proTopAlertService) => {
          if ($stateParams.method.length === '' || $stateParams.token.length === '') {
            $state.go('app.login.account')
            stateDelay.onTransition(function() {
              proTopAlertService.warning('No token. Try again')
            })
          } else {
            // TODO api call to check if code is correct
            return {
              userId: 21312390432
            }
          }
        }
      }
    })
  }


  angular.module('profitelo.controller.login.set-new-password', [
    'ui.router',
    'profitelo.services.login-state',
    'c7s.providers.stateDelay',
    'profitelo.services.login-state'
  ])
  .config(config)
  .controller('SetNewPasswordController', SetNewPasswordController)

}())