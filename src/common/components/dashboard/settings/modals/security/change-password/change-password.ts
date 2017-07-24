import * as angular from 'angular'
import {PasswordStrengthService} from '../../../../../../services/password-strength/password-strength.service'
import apiModule from 'profitelo-api-ng/api.module'
import {AccountApi} from 'profitelo-api-ng/api/api'
import {CommonSettingsService} from '../../../../../../services/common-settings/common-settings.service'
import passwordStrengthModule from '../../../../../../services/password-strength/password-strength'
import commonSettingsModule from '../../../../../../services/common-settings/common-settings'
import '../../../../../../directives/password-strength-bar/password-strength-bar'
import '../../../../../../directives/interface/scrollable/scrollable'
import '../../../../../../directives/interface/pro-input/pro-input'

export interface ISecurityChangePasswordSettingsControllerScope extends ng.IScope {
}

export class SecurityChangePasswordSettingsController implements ng.IController {

  public isNavbar: boolean = true
  public isFullscreen: boolean = true
  public patternPassword = this.CommonSettingsService.localSettings.passwordPattern
  public newPassword: string
  public currentPassword: string
  public passwordStrength: number
  public isCurrentPasswordCorrect: boolean = true
  public arePasswordsDifferent: boolean = true

  public setNewPassword = (): void => {

    this.isCurrentPasswordCorrect = true
    this.arePasswordsDifferent = true

    this.AccountApi.changePasswordRoute({
      actualPassword: this.currentPassword,
      newPassword: this.newPassword
    })
      .then(_res => {
        this.$uibModalInstance.dismiss('cancel')
      }, (err: any) => {
        if (err.status === 400) {
          this.arePasswordsDifferent = false
        } else if (err.status === 401) {
          this.isCurrentPasswordCorrect = false
        } else {
          throw new Error('Can not change password: ' + err)
        }
      })
  }

  /* @ngInject */
  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private CommonSettingsService: CommonSettingsService,
              private AccountApi: AccountApi, private passwordStrengthService: PasswordStrengthService) {
  }

  public onPasswordChange = (password: string): void => {
    this.passwordStrength = this.passwordStrengthService.getStrength(password)
  }

  public onModalClose = (): void => {
    this.$uibModalInstance.dismiss('cancel')
  }
}

angular.module('profitelo.components.dashboard.settings.modals.security.change-password', [
  'ui.bootstrap',
  'profitelo.directives.interface.pro-input',
  apiModule,
  passwordStrengthModule,
  'profitelo.directives.password-strength-bar',
  commonSettingsModule,
  'profitelo.directives.interface.scrollable',
])
  .controller('securityChangePasswordSettingsController', SecurityChangePasswordSettingsController)
