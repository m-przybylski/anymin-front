namespace profitelo.login.account {

  import IPhoneNumberService = profitelo.services.phoneNumber.IPhoneNumberService;
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  import IFilterService = profitelo.services.filter.IFilterService
  import ILoginStateService = profitelo.services.loginState.ILoginStateService
  import ICommonSettingsService = profitelo.services.commonSettings.ICommonSettingsService
  import ICommunicatorService = profitelo.services.communicator.ICommunicatorService
  import ITopWaitingLoaderService = profitelo.services.topWaitingLoader.ITopWaitingLoaderService
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import IAccountApi = profitelo.api.IAccountApi

  function AccountFormController($log: ng.ILogService, $rootScope: IRootScopeService, $state: ng.ui.IStateService,
                                 $filter: IFilterService, AccountApi: IAccountApi,
                                 topWaitingLoaderService: ITopWaitingLoaderService, User: any,
                                 topAlertService: ITopAlertService, loginStateService: ILoginStateService,
                                 CommonSettingsService: ICommonSettingsService,
                                 phoneNumberService: IPhoneNumberService, communicatorService: ICommunicatorService) {

    this.isPending = false
    this.current = 1
    this.account = loginStateService.getAccountObject()
    this.prefixes = CommonSettingsService.localSettings.countryCodes.map((item: any) => {
      return {
        value: item,
        name: item
      }
    })

    this.isValidPhoneNumber = (prefix: string, number: string) => {
      if (angular.isDefined(prefix) && angular.isDefined(number) && prefix && number && number.length > 1) {
        const fullPhoneNumber = phoneNumberService.parse(prefix.toString() + number.toString())
        return phoneNumberService.isValidNumber(fullPhoneNumber)
      }
      return false
    }

    this.account.phoneNumber.prefix = this.prefixes[0].value
    this.patternPassword = CommonSettingsService.localSettings.passwordPattern
    this.backToPhoneNumber = () => {
      this.account.password = null
      this.current = 1
    }

    let _determinePhoneNumberStatus = (status: string) => {
      switch (status) {
        case 'REGISTERED':
          this.current = 2
          break
        case 'NO_PASSWORD':
          $state.go('app.login.forgot-password')
          break
        case 'UNREGISTERED':
        default:
          $state.go('app.login.register')
      }
    }

    this.updateSortTypeParam = (item: any) => {
      this.account.phoneNumber.prefix = item.value
    }

    this.getPhoneNumberStatus = () => {
      if (!this.isPending) {
        this.isPending = true
        topWaitingLoaderService.immediate()
        loginStateService.setAccountObject(this.account)
        AccountApi.getRegistrationStatusByMsisdnRoute(
          this.account.phoneNumber.prefix + this.account.phoneNumber.number
        ).then((response) => {
          this.isPending = false
          _determinePhoneNumberStatus(response.status)
          topWaitingLoaderService.stopLoader()
        }, (error) => {
          $log.error(error)
          this.isPending = false
          topAlertService.error({
            message: $filter('translate')('INTERFACE.API_ERROR'),
            timeout: 4
          })
          topWaitingLoaderService.stopLoader()
        })
      }
    }

    this.login = () => {
      this.serverError = false
      if (!this.isPending) {
        this.isPending = true
        topWaitingLoaderService.immediate()
        User.login({
          msisdn: this.account.phoneNumber.prefix + '' + this.account.phoneNumber.number,
          password: this.account.password
        }).then((_response: any) => {
          communicatorService.authenticate()
          $rootScope.loggedIn = true
          this.isPending = false
          topWaitingLoaderService.stopLoader()
          $state.go('app.dashboard.client.favourites')
          loginStateService.clearServiceObject()
          topAlertService.success({
            message: $filter('translate')('LOGIN.SUCCESSFUL_LOGIN'),
            timeout: 2
          })
        }, (error: any) => {
          $log.error(error)
          this.isPending = false
          this.serverError = true
          topWaitingLoaderService.stopLoader()
        })
      }
    }

    return this
  }

  function config($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) {
    $stateProvider.state('app.login.account', {
      url: '/account',
      controllerAs: 'vm',
      controller: 'AccountFormController',
      templateUrl: 'login/account/account.tpl.html',
      data: {
        access: UserRolesProvider.getAccessLevel('anon'),
        pageTitle: 'PAGE_TITLE.LOGIN.ACCOUNT'
      }
    })
  }

  angular.module('profitelo.controller.login.account', [
    'ui.router',
    'c7s.ng.userAuth',
    'ui.router',
    'profitelo.services.phone-number',
    'profitelo.services.login-state',
    'profitelo.api.AccountApi',
    'profitelo.services.commonSettings',
    'profitelo.services.communicator',
    'profitelo.services.pro-top-waiting-loader-service',
    'profitelo.services.top-alert',
    'profitelo.directives.interface.pro-alert',
    'profitelo.directives.interface.pro-input-password',
    'profitelo.directives.interface.pro-input',
    'profitelo.components.interface.dropdown-primary'
  ])
    .config(config)
    .controller('AccountFormController', AccountFormController)

}
