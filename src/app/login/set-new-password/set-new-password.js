(function() {

  function SetNewPasswordController($state, $filter, tokenStatus, passwordStrengthService, proTopWaitingLoaderService, proTopAlertService, RecoverPasswordApi, CommonSettingsService) {

    let vm = this
    vm.patternPassword = CommonSettingsService.localSettings.passwordPattern

    let _passwordChangeError = () => {
      $state.go('app.login.account')
      proTopAlertService.error({
        message: $filter('translate')('INTERFACE.API_ERROR'),
        timeout: 2
      })
    }
    
    let _passwordChangeSuccess = () => {
      $state.go('app.login.account')
      proTopAlertService.success({
        message: $filter('translate')('LOGIN.PASSWORD_RECOVERY.PASSWORD_HAD_BEEN_CHANGED'),
        timeout: 3
      })
    }
    
    let _submitPasswordChangeBySms = () => {
      tokenStatus.payload.password = vm.newPassword
      RecoverPasswordApi.putRecoverPasswordMsisdn(tokenStatus.payload).$promise.then(_passwordChangeSuccess, _passwordChangeError)
    }

    let _submitPasswordChangeByEmail = () => {
      tokenStatus.payload.password = vm.newPassword
      RecoverPasswordApi.putRecoverPasswordEmail(tokenStatus.payload).$promise.then(_passwordChangeSuccess, _passwordChangeError)
    }


    vm.onPasswordChange = (password) => {
      vm.passwordStrength = passwordStrengthService(password)
    }

    vm.submitPasswordChange = () => {

      if (tokenStatus.method === 'SMS') {
        _submitPasswordChangeBySms()
      } else {
        _submitPasswordChangeByEmail()
      }

    }

    return vm

  }

  function config($stateProvider) {
    $stateProvider.state('app.login.set-new-password', {
      url: '/set-new-password/token/:token/{method:|sms}',
      controllerAs: 'vm',
      controller: 'SetNewPasswordController',
      templateUrl: 'login/set-new-password/set-new-password.tpl.html',
      resolve: {
        tokenStatus: ($stateParams, AppLoginSetNewPasswordResolver) => {
          return AppLoginSetNewPasswordResolver.resolve($stateParams)
        }
      }
    })
  }


  angular.module('profitelo.controller.login.set-new-password', [
    'ui.router',
    'profitelo.services.login-state',
    'c7s.providers.stateDelay',
    'profitelo.services.login-state',
    'profitelo.directives.pro-top-alert-service',
    'profitelo.directives.pro-top-waiting-loader-service',
    'profitelo.directives.password-strength-service',
    'profitelo.services.resolvers.app.login.set-new-password',
    'profitelo.swaggerResources',
    'profitelo.services.commonSettings'
  ])
  .config(config)
  .controller('SetNewPasswordController', SetNewPasswordController)

}())