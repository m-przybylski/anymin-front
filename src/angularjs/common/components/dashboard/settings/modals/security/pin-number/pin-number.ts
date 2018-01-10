import * as angular from 'angular'
import * as _ from 'lodash'
import {CommonSettingsService} from '../../../../../../services/common-settings/common-settings.service'
import apiModule from 'profitelo-api-ng/api.module'
import {AccountApi} from 'profitelo-api-ng/api/api'
import commonSettingsModule from '../../../../../../services/common-settings/common-settings'
import checkboxModule from '../../../../../interface/checkbox/checkbox'
import inputPasswordModule from '../../../../../interface/input-password/input-password'
import autoFocus from '../../../../../../directives/auto-focus/auto-focus'
import {httpCodes} from '../../../../../../classes/http-codes'

export interface ISecurityPinNumberSettingsControllerScope extends ng.IScope {
}

interface IProtectedViewsStatus {
  CALL_VIEW?: boolean,
  PAY_OUT_VIEW?: boolean,
  MAKE_DEPOSIT_VIEW?: boolean
  [key: string]: boolean | undefined
}

export class SecurityPinNumberSettingsController implements ng.IController {

  private readonly pinLength: number = 4
  public isPasswordIncorrect: boolean = false
  public isNavbar: boolean = true
  public isFullscreen: boolean = true
  public isNewPinTyped: boolean = false
  public confirmPassword: string = ''
  public pinInput: string[] = new Array(this.pinLength)
  public patternPassword: RegExp = this.CommonSettingsService.localSettings.passwordPattern
  public protectedViewsStatus: IProtectedViewsStatus = {
    CALL_VIEW: false,
    PAY_OUT_VIEW: false,
    MAKE_DEPOSIT_VIEW: false
  }
  private newEnteredCurrentPassword: string = ''
  public isError: boolean = false

  public onModalClose = (): void => {
    this.$uibModalInstance.dismiss('cancel')
  }

    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, private AccountApi: AccountApi,
              private CommonSettingsService: CommonSettingsService) {
    AccountApi.getMobileProtectedViewsRoute().then(res => {
      res.protectedViews.forEach((view) => {
        this.protectedViewsStatus[view] = true
      })
    }, (err) => {
      this.$uibModalInstance.dismiss('cancel')
      throw new Error('Can not get mobile protected views: ' + String(err))
    })
  }

  public sendPin = (): void => {
    this.newEnteredCurrentPassword = this.confirmPassword
    this.isNewPinTyped = true
  }

  public changeViewsAndPin = (): void => {
    const protectedViews: string[] = []
    this.isPasswordIncorrect = false
    _.each(this.protectedViewsStatus, (val: boolean, key: string) => {
      if (val) {
        protectedViews.push(key)
      }
    })
    this.isError = false
    this.AccountApi.patchMobileViewsPermissionsRoute({
      protectedViews,
      password: this.confirmPassword,
      mobilePin: this.pinInput.join('')
    }).then(_res => {
      this.$uibModalInstance.dismiss('cancel')
    }, (err) => {
      this.isError = true
      if (err.status === httpCodes.unauthorized) {
        this.isPasswordIncorrect = true
      } else {
        this.$uibModalInstance.dismiss('cancel')
        throw new Error('Can not patch mobile protected views: ' + String(err))
      }
    })
  }

  public checkIsButtonDisabled = (): boolean =>
    this.patternPassword.test(this.confirmPassword)

  public checkIsNewEnteredPasswordCorrected = (): boolean =>
    this.newEnteredCurrentPassword !== this.confirmPassword && this.patternPassword.test(this.confirmPassword)
}

angular.module('profitelo.components.dashboard.settings.security.modals.pin-number', [
  'ui.bootstrap',

  commonSettingsModule,
  apiModule,
  'profitelo.directives.interface.focus-next',
  'profitelo.directives.interface.scrollable',
  checkboxModule,
  inputPasswordModule,
  autoFocus
])
  .controller('securityPinNumberSettingsController', SecurityPinNumberSettingsController)
