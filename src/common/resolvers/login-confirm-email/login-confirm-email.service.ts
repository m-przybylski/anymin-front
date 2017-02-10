namespace profitelo.resolvers.loginConfirmEmail {

  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  import IFilterService = profitelo.services.filter.IFilterService
  import IConfirmEmailStateParams = profitelo.login.confirmEmail.IConfirmEmailStateParams

  export interface ILoginConfirmEmailService {
    resolve(stateParams: IConfirmEmailStateParams): ng.IPromise<undefined>
  }

  class LoginConfirmEmailResolver implements ILoginConfirmEmailService {

    constructor(private $q: ng.IQService, private $rootScope: IRootScopeService, private $timeout: ng.ITimeoutService,
                private $filter: IFilterService, private $state: ng.ui.IStateService, private topAlertService: ITopAlertService,
                private User: any, private UserRoles: any, private AccountApi: any, private SessionApi: any) {

    }

    public resolve = (stateParams: IConfirmEmailStateParams): ng.IPromise<undefined> => {
      const _deferred = this.$q.defer<undefined>()

      const handleBadToken = () => {
        _deferred.reject()
        this.topAlertService.error({
          message: this.$filter('translate')('LOGIN.EMAIL_CONFIRMATION_FAIL'),
          timeout: 4
        })
        this.$timeout(() => {
          this.$state.go('app.login.account')
        })
      }

      const handleGoodToken = (apiKey: string) => {

        this.User.setApiKeyHeader(apiKey)
        this.SessionApi.check().$promise.then((response: any) => {

          _deferred.resolve()

          delete response.$promise
          delete response.$resolved
          this.User.setData(response)
          this.User.setData({role: this.UserRoles.getRole('user')})

          this.topAlertService.success({
            message: this.$filter('translate')('LOGIN.EMAIL_CONFIRMATION_SUCCESS'),
            timeout: 4
          })

          this.$timeout(() => {
            this.$rootScope.loggedIn = true
            this.$state.go('app.dashboard.client.favourites')
          })

        }, handleBadToken)

      }

      const verifyEmailToken = (token: string) => {

        this.AccountApi.postAccountVerifyEmail({
          token: token
        }).$promise.then((response: any) => {
          handleGoodToken(response.apiKey)
        }, handleBadToken)

      }

      if (stateParams.token === '') {
        handleBadToken()
      } else {
        verifyEmailToken(stateParams.token)
      }

      return _deferred.promise
    }

  }

  angular.module('profitelo.resolvers.login-confirm-email', [
    'profitelo.swaggerResources',
    'profitelo.services.top-alert',
    'c7s.ng.userAuth',
    'profitelo.directives.interface.pro-alert'
  ])
  .service('LoginConfirmEmailResolver', LoginConfirmEmailResolver)

}
