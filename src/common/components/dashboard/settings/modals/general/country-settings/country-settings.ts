namespace profitelo.components.dashboard.settings.modals.general.countrySettings {

  interface IgeneralCountrySettingsControllerScope extends ng.IScope {
    isNavbar: boolean
    isFullscreen: boolean
    isAvatarVisableToExpert: boolean
    onModalClose: Function
    addPhoto: Function
    imageSource: string
  }

  class generalCountrySettingsController implements ng.IController {

    /* @ngInject */
    constructor(private $scope: IgeneralCountrySettingsControllerScope,
                private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

      $scope.isNavbar = true
      $scope.isFullscreen = true

    }


  }

  angular.module('profitelo.components.dashboard.settings.modals.general.country-settings', [
    'ui.bootstrap',
    'profitelo.directives.interface.pro-input',
    'profitelo.directives.interface.scrollable'
  ])
  .controller('generalCountrySettingsController', generalCountrySettingsController)

}