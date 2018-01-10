import * as angular from 'angular'
import {IFilterService} from '../../../common/services/filter/filter.service'
import {PasswordStrengthService} from '../../../common/services/password-strength/password-strength.service'
import apiModule from 'profitelo-api-ng/api.module'
import {RecoverPasswordApi} from 'profitelo-api-ng/api/api'
import {CommonSettingsService} from '../../../common/services/common-settings/common-settings.service'
import {TopAlertService} from '../../../common/services/top-alert/top-alert.service'
import {
  ILoginSetNewPassword,
  ILoginSetNewPasswordService
} from '../../../common/resolvers/login-set-new-password/login-set-new-password.service'
import commonSettingsModule from '../../../common/services/common-settings/common-settings'
import sessionModule from '../../../common/services/session/session'
import loginStateModule from '../../../common/services/login-state/login-state'
import topAlertModule from '../../../common/services/top-alert/top-alert'
import passwordStrengthModule from '../../../common/services/password-strength/password-strength'
import 'angularjs/common/directives/pro-top-waiting-loader/pro-top-waiting-loader'
import 'angularjs/common/resolvers/login-set-new-password/login-set-new-password.service'
import 'angularjs/common/directives/interface/pro-alert/pro-alert'
import 'angularjs/common/directives/password-strength-bar/password-strength-bar'
import inputPasswordModule from '../../../common/components/interface/input-password/input-password'
import autoFocus from '../../../common/directives/auto-focus/auto-focus'
import {StateService, StateProvider} from '@uirouter/angularjs'
import uiRouter from '@uirouter/angularjs'

export interface ISetNewPasswordStateParams {
  token: string
  method: string
}

function SetNewPasswordController($state: StateService, $filter: IFilterService,
                                  tokenStatus: ILoginSetNewPassword, passwordStrengthService: PasswordStrengthService,
                                  topAlertService: TopAlertService, RecoverPasswordApi: RecoverPasswordApi,
                                  CommonSettingsService: CommonSettingsService, $log: ng.ILogService): void {

  this.newPassword = ''
  this.enteredCurrentPassword = ''
  this.patternPassword = CommonSettingsService.localSettings.passwordPattern

  const _passwordChangeError = (): void => {
    $state.go('app.login.account')
    topAlertService.error({
      message: $filter('translate')('INTERFACE.API_ERROR'),
      timeout: 2
    })
  }

  const _passwordChangeSuccess = (): void => {
    $state.go('app.login.account')
    topAlertService.success({
      message: $filter('translate')('LOGIN.PASSWORD_RECOVERY.PASSWORD_HAD_BEEN_CHANGED'),
      timeout: 3
    })
  }

  const _submitPasswordChangeBySms = (): void => {
    (<any>tokenStatus.payload).password = this.newPassword

    if (tokenStatus.payload.msisdn) {
      const putRecoverPassword = {
        password: this.newPassword.toString(),
        token: tokenStatus.payload.token,
        msisdn: tokenStatus.payload.msisdn
      }

      RecoverPasswordApi.putRecoverPasswordMsisdnRoute(putRecoverPassword)
        .then(_passwordChangeSuccess, _passwordChangeError)
    }
    else {
      $log.error('Msisdn is missing')
    }
  }

  const _submitPasswordChangeByEmail = (): void => {
    (<any>tokenStatus).payload.password = this.newPassword

    const putRecoverPassword = {
      password: this.newPassword.toString(),
      token: tokenStatus.payload.token
    }

    RecoverPasswordApi.putRecoverPasswordEmailRoute(putRecoverPassword)
      .then(_passwordChangeSuccess, _passwordChangeError)
  }

  this.onPasswordChange = (password: string): void => {
    this.passwordStrength = passwordStrengthService.getStrength(password)
  }

  this.submitPasswordChange = (): void => {
    if (tokenStatus.method === 'SMS') {
      _submitPasswordChangeBySms()
    } else {
      _submitPasswordChangeByEmail()
    }
  }

  this.checkIsPasswordCorrect = (): boolean =>
    this.patternPassword.test(this.newPassword)

  return this

}

function config($stateProvider: StateProvider): void {
  $stateProvider.state('app.login.set-new-password', {
    url: '/set-new-password/token/:token/{method:|sms}',
    controllerAs: 'vm',
    controller: 'SetNewPasswordController',
    template: require('./set-new-password.html'),
    resolve: {
      tokenStatus: ($stateParams: ISetNewPasswordStateParams,
                    LoginSetNewPasswordResolver: ILoginSetNewPasswordService): ng.IPromise<ILoginSetNewPassword> =>
        /* istanbul ignore next */
         LoginSetNewPasswordResolver.resolve($stateParams)
    },
    data: {
      pageTitle: 'PAGE_TITLE.LOGIN.SET_NEW_PASSWORD'
    }
  })
}

angular.module('profitelo.controller.login.set-new-password', [
    loginStateModule,
  topAlertModule,
  'profitelo.services.pro-top-waiting-loader-service',
  passwordStrengthModule,
  'profitelo.resolvers.login-set-new-password',
  uiRouter,
  commonSettingsModule,
  apiModule,
  'profitelo.directives.interface.pro-alert',
  'profitelo.directives.password-strength-bar',
  sessionModule,
  inputPasswordModule,
  autoFocus
])
  .config(['$stateProvider', config])
  .controller('SetNewPasswordController', SetNewPasswordController)
