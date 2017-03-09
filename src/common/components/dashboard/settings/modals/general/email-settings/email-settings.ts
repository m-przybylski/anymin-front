import * as angular from "angular"
import userModule from "../../../../../../services/user/user"
import {UserService} from "../../../../../../services/user/user.service"
import {AccountApi} from "../../../../../../api/api/AccountApi"
import apiModule from "../../../../../../api/api.module"

export interface IGeneralEmailSettingsControllerScope extends ng.IScope {
  callback: (cb: () => void) => void
}

export class GeneralEmailSettingsController implements ng.IController {

  public isNavbar: boolean = true
  public isFullscreen: boolean = true
  public isEmailExist: boolean = false
  public newEmail: string

  /* @ngInject */
  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private AccountApi: AccountApi, private $log: ng.ILogService,
              private userService: UserService, private $scope: IGeneralEmailSettingsControllerScope) {

  }

  public setNewEmail = (): void => {
    this.userService.getUser().then(user => {
      this.isEmailExist = false
      this.AccountApi.partialUpdateAccountRoute(user.id, {
        unverifiedEmail: this.newEmail
      }).then(this.onEmailChangeSucces, this.onEmailChangeError)
    })
  }

  private onEmailChangeSucces = (): void => {
    //FIXME
    this.$scope.callback(() => {})
    this.$uibModalInstance.dismiss('cancel')
  }

  private onEmailChangeError = (error: any): void => {
    this.$log.error(error)
    this.isEmailExist = true
  }

  public onModalClose = () =>
    this.$uibModalInstance.dismiss('cancel')
}

angular.module('profitelo.components.dashboard.settings.modals.general.email-settings', [
  'ui.bootstrap',
  apiModule,
  userModule,
  'profitelo.directives.interface.pro-input',
  'profitelo.directives.interface.scrollable'
])
  .controller('generalEmailSettingsController', GeneralEmailSettingsController)
