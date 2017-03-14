import * as angular from "angular"

import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IFilterService} from "../../../common/services/filter/filter.service"
import {TopWaitingLoaderService} from "../../../common/services/top-waiting-loader/top-waiting-loader.service"
import {TopAlertService} from "../../../common/services/top-alert/top-alert.service"
import {CommonSettingsService} from "../../../common/services/common-settings/common-settings.service"
import apiModule from "profitelo-api-ng/api.module"
import {AccountApi, RegistrationApi} from "profitelo-api-ng/api/api"
import {PatchAccount, Account} from "profitelo-api-ng/model/models"
import {LoginStateService} from "../../../common/services/login-state/login-state.service"
import {SessionService} from "../../../common/services/session/session.service"
import {CommunicatorService} from "../../../common/components/communicator/communicator.service"
import {ILoginRegister, ILoginRegisterService} from "../../../common/resolvers/login-register/login-register.service"
import sessionModule from "../../../common/services/session/session"
import loginStateModule from "../../../common/services/login-state/login-state"
import communicatorModule from "../../../common/components/communicator/communicator"
import commonSettingsModule from "../../../common/services/common-settings/common-settings"
import topAlertModule from "../../../common/services/top-alert/top-alert"
import "common/resolvers/login-register/login-register.service"
import "common/directives/pro-top-waiting-loader/pro-top-waiting-loader"
import "common/directives/interface/pro-input/pro-input"
import "common/directives/interface/pro-alert/pro-alert"
import "common/directives/interface/pro-checkbox/pro-checkbox"

function RegisterController($log: ng.ILogService, $filter: IFilterService, $state: ng.ui.IStateService,
                            $rootScope: IRootScopeService, topWaitingLoaderService: TopWaitingLoaderService,
                            sessionService: SessionService, topAlertService: TopAlertService,
                            smsSessionId: ILoginRegister, CommonSettingsService: CommonSettingsService,
                            RegistrationApi: RegistrationApi, AccountApi: AccountApi,
                            loginStateService: LoginStateService, communicatorService: CommunicatorService) {
  this.passwordStrength = 0
  this.isPending = false
  this.rulesAccepted = false
  this.serverError = false
  this.alreadyCheck = false
  this.correctCode = false
  let userid = ''

  this.registrationSteps = {
    account: smsSessionId.accountObject,
    smsCode: null,
    sessionId: smsSessionId.sessionId
  }

  this.smsCodePattern = CommonSettingsService.localSettings.smsCodePattern

  this.verifyCode = () => {
    if (angular.isDefined(this.registrationSteps.smsCode) && this.registrationSteps.smsCode !== null && !this.alreadyCheck) {
      this.alreadyCheck = true
      RegistrationApi.verifyVerificationRoute({
        sessionId: this.registrationSteps.sessionId,
        token: String(this.registrationSteps.smsCode)
      }).then(() => {
        communicatorService.authenticate()
        this.correctCode = true
      }, (err: any) => {
        $log.error(err)
        this.serverError = true
      })
    } else if (!angular.isDefined(this.registrationSteps.smsCode) || this.registrationSteps.smsCode === null) {
      this.alreadyCheck = false
      this.serverError = false
      this.correctCode = false
    }
  }

  this.getSmsCodeStatus = () => {
    /* istanbul ignore next if */
    if (!this.isPending) {
      this.isPending = true
      topWaitingLoaderService.immediate()
      RegistrationApi.confirmVerificationRoute({
        sessionId: this.registrationSteps.sessionId,
        token: String(this.registrationSteps.smsCode)
      }).then((response) => {
        this.isPending = false
        topWaitingLoaderService.stopLoader()
        sessionService.setApiKey(response.apiKey)
        //User.setData(response)
        //User.setData({role: UserRoles.getRole('user')})
        //User.setApiKeyHeader(response.apiKey)
        //FIXME
        userid = response.accountId

        loginStateService.clearServiceObject()
        $rootScope.loggedIn = true
        $state.go('app.post-register.set-password')
      }, (error: any) => {
        $log.error(error)
        this.isPending = false
        this.serverError = true
        topWaitingLoaderService.stopLoader()
      })
    }
  }

  let _updateNewUserObject = (patchObject: PatchAccount, successCallback: (res: Account) => void) => {
    /* istanbul ignore next if */
    if (!this.isPending) {
      this.isPending = true
      topWaitingLoaderService.immediate()

      AccountApi.partialUpdateAccountRoute(userid, patchObject).then(successCallback, (error) => {
        this.isPending = false
        $log.error(error)
        topWaitingLoaderService.stopLoader()
        topAlertService.error({
          message: $filter('translate')('INTERFACE.API_ERROR'),
          timeout: 4
        })
      })

    }
  }

  this.completeRegistration = () => {
    _updateNewUserObject({
      password: this.registrationSteps.password
    }, () => {
      this.isPending = false
      this.current = 3
      topWaitingLoaderService.stopLoader()
    })
  }

  return this
}

function config($stateProvider: ng.ui.IStateProvider) {
  $stateProvider.state('app.login.register', {
    url: '/register',
    controllerAs: 'vm',
    controller: 'RegisterController',
    template: require('./register.jade')(),
    resolve: {
      /* istanbul ignore next */
      smsSessionId: (LoginRegisterResolver: ILoginRegisterService) => {
        /* istanbul ignore next */
        return LoginRegisterResolver.resolve()
      }
    },
    data: {
      pageTitle: 'PAGE_TITLE.LOGIN.REGISTER'
    }
  })
}

angular.module('profitelo.controller.login.register', [
  'ui.router',
  sessionModule,
  loginStateModule,
  'profitelo.resolvers.login-register',
  apiModule,
  communicatorModule,
  commonSettingsModule,
  topAlertModule,
  'profitelo.services.pro-top-waiting-loader-service',
  'profitelo.directives.interface.pro-checkbox',
  'profitelo.directives.interface.pro-alert',
  'profitelo.directives.interface.pro-input'
])
  .config(config)
  .controller('RegisterController', RegisterController)
