(function() {
  function ForgotPasswordController($state, account, $filter, RecoverPasswordApi, proTopWaitingLoaderService, proTopAlertService) {

    let vm = this
    vm.isPending = false
    vm.account = account

    vm.forceSmsRecovery = () => {
      $state.go('app.login.forgot-password', { method: 'sms' }, { reload: true })
    }

    vm.submitSmsVerificationCode = () => {
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
            token: vm.smsCode,
            method: 'sms'
          })
        }, () => {
          vm.isPending = false
          proTopWaitingLoaderService.stopLoader()
          proTopAlertService.warning({
            message: $filter('translate')('LOGIN.FORGOT_PASSWORD.BAD_SMS_CODE'),
            timeout: 3
          })
        })
      }

    }


    return vm

  }

  function config($stateProvider) {
    $stateProvider.state('app.login.forgot-password', {
      url: '/forgot-password/{method:|sms}',
      controllerAs: 'vm',
      controller: 'ForgotPasswordController',
      templateUrl: 'login/forgot-password/forgot-password.tpl.html',
      resolve: {
        account: (AppLoginForgotPasswordResolverService, $stateParams) => {
          return AppLoginForgotPasswordResolverService.resolve($stateParams)
        }
      }
    })
  }


  angular.module('profitelo.controller.login.forgot-password', [
    'ui.router',
    'profitelo.services.resolvers.app.login.forgot-password',
    'profitelo.swaggerResources',
    'profitelo.directives.pro-top-alert-service',
    'profitelo.directives.pro-top-waiting-loader-service'
  ])
  .config(config)
  .controller('ForgotPasswordController', ForgotPasswordController)

}())