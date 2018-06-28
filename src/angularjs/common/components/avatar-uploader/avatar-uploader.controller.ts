// tslint:disable:no-empty
// tslint:disable:no-any
import { IAvatarUploaderComponentBindings } from './avatar-uploader';
import { UploaderFactory } from '../../services/uploader/uploader.factory';
import { UploaderService } from '../../services/uploader/uploader.service';
import { PostFileDetails } from 'profitelo-api-ng/model/models';
import { FileTypeChecker, FileCategoryEnum } from '../../classes/file-type-checker/file-type-checker';
import { CommonSettingsService } from '../../services/common-settings/common-settings.service';
import FileTypeEnum = PostFileDetails.FileTypeEnum;

// tslint:disable:member-ordering
export class AvatarUploaderComponentController implements IAvatarUploaderComponentBindings, ng.IController {

  public uploadedFile: File;
  public isUserUploadImage = false;
  public imageSource: string;
  public isLoading = false;
  public avatarToken?: string;
  public isValid?: boolean;
  public isSubmitted?: boolean;
  public isFocus = true;
  public isFileUploadError = false;
  public isFileFormatError = false;
  public isFileSizeError = false;

  private isUploadInProgress = false;
  private uploader: UploaderService;
  private clearFormAfterCropping: () => void;
  private maxValidAvatarSize = this.CommonSettingsService.localSettings.profileAvatarSize;

  public static $inject = ['$scope', 'CommonSettingsService', 'uploaderFactory'];

    constructor(private $scope: ng.IScope,
              private CommonSettingsService: CommonSettingsService,
              uploaderFactory: UploaderFactory) {
    this.uploader = uploaderFactory.getInstance();
  }

  public addPhoto = (imagePath: string, file: File, callback: () => void): void => {
    if (imagePath.length > 0
      && FileTypeChecker.isFileFormatValid(file, FileCategoryEnum.AVATAR)
      && this.isFileSizeValid(file)) {
      this.imageSource = imagePath;
      this.isUserUploadImage = true;
      this.uploadedFile = file;
      this.clearFormAfterCropping = callback;
      this.isFileFormatError = false;
      this.isFileSizeError = false;
    }

    this.isFileFormatError = !FileTypeChecker.isFileFormatValid(file, FileCategoryEnum.AVATAR);

    this.isFileSizeError = !this.isFileSizeValid(file);

    this.$scope.$apply();
  }

  public onFocus = (): void => {
    this.isFocus = true;
  }

  public onBlur = (): void => {
    this.isFocus = false;
  }

  public removePhoto = (): void => {
    this.avatarToken = void 0;
  }

  public saveCrop = (data: any): void => {
    const indexOfSecondXPoint = 2;
    const squareSideLength = data.points[indexOfSecondXPoint] - data.points[0] - 1;
    const postFileDetails: PostFileDetails = {
      croppingDetails: {
        x: Number(data.points[0]),
        y: Number(data.points[1]),
        width: squareSideLength,
        height: squareSideLength
      },
      fileType: FileTypeEnum.PROFILE
    };
    this.isLoading = true;
    this.isUploadInProgress = true;
    this.uploader.uploadFile(this.uploadedFile, postFileDetails, () => {})
    .then(this.onFileUpload, this.onFileUploadError);

    this.isUserUploadImage = false;
  }

  private onFileUpload = (res: any): void => {
    this.isLoading = false;
    this.avatarToken = res.token;
    this.isUploadInProgress = false;
    this.imageSource = '';
    this.clearFormAfterCropping();
    this.isFocus = true;
    this.isFileUploadError = false;
  }

  private onFileUploadError = (err: any): void => {
    this.isLoading = false;
    this.isFileUploadError = true;
    throw new Error('Can not upload file: ' + String(err));
  }

  private isFileSizeValid = (file: File): boolean => file.size <= this.maxValidAvatarSize;

}
