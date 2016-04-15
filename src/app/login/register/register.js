(function() {

  function RegisterController($filter, $timeout, $state, proTopWaitingLoaderService, passwordStrengthService, proTopAlertService, accountObject) {
    var vm = this
    vm.passwordStrength = 0
    vm.current = 1
    vm.isPending = false
    vm.rulesAccepted = false

    vm.account = accountObject

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

    vm.completeRegistration = () => {
      proTopAlertService.success($filter('translate')('REGISTER.REGISTRATION_SUCCESS'))
      $state.go('app.dashboard.start')
      
    }

    return vm
  }

  function config($stateProvider) {
    $stateProvider.state('app.login.register', {
      url: '/register',
      controllerAs: 'vm',
      controller: 'RegisterController',
      templateUrl: 'login/register/register.tpl.html',
      resolve: {
        accountObject: (loginStateService, $state, $filter, proTopAlertService) => {
          let _account = loginStateService.getAccountObject()
          $state.go('app.login.account')
          if (_account.phoneNumber.number === null) {
            proTopAlertService.warning($filter('translate')('REGISTER.ENTER_PHONE_NUMBER_FIRST'), null, 3)
            $state.transitionTo('app.login.account', null, {reload: true, notify:true})
          }
          return _account
        }
      }
    })
  }


  angular.module('profitelo.controller.login.register', [
    'ui.router',
    'profitelo.directives.password-strength-service',
    'profitelo.services.login-state',
    'profitelo.directives.pro-top-alert-service'
  ])
  .config(config)
  .controller('RegisterController', RegisterController)

}())