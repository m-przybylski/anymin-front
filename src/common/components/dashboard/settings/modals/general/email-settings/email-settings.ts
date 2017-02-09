namespace profitelo.components.dashboard.settings.modals.general.emailSettings {

  export interface IGeneralEmailSettingsControllerParentScope extends ng.IScope {
  }

  export interface IGeneralEmailSettingsControllerScope extends ng.IScope {
    isNavbar: boolean
    isFullscreen: boolean
    isAvatarVisableToExpert: boolean
    onModalClose: Function
    addPhoto: Function
    imageSource: string
    $parent: IGeneralEmailSettingsControllerParentScope
  }

  export class GeneralEmailSettingsController implements ng.IController {

    /* @ngInject */
    constructor($scope: IGeneralEmailSettingsControllerScope,
                $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

      $scope.isNavbar = true
      $scope.isFullscreen = true

      $scope.onModalClose = () =>
        $uibModalInstance.dismiss('cancel')
    }

  }

  angular.module('profitelo.components.dashboard.settings.modals.general.email-settings', [
    'ui.bootstrap',
    'profitelo.directives.interface.pro-input',
    'profitelo.directives.interface.scrollable'
  ])
  .controller('generalEmailSettingsController', GeneralEmailSettingsController)

}
