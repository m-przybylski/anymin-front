(function() {

  function RegisterController($filter, $state, $rootScope, proTopWaitingLoaderService, User, proTopAlertService,
                              UserRoles, smsSessionId, CommonSettingsService, RegistrationApi, AccountApi,
                              loginStateService, communicatorService) {
    this.passwordStrength = 0
    this.isPending = false
    this.rulesAccepted = false
    this.serverError = false
    this.alreadyCheck = false
    this.correctCode = false

    this.registrationSteps = {
      account: smsSessionId.accountObject,
      smsCode: null,
      sessionId: smsSessionId.sessionId
    }

    this.smsCodePattern = CommonSettingsService.localSettings.smsCodePattern

    this.verifyCode = () => {
      if (angular.isDefined(this.registrationSteps.smsCode) && this.registrationSteps.smsCode !== null && !this.alreadyCheck) {
        this.alreadyCheck = true
        RegistrationApi.verifyVerification({
          sessionId: this.registrationSteps.sessionId,
          token: String(this.registrationSteps.smsCode)
        }).$promise.then((res) => {
          communicatorService.authenticate()
          this.correctCode = true
        }, (err) => {
          this.serverError = true
        })
      } else if (!angular.isDefined(this.registrationSteps.smsCode) || this.registrationSteps.smsCode === null) {
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
          proTopWaitingLoaderService.stopLoader()
          delete response.$promise
          delete response.$resolved
          User.setData(response)
          User.setData({role: UserRoles.getRole('user')})
          User.setApiKeyHeader(response.apiKey)
          loginStateService.clearServiceObject()
          $rootScope.loggedIn = true
          $state.go('app.post-register.set-password')
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

    this.completeRegistration = () => {
      _updateNewUserObject({
        password: this.registrationSteps.password
      }, () => {
        this.isPending = false
        this.current = 3
        proTopWaitingLoaderService.stopLoader()
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
      data: {
        access: UserRolesProvider.getAccessLevel('anon'),
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
    'profitelo.services.communicator',
    'profitelo.services.commonSettings',
    'profitelo.services.pro-top-alert-service',
    'profitelo.services.pro-top-waiting-loader-service',
    'profitelo.directives.interface.pro-checkbox',
    'profitelo.directives.interface.pro-alert',
    'profitelo.directives.interface.pro-input'
  ])
    .config(config)
    .controller('RegisterController', RegisterController)

}())
