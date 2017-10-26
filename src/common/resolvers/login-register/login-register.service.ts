import * as angular from 'angular'
import {TopAlertService} from '../../services/top-alert/top-alert.service'
import {LoginStateService} from '../../services/login-state/login-state.service'
import apiModule from 'profitelo-api-ng/api.module'
import {RegistrationApi} from 'profitelo-api-ng/api/api'
import loginStateModule from '../../services/login-state/login-state'
import topAlertModule from '../../services/top-alert/top-alert'
import {TranslatorService} from '../../services/translator/translator.service'
import translatorModule from '../../services/translator/translator'

export interface ILoginRegister {
  sessionId: string
  accountObject: any
}

export interface ILoginRegisterService {
  resolve(): ng.IPromise<ILoginRegister>
}

class LoginRegisterResolver implements ILoginRegisterService {

  constructor(private loginStateService: LoginStateService,
              private $state: ng.ui.IStateService,
              private translatorService: TranslatorService,
              private $q: ng.IQService,
              private $timeout: ng.ITimeoutService,
              private topAlertService: TopAlertService,
              private RegistrationApi: RegistrationApi,
              private $log: ng.ILogService) {

  }

  public resolve = (): ng.IPromise<{}> => {

    const _deferred = this.$q.defer()

    const handleError = (): void => {
      _deferred.reject()
      this.$timeout(() => {
        this.$state.go('app.login.account')
      })
    }

    const _account = this.loginStateService.getAccountObject()

    if (_account.phoneNumber.number === null) {
      this.topAlertService.warning({
        message: this.translatorService.translate('REGISTER.ENTER_PHONE_NUMBER_FIRST'),
        timeout: 3
      })
      handleError()
    } else {
      this.RegistrationApi.requestVerificationRoute({
        msisdn: _account.phoneNumber.prefix + _account.phoneNumber.number
      }).then((response: any) => {
        _deferred.resolve({
          sessionId: response.sessionId,
          accountObject: _account
        })
      }, (error: any) => {
        this.$log.error(error)
        this.topAlertService.warning({
          message: this.translatorService.translate('INTERFACE.API_ERROR'),
          timeout: 3
        })
        handleError()
      })
    }

    return _deferred.promise
  }

}

angular.module('profitelo.resolvers.login-register', [
  apiModule,
  loginStateModule,
  'profitelo.filters.normalize-translation-key-filter',
  translatorModule,
  topAlertModule
])
  .service('LoginRegisterResolver', LoginRegisterResolver)
