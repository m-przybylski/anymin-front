namespace profitelo.components.dashboard.settings.modals.general.basicAccountSettings {

  import IPostProcessOptions = profitelo.services.uploader.IPostProcessOptions
  import IUploaderFactory = profitelo.services.uploader.IUploaderFactory
  import IUploaderService = profitelo.services.uploader.IUploaderService
  import IUrlService = profitelo.services.helper.IUrlService
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
    callback: (cb: Function) => void
    avatarPreview: string
  }

  class BasicAccountSettingsController implements ng.IController {

    private UploadedFile: File
    private postProcessOptions: IPostProcessOptions
    private uploader: IUploaderService

    $onInit = () => {
    }

    /* @ngInject */
    constructor(private $scope: IBasicAccountSettingsControllerScope,
                private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, private AccountApi: any,
                private User, private uploaderFactory: IUploaderFactory, private urlService: IUrlService) {

      $scope.isNavbar = true
      $scope.isFullscreen = true
      $scope.isUserUploadImage = false

      this.uploader = uploaderFactory.getInstance(1, uploaderFactory.collectionTypes.avatar)

      const userBasicSettings = this.User.getData('settings')

      this.$scope.generalSettingsObject = {
        isAnonymous: userBasicSettings.isAnonymous,
        nickname: userBasicSettings.nickname,
        avatar: userBasicSettings.avatar
      }
      console.log(userBasicSettings.avatar)
      $scope.avatarPreview = urlService.resolveFileUrl(userBasicSettings.avatar)

      this.$scope.submitBasicSettings = () => {

        this.AccountApi.partialUpdateAccount({accountId: this.User.getData('id')}, {
          settings: this.$scope.generalSettingsObject
        }).$promise.then((res) => {
          $scope.callback(() => $uibModalInstance.dismiss('cancel'))
        }, (err) => {
          throw new Error('Can not patch user account: ' + err)
        })

      }

      $scope.addPhoto = (imagePath, file) => {
        if (imagePath.length > 0) {
          $scope.imageSource = imagePath
          $scope.isUserUploadImage = true
          this.UploadedFile = file
        }
      }

      $scope.removePhoto = () => {
        $scope.imageSource = ''
      }

      $scope.saveCrop = (data, result) => {
        console.log(data)
        const postProcessOptions = {
          croppingDetails: {
            x: data.points[0],
            y: data.points[1],
            width: 200,
            height: 200 * data.zoom
          }
        }
        this.uploader.uploadFile(this.UploadedFile, postProcessOptions, this.onUploadProgess)
        .then(this.onFileUpload, this.onFileUploadError)
        this.$scope.isUserUploadImage = false
      }

      $scope.onModalClose = () =>
        $uibModalInstance.dismiss('cancel')

    }

    private onUploadProgess = () => {

    }

    private onFileUpload = (res) => {
      this.$scope.avatarPreview = res.previews[0]
      this.$scope.generalSettingsObject.avatar = res.token
      console.log(res)
    }

    private onFileUploadError = (err) => {
      throw new Error('Can not upload file: ' + err)
    }

  }

  angular.module('profitelo.components.dashboard.settings.modals.general.basic-account-settings', [
    'ui.bootstrap',
    'c7s.ng.userAuth',
    'profitelo.services.url',
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
