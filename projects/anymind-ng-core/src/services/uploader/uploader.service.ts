// tslint:disable:no-mixed-interface
// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
// tslint:disable:prefer-method-signature
// tslint:disable:no-shadowed-variable
// tslint:disable:no-any
import { FileIdDto, PostFileDetails, FilesService } from '@anymind-ng/api';
import { FileUploader } from './uploader';
import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CoreConfig } from '../../core-config';
import { CORE_CONFIG } from '../../shared/injection-tokens/injection-tokens';

export interface IUploadFileInfo {
  token: string;
  createdAt?: Date;
  uploadedAt?: Date;
  contentType: string;
  loaded?: number;
  size: number;
  previews?: string[];
  name: string;
}

export interface IFileObject {
  postProcessOptions: PostFileDetails;
  file: File;
  abortUploading?: () => void;
  onProgress?: (data: IUploadFileInfo) => void;
  resolve(arg: IUploadFileInfo): void;
  reject(args: any): void;
}

@Injectable({ providedIn: 'root' })
export class UploaderService {
  private fileObjectsToUpload: IFileObject[] = [];
  private filesUrl: string;
  private uploadFileUrl: string;
  private currentlyUploadedFile: IFileObject;
  private isFileUploadInProgress = false;

  constructor(private FilesService: FilesService, @Inject(CORE_CONFIG) coreConfig: CoreConfig) {
    this.filesUrl = coreConfig.urls.files;
    this.uploadFileUrl = coreConfig.urls.fileUpload;
  }

  public uploadFile = (
    file: File,
    postProcessOptions: PostFileDetails,
    onProgress: (data: IUploadFileInfo) => void,
  ): Promise<IUploadFileInfo> => {
    if (!file || !(file instanceof File)) {
      return Promise.reject<IUploadFileInfo>(`Expected File, got ${typeof file}`);
    }
    const promise = this.addFileToQueue(file, postProcessOptions, onProgress);
    this.processUpload();

    return promise;
  };

  public removeFileFromUpload = (fileToRemove: File): void => {
    this.removeFileFromQueue(fileToRemove);
    if (this.isFileUploading(fileToRemove)) {
      const abort = this.currentlyUploadedFile.abortUploading;
      if (abort) {
        abort();
      }
    }
  };

  private getUploadUrl = (fileId: string): string => this.filesUrl + this.uploadFileUrl.replace('%s', fileId);

  private onFileUploadEnd = (): void => {
    this.isFileUploadInProgress = false;
    this.processUpload();
  };

  private onFileUploadSuccess = (currentlyUploadedFile: IFileObject, response: ProgressEvent): void => {
    const res = response.target as XMLHttpRequest;
    try {
      currentlyUploadedFile.resolve(JSON.parse(res.response));
    } catch (err) {
      this.onFileUploadError(currentlyUploadedFile, err);
      this.removeFileFromUpload(this.currentlyUploadedFile.file);
    }

    this.onFileUploadEnd();
  };

  private onFileUploadError = (currentlyUploadedFile: IFileObject, err: HttpErrorResponse): void => {
    currentlyUploadedFile.reject(err);
    this.onFileUploadEnd();
  };

  private sendFileToServer = (currentlyUploadedFile: IFileObject, token: FileIdDto): void => {
    FileUploader.upload(
      currentlyUploadedFile.file,
      this.getUploadUrl(token.fileId),
      this.setAbortMethodToFileObject,
      (res: ProgressEvent) => this.onFileUploadProgress(currentlyUploadedFile, res, token),
    ).then(
      response => this.onFileUploadSuccess(currentlyUploadedFile, response),
      error => this.onFileUploadError(currentlyUploadedFile, error),
    );
  };

  private onFileUploadProgress = (fileObj: IFileObject, res: ProgressEvent, token: FileIdDto): void => {
    setTimeout(() => {
      if (typeof fileObj.onProgress === 'function') {
        fileObj.onProgress(this.getFileUploadInfo(fileObj, res, token));
      }
    });
  };

  private onGetFileTokenSuccess = (currentlyUploadedFile: IFileObject, token: FileIdDto): void => {
    if (this.isFileInQueue(currentlyUploadedFile)) {
      this.fileObjectsToUpload.shift();
      this.sendFileToServer(currentlyUploadedFile, token);
    } else {
      this.onFileUploadEnd();
    }
  };

  private getFileUploadInfo = (fileObj: IFileObject, res: ProgressEvent, token: FileIdDto): IUploadFileInfo => ({
    name: fileObj.file.name,
    contentType: fileObj.file.type,
    token: token.fileId,
    loaded: res.loaded,
    size: res.total,
  });

  private onGetFileTokenError = (currentlyUploadedFile: IFileObject, error: HttpErrorResponse): void => {
    this.fileObjectsToUpload.shift();
    currentlyUploadedFile.reject(error);
    this.onFileUploadEnd();
  };

  private getFileToken = (currentlyUploadedFile: IFileObject): Observable<FileIdDto> =>
    this.FilesService.createFileTokenRoute(currentlyUploadedFile.postProcessOptions);

  private processUpload = (): void => {
    if (!this.isFileUploadInProgress && this.fileObjectsToUpload.length > 0) {
      this.isFileUploadInProgress = true;
      this.currentlyUploadedFile = this.fileObjectsToUpload[0];
      this.getFileToken(this.currentlyUploadedFile).subscribe(
        response => this.onGetFileTokenSuccess(this.currentlyUploadedFile, response),
        error => this.onGetFileTokenError(this.currentlyUploadedFile, error),
      );
    }
  };

  private addFileToQueue = (
    file: File,
    postProcessOptions: PostFileDetails,
    onProgress: (data: IUploadFileInfo) => void,
  ): Promise<IUploadFileInfo> =>
    new Promise<IUploadFileInfo>(
      (resolve, reject): void => {
        const uploadObject = {
          file,
          resolve,
          reject,
          postProcessOptions,
          onProgress,
        };
        this.fileObjectsToUpload.push(uploadObject);
      },
    );

  private removeFileFromQueue = (fileToRemove: File): void => {
    this.fileObjectsToUpload = this.fileObjectsToUpload.filter(currentFile => currentFile.file !== fileToRemove);
  };

  private setAbortMethodToFileObject = (abort: () => void): void => {
    this.currentlyUploadedFile.abortUploading = abort;
  };

  private isFileInQueue = (file: IFileObject): boolean =>
    this.fileObjectsToUpload.filter(fileObj => fileObj === file).length > 0;

  private isFileUploading = (fileToRemove: File): boolean => {
    const filesList = [this.currentlyUploadedFile.file];

    return filesList.filter(file => file === fileToRemove).length > 0;
  };
}
