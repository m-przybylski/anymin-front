import * as angular from 'angular'
const phonenumbers = require('libphonenumber-js')
import {IFilterService} from '../../../common/services/filter/filter.service'
import {CommonSettingsService} from '../../../common/services/common-settings/common-settings.service'
import {LoginStateService} from '../../../common/services/login-state/login-state.service'
import {TopAlertService} from '../../../common/services/top-alert/top-alert.service'
import {TopWaitingLoaderService} from '../../../common/services/top-waiting-loader/top-waiting-loader.service'
import apiModule from 'profitelo-api-ng/api.module'
import {RegistrationApi} from 'profitelo-api-ng/api/api'
import sessionModule from '../../../common/services/session/session'
import loginStateModule from '../../../common/services/login-state/login-state'
import commonSettingsModule from '../../../common/services/common-settings/common-settings'
import communicatorModule from '../../../common/components/communicator/communicator'
import topAlertModule from '../../../common/services/top-alert/top-alert'
import 'common/directives/pro-top-waiting-loader/pro-top-waiting-loader'
import topWaitingLoader from '../../../common/services/top-waiting-loader/top-waiting-loader'
import 'common/directives/interface/pro-alert/pro-alert'
import 'common/directives/interface/pro-input-password/pro-input-password'
import 'common/directives/interface/pro-input/pro-input'
import 'common/components/interface/dropdown-primary/dropdown-primary'
import {UserService} from '../../../common/services/user/user.service'

function AccountFormController($log: ng.ILogService, $state: ng.ui.IStateService,
                               $filter: IFilterService, RegistrationApi: RegistrationApi, userService: UserService,
                               topWaitingLoaderService: TopWaitingLoaderService,
                               topAlertService: TopAlertService, loginStateService: LoginStateService,
                               CommonSettingsService: CommonSettingsService) {

  this.isPending = false
  this.current = 1
  this.account = loginStateService.getAccountObject()
  this.prefixes = CommonSettingsService.localSettings.countryCodes.map((item: any) => {
    return {
      value: item,
      name: item
    }
  })

  this.isValidPhoneNumber = (prefix: string, phoneNumber: string) => {
    if (angular.isDefined(prefix) && angular.isDefined(phoneNumber) && prefix && phoneNumber && phoneNumber.length > 1) {
      const fullPhoneNumber = phonenumbers.parse(prefix.toString() + phoneNumber.toString())
      return phonenumbers.isValidNumber(fullPhoneNumber)
    }
    return false
  }

  this.account.phoneNumber.prefix = this.prefixes[0].value
  this.patternPassword = CommonSettingsService.localSettings.passwordPattern
  this.backToPhoneNumber = () => {
    this.account.password = null
    this.current = 1
  }

  const _determinePhoneNumberStatus = (status: any) => {
    switch (status) {
      case 'REGISTERED':
        this.current = 2
        break
      case 'NO_PASSWORD':
        $state.go('app.login.forgot-password')
        break
      case 'UNREGISTERED':
      default:
        $state.go('app.login.register')
    }
  }

  this.updateSortTypeParam = (item: any) => {
    this.account.phoneNumber.prefix = item.value
  }

  this.getPhoneNumberStatus = () => {
    if (!this.isPending) {
      this.isPending = true
      topWaitingLoaderService.immediate()
      loginStateService.setAccountObject(this.account)
      RegistrationApi.checkRegistrationStatusRoute(
        this.account.phoneNumber.prefix + this.account.phoneNumber.number
      ).then((response) => {
        this.isPending = false
        _determinePhoneNumberStatus(response.status)
        topWaitingLoaderService.stopLoader()
      }, (error) => {
        $log.error(error)
        this.isPending = false
        topAlertService.error({
          message: $filter('translate')('INTERFACE.API_ERROR'),
          timeout: 4
        })
        topWaitingLoaderService.stopLoader()
      })
    }
  }

  this.login = () => {
    this.serverError = false
    if (!this.isPending) {
      this.isPending = true
      topWaitingLoaderService.immediate()
      userService.login({
        msisdn: this.account.phoneNumber.prefix + '' + this.account.phoneNumber.number,
        password: this.account.password
      }).then(() => {
        this.isPending = false
        topWaitingLoaderService.stopLoader()
        $state.go('app.dashboard.client.favourites')
        loginStateService.clearServiceObject()
        topAlertService.success({
          message: $filter('translate')('LOGIN.SUCCESSFUL_LOGIN'),
          timeout: 2
        })
      }, (error) => {
        topWaitingLoaderService.stopLoader()
        this.serverError = true
        this.isPending = false
        if (error.status === '500' || error.status === '404') {
          throw new Error('User can not login: ' + error)
        }
      })
    }
  }

  return this
}

function config($stateProvider: ng.ui.IStateProvider) {
  $stateProvider.state('app.login.account', {
    url: '/account',
    controllerAs: 'vm',
    controller: 'AccountFormController',
    template: require('./account.pug')(),
    data: {
      pageTitle: 'PAGE_TITLE.LOGIN.ACCOUNT'
    }
  })
}

angular.module('profitelo.controller.login.account', [
  'ui.router',
  sessionModule,
  loginStateModule,
  apiModule,
  commonSettingsModule,
  communicatorModule,
  topWaitingLoader,
  topAlertModule,
  'profitelo.directives.interface.pro-alert',
  'profitelo.directives.interface.pro-input-password',
  'profitelo.directives.interface.pro-input',
  'profitelo.components.interface.dropdown-primary'
])
  .config(config)
  .controller('AccountFormController', AccountFormController)
