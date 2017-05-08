import * as angular from 'angular'
import userModule from '../../../../../../services/user/user'
import {UploaderService} from '../../../../../../services/uploader/uploader.service'
import apiModule from 'profitelo-api-ng/api.module'
import {AccountApi} from 'profitelo-api-ng/api/api'
import {PutGeneralSettings, PostProcessOption} from 'profitelo-api-ng/model/models'
import {UserService} from '../../../../../../services/user/user.service'
import {UploaderFactory} from '../../../../../../services/uploader/uploader.factory'
import {UrlService} from '../../../../../../services/url/url.service'
import urlModule from '../../../../../../services/url/url'
import uploaderModule from '../../../../../../services/uploader/uploader'
import '../../../../../../components/interface/preloader/preloader'
import '../../../../../../components/interface/image-crop/image-crop'
import '../../../../../../directives/interface/pro-checkbox/pro-checkbox'
import '../../../../../../directives/interface/pro-input/pro-input'
import '../../../../../../directives/interface/local-avatar-uploader/local-avatar-uploader'
import '../../../../../../directives/interface/scrollable/scrollable'

  export interface IBasicAccountSettingsControllerParentScope extends ng.IScope {
    callback: (cb: () => void) => void
  }

  export interface IBasicAccountSettingsControllerScope extends ng.IScope {
    isNavbar: boolean
    isFullscreen: boolean
    isAvatarVisableToExpert: boolean
    onModalClose: () => void
    addPhoto(imagePath: string, file: File, callback: () => void): void
    imageSource: string
    isUserUploadImage: boolean
    getAvatarData: () => void
    saveCrop: (data: any) => void
    submitBasicSettings: () => void
    userName: string
    removePhoto: () => void
    $parent: IBasicAccountSettingsControllerParentScope
    generalSettingsObject: PutGeneralSettings
    avatarPreview: string
    isUploadInProgress: boolean
  }

  export class BasicAccountSettingsController implements ng.IController {

    private uploadedFile: File
    private uploader: UploaderService
    private clearFormAfterCropping: () => void
    $onInit = () => {
    }

    /* @ngInject */
    constructor(private $scope: IBasicAccountSettingsControllerScope,
                $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, private AccountApi: AccountApi,
                userService: UserService, uploaderFactory: UploaderFactory, urlService: UrlService) {

      $scope.isNavbar = true
      $scope.isFullscreen = true
      $scope.isUserUploadImage = false
      $scope.isUploadInProgress = false

      this.uploader = uploaderFactory.getInstance(1, uploaderFactory.collectionTypes.avatar)

      userService.getUser().then(user => {
        const userBasicSettings = user.settings

        this.$scope.generalSettingsObject = {
          isAnonymous: userBasicSettings.isAnonymous,
          nickname: userBasicSettings.nickname,
          avatar: userBasicSettings.avatar
        }

        $scope.avatarPreview = urlService.resolveFileUrl(userBasicSettings.avatar || '')
      })

      this.$scope.submitBasicSettings = () => {
        this.AccountApi.putGeneralSettingsRoute(this.$scope.generalSettingsObject).then(_res => {
          // FIXME
          $scope.$parent.callback(() => {})
          $uibModalInstance.dismiss('cancel')
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
        $scope.generalSettingsObject.avatar = undefined
      }

      $scope.saveCrop = (data: any) => {
        const squareSideLength: number = data.points[2] - data.points[0] - 1
        const postProcessOptions: PostProcessOption = {
          croppingDetails: {
            x: Number(data.points[0]),
            y: Number(data.points[1]),
            width: squareSideLength,
            height: squareSideLength
          }
        }
        this.$scope.isUploadInProgress = true
        this.uploader.uploadFile(this.uploadedFile, postProcessOptions, this.onUploadProgess)
        .then(this.onFileUpload, this.onFileUploadError)

        this.$scope.isUserUploadImage = false
      }

      $scope.onModalClose = () =>
        $uibModalInstance.dismiss('cancel')

    }

    private onUploadProgess = () => {
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
    userModule,
    urlModule,
    uploaderModule,
    apiModule,
    'profitelo.components.interface.preloader',
    'profitelo.components.interface.image-crop',
    'profitelo.directives.interface.pro-checkbox',
    'profitelo.directives.interface.pro-input',
    'profitelo.directives.interface.local-avatar-uploader',
    'profitelo.directives.interface.scrollable'
  ])
  .controller('basicAccountSettingsController', BasicAccountSettingsController)
