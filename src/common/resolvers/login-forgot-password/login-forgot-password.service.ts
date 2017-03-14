import * as angular from "angular"
import {IForgotPasswordStateParams} from "../../../app/login/forgot-password/forgot-password"
import {IFilterService} from "../../services/filter/filter.service"
import {LoginStateService} from "../../services/login-state/login-state.service"
import {TopAlertService} from "../../services/top-alert/top-alert.service"
import apiModule from "profitelo-api-ng/api.module"
import {RecoverPasswordApi} from "profitelo-api-ng/api/api"
import loginStateModule from "../../services/login-state/login-state"
import topAlertModule from "../../services/top-alert/top-alert"

export interface ILoginForgotPassword {
  recoveryMethod: string
  accountObject: any
}

export interface ILoginForgotPasswordService {
  resolve(stateParams: IForgotPasswordStateParams): ng.IPromise<ILoginForgotPassword>
}

class LoginForgotPasswordResolver implements ILoginForgotPasswordService {

  constructor(private $q: ng.IQService, private $timeout: ng.ITimeoutService, private $filter: IFilterService,
              private $state: ng.ui.IStateService, private topAlertService: TopAlertService,
              private loginStateService: LoginStateService, private RecoverPasswordApi: RecoverPasswordApi) {

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

    const requestPasswordRecovery = (method: any): ng.IPromise<{}> => {
      return this.RecoverPasswordApi.postRecoverPasswordRoute({
        method: method,
        msisdn: account.phoneNumber.prefix + '' + account.phoneNumber.number
      })
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
  apiModule,
  loginStateModule,
  topAlertModule
])
  .service('LoginForgotPasswordResolver', LoginForgotPasswordResolver)
