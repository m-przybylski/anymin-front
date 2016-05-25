(function() {
  function ForgotPasswordController($state, account, RecoverPasswordApi, proTopWaitingLoaderService, CommonSettingsService) {

    let vm = this
    vm.isPending = false
    vm.account = account
    vm.patternSms = CommonSettingsService.localSettings.smsCodePattern

    vm.forceSmsRecovery = () => {
      $state.go('app.login.forgot-password', { method: 'sms' }, { reload: true })
    }

    vm.submitSmsVerificationCode = () => {
      vm.serverError = false
      if (!vm.isPending) {
        vm.isPending = true
        proTopWaitingLoaderService.immediate()
        RecoverPasswordApi.postRecoverPasswordVerifyMsisdn({
          token: String(vm.smsCode),
          msisdn: String(account.accountObject.phoneNumber.prefix) + String(account.accountObject.phoneNumber.number)
        }).$promise.then(() => {
          vm.isPending = false
          proTopWaitingLoaderService.stopLoader()
          $state.go('app.login.set-new-password', {
            token: String(vm.smsCode),
            method: 'sms'
          })
        }, () => {
          vm.isPending = false
          proTopWaitingLoaderService.stopLoader()
          vm.serverError = true
        })
      }

    }


    return vm

  }

  function config($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.login.forgot-password', {
      url: '/forgot-password/{method:|sms}',
      controllerAs: 'vm',
      controller: 'ForgotPasswordController',
      templateUrl: 'login/forgot-password/forgot-password.tpl.html',
      resolve: {
        account: (AppLoginForgotPasswordResolverService, $stateParams) => {
          return AppLoginForgotPasswordResolverService.resolve($stateParams)
        }
      },
      data : {
        access : UserRolesProvider.getAccessLevel('anon')
      }
    })
  }


  angular.module('profitelo.controller.login.forgot-password', [
    'ui.router',
    'profitelo.services.resolvers.app.login.forgot-password',
    'profitelo.swaggerResources',
    'profitelo.directives.pro-top-alert-service',
    'profitelo.directives.pro-top-waiting-loader-service',
    'profitelo.services.commonSettings',
    'profitelo.directives.interface.pro-input',
    'c7s.ng.userAuth'
  ])
  .config(config)
  .controller('ForgotPasswordController', ForgotPasswordController)

}())