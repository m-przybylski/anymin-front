(function() {

  function RegisterController($filter, $timeout, proTopWaitingLoaderService, passwordStrengthService, loginStateService) {
    var vm = this
    vm.passwordStrength = 0
    vm.current = 1
    vm.isPending = false
    vm.rulesAccepted = false
    
    vm.back = () => {
      vm.current -= 1
    }

    vm.onPasswordChange = (password) => {
      vm.passwordStrength = passwordStrengthService(password)
    }

    vm.getSmsCodeStatus = () => {
      if (!vm.isPending) {
        vm.isPending = true
        proTopWaitingLoaderService.immediate()
        $timeout(function() {
          vm.isPending = false
          vm.current = 2
          proTopWaitingLoaderService.stopLoader()
        }, Math.floor((Math.random() * 20) + 1) * 100)
      }
    }

    vm.getEmailStatus = () => {
      if (!vm.isPending) {
        vm.isPending = true
        proTopWaitingLoaderService.immediate()
        $timeout(function() {
          vm.isPending = false
          vm.current = 3
          proTopWaitingLoaderService.stopLoader()
        }, Math.floor((Math.random() * 20) + 1) * 100)
      }
    }

    vm.getPasswordStatus = () => {
      if (!vm.isPending) {
        vm.isPending = true
        proTopWaitingLoaderService.immediate()
        $timeout(function() {
          vm.isPending = false
          vm.current = 1
          proTopWaitingLoaderService.stopLoader()
        }, Math.floor((Math.random() * 20) + 1) * 100)
      }
    }
    return vm
  }

  function config($stateProvider) {
    $stateProvider.state('app.login.register', {
      url: '/register',
      controllerAs: 'vm',
      controller: 'RegisterController',
      templateUrl: 'login/register/register.tpl.html'
    })
  }


  angular.module('profitelo.controller.login.register', [
    'ui.router',
    'profitelo.directives.password-strength-service',
    'profitelo.services.login-state'
  ])
  .config(config)
  .controller('RegisterController', RegisterController)

}())