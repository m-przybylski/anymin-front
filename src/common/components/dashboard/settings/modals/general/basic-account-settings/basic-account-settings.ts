namespace profitelo.components.dashboard.settings.modals.general.basicAccountSettings {

  interface IBasicAccountSettingsControllerScope extends ng.IScope {
    isNavbar: boolean
    isFullscreen: boolean
    isAvatarVisableToExpert: boolean
    onModalClose: Function
    addPhoto: Function
    imageSource: string
    isUserUploadImage: boolean
    getAvatarData: Function
    saveCrop: Function
    submitBasicSettings: Function
    userName: string
  }

  class BasicAccountSettingsController implements ng.IController {

    /* @ngInject */
    constructor(private $scope: IBasicAccountSettingsControllerScope,
                private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, private AccountApi: any,
                private User) {

      $scope.isNavbar = true
      $scope.isFullscreen = true
      $scope.isAvatarVisableToExpert = true
      $scope.isUserUploadImage = false

      $scope.addPhoto = (imagePath) => {
        if (imagePath.length > 0) {
          $scope.imageSource = imagePath
          $scope.isUserUploadImage = true
        }
      }

      $scope.saveCrop = (data, result) => {
        result.then((html) => {
          const img = $('.user-avatar').find('img').replaceWith(angular.element(html))
          img.css('width', 0)
          img.css('height', 0)
          img.css('border-radius', 50 + '%')
        })
        $scope.isUserUploadImage = false
      }

      $scope.onModalClose = () =>
        $uibModalInstance.dismiss('cancel')

      $scope.submitBasicSettings = () => {
        console.log('submit form')
        const generalSettingsObject = {
          isAnonymous: $scope.isAvatarVisableToExpert,
          nickname: $scope.userName,
          avatar: ''
        }

        AccountApi.partialUpdateAccount(User.getData('id'), generalSettingsObject).$promise.then((res) => {
          console.log(res)
        }, (err) => {
          console.log(err)
        })

      }

    }

  }

  angular.module('profitelo.components.dashboard.settings.modals.general.basic-account-settings', [
    'ui.bootstrap',
    'c7s.ng.userAuth',
    'profitelo.services.uploader',
    'profitelo.swaggerResources',
    'profitelo.components.interface.image-crop',
    'profitelo.directives.interface.pro-checkbox',
    'profitelo.directives.interface.pro-input',
    'profitelo.directives.interface.local-avatar-uploader',
    'profitelo.directives.interface.scrollable'
  ])
  .controller('basicAccountSettingsController', BasicAccountSettingsController)

}
