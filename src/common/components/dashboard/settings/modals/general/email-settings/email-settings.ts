namespace profitelo.components.dashboard.settings.modals.general.emailSettings {

  import IAccountApi = profitelo.api.IAccountApi
  export interface IGeneralEmailSettingsControllerScope extends ng.IScope {
    callback: () => void
  }

  export class GeneralEmailSettingsController implements ng.IController {

    public isNavbar: boolean = true
    public isFullscreen: boolean = true
    public isEmailExist: boolean = false
    public newEmail: string

    /* @ngInject */
    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
                private AccountApi: IAccountApi, private $log: ng.ILogService,
                private User: any,
                private $scope: IGeneralEmailSettingsControllerScope) {

    }

    public setNewEmail = (): void => {
      this.isEmailExist = false
        this.AccountApi.partialUpdateAccountRoute(this.User.getData('id'), {
          unverifiedEmail: this.newEmail
        }).then(this.onEmailChangeSucces, this.onEmailChangeError)

    }

    private onEmailChangeSucces = (): void => {
      this.$scope.callback()
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
    'profitelo.api.AccountApi',
    'profitelo.directives.interface.pro-input',
    'profitelo.directives.interface.scrollable'
  ])
  .controller('generalEmailSettingsController', GeneralEmailSettingsController)
}
