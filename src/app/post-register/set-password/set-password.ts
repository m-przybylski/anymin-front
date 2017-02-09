namespace profitelo.postRegister.setPassword {

  import IPasswordStrengthService = profitelo.services.passwordStrength.IPasswordStrengthService
  import ICommonSettingsService = profitelo.services.commonSettings.ICommonSettingsService
  import ITopWaitingLoaderService = profitelo.services.topWaitingLoader.ITopWaitingLoaderService

  function _controller($log: ng.ILogService, $filter: ng.IFilterService, $state: ng.ui.IStateService,
                       topWaitingLoaderService: ITopWaitingLoaderService, passwordStrengthService: IPasswordStrengthService,
                       User: any, topAlertService: ITopAlertService, CommonSettingsService: ICommonSettingsService,
                       AccountApi: any) {

    this.passwordStrength = 0
    this.password = ''
    this.isPending = false
    this.rulesAccepted = false
    this.serverError = false
    this.alreadyCheck = false
    this.msisdn = {
      number: User.getData('msisdn')
    }
    this.translationUrl = {
      hrefUrl: 'http://miroslawkwiatek.republika.pl/pdf_y/grawitacja_kwantowa.pdf'
    }
    this.acceptRulesTr = 'LOGIN.ACCEPT_RULES'

    this.patternPassword = CommonSettingsService.localSettings.passwordPattern

    this.onPasswordChange = (password) => {
      this.passwordStrength = passwordStrengthService.getStrength(password)
    }

    let _updateNewUserObject = (patchObject, successCallback) => {
      /* istanbul ignore next if */
      if (!this.isPending) {
        this.isPending = true
        topWaitingLoaderService.immediate()

        patchObject.accountId = User.getData('id')

        AccountApi.partialUpdateAccount(patchObject).$promise.then(successCallback, (error) => {
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
        User.setData({hasPassword: true})
        this.isPending = false
        topWaitingLoaderService.stopLoader()
        $state.go('app.post-register.set-email')
      })
    }

    return this
  }

  function config($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.post-register.set-password', {
      url: '/set-password',
      controllerAs: 'vm',
      controller: 'SetPasswordController',
      templateUrl: 'post-register/set-password/set-password.tpl.html',
      resolve: {
        /* istanbul ignore next */
        redirect: (User, $state, $q) => {
          /* istanbul ignore next */
          return User.getStatus().then((status) => {
            if (angular.isDefined(status.hasPassword) && status.hasPassword) {
              return $state.go('app.dashboard.client.favourites')
            } else {
              return $q.when(status)
            }
          })
        }
      },
      data: {
        access: UserRolesProvider.getAccessLevel('user'),
        pageTitle: 'PAGE_TITLE.POST_REGISTER.SET_PASSWORD'
      }
    })
  }

  angular.module('profitelo.controller.post-register.set-password', [
    'ui.router',
    'c7s.ng.userAuth',
    'profitelo.swaggerResources',
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
