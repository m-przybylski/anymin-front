namespace profitelo.components.dashboard.settings.modals.security.changePassword {

  import ICommonSettingsService = profitelo.services.commonSettings.ICommonSettingsService
  import IPasswordStrengthService = profitelo.services.passwordStrength.IPasswordStrengthService
  export interface ISecurityChangePasswordSettingsControllerScope extends ng.IScope {
    isNavbar: boolean
    isFullscreen: boolean
    onModalClose: Function
  }

  export class SecurityChangePasswordSettingsController implements ng.IController {

    public isNavbar: boolean = true
    public isFullscreen: boolean = true
    public patternPassword = this.CommonSettingsService.localSettings.passwordPattern
    public newPassword: string
    public currentPassword: string
    public passwordStrength: number
    public setNewPassword = () => {

      this.AccountApi.partialUpdateAccount({accountId: this.User.getData('id')}, {
        actualPassword: this.currentPassword,
        newPassword: this.newPassword
      })
      .$promise.then((_res: any) => {
        this.$uibModalInstance.dismiss('cancel')
      }, (_err: any) => {

      })
    }

    /* @ngInject */
    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
                private CommonSettingsService: ICommonSettingsService,
                private AccountApi: any, private User: any, private passwordStrengthService: IPasswordStrengthService) {
    }

    public onPasswordChange = (password: string) => {
      this.passwordStrength = this.passwordStrengthService.getStrength(password)
    }

    public onModalClose = () => {
      this.$uibModalInstance.dismiss('cancel')
    }
  }

  angular.module('profitelo.components.dashboard.settings.modals.security.change-password', [
    'ui.bootstrap',
    'profitelo.directives.interface.pro-input',
    'profitelo.services.password-strength',
    'profitelo.directives.password-strength-bar',
    'profitelo.services.commonSettings',
    'profitelo.directives.interface.scrollable',
  ])
  .controller('securityChangePasswordSettingsController', SecurityChangePasswordSettingsController)

}
