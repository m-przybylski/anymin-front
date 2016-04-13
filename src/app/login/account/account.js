(function() {

  function AccountFormController($scope, $timeout, $state, $filter, proTopWaitingLoaderService, User) {
    var vm = this

    vm.current = 2
    vm.isPending = false

    // User input variables
    vm.account = {
      phoneNumber: {
        prefix: null,
        number: null
      },
      password: ''
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

    vm.login = () => {
      if (!vm.isPending) {
        vm.isPending = true
        proTopWaitingLoaderService.immediate()
        User.login({
          msisdn: vm.account.phoneNumber.prefix + '' + vm.account.phoneNumber.number,
          password: vm.account.password
        }).then((response)=> {
          vm.isPending = false
          proTopWaitingLoaderService.stopLoader()
          $state.go('app.dashboard.start')
        }, (error) => {
          vm.isPending = false
          proTopWaitingLoaderService.stopLoader()
          //TODO: move console log to alerts service
          console.log($filter('translate')('LOGIN.BAD_LOGIN_CREDENTIALS'))
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
    'ui.router'
  ])
  .config(config)
  .controller('AccountFormController', AccountFormController)

}())