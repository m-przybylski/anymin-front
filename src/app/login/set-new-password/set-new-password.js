(function() {

  function SetNewPasswordController($state, $stateParams, validateToken, loginStateService, passwordStrengthService) {

    console.log(validateToken)
    let vm = this
    vm.back = ()=> {
      $state.go('app.login.forgot-password')
    }
    vm.onPasswordChange = (password) => {
      vm.passwordStrength = passwordStrengthService(password)
    }

    return vm

  }

  function config($stateProvider) {
    $stateProvider.state('app.login.set-new-password', {
      url: '/set-new-password/token/:token',
      controllerAs: 'vm',
      controller: 'SetNewPasswordController',
      templateUrl: 'login/set-new-password/set-new-password.tpl.html',
      resolve: {
        validateToken: ($stateParams, $state, stateDelay, proTopAlertService) => {
          if ($stateParams.token.length === '') {
            $state.go('app.login.account')
            stateDelay.onTransition(function() {
              proTopAlertService.warning({
                header: 'No token. Try again'
              })
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
    'profitelo.services.login-state',
    'profitelo.directives.password-strength-service'
  ])
  .config(config)
  .controller('SetNewPasswordController', SetNewPasswordController)

}())