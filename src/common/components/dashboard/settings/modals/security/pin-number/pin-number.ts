namespace profitelo.components.dashboard.settings.modals.security.pinNumber {

  export interface ISecurityPinNumberSettingsControllerParentScope extends ng.IScope {}
  export interface ISecurityPinNumberSettingsControllerScope extends ng.IScope {
    isOutgoingSecureCheckbox: boolean
    isSecurePaymentsCheckbox: boolean
    isConfirmPaymentsCheckbox: boolean
    isNavbar: boolean
    isFullscreen: boolean
    onModalClose: Function
    sendPin: Function
    $parent: ISecurityPinNumberSettingsControllerParentScope
  }

  export class SecurityPinNumberSettingsController implements ng.IController {

    /* @ngInject */
    constructor($scope: ISecurityPinNumberSettingsControllerScope,
                $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
                ) {

      $scope.isNavbar = true
      $scope.isFullscreen = true
      $scope.isOutgoingSecureCheckbox = true
      $scope.isSecurePaymentsCheckbox = true
      $scope.isConfirmPaymentsCheckbox = true

      $scope.onModalClose = () =>
        $uibModalInstance.dismiss('cancel')

      $scope.sendPin = () => {
        $uibModalInstance.dismiss('cancel')
      }

    }
  }

  angular.module('profitelo.components.dashboard.settings.security.modals.pin-number', [
    'ui.bootstrap',
    'profitelo.directives.interface.focus-next',
    'profitelo.directives.interface.scrollable',
    'profitelo.directives.interface.pro-checkbox'
  ])
  .controller('securityPinNumberSettingsController', SecurityPinNumberSettingsController)

}
