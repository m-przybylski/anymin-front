(function() {

  function AccountFormController($scope, $timeout, proTopWaitingLoaderService) {
    var vm = this

    vm.current = 1
    vm.isPending = false

    // User input variables
    vm.phoneNumber = {
      prefix: '',
      number: ''
    }

    vm.backToPhoneNumber = () => {
      $scope.phoneNumberForm.$setPristine()
      vm.current = 1
    }

    vm.getPhoneNumberStatus = () => {
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
    $stateProvider.state('app.login.account', {
      url: '/account',
      controllerAs: 'vm',
      controller: 'AccountFormController',
      templateUrl: 'login/account/account.tpl.html'
    })
  }


  angular.module('profitelo.controller.login.account', [
    'ui.router'
  ])
  .config(config)
  .controller('AccountFormController', AccountFormController)

}())