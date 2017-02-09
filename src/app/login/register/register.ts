(function() {

  function RegisterController($log, $filter, $state, $rootScope, topWaitingLoaderService, User, topAlertService,
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
        }).$promise.then(() => {
          communicatorService.authenticate()
          this.correctCode = true
        }, (err) => {
          $log.error(err)
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
        topWaitingLoaderService.immediate()
        RegistrationApi.confirmVerification({
          sessionId: this.registrationSteps.sessionId,
          token: String(this.registrationSteps.smsCode)
        }).$promise.then((response) => {
          this.isPending = false
          topWaitingLoaderService.stopLoader()
          delete response.$promise
          delete response.$resolved
          User.setData(response)
          User.setData({role: UserRoles.getRole('user')})
          User.setApiKeyHeader(response.apiKey)
          loginStateService.clearServiceObject()
          $rootScope.loggedIn = true
          $state.go('app.post-register.set-password')
        }, (error) => {
          $log.error(error)
          this.isPending = false
          this.serverError = true
          topWaitingLoaderService.stopLoader()
        })
      }
    }

    let _updateNewUserObject = (patchObject, successCallback) => {
      /* istanbul ignore next if */
      if (!this.isPending) {
        this.isPending = true
        topWaitingLoaderService.immediate()

        patchObject.accountId = User.getData('id')

        AccountApi.partialUpdateAccount(patchObject).$promise.then(successCallback, (error) => {
          this.isPending = false
          $log.error(error)
          topWaitingLoaderService.stopLoader()
          topAlertService.error({
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
        topWaitingLoaderService.stopLoader()
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
        smsSessionId: (LoginRegisterResolver) => {
          /* istanbul ignore next */
          return LoginRegisterResolver.resolve()
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
    'profitelo.resolvers.login-register',
    'profitelo.swaggerResources',
    'profitelo.services.communicator',
    'profitelo.services.commonSettings',
    'profitelo.services.top-alert',
    'profitelo.services.pro-top-waiting-loader-service',
    'profitelo.directives.interface.pro-checkbox',
    'profitelo.directives.interface.pro-alert',
    'profitelo.directives.interface.pro-input'
  ])
    .config(config)
    .controller('RegisterController', RegisterController)

}())
