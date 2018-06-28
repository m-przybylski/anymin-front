import { Component, EventEmitter, HostListener, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { GetFileInfo, PostFileDetails } from '@anymind-ng/api';
import FileTypeEnum = PostFileDetails.FileTypeEnum;
import { Subject, Observable } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { IUploadFileInfo, UploaderService } from '../../services/uploader/uploader.service';
import {
  FileStatus,
  FileUploaderComponentService,
  IFileValidationValues
} from './file-uploader.component.service';
import { empty } from 'rxjs/observable/empty';
import { Animations } from '../../animations/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { FileCategoryEnum } from '../../services/uploader/file-type-checker';
import { CommonConfig } from '../../../../common-config';

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
  public tokensList: string[] = [];

  @Input()
  public maxFilesCount = 1;

  @Input()
  public maxFileSize: number = CommonConfig.getCommonConfig().validation.profile['document-size'];

  @Input()
  public fileCategory: FileCategoryEnum = FileCategoryEnum.EXPERT_FILE;

  @Output()
  public tokensListEmitter$: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Output()
  public isUploadingEmitter$: EventEmitter<boolean> = new EventEmitter<false>();

  public readonly isMultipleFilesAllowed = true;
  public userFiles: ReadonlyArray<IFile> = [];
  public fileStatusEnum: typeof FileStatus = FileStatus;
  public validUserFilesCounter = 0;
  public isElementDraggable = true;

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
  public onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  @HostListener('dragenter', ['$event'])
  public onDragEnter(event: DragEvent): void {
    event.preventDefault();
  }

  @HostListener('dragend', ['$event'])
  public onDragEnd(event: DragEvent): void {
    event.preventDefault();
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: DragEvent): void {
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const files: File[] = Array.from(event.dataTransfer.files);
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
    this.tokensList.forEach(token => {
      this.fileUploaderService.getFileInformation(token)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .pipe(catchError(this.onGetFileInfoError))
        .subscribe(this.onGetFileInfoSuccess);
    });
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

  private onGetFileInfoSuccess = (fileInformation: GetFileInfo): void => {
    const file = {
      fileInfo: {
        token: fileInformation.token,
        name: fileInformation.name,
        previews: fileInformation.previews
      },
      fileStatus: FileStatus.VALID
    };
    this.userFiles = [...this.userFiles, file];
    this.validUserFilesCounter++;
  }

  private onGetFileInfoError = (error: HttpErrorResponse): Observable<void> => {
    this.loggerService.warn('Error when downloading files', error);
    return empty();
  }

  private assignFileValidationValues = (): void => {
    this.fileValidationValues = {
      maxFilesCount: this.maxFilesCount,
      maxFileSize: this.maxFileSize,
      fileCategory: this.fileCategory
    };
  }

}
