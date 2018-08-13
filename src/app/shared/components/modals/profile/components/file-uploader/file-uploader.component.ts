// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
// tslint:disable:no-duplicate-imports
// tslint:disable:newline-before-return
import { Component, EventEmitter, HostListener, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { PostFileDetails } from '@anymind-ng/api';
import FileTypeEnum = PostFileDetails.FileTypeEnum;
import { Subject } from 'rxjs';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { IUploadFileInfo, UploaderService } from '../../../../../services/uploader/uploader.service';
import {
  FileStatus,
  FileUploaderComponentService,
  IFileValidationValues
} from './file-uploader.component.service';
import { Animations } from '../../../../../animations/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { FileCategoryEnum } from '../../../../../services/uploader/file-type-checker';
import { CommonConfig } from '../../../../../../../common-config';
import { ProfileDocument } from '@anymind-ng/api/model/profileDocument';

interface IFileInfo {
  token: string;
  name?: string;
  previews: string[];
}

interface IFile {
  file?: File;
  fileInfo?: IFileInfo;
  fileStatus: FileStatus;
}

@Component({
  selector: 'plat-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.sass'],
  providers: [FileUploaderComponentService],
  animations: [Animations.fadeInWithDelay, Animations.fadeOut, Animations.fadeInOutListItems]
})

export class FileUploaderComponent implements OnInit, OnDestroy {

  @Input()
  public profileDocuments: ProfileDocument[] = [];

  @Input()
  public maxFilesCount = 1;

  @Input()
  public maxFileSize: number = CommonConfig.getCommonConfig().validation.profile['document-size'];

  @Input()
  public fileCategory: FileCategoryEnum = FileCategoryEnum.EXPERT_FILE;

  @Input()
  public isDisabled ? = false;

  @Output()
  public tokensListEmitter$: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Output()
  public isUploadingEmitter$: EventEmitter<boolean> = new EventEmitter<false>();

  public readonly isMultipleFilesAllowed = true;
  public userFiles: ReadonlyArray<IFile> = [];
  public fileStatusEnum: typeof FileStatus = FileStatus;
  public validUserFilesCounter = 0;
  public isElementDraggable = true;
  public tokensList: string[] = [];
  public isDragFile = false;

  private readonly maxFileNameLength = 15;
  private readonly shortenFileNameLength = 10;
  private readonly postProcessOptions: PostFileDetails = {
    croppingDetails: undefined,
    fileType: FileTypeEnum.PROFILE
  };
  private loggerService: LoggerService;
  private ngUnsubscribe$ = new Subject<void>();
  private fileValidationValues: IFileValidationValues;

  constructor(private fileUploaderService: FileUploaderComponentService,
              private uploaderService: UploaderService,
              loggerFactory: LoggerFactory) {
    this.loggerService = loggerFactory.createLoggerService('FileUploaderComponent');
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: MouseEvent): void {
    this.isDragFile = true;
    event.preventDefault();
  }

  @HostListener('dragenter', ['$event'])
  public onDragEnter(event: MouseEvent): void {
    event.preventDefault();
  }

  @HostListener('dragend', ['$event'])
  public onDragEnd(event: MouseEvent): void {
    event.preventDefault();
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: MouseEvent): void {
    this.isDragFile = false;
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: MouseEvent): void {
    this.isDragFile = false;
    event.preventDefault();
    event.stopPropagation();
    const files: File[] = Array.from((<DragEvent>event).dataTransfer.files);
    this.saveFiles(files);
  }

  public ngOnInit(): void {
    this.getFilesInfo();
    this.assignFileValidationValues();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public onInputFileClick = (event: MouseEvent): void => {
    (<HTMLInputElement>event.target).value = '';
  }

  public onInputFileChange = (event: HTMLSelectElement): void => {
    const files: File[] = Array.from(event.target.files);
    this.saveFiles(files);
  }

  public saveFiles = (files: File[]): void => {
    files.forEach((file: File) => {
      const currentFile: IFile = {
        file,
        fileStatus: this.fileUploaderService
          .getFileErrorStatus(file, this.validUserFilesCounter, this.fileValidationValues)
      };
      this.userFiles = [...this.userFiles, currentFile];
      if (currentFile.fileStatus === FileStatus.VALID) {
        this.uploadFile(currentFile);
        this.validUserFilesCounter++;
      }
    });
  }

  public reuploadFile = (fileToReupload: IFile): void => {
    if (fileToReupload.file) {
      fileToReupload.fileStatus = FileStatus.VALID;
      this.uploadFile(fileToReupload);
    }
  }

  public removeFile = (fileToRemove: IFile): void => {
    this.userFiles = this.userFiles.filter(userFile => userFile !== fileToRemove);
    this.tokensList = this.tokensList.filter(token =>
      fileToRemove.fileInfo ? fileToRemove.fileInfo.token !== token : false
    );
    this.tokensListEmitter$.emit(this.tokensList);
    if (fileToRemove.fileStatus === FileStatus.VALID ||
      fileToRemove.fileStatus === FileStatus.UPLOAD_FAILURE) {
      this.validUserFilesCounter--;
    }
  }

  public removeFileFromUpload = (iFile: IFile): void => {
    this.removeFile(iFile);
    if (iFile.file) {
      this.uploaderService.removeFileFromUpload(iFile.file);
    }
  }

  public createFileName = (fileName: string): string => {
    if (fileName.length > this.maxFileNameLength) {
      const fileExtension = fileName.substr(fileName.lastIndexOf('.'), fileName.length);
      const shortenFileName = fileName.substr(0, this.shortenFileNameLength);
      return `${shortenFileName}[...]${fileExtension}`;
    }
    return fileName;
  }

  private getFilesInfo = (): void => {
    this.tokensList = this.profileDocuments.map(document => document.token);
    this.userFiles = this.profileDocuments.map(document => ({
      fileInfo: {
        name: document.name,
        token: document.token,
        previews: document.previews
      },
      fileStatus: FileStatus.VALID
    }));
    this.validUserFilesCounter = this.userFiles.length;
  }

  private uploadFile = (fileToUpload: IFile): void => {
    if (fileToUpload.file) {
      this.isUploadingEmitter$.emit(true);
      this.uploaderService.uploadFile(fileToUpload.file, this.postProcessOptions)
        .then(response => this.onFileUploadSuccess(response, fileToUpload))
        .catch(error => this.onFileUploadError(error, fileToUpload));
    }
  }

  private onFileUploadSuccess = (response: IUploadFileInfo, file: IFile): void => {
    file.fileInfo = {
      token: response.token,
      name: response.name,
      previews: response.previews
    };
    this.tokensList.push(response.token);
    this.tokensListEmitter$.emit(this.tokensList);
    this.isUploadingEmitter$.emit(false);
  }

  private onFileUploadError = (error: HttpErrorResponse, file: IFile): void => {
    file.fileStatus = FileStatus.UPLOAD_FAILURE;
    this.isUploadingEmitter$.emit(false);
    this.loggerService.warn('File upload failure', error);
  }

  private assignFileValidationValues = (): void => {
    this.fileValidationValues = {
      maxFilesCount: this.maxFilesCount,
      maxFileSize: this.maxFileSize,
      fileCategory: this.fileCategory
    };
  }

}
