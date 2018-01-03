import * as angular from 'angular'
import {PasswordStrengthService} from '../../../../../../services/password-strength/password-strength.service'
import apiModule from 'profitelo-api-ng/api.module'
import {AccountApi} from 'profitelo-api-ng/api/api'
import {CommonSettingsService} from '../../../../../../services/common-settings/common-settings.service'
import passwordStrengthModule from '../../../../../../services/password-strength/password-strength'
import commonSettingsModule from '../../../../../../services/common-settings/common-settings'
import '../../../../../../directives/password-strength-bar/password-strength-bar'
import '../../../../../../directives/interface/scrollable/scrollable'
import autoFocus from '../../../../../../directives/auto-focus/auto-focus'
import inputModule from '../../../../../interface/input/input'
import {httpCodes} from '../../../../../../classes/http-codes'

export interface ISecurityChangePasswordSettingsControllerScope extends ng.IScope {
}

export class SecurityChangePasswordSettingsController implements ng.IController {

  public patternPassword = this.CommonSettingsService.localSettings.passwordPattern
  public newPassword: string = ''
  public currentPassword: string = ''
  public passwordStrength: number
  public isCurrentPasswordCorrect: boolean = true
  public arePasswordsDifferent: boolean = true
  public isError = false

  private enteredPassword: string = ''
  private enteredCurrentPassword: string = ''

  public setNewPassword = (): void => {
    this.isError = false
    this.enteredCurrentPassword = this.currentPassword
    this.enteredPassword = this.currentPassword
    this.isCurrentPasswordCorrect = true
    this.arePasswordsDifferent = true

    this.AccountApi.changePasswordRoute({
      actualPassword: this.currentPassword,
      newPassword: this.newPassword
    })
      .then(_res => {
        this.$uibModalInstance.dismiss('cancel')
      }, (err: any) => {
        this.isError = true
        if (err.status === httpCodes.badRequest) {
          this.arePasswordsDifferent = false
        } else if (err.status === httpCodes.unauthorized) {
          this.isCurrentPasswordCorrect = false
        } else {
          throw new Error('Can not change password: ' + String(err))
        }
      })
  }

  public checkIsButtonDisabled = (): boolean =>
    this.newPassword.length > 0 && this.currentPassword.length > 0 && this.newPassword !== this.currentPassword &&
      this.patternPassword.test(this.newPassword)

  public checkIsEnteredPasswordIncorrect = (): boolean =>
    this.enteredCurrentPassword !== this.currentPassword

  public checkIsNewEnteredPasswordCorrect = (): boolean =>
    this.enteredPassword !== this.newPassword && this.patternPassword.test(this.newPassword)

  /* @ngInject */
  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private CommonSettingsService: CommonSettingsService,
              private AccountApi: AccountApi, private passwordStrengthService: PasswordStrengthService) {
  }

  public onPasswordChange = (password: string): void => {
    this.passwordStrength = this.passwordStrengthService.getStrength(password)
  }

  public isSamePasswordsError = (): boolean =>
    this.newPassword.length > 0 && this.currentPassword.length > 0 && this.newPassword === this.currentPassword

  public onModalClose = (): void => {
    this.$uibModalInstance.dismiss('cancel')
  }
}

angular.module('profitelo.components.dashboard.settings.modals.security.change-password', [
  'ui.bootstrap',
  apiModule,
  passwordStrengthModule,
  'profitelo.directives.password-strength-bar',
  commonSettingsModule,
  'profitelo.directives.interface.scrollable',
  autoFocus,
  inputModule
])
  .controller('securityChangePasswordSettingsController', SecurityChangePasswordSettingsController)
