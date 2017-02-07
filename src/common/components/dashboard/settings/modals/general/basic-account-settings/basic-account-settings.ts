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
    removePhoto: Function
    generalSettingsObject: any
  }

  class BasicAccountSettingsController implements ng.IController {

    $onInit = () => {
    }

    /* @ngInject */
    constructor(private $scope: IBasicAccountSettingsControllerScope,
                private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, private AccountApi: any,
                private User) {

      $scope.isNavbar = true
      $scope.isFullscreen = true
      $scope.isUserUploadImage = false

      const userBasicSettings = this.User.getData('settings')

      this.$scope.generalSettingsObject = {
        isAnonymous: userBasicSettings.isAnonymous,
        nickname: userBasicSettings.nickname,
        avatar: userBasicSettings.avatar
      }

      this.$scope.submitBasicSettings = () => {
        this.AccountApi.partialUpdateAccount({accountId: this.User.getData('id')}, {settings: this.$scope.generalSettingsObject}).$promise.then((res) => {
          console.log(res)
          $scope.onModalClose
        }, (err) => {
          console.log(err)
        })

      }

      $scope.addPhoto = (imagePath) => {
        if (imagePath.length > 0) {
          $scope.imageSource = imagePath
          $scope.isUserUploadImage = true
        }
      }

      $scope.removePhoto = () => {
        $scope.imageSource = ''
        const img = $('.croppie-result').replaceWith('<img class="user-avatar fullScreen" src="/assets/images/no-avatar.png" />')
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
