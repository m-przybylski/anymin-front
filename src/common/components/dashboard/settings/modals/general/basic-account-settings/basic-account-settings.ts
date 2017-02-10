namespace profitelo.components.dashboard.settings.modals.general.basicAccountSettings {

  import IUploaderFactory = profitelo.services.uploader.IUploaderFactory
  import IUploaderService = profitelo.services.uploader.IUploaderService
  import IUrlService = profitelo.services.helper.IUrlService
  import IPostProcessOptions = profitelo.services.uploader.IPostProcessOptions

  export interface IBasicAccountSettingsControllerParentScope extends ng.IScope {
    callback: (cb: Function) => void
  }

  export interface IBasicAccountSettingsControllerScope extends ng.IScope {
    isNavbar: boolean
    isFullscreen: boolean
    isAvatarVisableToExpert: boolean
    onModalClose: Function
    addPhoto(imagePath: string, file: File, callback: Function): void
    imageSource: string
    isUserUploadImage: boolean
    getAvatarData: Function
    saveCrop: Function
    submitBasicSettings: Function
    userName: string
    removePhoto: Function
    $parent: IBasicAccountSettingsControllerParentScope
    generalSettingsObject: any
    avatarPreview: string
    isUploadInProgress: boolean
  }

  export class BasicAccountSettingsController implements ng.IController {

    private uploadedFile: File
    private uploader: IUploaderService
    private clearFormAfterCropping: Function
    $onInit = () => {
    }

    /* @ngInject */
    constructor(private $scope: IBasicAccountSettingsControllerScope,
                $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, private AccountApi: any,
                private User: any, uploaderFactory: IUploaderFactory, urlService: IUrlService) {

      $scope.isNavbar = true
      $scope.isFullscreen = true
      $scope.isUserUploadImage = false
      $scope.isUploadInProgress = false

      this.uploader = uploaderFactory.getInstance(1, uploaderFactory.collectionTypes.avatar)

      const userBasicSettings = this.User.getData('settings')

      this.$scope.generalSettingsObject = {
        isAnonymous: userBasicSettings.isAnonymous,
        nickname: userBasicSettings.nickname,
        avatar: userBasicSettings.avatar
      }

      $scope.avatarPreview = urlService.resolveFileUrl(userBasicSettings.avatar)

      this.$scope.submitBasicSettings = () => {
        this.AccountApi.partialUpdateAccount({accountId: this.User.getData('id')}, {
          settings: this.$scope.generalSettingsObject
        }).$promise.then((_res: any) => {
          $scope.$parent.callback(() => $uibModalInstance.dismiss('cancel'))
        }, (err: any) => {
          throw new Error('Can not patch user account: ' + err)
        })
      }

      $scope.addPhoto = (imagePath, file, callback) => {
        if (imagePath.length > 0) {
          $scope.imageSource = imagePath
          $scope.isUserUploadImage = true
          this.uploadedFile = file
          this.clearFormAfterCropping = callback
        }
      }

      $scope.removePhoto = () => {
        $scope.avatarPreview = 'none'
        this.$scope.generalSettingsObject.avatar = null
      }

      $scope.saveCrop = (data: any) => {
        const squareSideLength: number = data.points[2] - data.points[0] - 1
        const postProcessOptions: IPostProcessOptions = {
          croppingDetails: {
            x: Number(data.points[0]),
            y: Number(data.points[1]),
            width: squareSideLength,
            height: squareSideLength
          }
        }

        this.uploader.uploadFile(this.uploadedFile, postProcessOptions, this.onUploadProgess)
        .then(this.onFileUpload, this.onFileUploadError)

        this.$scope.isUserUploadImage = false
      }

      $scope.onModalClose = () =>
        $uibModalInstance.dismiss('cancel')

    }

    private onUploadProgess = () => {
      this.$scope.isUploadInProgress = true
    }

    private onFileUpload = (res: any) => {
      this.$scope.avatarPreview = res.previews[0]
      this.$scope.generalSettingsObject.avatar = res.token
      this.$scope.isUploadInProgress = false
      this.$scope.imageSource = ''
      this.clearFormAfterCropping()
    }

    private onFileUploadError = (err: any) => {
      this.$scope.isUploadInProgress = false
      throw new Error('Can not upload file: ' + err)
    }

  }

  angular.module('profitelo.components.dashboard.settings.modals.general.basic-account-settings', [
    'ui.bootstrap',
    'c7s.ng.userAuth',
    'profitelo.services.url',
    'profitelo.services.uploader',
    'profitelo.swaggerResources',
    'profitelo.components.interface.preloader',
    'profitelo.components.interface.image-crop',
    'profitelo.directives.interface.pro-checkbox',
    'profitelo.directives.interface.pro-input',
    'profitelo.directives.interface.local-avatar-uploader',
    'profitelo.directives.interface.scrollable'
  ])
  .controller('basicAccountSettingsController', BasicAccountSettingsController)

}
