import * as angular from "angular"
import {ISetNewPasswordStateParams} from "../../../app/login/set-new-password/set-new-password"
import {IFilterService} from "../../services/filter/filter.service"
import {TopAlertService} from "../../services/top-alert/top-alert.service"
import apiModule from "profitelo-api-ng/api.module"
import {RecoverPasswordApi} from "profitelo-api-ng/api/api"
import {LoginStateService} from "../../services/login-state/login-state.service"
import topAlertModule from "../../services/top-alert/top-alert"
import loginStateModule from "../../services/login-state/login-state"

export interface ILoginSetNewPassword {
  method: string
  payload: {
    msisdn?: string
    token: string
  }
}

export interface ILoginSetNewPasswordService {
  resolve(stateParam: ISetNewPasswordStateParams): ng.IPromise<ILoginSetNewPassword>
}

class LoginSetNewPasswordResolver implements ILoginSetNewPasswordService {

  constructor(private $state: ng.ui.IStateService, private $filter: IFilterService,
              private $timeout: ng.ITimeoutService, private $q: ng.IQService,
              private loginStateService: LoginStateService, private topAlertService: TopAlertService,
              private RecoverPasswordApi: RecoverPasswordApi) {

  }

  public resolve = (stateParams: ISetNewPasswordStateParams) => {

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

      this.RecoverPasswordApi.postRecoverPasswordVerifyEmailRoute({
        token: stateParams.token
      }).then(() => {
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
  apiModule,
  topAlertModule,
  loginStateModule
])
  .service('LoginSetNewPasswordResolver', LoginSetNewPasswordResolver)
