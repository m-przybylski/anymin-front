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
import 'angularjs/common/directives/pro-top-waiting-loader/pro-top-waiting-loader'
import topWaitingLoader from '../../../common/services/top-waiting-loader/top-waiting-loader'
import 'angularjs/common/directives/interface/pro-alert/pro-alert'
import 'angularjs/common/components/interface/dropdown-primary/dropdown-primary'
import {UserService} from '../../../common/services/user/user.service'
import inputModule from '../../../common/components/interface/input/input'
import inputPasswordModule from '../../../common/components/interface/input-password/input-password'
import autoFocus from '../../../common/directives/auto-focus/auto-focus'
import {LocalStorageWrapper} from '../../../common/classes/local-storage-wrapper/local-storage-wrapper'
import {Config} from '../../config';
import {IInvitationObject} from '../../invitations/invitation.interface'
import {RegistrationInvitationService} from
  '../../../common/services/registration-invitation/registration-invitation.service'
import registerInvitationModule from '../../../common/services/registration-invitation/registration-invitation'
import {StateService, StateProvider} from '@uirouter/angularjs'
import uiRouter from '@uirouter/angularjs'

function AccountFormController($log: ng.ILogService, $state: StateService,
                               $filter: IFilterService, RegistrationApi: RegistrationApi, userService: UserService,
                               topWaitingLoaderService: TopWaitingLoaderService,
                               topAlertService: TopAlertService, loginStateService: LoginStateService,
                               CommonSettingsService: CommonSettingsService,
                               registrationInvitationService: RegistrationInvitationService): void {

  this.enteredPassword = ''
  this.isPending = false
  this.current = 1
  this.account = loginStateService.getAccountObject()
  this.prefixes = CommonSettingsService.localSettings.countryCodes.map((item: any) => (
    {
      value: item,
      name: item
    }
  ))

  this.isValidPhoneNumber = (prefix: string, phoneNumber: string): boolean => {
    if (angular.isDefined(prefix) && angular.isDefined(phoneNumber) && prefix &&
        phoneNumber && phoneNumber.length > 1) {
      const fullPhoneNumber = phonenumbers.parse(prefix.toString() + phoneNumber.toString())
      return phonenumbers.isValidNumber(fullPhoneNumber)
    }
    return false
  }

  const setPhoneNumberFromLocalStorage = (invitationObject: IInvitationObject | undefined): void => {
    if (invitationObject && invitationObject.msisdn) {
      this.account.phoneNumber.number = phonenumbers.parse(invitationObject.msisdn).phone
    }
  }

  const invitationObject = registrationInvitationService.getInvitationObject()
  setPhoneNumberFromLocalStorage(invitationObject)
  this.account.phoneNumber.prefix = this.prefixes[0].value
  this.patternPassword = CommonSettingsService.localSettings.passwordPattern
  this.backToPhoneNumber = (): void => {
    this.account.password = null
    this.current = 1
  }

  const _determinePhoneNumberStatus = (status: any): void => {
    const registerStep: number = 2
    switch (status) {
      case 'REGISTERED':
        this.current = registerStep
        break
      case 'NO_PASSWORD':
        $state.go('app.login.forgot-password')
        break
      case 'UNREGISTERED':
      default:
        $state.go('app.login.register')
    }
  }

  const checkIsUserFromInvitation = (invitationObject: IInvitationObject | undefined): boolean =>
    typeof invitationObject !== 'undefined' && (invitationObject.msisdn === undefined
    || invitationObject.msisdn === `${this.account.phoneNumber.prefix}${this.account.phoneNumber.number}`)

  this.updateSortTypeParam = (item: any): void => {
    this.account.phoneNumber.prefix = item.value
  }

  this.getPhoneNumberStatus = (): void => {
    if (!this.isPending) {
      this.isPending = true
      topWaitingLoaderService.immediate()
      loginStateService.setAccountObject(this.account)
      RegistrationApi.checkRegistrationStatusRoute(
        <string>this.account.phoneNumber.prefix + <string>this.account.phoneNumber.number
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

  this.login = (): void => {
    this.enteredPassword = this.account.password
    this.serverError = false
    if (!this.isPending) {
      this.isPending = true
      topWaitingLoaderService.immediate()
      userService.login({
        msisdn: `${this.account.phoneNumber.prefix}${this.account.phoneNumber.number}`,
        password: this.account.password
      }).then(() => {
        this.isPending = false
        topWaitingLoaderService.stopLoader()
        if (invitationObject && checkIsUserFromInvitation(invitationObject)) {
          $state.go('app.invitations', {token: invitationObject.token})
          LocalStorageWrapper.removeItem('invitation')
        } else {
          Config.isPlatformForExpert ? $state.go('app.dashboard.expert.activities') :
            $state.go('app.dashboard.client.favourites')
        }
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
          throw new Error('User can not login: ' + String(error))
        }
      })
    }
  }

  this.checkIsPasswordIncorrected = (): boolean => this.enteredPassword !== this.account.password

  return this
}

function config($stateProvider: StateProvider): void {
  $stateProvider.state('app.login.account', {
    url: '/account',
    controllerAs: 'vm',
    controller: 'AccountFormController',
    template: require('./account.pug'),
    data: {
      pageTitle: 'PAGE_TITLE.LOGIN.ACCOUNT'
    }
  })
}

angular.module('profitelo.controller.login.account', [
    sessionModule,
  loginStateModule,
  apiModule,
  commonSettingsModule,
  communicatorModule,
  uiRouter,
  topWaitingLoader,
  registerInvitationModule,
  topAlertModule,
  'profitelo.directives.interface.pro-alert',
  'profitelo.components.interface.dropdown-primary',
  inputModule,
  inputPasswordModule,
  autoFocus
])
  .config(config)
  .controller('AccountFormController', AccountFormController)
