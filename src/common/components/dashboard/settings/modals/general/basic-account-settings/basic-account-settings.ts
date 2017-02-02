namespace profitelo.components.dashboard.settings.modals.general.basicAccountSettings {

  interface IBasicAccountSettingsControllerScope extends ng.IScope {
    isNavbar: boolean
    isFullscreen: boolean
    isAvatarVisableToExpert: boolean
    onModalClose: Function
    addPhoto: Function
    imageSource: string
  }

  class BasicAccountSettingsController implements ng.IController {

    /* @ngInject */
    constructor(private $scope: IBasicAccountSettingsControllerScope,
                private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {

      $scope.isNavbar = true
      $scope.isFullscreen = true
      $scope.isAvatarVisableToExpert = true

      $scope.addPhoto = (imagePath) => {
        $scope.imageSource = imagePath
      }

      $scope.onModalClose = () =>
        $uibModalInstance.dismiss('cancel')
    }


  }

  angular.module('profitelo.components.dashboard.settings.modals.general.basic-account-settings', [
    'ui.bootstrap',
    'profitelo.directives.interface.pro-checkbox',
    'profitelo.directives.interface.pro-input',
    'profitelo.directives.interface.local-avatar-uploader',
    'profitelo.directives.interface.scrollable'
  ])
  .controller('basicAccountSettingsController', BasicAccountSettingsController)

}