import * as angular from 'angular'
import * as _ from 'lodash'
import {CommonSettingsService} from '../../../../../../services/common-settings/common-settings.service'
import apiModule from 'profitelo-api-ng/api.module'
import {AccountApi} from 'profitelo-api-ng/api/api'
import commonSettingsModule from '../../../../../../services/common-settings/common-settings'
import checkboxModule from '../../../../../interface/checkbox/checkbox'

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
  public confirmPassword: string
  public pinInput: Array<string> = new Array(this.pinLength)
  public patternPassword: string = this.CommonSettingsService.localSettings.passwordPattern
  public protectedViewsStatus: IProtectedViewsStatus = {
    CALL_VIEW: false,
    PAY_OUT_VIEW: false,
    MAKE_DEPOSIT_VIEW: false
  }

  public onModalClose = (): void => {
    this.$uibModalInstance.dismiss('cancel')
  }

  /* @ngInject */
  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, private AccountApi: AccountApi,
              private CommonSettingsService: CommonSettingsService) {
    AccountApi.getMobileProtectedViewsRoute().then(res => {
      res.protectedViews.forEach((view) => {
        this.protectedViewsStatus[view] = true
      })
    }, (err) => {
      this.$uibModalInstance.dismiss('cancel')
      throw new Error('Can not get mobile protected views: ' + err)
    })
  }

  public sendPin = (): void => {
    this.isNewPinTyped = true
  }

  public changeViewsAndPin = (): void => {
    const protectedViews: Array<string> = []
    this.isPasswordIncorrect = false
    _.each(this.protectedViewsStatus, (val: boolean, key: string) => {
      if (val) {
        protectedViews.push(key)
      }
    })

    this.AccountApi.patchMobileViewsPermissionsRoute({
      password: this.confirmPassword,
      mobilePin: this.pinInput.join(''),
      protectedViews: protectedViews
    }).then(_res => {
      this.$uibModalInstance.dismiss('cancel')
    }, (err) => {
      if (err.status === 401) {
        this.isPasswordIncorrect = true
      } else {
        this.$uibModalInstance.dismiss('cancel')
        throw new Error('Can not patch mobile protected views: ' + err)
      }
    })
  }
}

angular.module('profitelo.components.dashboard.settings.security.modals.pin-number', [
  'ui.bootstrap',

  commonSettingsModule,
  apiModule,
  'profitelo.directives.interface.focus-next',
  'profitelo.directives.interface.scrollable',
  checkboxModule
])
  .controller('securityPinNumberSettingsController', SecurityPinNumberSettingsController)
