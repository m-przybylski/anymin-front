import * as angular from 'angular';
import userModule from '../../../../../../services/user/user';
import { UserService } from '../../../../../../services/user/user.service';
import apiModule from 'profitelo-api-ng/api.module';
import { AccountApi } from 'profitelo-api-ng/api/api';
import inputModule from '../../../../../interface/input/input';
import { CommonSettingsService } from '../../../../../../services/common-settings/common-settings.service';
import commonSettingsModule from '../../../../../../services/common-settings/common-settings';

export interface IGeneralEmailSettingsControllerScope extends ng.IScope {
  callback: (cb: () => void) => void;
}

export class GeneralEmailSettingsController implements ng.IController {
  public mailPattern = this.CommonSettingsService.localSettings.emailPattern;
  public isNavbar: boolean = true;
  public isFullscreen: boolean = true;
  public isEmailExist: boolean = false;
  public newEmail: string;
  private newEnteredEmail: string;

  static $inject = ['$uibModalInstance', 'AccountApi', '$log', 'userService', 'CommonSettingsService', '$scope'];

    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private AccountApi: AccountApi,
              private $log: ng.ILogService,
              private userService: UserService,
              private CommonSettingsService: CommonSettingsService,
              private $scope: IGeneralEmailSettingsControllerScope) {

  }

  public setNewEmail = (): void => {
    this.newEnteredEmail = this.newEmail;
    this.userService.getUser().then(user => {
      this.isEmailExist = false;
      this.AccountApi.patchUpdateAccountRoute(user.id, {
        unverifiedEmail: this.newEmail
      }).then(this.onEmailChangeSucces, this.onEmailChangeError);
    });
  }

  private onEmailChangeSucces = (): void => {
    // FIXME
    this.$scope.callback(() => {});
    this.$uibModalInstance.dismiss('cancel');
  }

  private onEmailChangeError = (error: any): void => {
    this.$log.error(error);
    this.isEmailExist = true;
  }

  public onModalClose = (): void =>
    this.$uibModalInstance.dismiss('cancel')

  public checkIfNewEnteredEmailExist = (): boolean =>
    this.newEnteredEmail !== this.newEmail

  public checkIsButtonDisabled = (): boolean =>
    this.mailPattern.test(this.newEmail)
}

angular.module('profitelo.components.dashboard.settings.modals.general.email-settings', [
  'ui.bootstrap',
  apiModule,
  userModule,
  commonSettingsModule,
  inputModule
])
  .controller('generalEmailSettingsController', GeneralEmailSettingsController);
