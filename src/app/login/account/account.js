(function() {

  function AccountFormController($scope, $state, $filter, AccountApi, proTopWaitingLoaderService, User, proTopAlertService, loginStateService, CommonSettingsService) {
    var vm = this

    vm.isPending = false
    vm.current = 1
    vm.account = loginStateService.getAccountObject()
    vm.prefix = [
      {
        name:   '+48',
        value:  '+48'
      },
      {
        name:   '+22',
        value:  '+22'
      }
    ]

    vm.account.phoneNumber.prefix = vm.prefix[0].value
    vm.pattern = CommonSettingsService.localSettings.phonePattern

    vm.backToPhoneNumber = () => {
      $scope.phoneNumberForm.$setPristine()
      $scope.passwordForm.$setPristine()
      vm.account.password = null
      vm.current = 1
    }

    let _determinePhoneNumberStatus = (status) => {
      switch (status) {
      case 'REGISTERED':
        vm.current = 2
        break
      case 'NO_PASSWORD':
        $state.go('app.login.forgot-password')
        break
      case 'UNREGISTERED':
      default:
        $state.go('app.login.register')
      }
    }

    vm.getPhoneNumberStatus = () => {
      if (!vm.isPending) {
        vm.isPending = true
        proTopWaitingLoaderService.immediate()
        loginStateService.setAccountObject(vm.account)
        AccountApi.getRegistrationStatusByMsisdn({
          msisdn: vm.account.phoneNumber.prefix + vm.account.phoneNumber.number
        }).$promise.then((response) => {
          vm.isPending = false
          _determinePhoneNumberStatus(response.status)
          proTopWaitingLoaderService.stopLoader()
        }, (error) => {
          vm.isPending = false
          proTopAlertService.error({
            message: $filter('translate')('INTERFACE.API_ERROR'),
            timeout: 4
          })
          proTopWaitingLoaderService.stopLoader()
        })
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
          loginStateService.clearServiceObject()
          proTopAlertService.success({
            message: $filter('translate')('LOGIN.SUCCESSFUL_LOGIN'),
            timeout: 5
          })
        }, (error) => {
          vm.isPending = false
          proTopWaitingLoaderService.stopLoader()
          proTopAlertService.warning({
            message: $filter('translate')('LOGIN.BAD_LOGIN_CREDENTIALS'),
            timeout: 5
          })
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
    'profitelo.services.login-state',
    'profitelo.directives.pro-top-alert-service',
    'profitelo.swaggerResources',
    'profitelo.directives.pro-top-waiting-loader-service',
    'profitelo.services.commonSettings'
  ])
  .config(config)
  .controller('AccountFormController', AccountFormController)

}())
