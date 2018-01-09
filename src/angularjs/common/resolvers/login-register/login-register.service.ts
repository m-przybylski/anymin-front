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
import {StateService} from '@uirouter/angularjs'

export interface ILoginRegister {
  sessionId: string
  accountObject: any
}

export interface ILoginRegisterService {
  resolve(): ng.IPromise<{} | ILoginRegister>
}

class LoginRegisterResolver implements ILoginRegisterService {

  private cacheSessionId?: string

  /* @ngInject */
  constructor(private loginStateService: LoginStateService,
              private $state: StateService,
              private translatorService: TranslatorService,
              private $q: ng.IQService,
              private $timeout: ng.ITimeoutService,
              private topAlertService: TopAlertService,
              private RegistrationApi: RegistrationApi,
              private $log: ng.ILogService) {

  }

  public resolve = (): ng.IPromise<{} | ILoginRegister> => {

    const _deferred = this.$q.defer<{} | ILoginRegister>()

    const handleError = (error: any): void => {
      if (error.status === httpCodes.badRequest && this.cacheSessionId) {
        _deferred.resolve({
          sessionId: this.cacheSessionId,
          accountObject: _account
        })
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
      }).then((response) => {
        this.setCacheVerificationObject(response.sessionId)
        _deferred.resolve({
          sessionId: response.sessionId,
          accountObject: _account
        })
      }, (error) => {
        handleError(error)
      })
    }

    return _deferred.promise
  }

  private setCacheVerificationObject = (sessionId: string): void => {
    this.cacheSessionId = sessionId
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
