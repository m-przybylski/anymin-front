import * as angular from 'angular'
import userModule from '../../../common/services/user/user'
import apiModule from 'profitelo-api-ng/api.module'
import {AccountApi} from 'profitelo-api-ng/api/api'
import {AccountDetails} from 'profitelo-api-ng/model/models'
import {TopWaitingLoaderService} from '../../../common/services/top-waiting-loader/top-waiting-loader.service'
import {TopAlertService} from '../../../common/services/top-alert/top-alert.service'
import {CommonSettingsService} from '../../../common/services/common-settings/common-settings.service'
import {PasswordStrengthService} from '../../../common/services/password-strength/password-strength.service'
import {UserService} from '../../../common/services/user/user.service'
import topAlertModule from '../../../common/services/top-alert/top-alert'
import passwordStrengthModule from '../../../common/services/password-strength/password-strength'
import commonSettingsModule from '../../../common/services/common-settings/common-settings'
import 'common/directives/pro-top-waiting-loader/pro-top-waiting-loader'
import 'common/directives/interface/pro-alert/pro-alert'
import 'common/directives/interface/pro-input/pro-input'
import 'common/directives/interface/pro-input-password/pro-input-password'
import 'common/directives/password-strength-bar/password-strength-bar'
import checkboxModule from '../../../common/components/interface/checkbox/checkbox'

function _controller($log: ng.ILogService, $filter: ng.IFilterService, $state: ng.ui.IStateService,
                     topWaitingLoaderService: TopWaitingLoaderService, passwordStrengthService: PasswordStrengthService,
                     user: AccountDetails, topAlertService: TopAlertService, CommonSettingsService: CommonSettingsService,
                     AccountApi: AccountApi) {

  this.passwordStrength = 0
  this.password = ''
  this.isPending = false
  this.isRequired = true
  this.rulesAccepted = false
  this.serverError = false
  this.alreadyCheck = false
  this.msisdn = {
    number: user.msisdn
  }
  this.translationUrl = {
    hrefUrl: 'http://miroslawkwiatek.republika.pl/pdf_y/grawitacja_kwantowa.pdf'
  }

  this.patternPassword = CommonSettingsService.localSettings.passwordPattern

  this.onPasswordChange = (password: string) => {
    this.passwordStrength = passwordStrengthService.getStrength(password)
  }

  const _updateNewUserObject = (patchObject: any, successCallback: (res: Account) => void) => {
    /* istanbul ignore next if */
    if (!this.isPending) {
      this.isPending = true
      topWaitingLoaderService.immediate()

      const accountId = user.id

      AccountApi.partialUpdateAccountRoute(accountId, patchObject).then(successCallback, (error) => {
        this.isPending = false
        topWaitingLoaderService.stopLoader()
        $log.error(error)
        topAlertService.error({
          message: $filter('translate')('INTERFACE.API_ERROR'),
          timeout: 4
        })
      })
    }
  }

  this.completeRegistration = () => {
    _updateNewUserObject({
      password: this.password
    }, () => {

      // TODO Update session User.setData({hasPassword: true})
      this.isPending = false
      topWaitingLoaderService.stopLoader()
      $state.go('app.post-register.set-email')
    })
  }

  return this
}

function config($stateProvider: ng.ui.IStateProvider) {
  $stateProvider.state('app.post-register.set-password', {
    url: '/set-password',
    controllerAs: 'vm',
    controller: 'SetPasswordController',
    template: require('./set-password.pug')(),
    resolve: {
      user: (userService: UserService) => {
        return userService.getUser()
      }
    },
    data: {
      pageTitle: 'PAGE_TITLE.POST_REGISTER.SET_PASSWORD'
    }
  })
}

angular.module('profitelo.controller.post-register.set-password', [
  'ui.router',
  userModule,
  apiModule,
  commonSettingsModule,
  passwordStrengthModule,
  topAlertModule,
  'profitelo.services.pro-top-waiting-loader-service',
  'profitelo.directives.interface.pro-alert',
  'profitelo.directives.interface.pro-input-password',
  'profitelo.directives.interface.pro-input',
  'profitelo.directives.password-strength-bar',
  checkboxModule
])
  .config(config)
  .controller('SetPasswordController', _controller)
