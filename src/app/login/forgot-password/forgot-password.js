(function() {

  function ForgotPasswordController($state, loginStateService, proTopWaitingLoaderService, $timeout) {

    let vm = this
    vm.isPending = false
    vm.account = loginStateService.getAccountObject()
    vm.current = 1
    // if (vm.account.phoneNumber.number === null || vm.account.phoneNumber.prefix === null) {
    //   $state.go('app.login.account')
    // }

    vm.getSmsCodeStatus = () => {
      if (!vm.isPending) {
        vm.isPending = true
        proTopWaitingLoaderService.immediate()
        $timeout(function() {
          vm.isPending = false
          $state.go('app.login.set-new-password')
          proTopWaitingLoaderService.stopLoader()
        }, Math.floor((Math.random() * 20) + 1) * 100)
      }
    }

    vm.goToSms = () => {
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

    return vm

  }

  function config($stateProvider) {
    $stateProvider.state('app.login.forgot-password', {
      url: '/forgot-password',
      controllerAs: 'vm',
      controller: 'ForgotPasswordController',
      templateUrl: 'login/forgot-password/forgot-password.tpl.html'
    })
  }


  angular.module('profitelo.controller.login.forgot-password', [
    'ui.router',
    'profitelo.services.login-state'
  ])
  .config(config)
  .controller('ForgotPasswordController', ForgotPasswordController)

}())