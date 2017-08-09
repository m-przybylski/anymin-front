import * as angular from 'angular'
import userModule from '../../../../../../services/user/user'
import {UploaderService} from '../../../../../../services/uploader/uploader.service'
import apiModule from 'profitelo-api-ng/api.module'
import {AccountApi} from 'profitelo-api-ng/api/api'
import {PostProcessOption} from 'profitelo-api-ng/model/models'
import {UserService} from '../../../../../../services/user/user.service'
import {UploaderFactory} from '../../../../../../services/uploader/uploader.factory'
import {UrlService} from '../../../../../../services/url/url.service'
import urlModule from '../../../../../../services/url/url'
import uploaderModule from '../../../../../../services/uploader/uploader'
import '../../../../../../components/interface/preloader/preloader'
import '../../../../../../components/interface/image-crop/image-crop'
import '../../../../../../directives/interface/local-avatar-uploader/local-avatar-uploader'
import '../../../../../../directives/interface/scrollable/scrollable'
import checkboxModule from '../../../../../interface/checkbox/checkbox'
import {ErrorHandlerService} from '../../../../../../services/error-handler/error-handler.service'
import errorHandlerModule from '../../../../../../services/error-handler/error-handler'
import inputModule from '../../../../../interface/input/input'
import {FileCategoryEnum, FileTypeChecker} from '../../../../../../classes/file-type-checker/file-type-checker'

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
  generalSettingsObject: {
    isNotAnonymous: boolean,
    nickname?: string,
    avatar?: string
  }
  avatarPreview: string
  isUploadInProgress: boolean
}

interface ISaveCrop {
  points: number[],
  zoom: number
}

export class BasicAccountSettingsController implements ng.IController {

  private uploadedFile: File
  private uploader: UploaderService
  private clearFormAfterCropping: () => void
  private isFileFormatValidError: boolean = false

  /* @ngInject */
  constructor(private $scope: IBasicAccountSettingsControllerScope,
              private AccountApi: AccountApi,
              private errorHandler: ErrorHandlerService,
              $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              userService: UserService,
              uploaderFactory: UploaderFactory,
              urlService: UrlService) {

    $scope.isNavbar = true
    $scope.isFullscreen = true
    $scope.isUserUploadImage = false
    $scope.isUploadInProgress = false

    this.uploader = uploaderFactory.getInstance(1, uploaderFactory.collectionTypes.avatar)

    userService.getUser().then(user => {
      const userBasicSettings = user.settings

      this.$scope.generalSettingsObject = {
        isNotAnonymous: !userBasicSettings.isAnonymous,
        nickname: userBasicSettings.nickname,
        avatar: userBasicSettings.avatar
      }

      $scope.avatarPreview = urlService.resolveFileUrl(userBasicSettings.avatar || '')
    })

    this.$scope.submitBasicSettings = (): void => {

      this.AccountApi.putGeneralSettingsRoute({
        isAnonymous: !$scope.generalSettingsObject.isNotAnonymous,
        nickname: $scope.generalSettingsObject.nickname,
        avatar: $scope.generalSettingsObject.avatar
      }).then(_res => {
        $scope.$parent.callback(() => {
          $uibModalInstance.dismiss('cancel')
        })
      }, (err) => {
        this.errorHandler.handleServerError(err)
        throw new Error('Can not patch user account: ' + err)
      })
    }

    $scope.addPhoto = (imagePath: string, file: File, callback: () => void): void => {
      if (imagePath.length > 0 && FileTypeChecker.isFileFormatValid(file, FileCategoryEnum.AVATAR)) {
        $scope.imageSource = imagePath
        $scope.isUserUploadImage = true
        this.uploadedFile = file
        this.clearFormAfterCropping = callback
        this.isFileFormatValidError = false
      } else {
        this.isFileFormatValidError = true
      }
    }

    $scope.removePhoto = (): void => {
      $scope.avatarPreview = 'none'
      $scope.generalSettingsObject.avatar = undefined
    }

    $scope.saveCrop = (data: ISaveCrop): void => {
      const indexOfSecondXpoint: number = 2
      const squareSideLength: number = data.points[indexOfSecondXpoint] - data.points[0] - 1
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

    $scope.onModalClose = (): void =>
      $uibModalInstance.dismiss('cancel')
  }

  private onUploadProgess = (): void => {}

  private onFileUpload = (res: any): void => {
    this.$scope.avatarPreview = res.previews[0]
    this.$scope.generalSettingsObject.avatar = res.token
    this.$scope.isUploadInProgress = false
    this.$scope.imageSource = ''
    this.clearFormAfterCropping()
  }

  private onFileUploadError = (err: any): void => {
    this.errorHandler.handleServerError(err)
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
  'profitelo.directives.interface.local-avatar-uploader',
  'profitelo.directives.interface.scrollable',
  checkboxModule,
  errorHandlerModule,
  inputModule
])
.controller('basicAccountSettingsController', BasicAccountSettingsController)
