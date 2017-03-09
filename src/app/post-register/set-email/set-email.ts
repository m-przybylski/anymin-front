import * as angular from "angular"
import {IFilterService} from "../../../common/services/filter/filter.service"
import {TopWaitingLoaderService} from "../../../common/services/top-waiting-loader/top-waiting-loader.service"
import {AccountDetails} from "../../../common/api/model/AccountDetails"
import {TopAlertService} from "../../../common/services/top-alert/top-alert.service"
import {AccountApi} from "../../../common/api/api/AccountApi"
import {PatchAccount} from "../../../common/api/model/PatchAccount"
import {UserService} from "../../../common/services/user/user.service"
import userModule from "../../../common/services/user/user"
import apiModule from "../../../common/api/api.module"
import commonSettingsModule from "../../../common/services/common-settings/common-settings"
import topAlertModule from "../../../common/services/top-alert/top-alert"
import loginStateModule from "../../../common/services/login-state/login-state"

function _controller($log: ng.ILogService, $filter: IFilterService, $state: ng.ui.IStateService,
                     topWaitingLoaderService: TopWaitingLoaderService, user: AccountDetails,
                     topAlertService: TopAlertService, AccountApi: AccountApi) {

  this.isPending = false
  this.rulesAccepted = false
  this.serverError = false
  this.alreadyCheck = false
  this.correctCode = false
  this.email = ''
  this.emailExist = false

  let _updateNewUserObject = (patchObject: PatchAccount, successCallback: (res: Account) => void) => {
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

  let _isEmailExists = (email: string): ng.IHttpPromise<{}> => {
    return AccountApi.getAccountEmailExistsRoute(email)
  }

  this.setNewEmail = () => {
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
        //User.setData({unverifiedEmail: this.email})
        $state.go('app.dashboard.client.favourites')
      })
    })
  }

  return this
}

function config($stateProvider: ng.ui.IStateProvider) {
  $stateProvider.state('app.post-register.set-email', {
    url: '/set-email',
    controllerAs: 'vm',
    controller: 'SetEmailController',
    template: require('./set-email.jade')(),
    resolve: {
      /* istanbul ignore next */
      user: (userService: UserService) => {
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
  'profitelo.directives.interface.pro-checkbox',
  'profitelo.directives.interface.pro-alert',
  'profitelo.directives.interface.pro-input',
  'profitelo.controller.post-register.set-password'
])
  .config(config)
  .controller('SetEmailController', _controller)
