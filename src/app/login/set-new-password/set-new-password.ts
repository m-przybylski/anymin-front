namespace profitelo.login.setNewPassword {

  import IPasswordStrengthService = profitelo.services.passwordStrength.IPasswordStrengthService
  import IFilterService = profitelo.services.filter.IFilterService
  import ILoginSetNewPasswordService = profitelo.resolvers.loginSetNewPassword.ILoginSetNewPasswordService
  import ILoginSetNewPassword = profitelo.resolvers.loginSetNewPassword.ILoginSetNewPassword
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import ICommonSettingsService = profitelo.services.commonSettings.ICommonSettingsService
  import IRecoverPasswordApi = profitelo.api.IRecoverPasswordApi

  export interface ISetNewPasswordStateParams {
    token: string
    method: string
  }

  function SetNewPasswordController($state: ng.ui.IStateService, $filter: IFilterService,
                                    tokenStatus: ILoginSetNewPassword, passwordStrengthService: IPasswordStrengthService,
                                    topAlertService: ITopAlertService, RecoverPasswordApi: IRecoverPasswordApi,
                                    CommonSettingsService: ICommonSettingsService, $log: ng.ILogService) {

    this.newPassword = ''
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
      (<any>tokenStatus.payload).password = this.newPassword

      if (tokenStatus.payload.msisdn) {
        const putRecoverPassword = {
          password: this.newPassword.toString(),
          token: tokenStatus.payload.token,
          msisdn: tokenStatus.payload.msisdn
        }

        RecoverPasswordApi.putRecoverPasswordMsisdnRoute(putRecoverPassword)
          .then(_passwordChangeSuccess, _passwordChangeError)
      }
      else {
        $log.error('Msisdn is missing')
      }
    }

    let _submitPasswordChangeByEmail = () => {
      (<any>tokenStatus).payload.password = this.newPassword

      const putRecoverPassword = {
        password: this.newPassword.toString(),
        token: tokenStatus.payload.token
      }

      RecoverPasswordApi.putRecoverPasswordEmailRoute(putRecoverPassword)
        .then(_passwordChangeSuccess, _passwordChangeError)
    }


    this.onPasswordChange = (password: string) => {
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

  function config($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) {
    $stateProvider.state('app.login.set-new-password', {
      url: '/set-new-password/token/:token/{method:|sms}',
      controllerAs: 'vm',
      controller: 'SetNewPasswordController',
      templateUrl: 'login/set-new-password/set-new-password.tpl.html',
      resolve: {

        tokenStatus: ($stateParams: ISetNewPasswordStateParams, LoginSetNewPasswordResolver: ILoginSetNewPasswordService) => {
          /* istanbul ignore next */
          return LoginSetNewPasswordResolver.resolve($stateParams)
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
    'profitelo.resolvers.login-set-new-password',
    'profitelo.services.commonSettings',
    'profitelo.api.RecoverPasswordApi',
    'profitelo.directives.interface.pro-alert',
    'profitelo.directives.interface.pro-input-password',
    'profitelo.directives.password-strength-bar',
    'c7s.ng.userAuth'
  ])
    .config(config)
    .controller('SetNewPasswordController', SetNewPasswordController)

}
