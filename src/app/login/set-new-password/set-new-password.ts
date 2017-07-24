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
import 'common/directives/pro-top-waiting-loader/pro-top-waiting-loader'
import 'common/resolvers/login-set-new-password/login-set-new-password.service'
import 'common/directives/interface/pro-alert/pro-alert'
import 'common/directives/interface/pro-input-password/pro-input-password'
import 'common/directives/password-strength-bar/password-strength-bar'
import {IPromise} from 'angular'

export interface ISetNewPasswordStateParams {
  token: string
  method: string
}

function SetNewPasswordController($state: ng.ui.IStateService, $filter: IFilterService,
                                  tokenStatus: ILoginSetNewPassword, passwordStrengthService: PasswordStrengthService,
                                  topAlertService: TopAlertService, RecoverPasswordApi: RecoverPasswordApi,
                                  CommonSettingsService: CommonSettingsService, $log: ng.ILogService): void {

  this.newPassword = ''
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

  return this

}

function config($stateProvider: ng.ui.IStateProvider): void {
  $stateProvider.state('app.login.set-new-password', {
    url: '/set-new-password/token/:token/{method:|sms}',
    controllerAs: 'vm',
    controller: 'SetNewPasswordController',
    template: require('./set-new-password.pug')(),
    resolve: {
      tokenStatus: ($stateParams: ISetNewPasswordStateParams, LoginSetNewPasswordResolver: ILoginSetNewPasswordService): IPromise<ILoginSetNewPassword> => {
        /* istanbul ignore next */
        return LoginSetNewPasswordResolver.resolve($stateParams)
      }
    },
    data: {
      pageTitle: 'PAGE_TITLE.LOGIN.SET_NEW_PASSWORD'
    }
  })
}

angular.module('profitelo.controller.login.set-new-password', [
  'ui.router',
  loginStateModule,
  topAlertModule,
  'profitelo.services.pro-top-waiting-loader-service',
  passwordStrengthModule,
  'profitelo.resolvers.login-set-new-password',
  commonSettingsModule,
  apiModule,
  'profitelo.directives.interface.pro-alert',
  'profitelo.directives.interface.pro-input-password',
  'profitelo.directives.password-strength-bar',
  sessionModule
])
  .config(config)
  .controller('SetNewPasswordController', SetNewPasswordController)
