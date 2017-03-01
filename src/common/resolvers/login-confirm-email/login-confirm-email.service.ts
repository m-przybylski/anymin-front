namespace profitelo.resolvers.loginConfirmEmail {

  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  import IFilterService = profitelo.services.filter.IFilterService
  import IConfirmEmailStateParams = profitelo.login.confirmEmail.IConfirmEmailStateParams
  import IAccountApi = profitelo.api.IAccountApi

  import ISessionService = profitelo.services.session.ISessionService

  export interface ILoginConfirmEmailService {
    resolve(stateParams: IConfirmEmailStateParams): ng.IPromise<undefined>
  }

  class LoginConfirmEmailResolver implements ILoginConfirmEmailService {

    constructor(private $q: ng.IQService, private $rootScope: IRootScopeService, private $timeout: ng.ITimeoutService,
                private $filter: IFilterService, private $state: ng.ui.IStateService,
                private topAlertService: ITopAlertService, private sessionService: ISessionService,
                private AccountApi: IAccountApi) {

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
        this.sessionService.setApiKey(apiKey)

        this.sessionService.getSession(true).then((_response) => {

          _deferred.resolve()

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

        this.AccountApi.postAccountVerifyEmailRoute(token).then(response => {
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
    'profitelo.api.AccountApi',
    'profitelo.services.top-alert',
    'profitelo.services.session',
    'profitelo.directives.interface.pro-alert'
  ])
  .service('LoginConfirmEmailResolver', LoginConfirmEmailResolver)

}
