// tslint:disable:curly
import { IFileUploaderModuleComponentBindings } from './file-uploader';
import { UploaderFactory } from '../../services/uploader/uploader.factory';
import { UploaderService } from '../../services/uploader/uploader.service';
import { FilesApi } from 'profitelo-api-ng/api/api';
import { PostFileDetails, GetFileInfo } from 'profitelo-api-ng/model/models';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import { FileCategoryEnum, FileTypeChecker } from '../../classes/file-type-checker/file-type-checker';
import { TranslatorService } from '../../services/translator/translator.service';
import { CommonSettingsService } from '../../services/common-settings/common-settings.service';
import FileTypeEnum = PostFileDetails.FileTypeEnum;

export interface IFileUploaderComponentScope extends ng.IScope {
  tokenList: string[];
}

export interface IDocumentFile {
  file?: File;
  fileInfo?: GetFileInfo;
  fileUploadInfo?: any;
  isUploadFailed: boolean;
}

// tslint:disable:member-ordering
export class FileUploaderComponentController implements IFileUploaderModuleComponentBindings {

  public documentFiles: IDocumentFile[] = [];
  public tokenList: string[];
  public isValidCallback: (status: boolean) => void;
  public isFileTypeError = false;
  public fileTypeErrorMessage = '';
  public fileSizeErrorMessage = '';
  public isMaxFilesCountError = false;
  public isFileSizeError = false;
  public maxDocumentSize: number;

  private uploader: UploaderService;
  private countChoosedFiles = 0;
  private invalidTypeFilesNamesList: string[] = [];
  private errorDisplayTime = 5000;
  private maxDocumentsCount: number;

  public static $inject = ['$log', 'FilesApi', 'translatorService', '$timeout', 'CommonSettingsService',
    'uploaderFactory'];

  constructor(private $log: ng.ILogService,
              private FilesApi: FilesApi,
              private translatorService: TranslatorService,
              private $timeout: ng.ITimeoutService,
              private CommonSettingsService: CommonSettingsService,
              uploaderFactory: UploaderFactory) {
    this.uploader = uploaderFactory.getInstance();
    this.assignValidationValues();
  }

  public onUploadEnd = (uploadingStatus: boolean): void => {
    this.isValidCallback(uploadingStatus);
  }

  public $onInit(): void {
    this.tokenList.forEach((token) => {
      this.FilesApi.fileInfoRoute(token).then((response) => {
        const documentObject = {
          fileInfo: response,
          isUploadFailed: false
        };
        this.documentFiles.push(documentObject);
      }, (error) => {
        throw new Error('Can not get File Info: ' + String(error));
      });
    });
  }

  private postProcessOptions: PostFileDetails = {
    croppingDetails: undefined,
    fileType: FileTypeEnum.PROFILE
  };

  private onFileUploadError = (error: any, currentFile: IDocumentFile): void => {
    currentFile.isUploadFailed = true;
    this.$log.error(error);
  }

  public reuploadFile = (file: IDocumentFile): void => {
    const reuploadedFile: IDocumentFile | undefined = _.find(this.documentFiles, (documentFile) =>
      file === documentFile);
    if (reuploadedFile && reuploadedFile.file) {
      this.onUploadEnd(false);
      reuploadedFile.isUploadFailed = false;
      this.countChoosedFiles += 1;
      this.uploadFile(reuploadedFile.file, reuploadedFile);
    }
  }

  public uploadFiles = (files: File[],
                        _file: File,
                        _newFiles: File[],
                        _duplicateFiles: File[],
                        invalidFiles: File[]): void => {
    this.invalidTypeFilesNamesList = [];
    this.isFileTypeError = false;
    this.isMaxFilesCountError = false;

    if (this.isFilesCountValid(files)) {
      files.forEach((file) => {
        const currentFile: IDocumentFile = {
          file,
          isUploadFailed: false
        };
        if (FileTypeChecker.isFileFormatValid(file, FileCategoryEnum.EXPERT_FILE)) {
          this.documentFiles.push(currentFile);
          this.countChoosedFiles += 1;
          this.onUploadEnd(false);
          this.uploadFile(file, currentFile);
        } else {
          if (currentFile.file) {
            this.invalidTypeFilesNamesList.push(currentFile.file.name);
          }
        }
      });
    } else {
      this.isMaxFilesCountError = true;
      this.$timeout(() => {
        this.isMaxFilesCountError = false;
      }, this.errorDisplayTime);
    }

    if (this.invalidTypeFilesNamesList.length > 0)
      this.showFileTypeError();

    if (invalidFiles.length > 0)
      this.showFileSizeError(invalidFiles);
  }

  public removeFile = (file: IDocumentFile): void => {
    _.remove(this.documentFiles, (currentFile) => currentFile === file);
    this.isMaxFilesCountError = this.documentFiles.length >= this.maxDocumentsCount;

    _.remove(this.tokenList, (token) => {
      if (file.fileInfo) {
        return file.fileInfo.token === token;
      } else {
        this.$log.error('Can not find file');
        return void 0;
      }
    });
  }

  private showFileTypeError = (): void => {
    this.isFileTypeError = true;
    const invalidTypeFilesNames = this.invalidTypeFilesNamesList.join(', ');
    this.fileTypeErrorMessage =
      this.translatorService.translate('WIZARD.UPLOADER.FILE_VALIDATION_ERROR.FILE') + ' ' +
      invalidTypeFilesNames + ' ' + this.translatorService.translate('WIZARD.UPLOADER.FILE_VALIDATION_ERROR.MESSAGE');
    this.$timeout(() => {
      this.isFileTypeError = false;
    }, this.errorDisplayTime);
  }

  private uploadFile = (file: File, currenFile: IDocumentFile): void => {
    this.uploader.uploadFile(file, this.postProcessOptions, (res: any) => {
      currenFile.fileUploadInfo = res;
    }).then((res: any) => {
      currenFile.fileInfo = res;
      this.tokenList.push(res.token);
      this.countChoosedFiles -= 1;
      this.onUploadEnd(this.countChoosedFiles === 0);
    }, (error) => {
      this.onFileUploadError(error, currenFile);
    });
  }

  private isFilesCountValid = (files: File[]): boolean =>
    this.documentFiles.length + files.length <= this.maxDocumentsCount

  private showFileSizeError = (invalidFiles: File[]): void => {
    const invalidFilesNames = invalidFiles.map(invalidFile => invalidFile.name).join(', ');
    this.isFileSizeError = true;
    this.fileSizeErrorMessage =
      this.translatorService.translate('WIZARD.UPLOADER.FILE_VALIDATION_ERROR.FILE') + ' ' + invalidFilesNames
      + ' ' + this.translatorService.translate('WIZARD.UPLOADER.FILE_VALIDATION_ERROR.FILE_SIZE_MESSAGE');
    this.$timeout(() => {
      this.isFileSizeError = false;
    }, this.errorDisplayTime);
  }

  private assignValidationValues = (): void => {
    const localSettings = this.CommonSettingsService.localSettings;
    this.maxDocumentSize = localSettings.profileDocumentSize;
    this.maxDocumentsCount = localSettings.profileDocumentsCount;
  }
}
