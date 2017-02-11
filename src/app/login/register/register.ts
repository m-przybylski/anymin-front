namespace profitelo.login.register {

  import IFilterService = profitelo.services.filter.IFilterService
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  import ITopWaitingLoaderService = profitelo.services.topWaitingLoader.ITopWaitingLoaderService
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import ILoginRegisterService = profitelo.resolvers.loginRegister.ILoginRegisterService
  import ILoginRegister = profitelo.resolvers.loginRegister.ILoginRegister
  import ICommonSettingsService = profitelo.services.commonSettings.ICommonSettingsService
  import ILoginStateService = profitelo.services.loginState.ILoginStateService
  import ICommunicatorService = profitelo.services.communicator.ICommunicatorService

  function RegisterController($log: ng.ILogService, $filter: IFilterService, $state: ng.ui.IStateService,
                              $rootScope: IRootScopeService, topWaitingLoaderService: ITopWaitingLoaderService,
                              User: any, topAlertService: ITopAlertService, UserRoles: any,
                              smsSessionId: ILoginRegister, CommonSettingsService: ICommonSettingsService,
                              RegistrationApi: any, AccountApi: any,
                              loginStateService: ILoginStateService, communicatorService: ICommunicatorService) {
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
        }, (err: any) => {
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
        }).$promise.then((response: any) => {
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
        }, (error: any) => {
          $log.error(error)
          this.isPending = false
          this.serverError = true
          topWaitingLoaderService.stopLoader()
        })
      }
    }

    let _updateNewUserObject = (patchObject: any, successCallback: Function) => {
      /* istanbul ignore next if */
      if (!this.isPending) {
        this.isPending = true
        topWaitingLoaderService.immediate()

        patchObject.accountId = User.getData('id')

        AccountApi.partialUpdateAccount(patchObject).$promise.then(successCallback, (error: any) => {
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

  function config($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) {
    $stateProvider.state('app.login.register', {
      url: '/register',
      controllerAs: 'vm',
      controller: 'RegisterController',
      templateUrl: 'login/register/register.tpl.html',
      resolve: {
        /* istanbul ignore next */
        smsSessionId: (LoginRegisterResolver: ILoginRegisterService) => {
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

}
