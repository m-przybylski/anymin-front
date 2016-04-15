(function() {

  function AccountFormController($scope, $timeout, $state, $filter, proTopWaitingLoaderService, User, proTopAlertService, loginStateService) {
    var vm = this

    vm.current = 1
    vm.isPending = false
    
    vm.account = loginStateService.getAccountObject()

    vm.backToPhoneNumber = () => {
      $scope.phoneNumberForm.$setPristine()
      $scope.passwordForm.$setPristine()
      vm.current = 1
    }

    vm.getPhoneNumberStatus = () => {
      if (!vm.isPending) {
        vm.isPending = true
        proTopWaitingLoaderService.immediate()
        $timeout(function() {
          vm.isPending = false
          vm.current = 2
          loginStateService.setAccountObject(vm.account)
          proTopWaitingLoaderService.stopLoader()
        }, Math.floor((Math.random() * 20) + 1) * 100)
      }
    }

    vm.login = () => {
      if (!vm.isPending) {
        vm.isPending = true
        proTopWaitingLoaderService.immediate()
        console.log(vm.account)
        User.login({
          msisdn: vm.account.phoneNumber.prefix + '' + vm.account.phoneNumber.number,
          password: vm.account.password
        }).then((response)=> {
          vm.isPending = false
          proTopWaitingLoaderService.stopLoader()
          $state.go('app.dashboard.start')
          proTopAlertService.success($filter('translate')('LOGIN.SUCCESSFUL_LOGIN'), null, 5)
        }, (error) => {
          vm.isPending = false
          proTopWaitingLoaderService.stopLoader()
          proTopAlertService.warning($filter('translate')('LOGIN.BAD_LOGIN_CREDENTIALS'), null, 5)
        })
      }
    }

    return vm
  }

  function config($stateProvider) {
    $stateProvider.state('app.login.account', {
      url: '/account',
      controllerAs: 'vm',
      controller: 'AccountFormController',
      templateUrl: 'login/account/account.tpl.html'
    })
  }

  angular.module('profitelo.controller.login.account', [
    'ui.router',
    'c7s.ng.userAuth',
    'ui.router',
    'profitelo.services.login-state'
  ])
  .config(config)
  .controller('AccountFormController', AccountFormController)

}())