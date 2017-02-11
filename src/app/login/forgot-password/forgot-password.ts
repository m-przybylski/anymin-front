namespace profitelo.login.forgotPassword {

  import ILoginForgotPasswordService = profitelo.resolvers.loginForgotPassword.ILoginForgotPasswordService
  import ILoginForgotPassword = profitelo.resolvers.loginForgotPassword.ILoginForgotPassword
  import ITopWaitingLoaderService = profitelo.services.topWaitingLoader.ITopWaitingLoaderService
  import ICommonSettingsService = profitelo.services.commonSettings.ICommonSettingsService

  type method = 'sms' | 'email'

  export interface IForgotPasswordStateParams {
    method: method
  }

  function ForgotPasswordController($state: ng.ui.IStateService, account: ILoginForgotPassword,
                                    RecoverPasswordApi: any, topWaitingLoaderService: ITopWaitingLoaderService,
                                    CommonSettingsService: ICommonSettingsService) {

    this.isPending = false
    this.account = account
    this.smsCodePattern = CommonSettingsService.localSettings.smsCodePattern

    this.forceSmsRecovery = () => {
      $state.go('app.login.forgot-password', { method: 'sms' }, { reload: true })
    }

    this.submitSmsVerificationCode = () => {
      this.serverError = false
      if (!this.isPending) {
        this.isPending = true
        topWaitingLoaderService.immediate()
        RecoverPasswordApi.postRecoverPasswordVerifyMsisdn({
          token: String(this.smsCode),
          msisdn: String(account.accountObject.phoneNumber.prefix) + String(account.accountObject.phoneNumber.number)
        }).$promise.then(() => {
          this.isPending = false
          topWaitingLoaderService.stopLoader()
          $state.go('app.login.set-new-password', {
            token: String(this.smsCode),
            method: 'sms'
          })
        }, () => {
          this.isPending = false
          topWaitingLoaderService.stopLoader()
          this.serverError = true
        })
      }

    }


    return this

  }

  function config($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) {
    $stateProvider.state('app.login.forgot-password', {
      url: '/forgot-password/{method:|sms}',
      controllerAs: 'vm',
      controller: 'ForgotPasswordController',
      templateUrl: 'login/forgot-password/forgot-password.tpl.html',
      resolve: {
        account: (LoginForgotPasswordResolver: ILoginForgotPasswordService, $stateParams: IForgotPasswordStateParams) => {
          return LoginForgotPasswordResolver.resolve($stateParams)
        }
      },
      data : {
        access : UserRolesProvider.getAccessLevel('anon'),
        pageTitle: 'PAGE_TITLE.LOGIN.FORGOT_PASSWORD'
      }
    })
  }


  angular.module('profitelo.controller.login.forgot-password', [
    'ui.router',
    'profitelo.resolvers.login-forgot-password',
    'profitelo.swaggerResources',
    'profitelo.services.pro-top-waiting-loader-service',
    'profitelo.services.commonSettings',
    'profitelo.directives.interface.pro-input',
    'c7s.ng.userAuth'
  ])
  .config(config)
  .controller('ForgotPasswordController', ForgotPasswordController)

}
