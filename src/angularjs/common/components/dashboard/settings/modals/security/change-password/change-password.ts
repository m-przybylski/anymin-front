// tslint:disable:no-import-side-effect
// tslint:disable:no-empty-interface
// tslint:disable:no-any
// tslint:disable:deprecation
import * as angular from 'angular';
import { PasswordStrengthService } from '../../../../../../services/password-strength/password-strength.service';
import apiModule from 'profitelo-api-ng/api.module';
import { AccountApi } from 'profitelo-api-ng/api/api';
import { CommonSettingsService } from '../../../../../../services/common-settings/common-settings.service';
import passwordStrengthModule from '../../../../../../services/password-strength/password-strength';
import commonSettingsModule from '../../../../../../services/common-settings/common-settings';
import '../../../../../../directives/password-strength-bar/password-strength-bar';
import '../../../../../../directives/interface/scrollable/scrollable';
import autoFocus from '../../../../../../directives/auto-focus/auto-focus';
import inputModule from '../../../../../interface/input/input';
import { httpCodes } from '../../../../../../classes/http-codes';
import { TopAlertService } from '../../../../../../services/top-alert/top-alert.service';
import { TranslatorService } from '../../../../../../services/translator/translator.service';

export interface ISecurityChangePasswordSettingsControllerScope extends ng.IScope {
}

// tslint:disable:member-ordering
export class SecurityChangePasswordSettingsController implements ng.IController {

  public patternPassword = this.CommonSettingsService.localSettings.passwordPattern;
  public newPassword = '';
  public currentPassword = '';
  public passwordStrength: number;
  public isCurrentPasswordCorrect = true;
  public arePasswordsDifferent = true;
  public isError = false;

  private enteredPassword = '';
  private enteredCurrentPassword = '';

  public setNewPassword = (): void => {
    this.isError = false;
    this.enteredCurrentPassword = this.currentPassword;
    this.enteredPassword = this.currentPassword;
    this.isCurrentPasswordCorrect = true;
    this.arePasswordsDifferent = true;

    this.AccountApi.changePasswordRoute({
      actualPassword: this.currentPassword,
      newPassword: this.newPassword
    })
      .then(_res => {
        this.$uibModalInstance.dismiss('cancel');
        this.showSuccessAlert();
      }, (err: any) => {
        this.isError = true;
        if (err.status === httpCodes.badRequest) {
          this.arePasswordsDifferent = false;
        } else if (err.status === httpCodes.unauthorized) {
          this.isCurrentPasswordCorrect = false;
        } else {
          throw new Error('Can not change password: ' + String(err));
        }
      });
  }

  public checkIsButtonDisabled = (): boolean =>
    this.newPassword.length > 0 && this.currentPassword.length > 0 && this.newPassword !== this.currentPassword &&
      this.patternPassword.test(this.newPassword)

  public checkIsEnteredPasswordIncorrect = (): boolean =>
    this.enteredCurrentPassword !== this.currentPassword

  public checkIsNewEnteredPasswordCorrect = (): boolean =>
    this.enteredPassword !== this.newPassword && this.patternPassword.test(this.newPassword)

  public static $inject = ['$uibModalInstance', 'CommonSettingsService', 'AccountApi', 'passwordStrengthService',
    'topAlertService', 'translatorService'];

    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
                private CommonSettingsService: CommonSettingsService,
                private AccountApi: AccountApi,
                private passwordStrengthService: PasswordStrengthService,
                private topAlertService: TopAlertService,
                private translatorService: TranslatorService) {
  }

  public onPasswordChange = (password: string): void => {
    this.passwordStrength = this.passwordStrengthService.getStrength(password);
  }

  public isSamePasswordsError = (): boolean =>
    this.newPassword.length > 0 && this.currentPassword.length > 0 && this.newPassword === this.currentPassword

  public onModalClose = (): void => {
    this.$uibModalInstance.dismiss('cancel');
  }

  private showSuccessAlert = (): void => {
    this.topAlertService.success({
      message: this.translatorService.translate('SETTINGS.SECURITY.CHANGE_PASSWORD.SUCCESS_ALERT'),
      timeout: 2
    });
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
  .controller('securityChangePasswordSettingsController', SecurityChangePasswordSettingsController);
