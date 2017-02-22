namespace profitelo.resolvers.loginRegister {

  import ILoginStateService = profitelo.services.loginState.ILoginStateService
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import IFilterService = profitelo.services.filter.IFilterService
  import IRegistrationApi = profitelo.api.IRegistrationApi


  export interface ILoginRegister {
    sessionId: string
    accountObject: any
  }

  export interface ILoginRegisterService {
    resolve(): ng.IPromise<ILoginRegister>
  }

  class LoginRegisterResolver implements ILoginRegisterService {

    constructor(private loginStateService: ILoginStateService, private $state: ng.ui.IStateService,
                private $filter: IFilterService, private $q: ng.IQService, private $timeout: ng.ITimeoutService,
                private topAlertService: ITopAlertService, private RegistrationApi: IRegistrationApi, private $log: ng.ILogService) {

    }

    public resolve = () => {

      let _deferred = this.$q.defer()

      let handleError = () => {
        _deferred.reject()
        this.$timeout(() => {
          this.$state.go('app.login.account')
        })
      }

      let _account = this.loginStateService.getAccountObject()

      if (_account.phoneNumber.number === null) {
        this.topAlertService.warning({
          message: this.$filter('translate')('REGISTER.ENTER_PHONE_NUMBER_FIRST'),
          timeout: 3
        })
        handleError()
      } else {
        this.RegistrationApi.requestVerification({
          msisdn: _account.phoneNumber.prefix + _account.phoneNumber.number
        }).then((response: any) => {
          _deferred.resolve({
            sessionId: response.sessionId,
            accountObject: _account
          })
        }, (error: any) => {
          this.$log.error(error)
          this.topAlertService.warning({
            message: this.$filter('translate')('INTERFACE.API_ERROR'),
            timeout: 3
          })
          handleError()
        })
      }

      return _deferred.promise
    }

  }

  angular.module('profitelo.resolvers.login-register', [
    'profitelo.api.RegistrationApi',
    'profitelo.services.login-state',
    'profitelo.services.top-alert'
  ])
  .service('LoginRegisterResolver', LoginRegisterResolver)

}
