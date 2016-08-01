(function() {

  function RegisterController($filter, $state, proTopWaitingLoaderService, passwordStrengthService, User, proTopAlertService, UserRoles, smsSessionId, CommonSettingsService, RegistrationApi, AccountApi, loginStateService) {

    this.passwordStrength = 0
    this.current = 1
    this.isPending = false
    this.rulesAccepted = false
    this.serverError = false
    this.alreadyCheck = false
    this.correctCode = false

    this.registrationSteps = {
      account: smsSessionId.accountObject,
      smsCode: null,
      sessionId: smsSessionId.sessionId,
      email: null,
      password: null
    }
    this.translationUrl = {
      hrefUrl: 'http://miroslawkwiatek.republika.pl/pdf_y/grawitacja_kwantowa.pdf'
    }
    this.acceptRulesTr = 'LOGIN.ACCEPT_RULES'

    this.patternSms = CommonSettingsService.localSettings.smsCodePattern
    this.patternEmail = CommonSettingsService.localSettings.emailPattern
    this.patternPassword = CommonSettingsService.localSettings.passwordPattern

    this.onPasswordChange = (password) => {
      this.passwordStrength = passwordStrengthService(password)
    }

    this.verifyCode = () => {
      if(angular.isDefined(this.registrationSteps.smsCode) && this.registrationSteps.smsCode !== null && !this.alreadyCheck) {
        this.alreadyCheck = true
        RegistrationApi.verifyVerification({
          sessionId: this.registrationSteps.sessionId,
          token: String(this.registrationSteps.smsCode)
        }).$promise.then((res) => {
          this.correctCode = true
        }, (err) =>{
          this.serverError = true
        })
      } else if(!angular.isDefined(this.registrationSteps.smsCode) || this.registrationSteps.smsCode === null) {
        this.alreadyCheck = false
        this.serverError = false
        this.correctCode = false
      }

    }

    this.getSmsCodeStatus = () => {
      /* istanbul ignore next if */
      if (!this.isPending) {
        this.isPending = true
        proTopWaitingLoaderService.immediate()
        RegistrationApi.confirmVerification({
          sessionId: this.registrationSteps.sessionId,
          token: String(this.registrationSteps.smsCode)
        }).$promise.then((response) => {
          this.isPending = false
          this.current = 2
          proTopWaitingLoaderService.stopLoader()
          delete response.$promise
          delete response.$resolved
          User.setData(response)
          User.setApiKeyHeader(response.apiKey)
          User.setData({role: UserRoles.getRole('user')})

        }, (error) => {
          this.isPending = false
          this.serverError = true
          proTopWaitingLoaderService.stopLoader()
        })

      }
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

    this.setNewEmail = () => {
      _updateNewUserObject({
        unverifiedEmail: this.registrationSteps.email
      }, () => {
        this.isPending = false
        this.current = 3
        proTopWaitingLoaderService.stopLoader()
      })
    }

    this.completeRegistration = () => {
      _updateNewUserObject({
        password: this.registrationSteps.password
      }, () => {
        this.isPending = false
        proTopAlertService.success({
          message: $filter('translate')('REGISTER.REGISTRATION_SUCCESS'),
          timeout: 3
        })
        loginStateService.clearServiceObject()
        $state.go('app.dashboard.start')
      })

    }

    return this
  }

  function config($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.login.register', {
      url: '/register',
      controllerAs: 'vm',
      controller: 'RegisterController',
      templateUrl: 'login/register/register.tpl.html',
      resolve: {
        /* istanbul ignore next */
        smsSessionId: (AppLoginRegisterResolver) => {
          /* istanbul ignore next */
          return AppLoginRegisterResolver.resolve()
        }
      },
      data : {
        access : UserRolesProvider.getAccessLevel('anon'),
        pageTitle: 'PAGE_TITLE.LOGIN.REGISTER'
      }
    })
  }




  angular.module('profitelo.controller.login.register', [
    'ui.router',
    'c7s.ng.userAuth',
    'profitelo.services.login-state',
    'profitelo.services.resolvers.app.login.register',
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
  .controller('RegisterController', RegisterController)

}())
