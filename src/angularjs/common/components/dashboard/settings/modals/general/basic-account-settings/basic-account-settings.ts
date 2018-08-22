// tslint:disable:no-mixed-interface
// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
// tslint:disable:prefer-template
// tslint:disable:prefer-method-signature
// tslint:disable:no-shadowed-variable
// tslint:disable:no-import-side-effect
// tslint:disable:no-empty
// tslint:disable:no-any
// tslint:disable:deprecation
import * as angular from 'angular';
import userModule from '../../../../../../services/user/user';
import { UploaderService } from '../../../../../../services/uploader/uploader.service';
import apiModule from 'profitelo-api-ng/api.module';
import { AccountApi } from 'profitelo-api-ng/api/api';
import { PostFileDetails } from 'profitelo-api-ng/model/models';
import { UserService } from '../../../../../../services/user/user.service';
import { UploaderFactory } from '../../../../../../services/uploader/uploader.factory';
import { UrlService } from '../../../../../../services/url/url.service';
import urlModule from '../../../../../../services/url/url';
import uploaderModule from '../../../../../../services/uploader/uploader';
import '../../../../../../components/interface/preloader/preloader';
import '../../../../../../components/interface/image-crop/image-crop';
import '../../../../../../directives/interface/local-avatar-uploader/local-avatar-uploader';
import '../../../../../../directives/interface/scrollable/scrollable';
import checkboxModule from '../../../../../interface/checkbox/checkbox';
import { ErrorHandlerService } from '../../../../../../services/error-handler/error-handler.service';
import errorHandlerModule from '../../../../../../services/error-handler/error-handler';
import inputModule from '../../../../../interface/input/input';
import { FileCategoryEnum, FileTypeChecker } from '../../../../../../classes/file-type-checker/file-type-checker';
import { CommonSettingsService } from '../../../../../../services/common-settings/common-settings.service';
import commonSettingsModule from '../../../../../../services/common-settings/common-settings';
import FileTypeEnum = PostFileDetails.FileTypeEnum;

export interface IBasicAccountSettingsControllerParentScope extends ng.IScope {
  callback: (cb: () => void) => void;
}

// tslint:disable:member-ordering
export interface IBasicAccountSettingsControllerScope extends ng.IScope {
  isNavbar: boolean;
  isFullscreen: boolean;
  isAvatarVisableToExpert: boolean;
  onModalClose: () => void;
  addPhoto(imagePath: string, file: File, callback: () => void): void;
  imageSource: string;
  isUserUploadImage: boolean;
  getAvatarData: () => void;
  saveCrop: (data: any) => void;
  submitBasicSettings: () => void;
  userName: string;
  removePhoto: () => void;
  $parent: IBasicAccountSettingsControllerParentScope;
  generalSettingsObject: {
    isNotAnonymous: boolean;
    nickname?: string;
    avatar?: string;
  };
  avatarPreview: string;
  isUploadInProgress: boolean;
  isNicknameValid(): boolean;
}

interface ISaveCrop {
  points: number[];
  zoom: number;
}

// tslint:disable:member-ordering
export class BasicAccountSettingsController implements ng.IController {
  public isFileFormatValidError = false;
  public isFileSizeError = false;

  private uploadedFile: File;
  private uploader: UploaderService;
  private clearFormAfterCropping: () => void;
  private profileNamePattern: RegExp = this.CommonSettingsService.localSettings.profileNamePattern;
  private maxValidAvatarSize = this.CommonSettingsService.localSettings.profileAvatarSize;

  public static $inject = [
    '$scope',
    'AccountApi',
    'CommonSettingsService',
    'errorHandler',
    '$uibModalInstance',
    'userService',
    'uploaderFactory',
    'urlService',
  ];

