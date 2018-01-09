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
import {LocalStorageWrapper} from '../../../common/classes/local-storage-wrapper/local-storage-wrapper'
import {Config} from '../../config';
import {
  RegistrationInvitationService
}
  from '../../../common/services/registration-invitation/registration-invitation.service'
import registrationInvitationModule from '../../../common/services/registration-invitation/registration-invitation'
import {StateService, StateProvider} from '@uirouter/angularjs'
import uiRouter from '@uirouter/angularjs'

function _controller($log: ng.ILogService, $filter: IFilterService, $state: StateService,
                     topWaitingLoaderService: TopWaitingLoaderService, user: AccountDetails,
                     CommonSettingsService: CommonSettingsService,
                     registrationInvitationService: RegistrationInvitationService,
                     topAlertService: TopAlertService, AccountApi: AccountApi): void {

  this.isPending = false
  this.rulesAccepted = false
  this.newEnteredEmail = ''
  this.serverError = false
  this.alreadyCheck = false
  this.email = ''
  this.emailExist = false
  this.mailPattern = CommonSettingsService.localSettings.emailPattern

  const _updateNewUserObject = (patchObject: PatchAccount, successCallback: (res: Account) => void): void => {
    /* istanbul ignore next if */
    if (!this.isPending) {
      this.isPending = true
      topWaitingLoaderService.immediate()

      const accountId = user.id

      AccountApi.patchUpdateAccountRoute(accountId, patchObject).then(successCallback, (error) => {
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

  const _isEmailExists = (email: string): ng.IPromise<{}> => AccountApi.getAccountEmailExistsRoute(email)

  this.setNewEmail = (): void => {
    this.newEnteredEmail = this.email
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
        const invitationObject = registrationInvitationService.getInvitationObject()
        if (invitationObject && invitationObject.email === undefined) {
          $state.go('app.invitations', {token: invitationObject.token})
          LocalStorageWrapper.removeItem('invitation')
        } else {
          Config.isPlatformForExpert ? $state.go('app.dashboard.expert.activities') :
            $state.go('app.dashboard.client.favourites')
        }
      })
    })
  }

  this.checkIfNewEnteredEmailExist = (): boolean =>
    this.newEnteredEmail !== this.email

  this.checkIsButtonDisabled = (): boolean =>
    this.mailPattern.test(this.email)

  return this
}

function config($stateProvider: StateProvider): void {
  $stateProvider.state('app.post-register.set-email', {
    url: '/set-email',
    controllerAs: 'vm',
    controller: 'SetEmailController',
    template: require('./set-email.pug'),
    resolve: {
      /* istanbul ignore next */
      user: (userService: UserService): ng.IPromise<AccountDetails> => userService.getUser()
    },
    data: {
      pageTitle: 'PAGE_TITLE.LOGIN.REGISTER'
    }
  })
}

angular.module('profitelo.controller.post-register.set-email', [
  userModule,
  loginStateModule,
  uiRouter,
  'profitelo.resolvers.login-register',
  apiModule,
  registrationInvitationModule,
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
