(function() {

  function AccountFormController($q, $timeout, proTopWaitingLoaderService) {
    var vm = this

    vm.current = 1
    vm.groupsHistory = []

    vm.isPending = false

    // User input variables
    vm.phoneNumber = {
      prefix: '',
      number: ''
    }

    vm.getPhoneNumberStatus = () => {
      if (!vm.isPending) {
        vm.isPending = true
        proTopWaitingLoaderService.immediate()
        $timeout(function() {
          vm.isPending = false
          vm.next(2)
          proTopWaitingLoaderService.stopLoader()
        }, Math.floor((Math.random() * 20) + 1) * 100)
      }
    }

    vm.next = (stepNumber = -1) => {
      vm.groupsHistory.push(vm.current)
      if (stepNumber >= 0) {
        vm.current = stepNumber
      } else {
        vm.current++
      }

    }

    vm.prev = () => {

      if (vm.groupsHistory[vm.groupsHistory.length - 1] >= 1) {
        vm.current = vm.groupsHistory.pop()
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