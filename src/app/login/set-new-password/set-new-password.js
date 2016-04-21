(function() {

  function SetNewPasswordController($state, validateToken, passwordStrengthService) {

    
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
        validateToken: ($stateParams, AppLoginSetNewPasswordResolver) => {
          return AppLoginSetNewPasswordResolver.resolve($stateParams)
        }
      }
    })
  }


  angular.module('profitelo.controller.login.set-new-password', [
    'ui.router',
    'profitelo.services.login-state',
    'c7s.providers.stateDelay',
    'profitelo.services.login-state',
    'profitelo.directives.password-strength-service',
    'profitelo.services.resolvers.app.login.set-new-password'
  ])
  .config(config)
  .controller('SetNewPasswordController', SetNewPasswordController)

}())