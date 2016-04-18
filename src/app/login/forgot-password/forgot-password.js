(function() {

  function ForgotPasswordController($state, account) {

    let vm = this
    vm.isPending = false
    vm.account = account

    vm.forceSmsRecovery = () => {
      $state.go('app.login.forgot-password', { method: 'sms' }, { reload: true })
    }

    // vm.submitSmsVerificationCode

    console.log(account)

    return vm

  }

  function config($stateProvider) {
    $stateProvider.state('app.login.forgot-password', {
      url: '/forgot-password/{method:sms}',
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
    'profitelo.services.resolvers.app.login.forgot-password'
  ])
  .config(config)
  .controller('ForgotPasswordController', ForgotPasswordController)

}())