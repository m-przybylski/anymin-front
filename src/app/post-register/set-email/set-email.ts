import * as angular from 'angular'
import {IFilterService} from '../../../common/services/filter/filter.service'
import {TopWaitingLoaderService} from '../../../common/services/top-waiting-loader/top-waiting-loader.service'
import {TopAlertService} from '../../../common/services/top-alert/top-alert.service'
import apiModule from 'profitelo-api-ng/api.module'
import {AccountApi} from 'profitelo-api-ng/api/api'
import {AccountDetails, PatchAccount} from 'profitelo-api-ng/model/models'
import {UserService} from '../../../common/services/user/user.service'
import userModule from '../../../common/services/user/user'
import commonSettingsModule from '../../../common/services/common-settings/common-settings'
import topAlertModule from '../../../common/services/top-alert/top-alert'
import loginStateModule from '../../../common/services/login-state/login-state'
import ValidationAlertModule from '../../../common/components/interface/alert/validation-alert/validation-alert'
import inputModule from '../../../common/components/interface/input/input'
import {CommonSettingsService} from '../../../common/services/common-settings/common-settings.service'

function _controller($log: ng.ILogService, $filter: IFilterService, $state: ng.ui.IStateService,
                     topWaitingLoaderService: TopWaitingLoaderService, user: AccountDetails,
                     CommonSettingsService: CommonSettingsService,
                     topAlertService: TopAlertService, AccountApi: AccountApi): void {

  this.isPending = false
  this.rulesAccepted = false
  this.serverError = false
  this.alreadyCheck = false
  this.correctCode = false
  this.email = ''
  this.emailExist = false
  this.mailPattern = CommonSettingsService.localSettings.emailPattern

  const _updateNewUserObject = (patchObject: PatchAccount, successCallback: (res: Account) => void): void => {
    /* istanbul ignore next if */
    if (!this.isPending) {
      this.isPending = true
      topWaitingLoaderService.immediate()

      const accountId = user.id

      AccountApi.partialUpdateAccountRoute(accountId, patchObject).then(successCallback, (error) => {
        $log.error(error)
        this.isPending = false
        topWaitingLoaderService.stopLoader()
        topAlertService.error({
          message: $filter('translate')('INTERFACE.API_ERROR'),
          timeout: 4
        })
      })
    }
  }

  const _isEmailExists = (email: string): ng.IHttpPromise<{}> => {
    return AccountApi.getAccountEmailExistsRoute(email)
  }

  this.setNewEmail = (): void => {
    this.onNewEmailChange = this.newEmail
    _isEmailExists(this.email).then((_response: any) => {
      this.emailExist = true
    }, () => {
      _updateNewUserObject({
        unverifiedEmail: this.email
      }, () => {
        this.isPending = false
        topAlertService.success({
          message: $filter('translate')('REGISTER.REGISTRATION_SUCCESS'),
          timeout: 3
        })

        // TODO update session service User.setData({unverifiedEmail: this.email})
        $state.go('app.dashboard.client.favourites')
      })
    })
  }

  this.checkIsEmailExist = (): boolean => {
    return this.onNewEmailChange !== this.newEmail
  }

  this.checkIsButtonDisabled = (): boolean => {
    return this.mailPattern.test(this.newEmail)
  }

  return this
}

function config($stateProvider: ng.ui.IStateProvider): void {
  $stateProvider.state('app.post-register.set-email', {
    url: '/set-email',
    controllerAs: 'vm',
    controller: 'SetEmailController',
    template: require('./set-email.pug')(),
    resolve: {
      /* istanbul ignore next */
      user: (userService: UserService): ng.IPromise<AccountDetails> => {
        return userService.getUser()
      }
    },
    data: {
      pageTitle: 'PAGE_TITLE.LOGIN.REGISTER'
    }
  })
}

angular.module('profitelo.controller.post-register.set-email', [
  'ui.router',
  userModule,
  loginStateModule,
  'profitelo.resolvers.login-register',
  apiModule,
  commonSettingsModule,
  topAlertModule,
  'profitelo.services.pro-top-waiting-loader-service',
  'profitelo.directives.interface.pro-alert',
  'profitelo.controller.post-register.set-password',
  inputModule,
  ValidationAlertModule
])
  .config(config)
  .controller('SetEmailController', _controller)
