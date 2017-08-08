import * as angular from 'angular'
import {TopWaitingLoaderService} from '../../../common/services/top-waiting-loader/top-waiting-loader.service'
import {CommonSettingsService} from '../../../common/services/common-settings/common-settings.service'
import {
  ILoginForgotPassword,
  ILoginForgotPasswordService
} from '../../../common/resolvers/login-forgot-password/login-forgot-password.service'
import apiModule from 'profitelo-api-ng/api.module'
import {RecoverPasswordApi} from 'profitelo-api-ng/api/api'
import commonSettingsModule from '../../../common/services/common-settings/common-settings'
import sessionModule from '../../../common/services/session/session'
import 'common/resolvers/login-forgot-password/login-forgot-password.service'
import 'common/directives/pro-top-waiting-loader/pro-top-waiting-loader'
import inputModule from '../../../common/components/interface/input/input'

type method = 'sms' | 'email'

export interface IForgotPasswordStateParams {
  method: method
}

function ForgotPasswordController($state: ng.ui.IStateService, account: ILoginForgotPassword,
                                  RecoverPasswordApi: RecoverPasswordApi,
                                  topWaitingLoaderService: TopWaitingLoaderService,
                                  CommonSettingsService: CommonSettingsService): void {

  const maxSmsCodeLength: number = 4
  this.isNewCurrentPasswordChange = ''
  this.isPending = false
  this.account = account
  this.smsCode = ''
  this.smsCodePattern = CommonSettingsService.localSettings.smsCodePattern

  this.forceSmsRecovery = (): void => {
    $state.go('app.login.forgot-password', {method: 'sms'}, {reload: true})
  }

  this.submitSmsVerificationCode = (): void => {
    this.isNewCurrentPasswordChange = this.smsCode
    this.serverError = false
    if (!this.isPending) {
      this.isPending = true
      topWaitingLoaderService.immediate()
      RecoverPasswordApi.postRecoverPasswordVerifyMsisdnRoute({
        token: String(this.smsCode),
        msisdn: String(account.accountObject.phoneNumber.prefix) + String(account.accountObject.phoneNumber.number)
      }).then(() => {
        this.isPending = false
        topWaitingLoaderService.stopLoader()
        $state.go('app.login.set-new-password', {
          token: String(this.smsCode),
          method: 'sms'
        })
      }, () => {
        this.isPending = false
        topWaitingLoaderService.stopLoader()
        this.serverError = true
      })
    }

  }

  this.checkIsPasswordCorrected = (): boolean =>
    this.isNewCurrentPasswordChange !== this.smsCode

  this.checkIsButtonDisabled = (): boolean =>
    this.smsCode.length < maxSmsCodeLength

  return this

}

function config($stateProvider: ng.ui.IStateProvider): void {
  $stateProvider.state('app.login.forgot-password', {
    url: '/forgot-password/{method:|sms}',
    controllerAs: 'vm',
    controller: 'ForgotPasswordController',
    template: require('./forgot-password.pug')(),
    resolve: {
      account: (
        LoginForgotPasswordResolver: ILoginForgotPasswordService,
        $stateParams: IForgotPasswordStateParams
      ): ng.IPromise<ILoginForgotPassword> => {
        return LoginForgotPasswordResolver.resolve($stateParams)
      }
    },
    data: {
      pageTitle: 'PAGE_TITLE.LOGIN.FORGOT_PASSWORD'
    }
  })
}

angular.module('profitelo.controller.login.forgot-password', [
  'ui.router',
  'profitelo.resolvers.login-forgot-password',
  apiModule,
  'profitelo.services.pro-top-waiting-loader-service',
  commonSettingsModule,
  sessionModule,
  inputModule
])
  .config(config)
  .controller('ForgotPasswordController', ForgotPasswordController)
