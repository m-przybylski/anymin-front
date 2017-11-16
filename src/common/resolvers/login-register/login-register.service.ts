import * as angular from 'angular'
import {TopAlertService} from '../../services/top-alert/top-alert.service'
import {LoginStateService} from '../../services/login-state/login-state.service'
import apiModule from 'profitelo-api-ng/api.module'
import {RegistrationApi} from 'profitelo-api-ng/api/api'
import loginStateModule from '../../services/login-state/login-state'
import topAlertModule from '../../services/top-alert/top-alert'
import {TranslatorService} from '../../services/translator/translator.service'
import translatorModule from '../../services/translator/translator'
import {httpCodes} from '../../classes/http-codes'

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

    const handleError = (error: any): void => {
      if (error.status === httpCodes.badRequest) {
        _deferred.resolve({})
      } else {
        _deferred.reject()
        this.$log.error(error)
      }
    }

    const _account = this.loginStateService.getAccountObject()

    if (_account.phoneNumber.number === null) {
      this.topAlertService.warning({
        message: this.translatorService.translate('REGISTER.ENTER_PHONE_NUMBER_FIRST'),
        timeout: 3
      })
      this.$timeout(() => {
        this.$state.go('app.login.account')
      })
      _deferred.resolve({})
    } else {
      this.RegistrationApi.requestVerificationRoute({
        msisdn: _account.phoneNumber.prefix + _account.phoneNumber.number
      }).then((response: any) => {
        _deferred.resolve({
          sessionId: response.sessionId,
          accountObject: _account
        })
      }, (error: any) => {
        handleError(error)
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
