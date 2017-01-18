(function() {

  function SetNewPasswordController($state, $filter, tokenStatus, passwordStrengthService: IPasswordStrengthService,
                                    topAlertService, RecoverPasswordApi, CommonSettingsService) {

    this.patternPassword = CommonSettingsService.localSettings.passwordPattern

    let _passwordChangeError = () => {
      $state.go('app.login.account')
      topAlertService.error({
        message: $filter('translate')('INTERFACE.API_ERROR'),
        timeout: 2
      })
    }
    
    let _passwordChangeSuccess = () => {
      $state.go('app.login.account')
      topAlertService.success({
        message: $filter('translate')('LOGIN.PASSWORD_RECOVERY.PASSWORD_HAD_BEEN_CHANGED'),
        timeout: 3
      })
    }
    
    let _submitPasswordChangeBySms = () => {
      tokenStatus.payload.password = this.newPassword
      RecoverPasswordApi.putRecoverPasswordMsisdn(tokenStatus.payload).$promise.then(_passwordChangeSuccess, _passwordChangeError)
    }

    let _submitPasswordChangeByEmail = () => {
      tokenStatus.payload.password = this.newPassword
      RecoverPasswordApi.putRecoverPasswordEmail(tokenStatus.payload).$promise.then(_passwordChangeSuccess, _passwordChangeError)
    }


    this.onPasswordChange = (password) => {
      this.passwordStrength = passwordStrengthService.getStrength(password)
    }

    this.submitPasswordChange = () => {

      if (tokenStatus.method === 'SMS') {
        _submitPasswordChangeBySms()
      } else {
        _submitPasswordChangeByEmail()
      }

    }

    return this

  }

  function config($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.login.set-new-password', {
      url: '/set-new-password/token/:token/{method:|sms}',
      controllerAs: 'vm',
      controller: 'SetNewPasswordController',
      templateUrl: 'login/set-new-password/set-new-password.tpl.html',
      resolve: {
        
        tokenStatus: ($stateParams, AppLoginSetNewPasswordResolver) => {
          /* istanbul ignore next */
          return AppLoginSetNewPasswordResolver.resolve($stateParams)
        }
      },
      data : {
        access : UserRolesProvider.getAccessLevel('anon'),
        pageTitle: 'PAGE_TITLE.LOGIN.SET_NEW_PASSWORD'
      }
    })
  }


  angular.module('profitelo.controller.login.set-new-password', [
    'ui.router',
    'c7s.providers.stateDelay',
    'profitelo.services.login-state',
    'profitelo.services.top-alert',
    'profitelo.services.pro-top-waiting-loader-service',
    'profitelo.services.password-strength',
    'profitelo.services.resolvers.app.login.set-new-password',
    'profitelo.services.commonSettings',
    'profitelo.swaggerResources',
    'profitelo.directives.interface.pro-alert',
    'profitelo.directives.interface.pro-input-password',
    'profitelo.directives.password-strength-bar',
    'c7s.ng.userAuth'
  ])
  .config(config)
  .controller('SetNewPasswordController', SetNewPasswordController)

}())