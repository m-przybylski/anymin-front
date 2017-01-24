module profitelo.resolvers.loginSetNewPassword {

  import ILoginStateService = profitelo.services.loginState.ILoginStateService
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService

  export interface IAppLoginSetNewPasswordService {
    resolve(stateParam: ng.ui.IStateParamsService): ng.IPromise<Object>
  }

  class LoginSetNewPasswordResolver implements IAppLoginSetNewPasswordService {

    constructor(private $state: ng.ui.IStateService, private $filter: ng.IFilterService,
                private $timeout: ng.ITimeoutService, private $q: ng.IQService,
                private loginStateService: ILoginStateService, private topAlertService: ITopAlertService,
                private RecoverPasswordApi) {

    }

    public resolve = (stateParams) => {

      let _deferred = this.$q.defer()

      const smsTokenPath = () => {
        _deferred.resolve({
          method: 'SMS',
          payload: {
            msisdn: this.loginStateService.getFullPhoneNumber(),
            token: stateParams.token
          }
        })
      }

      const emailTokenPath = () => {

        this.RecoverPasswordApi.postRecoverPasswordVerifyEmail({
          token: stateParams.token
        }).$promise.then(() => {
          _deferred.resolve({
            method: 'EMAIL',
            payload: {
              token: stateParams.token
            }
          })
        }, () => {
          _deferred.reject()
          this.topAlertService.warning({
            message: this.$filter('translate')('LOGIN.FORGOT_PASSWORD.BAD_EMAIL_TOKEN'),
            timeout: 5
          })
          this.$timeout(() => {
            this.$state.go('app.login.account')
          })
        })

      }

      if (stateParams.token.length === 0) {
        _deferred.reject()

        this.topAlertService.warning({
          message: 'No token. Try again'
        })

        this.$timeout(() => {
          this.$state.go('app.login.account')
        })

      } else {

        if (stateParams.method === 'sms') {
          smsTokenPath()
        } else {
          emailTokenPath()
        }

      }

      return _deferred.promise
    }
  }

  angular.module('profitelo.resolvers.login-set-new-password', [
    'profitelo.swaggerResources',
    'profitelo.services.top-alert',
    'profitelo.services.login-state'
  ])
  .service('LoginSetNewPasswordResolver', LoginSetNewPasswordResolver)

}
