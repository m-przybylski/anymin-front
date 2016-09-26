(function() {

  function _controller($filter, $state, proTopWaitingLoaderService, passwordStrengthService, User, proTopAlertService,
                       CommonSettingsService, AccountApi) {

    this.passwordStrength = 0
    this.password = ''
    this.isPending = false
    this.rulesAccepted = false
    this.serverError = false
    this.alreadyCheck = false
    this.msisdn = {
      // prefix: User.getData()
      number: User.getData('msisdn')
    }
    this.translationUrl = {
      hrefUrl: 'http://miroslawkwiatek.republika.pl/pdf_y/grawitacja_kwantowa.pdf'
    }
    this.acceptRulesTr = 'LOGIN.ACCEPT_RULES'

    this.patternPassword = CommonSettingsService.localSettings.passwordPattern

    this.onPasswordChange = (password) => {
      this.passwordStrength = passwordStrengthService(password)
    }

    let _updateNewUserObject = (patchObject, successCallback) => {
      /* istanbul ignore next if */
      if (!this.isPending) {
        this.isPending = true
        proTopWaitingLoaderService.immediate()

        patchObject.accountId = User.getData('id')

        AccountApi.partialUpdateAccount(patchObject).$promise.then(successCallback, (error) => {
          this.isPending = false
          proTopWaitingLoaderService.stopLoader()
          proTopAlertService.error({
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
        proTopWaitingLoaderService.stopLoader()
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
              return $state.go('app.dashboard.start')
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
    'profitelo.directives.password-strength-service',
    'profitelo.directives.pro-top-alert-service',
    'profitelo.directives.pro-top-waiting-loader-service',
    'profitelo.directives.interface.pro-checkbox',
    'profitelo.directives.interface.pro-alert',
    'profitelo.directives.interface.pro-input-password',
    'profitelo.directives.interface.pro-input',
    'profitelo.directives.password-strength-bar'
  ])
    .config(config)
    .controller('SetPasswordController', _controller)

}())