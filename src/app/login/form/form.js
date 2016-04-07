(function() {

  function LoginFormController($q, $timeout) {
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
        $timeout(function() {
          vm.isPending = false
          vm.next(2)
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

      if (vm.groupsHistory[vm.groupsHistory.length -1] >= 1) {
        vm.current = vm.groupsHistory.pop()
      }

    }

    return vm
  }

  function config($stateProvider) {
    $stateProvider.state('app.login.form', {
      url: '/form',
      controllerAs: 'vm',
      controller: 'LoginFormController',
      templateUrl: 'login/form/form.tpl.html'
    })
  }


  angular.module('profitelo.controller.login.form', [
    'ui.router'
  ])
  .config(config)
  .controller('LoginFormController', LoginFormController)

}())