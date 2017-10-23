import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IFilterService} from '../../services/filter/filter.service'
import apiModule from 'profitelo-api-ng/api.module'
import {AccountApi} from 'profitelo-api-ng/api/api'
import {TopAlertService} from '../../services/top-alert/top-alert.service'
import {SessionService} from '../../services/session/session.service'
import {IConfirmEmailStateParams} from '../../../app/confirm-email/confirm-email'
import topAlertModule from '../../services/top-alert/top-alert'
import sessionModule from '../../services/session/session'

export interface ILoginConfirmEmailService {
  resolve(stateParams: IConfirmEmailStateParams): ng.IPromise<void>
}

class LoginConfirmEmailResolver implements ILoginConfirmEmailService {

  constructor(private $q: ng.IQService, private $rootScope: IRootScopeService, private $timeout: ng.ITimeoutService,
              private $filter: IFilterService, private $state: ng.ui.IStateService,
              private topAlertService: TopAlertService, private sessionService: SessionService,
              private AccountApi: AccountApi) {

  }

  public resolve = (stateParams: IConfirmEmailStateParams): ng.IPromise<void> => {
    const _deferred = this.$q.defer<undefined>()

    const handleBadToken = (): void => {
      _deferred.reject()
      this.topAlertService.error({
        message: this.$filter('translate')('LOGIN.EMAIL_CONFIRMATION_FAIL'),
        timeout: 4
      })
      this.$timeout(() => {
        this.$state.go('app.login.account')
      })
    }

    const handleGoodToken = (): void => {

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

    const verifyEmailToken = (token: string): void => {

      this.AccountApi.postAccountVerifyEmailRoute(token).then(_response => {
        handleGoodToken()
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
  apiModule,
  topAlertModule,
  sessionModule,
  'profitelo.directives.interface.pro-alert'
])
  .service('LoginConfirmEmailResolver', LoginConfirmEmailResolver)
