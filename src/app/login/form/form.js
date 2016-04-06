(function() {

  function LoginFormController() {
    var vm = this

    vm.current = 1
    vm.groupsHistory = []

    vm.next = () => {
      vm.groupsHistory.push(vm.current)
      vm.current++
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