  constructor(
    private $scope: IBasicAccountSettingsControllerScope,
    private AccountApi: AccountApi,
    private CommonSettingsService: CommonSettingsService,
    private errorHandler: ErrorHandlerService,
    $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
    userService: UserService,
    uploaderFactory: UploaderFactory,
    urlService: UrlService,
  ) {
    $scope.isNavbar = true;
    $scope.isFullscreen = true;
    $scope.isUserUploadImage = false;
    $scope.isUploadInProgress = false;

    this.uploader = uploaderFactory.getInstance();

    userService.getUser().then(user => {
      const userBasicSettings = user.details;

      this.$scope.generalSettingsObject = {
        isNotAnonymous: !user.isAnonymous,
        nickname: userBasicSettings.nickname,
        avatar: userBasicSettings.avatar,
      };

      $scope.avatarPreview = urlService.resolveFileUrl(userBasicSettings.avatar || '');
    });

    this.$scope.submitBasicSettings = (): void => {
      this.AccountApi.putGeneralSettingsRoute({
        nickname: $scope.generalSettingsObject.nickname,
        avatar: $scope.generalSettingsObject.avatar,
      }).then(
        _res => {
          $scope.$parent.callback(() => {
            $uibModalInstance.dismiss('cancel');
          });
        },
        err => {
          this.errorHandler.handleServerError(err);
          throw new Error('Can not patch user account: ' + String(err));
        },
      );
    };

    $scope.addPhoto = (imagePath: string, file: File, callback: () => void): void => {
      if (
        imagePath.length > 0 &&
        FileTypeChecker.isFileFormatValid(file, FileCategoryEnum.AVATAR) &&
        this.isFileSizeValid(file)
      ) {
        $scope.imageSource = imagePath;
        $scope.isUserUploadImage = true;
        this.uploadedFile = file;
        this.clearFormAfterCropping = callback;
        this.isFileFormatValidError = false;
        this.isFileSizeError = false;
      }

      this.isFileFormatValidError = !FileTypeChecker.isFileFormatValid(file, FileCategoryEnum.AVATAR);

      this.isFileSizeError = !this.isFileSizeValid(file);
    };

    $scope.removePhoto = (): void => {
      $scope.avatarPreview = 'none';
      $scope.generalSettingsObject.avatar = undefined;
    };

    $scope.saveCrop = (data: ISaveCrop): void => {
      const indexOfSecondXpoint = 2;
      const squareSideLength = data.points[indexOfSecondXpoint] - data.points[0] - 1;
      const postProcessOptions: PostFileDetails = {
        croppingDetails: {
          x: Number(data.points[0]),
          y: Number(data.points[1]),
          width: squareSideLength,
          height: squareSideLength,
        },
        fileType: FileTypeEnum.PROFILE,
      };
      this.$scope.isUploadInProgress = true;
      this.uploader
        .uploadFile(this.uploadedFile, postProcessOptions, this.onUploadProgess)
        .then(this.onFileUpload, this.onFileUploadError);

      this.$scope.isUserUploadImage = false;
    };

    $scope.onModalClose = (): void => $uibModalInstance.dismiss('cancel');

    $scope.isNicknameValid = (): boolean =>
      $scope.generalSettingsObject.nickname
        ? this.profileNamePattern.test($scope.generalSettingsObject.nickname)
        : false;
  }

  private onUploadProgess = (): void => {};

  private onFileUpload = (res: any): void => {
    this.$scope.avatarPreview = res.previews[0];
    this.$scope.generalSettingsObject.avatar = res.token;
    this.$scope.isUploadInProgress = false;
    this.$scope.imageSource = '';
    this.clearFormAfterCropping();
  };

  private onFileUploadError = (err: any): void => {
    this.errorHandler.handleServerError(err);
    this.$scope.isUploadInProgress = false;
    throw new Error('Can not upload file: ' + String(err));
  };

  private isFileSizeValid = (file: File): boolean => file.size <= this.maxValidAvatarSize;
}

angular
  .module('profitelo.components.dashboard.settings.modals.general.basic-account-settings', [
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
    inputModule,
    commonSettingsModule,
  ])
  .controller('basicAccountSettingsController', BasicAccountSettingsController);
