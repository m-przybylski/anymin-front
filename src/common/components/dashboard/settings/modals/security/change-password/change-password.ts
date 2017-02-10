namespace profitelo.components.dashboard.settings.modals.security.changePassword {

  export interface ISecurityChangePasswordSettingsControllerParentScope extends ng.IScope{}
  export interface ISecurityChangePasswordSettingsControllerScope extends ng.IScope {
    isNavbar: boolean
    isFullscreen: boolean
    onModalClose: Function
    $parent: ISecurityChangePasswordSettingsControllerParentScope
  }

  export class SecurityChangePasswordSettingsController implements ng.IController {

    /* @ngInject */
    constructor($scope: ISecurityChangePasswordSettingsControllerScope,
                $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

      $scope.isNavbar = true
      $scope.isFullscreen = true

      $scope.onModalClose = () =>
        $uibModalInstance.dismiss('cancel')
    }
  }

  angular.module('profitelo.components.dashboard.settings.modals.security.change-password', [
    'ui.bootstrap',
    'profitelo.directives.interface.pro-input',
    'profitelo.services.password-strength',
    'profitelo.directives.password-strength-bar',
    'profitelo.directives.interface.scrollable',
  ])
  .controller('securityChangePasswordSettingsController', SecurityChangePasswordSettingsController)

}
