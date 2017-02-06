namespace profitelo.components.dashboard.settings.modals.general.phoneSettings {

  interface IgeneralPhoneSettingsControllerScope extends ng.IScope {
    isHidden: boolean
    onModalClose: Function
    isNavbar: boolean
    isFullscreen: boolean
    verifyCode: Function
  }

  export class GeneralPhoneSettingsController implements ng.IController {

    /* @ngInject */
    constructor(private $scope: IgeneralPhoneSettingsControllerScope,
                private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

      $scope.isHidden = true
      $scope.isNavbar = true
      $scope.isFullscreen = true

      $scope.verifyCode = () => {
        $scope.isHidden = false
      }

      $scope.onModalClose = () =>
        $uibModalInstance.dismiss('cancel')

    }
  }

  angular.module('profitelo.components.dashboard.settings.modals.general.phone-settings', [
    'ui.bootstrap',
    'profitelo.directives.interface.pro-input',
    'profitelo.directives.interface.scrollable',
    'profitelo.components.interface.pin-verification'
  ])
  .controller('generalPhoneSettingsController', GeneralPhoneSettingsController)

}
