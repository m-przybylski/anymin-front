namespace profitelo.resolvers.loginConfirmEmail {

  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService

  export interface ILoginConfirmEmailService {
    resolve(stateParams: ng.ui.IStateParamsService): ng.IPromise<undefined>
  }

  class LoginConfirmEmailResolver implements ILoginConfirmEmailService {

    constructor(private $q: ng.IQService, private $rootScope: IRootScopeService, private $timeout: ng.ITimeoutService,
                private $filter: ng.IFilterService, private $state: ng.ui.IStateService, private topAlertService: ITopAlertService,
                private User, private UserRoles,
                private AccountApi, private SessionApi) {

    }

    public resolve = (stateParams: ng.ui.IStateParamsService): ng.IPromise<undefined> => {
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

      const handleGoodToken = (apiKey) => {

        this.User.setApiKeyHeader(apiKey)
        this.SessionApi.check().$promise.then((response) => {

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

      const verifyEmailToken = (token) => {

        this.AccountApi.postAccountVerifyEmail({
          token: token
        }).$promise.then((response) => {
          handleGoodToken(response.apiKey)
        }, handleBadToken)

      }

      if (stateParams['token'] === '') {
        handleBadToken()
      } else {
        verifyEmailToken(stateParams['token'])
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
