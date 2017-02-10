namespace profitelo.components.dashboard.settings.modals.security.changePassword {

  import IModalsService = profitelo.services.modals.IModalsService

  export interface IgeneralChangePasswordSettingsControllerScope extends ng.IScope {
    isNavbar: boolean
    isFullscreen: boolean
    onModalClose: Function
    openSecurityResetPasswordSettingsModal: Function
  }

  export class SecurityChangePasswordSettingsController implements ng.IController {

    /* @ngInject */
    constructor(private $scope: IgeneralChangePasswordSettingsControllerScope,
                private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
                private modalsService: IModalsService) {

      $scope.isNavbar = true
      $scope.isFullscreen = true

      $scope.onModalClose = () =>
        $uibModalInstance.dismiss('cancel')

      $scope.openSecurityResetPasswordSettingsModal = () => {
        $scope.onModalClose()
        this.modalsService.createSecurityResetPasswordSettingsModal()
      }

    }
  }

  angular.module('profitelo.components.dashboard.settings.modals.security.change-password', [
    'ui.bootstrap',
    'profitelo.directives.interface.pro-input',
    'profitelo.services.password-strength',
    'profitelo.directives.password-strength-bar',
    'profitelo.directives.interface.scrollable',
    'profitelo.services.modals'

  ])
  .controller('generalChangePasswordSettingsController', SecurityChangePasswordSettingsController)

}
