namespace profitelo.postRegister.setPassword {

  import IPasswordStrengthService = profitelo.services.passwordStrength.IPasswordStrengthService
  import ICommonSettingsService = profitelo.services.commonSettings.ICommonSettingsService
  import ITopWaitingLoaderService = profitelo.services.topWaitingLoader.ITopWaitingLoaderService
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import IAccountApi = profitelo.api.IAccountApi
  import Account = profitelo.api.Account
  import IUserService = profitelo.services.user.IUserService
  import AccountDetails = profitelo.api.AccountDetails

  function _controller($log: ng.ILogService, $filter: ng.IFilterService, $state: ng.ui.IStateService,
                       topWaitingLoaderService: ITopWaitingLoaderService, passwordStrengthService: IPasswordStrengthService,
                       user: AccountDetails, topAlertService: ITopAlertService, CommonSettingsService: ICommonSettingsService,
                       AccountApi: IAccountApi) {

    this.passwordStrength = 0
    this.password = ''
    this.isPending = false
    this.rulesAccepted = false
    this.serverError = false
    this.alreadyCheck = false
    this.msisdn = {
      number: user.msisdn
    }
    this.translationUrl = {
      hrefUrl: 'http://miroslawkwiatek.republika.pl/pdf_y/grawitacja_kwantowa.pdf'
    }
    this.acceptRulesTr = 'LOGIN.ACCEPT_RULES'

    this.patternPassword = CommonSettingsService.localSettings.passwordPattern

    this.onPasswordChange = (password: string) => {
      this.passwordStrength = passwordStrengthService.getStrength(password)
    }

    let _updateNewUserObject = (patchObject: any, successCallback: (res: Account) => void) => {
      /* istanbul ignore next if */
      if (!this.isPending) {
        this.isPending = true
        topWaitingLoaderService.immediate()

        const accountId = user.id

        AccountApi.partialUpdateAccountRoute(accountId, patchObject).then(successCallback, (error) => {
          this.isPending = false
          topWaitingLoaderService.stopLoader()
          $log.error(error)
          topAlertService.error({
            message: $filter('translate')('INTERFACE.API_ERROR'),
            timeout: 4
          })
        })
      }
    }

    this.completeRegistration = () => {
      _updateNewUserObject({
        password: this.password
      }, () => {

        //User.setData({hasPassword: true})
        this.isPending = false
        topWaitingLoaderService.stopLoader()
        $state.go('app.post-register.set-email')
      })
    }

    return this
  }

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider.state('app.post-register.set-password', {
      url: '/set-password',
      controllerAs: 'vm',
      controller: 'SetPasswordController',
      templateUrl: 'post-register/set-password/set-password.tpl.html',
      resolve: {
        user: (userService: IUserService) => {
          return userService.getUser()
        }
      },
      data: {
        pageTitle: 'PAGE_TITLE.POST_REGISTER.SET_PASSWORD'
      }
    })
  }

  angular.module('profitelo.controller.post-register.set-password', [
    'ui.router',
    'profitelo.services.user',
    'profitelo.api.AccountApi',
    'profitelo.services.commonSettings',
    'profitelo.services.password-strength',
    'profitelo.services.top-alert',
    'profitelo.services.pro-top-waiting-loader-service',
    'profitelo.directives.interface.pro-checkbox',
    'profitelo.directives.interface.pro-alert',
    'profitelo.directives.interface.pro-input-password',
    'profitelo.directives.interface.pro-input',
    'profitelo.directives.password-strength-bar'
  ])
    .config(config)
    .controller('SetPasswordController', _controller)
}
