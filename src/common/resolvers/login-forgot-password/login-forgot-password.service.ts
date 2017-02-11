namespace profitelo.resolvers.loginForgotPassword {
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import ILoginStateService = profitelo.services.loginState.ILoginStateService
  import Account = profitelo.models.Account
  import IFilterService = profitelo.services.filter.IFilterService
  import IForgotPasswordStateParams = profitelo.login.forgotPassword.IForgotPasswordStateParams

  export interface ILoginForgotPassword {
    recoveryMethod: string
    accountObject: Account
  }

  export interface ILoginForgotPasswordService {
    resolve(stateParams: IForgotPasswordStateParams): ng.IPromise<ILoginForgotPassword>
  }

  class LoginForgotPasswordResolver implements ILoginForgotPasswordService {

    constructor(private $q: ng.IQService, private $timeout: ng.ITimeoutService, private $filter: IFilterService,
                private $state: ng.ui.IStateService, private topAlertService: ITopAlertService,
                private loginStateService: ILoginStateService, private RecoverPasswordApi: any) {

    }

    public resolve = (stateParams: IForgotPasswordStateParams) => {
      let _deferred = this.$q.defer()

      let account = this.loginStateService.getAccountObject()

      const handleError = () => {
        _deferred.reject()
        this.topAlertService.error({
          message: this.$filter('translate')('LOGIN.PASSWORD_RECOVERY.ERROR')
        })
        this.$timeout(() => {
          this.$state.go('app.login.account')
        })
      }

      const requestPasswordRecovery = (method: string) => {
        return this.RecoverPasswordApi.postRecoverPassword({
          method: method,
          msisdn: account.phoneNumber.prefix + '' + account.phoneNumber.number
        }).$promise
      }

      const noEmailRecoveryPath = () => {
        requestPasswordRecovery('SMS').then(() => {
          _deferred.resolve({
            accountObject: account,
            recoveryMethod: 'SMS'
          })
        }, handleError)
      }

      if (account.phoneNumber.number === null) {
        handleError()
      } else {
        if (stateParams.method === 'sms') {
          noEmailRecoveryPath()
        } else {
          requestPasswordRecovery('EMAIL').then(() => {
            _deferred.resolve({
              accountObject: account,
              recoveryMethod: 'EMAIL'
            })
          }, noEmailRecoveryPath)
        }
      }

      return _deferred.promise
    }
  }

  angular.module('profitelo.resolvers.login-forgot-password', [
    'profitelo.swaggerResources',
    'profitelo.services.login-state',
    'profitelo.services.top-alert'
  ])
  .service('LoginForgotPasswordResolver', LoginForgotPasswordResolver)

}
