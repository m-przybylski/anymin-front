namespace profitelo.components.dashboard.settings.modals.general.countrySettings {

  export interface IGeneralCountrySettingsControllerParentScope extends ng.IScope {}

  interface IGeneralCountrySettingsControllerScope extends ng.IScope {
    isNavbar: boolean
    isFullscreen: boolean
    isAvatarVisableToExpert: boolean
    onModalClose: Function
    addPhoto: Function
    imageSource: string
    $parent: IGeneralCountrySettingsControllerParentScope
  }

  export class GeneralCountrySettingsController implements ng.IController {

    /* @ngInject */
    constructor($scope: IGeneralCountrySettingsControllerScope,
                $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

      $scope.isNavbar = true
      $scope.isFullscreen = true

      $scope.onModalClose = () =>
        $uibModalInstance.dismiss('cancel')
    }

  }

  angular.module('profitelo.components.dashboard.settings.modals.general.country-settings', [
    'ui.bootstrap',
    'profitelo.directives.interface.pro-input',
    'profitelo.directives.interface.scrollable'
  ])
  .controller('generalCountrySettingsController', GeneralCountrySettingsController)

}
