// tslint:disable:no-mixed-interface
// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
// tslint:disable:prefer-method-signature
// tslint:disable:no-shadowed-variable
// tslint:disable:no-any
// tslint:disable:newline-before-return
import { FileIdDto, PostFileDetails, FilesService } from '@anymind-ng/api';
import { FileUploader } from './uploader';
import { Observable } from 'rxjs';
import { CommonConfig } from '../../../../common-config';
import { Injectable } from '@angular/core';
import { ConfigDEFAULT } from '../../../../../generated_modules/common-config/common-config.default';
import { HttpErrorResponse } from '@angular/common/http';

export interface IUploadFileInfo {
  token: string;
  createdAt: Date;
  uploadedAt: Date;
  contentType: string;
  size: number;
  previews: string[];
  name: string;
}

export interface IFileObject {
  postProcessOptions: PostFileDetails;
  file: File;
  abortUploading?: () => void;
  resolve(args: IUploadFileInfo): void;
  reject(args: any): void;
}

@Injectable()
export class UploaderService {

  private fileObjectsToUpload: IFileObject[] = [];
  private commonConfig: ConfigDEFAULT;
  private filesUrl: string;
  private uploadFileUrl: string;
  private currentlyUploadedFile: IFileObject;
  private isFileUploadInProgress = false;

  constructor(private FilesService: FilesService) {
    this.commonConfig = CommonConfig.getCommonConfig();
    this.filesUrl = window.location.origin;
    this.uploadFileUrl = this.commonConfig.urls['file-upload'];
  }

  public uploadFile = (file: File,
                       postProcessOptions: PostFileDetails): Promise<IUploadFileInfo> => {
    if (!file || !(file instanceof File)) {
      return Promise.reject(`Expected File, got ${typeof file}`);
    }
    const promise = this.addFileToQueue(file, postProcessOptions);
    this.processUpload();
    return promise;
  }

  public removeFileFromUpload = (fileToRemove: File): void => {
    this.removeFileFromQueue(fileToRemove);
    if (this.isFileUploading(fileToRemove)) {
      const abort = this.currentlyUploadedFile.abortUploading;
      if (abort) {
        abort();
      }
    }
  }

  private getUploadUrl = (fileId: string): string =>
    this.filesUrl + this.uploadFileUrl.replace('%s', fileId)

  private onFileUploadEnd = (): void => {
    this.isFileUploadInProgress = false;
    this.processUpload();
  }

  private onFileUploadSuccess = (currentlyUploadedFile: IFileObject, response: ProgressEvent): void => {
    const res = response.target as XMLHttpRequest;
    currentlyUploadedFile.resolve(JSON.parse(res.response));
    this.onFileUploadEnd();
  }

  private onFileUploadError = (currentlyUploadedFile: IFileObject, err: HttpErrorResponse): void => {
    currentlyUploadedFile.reject(err);
    this.onFileUploadEnd();
  }

  private sendFileToServer = (currentlyUploadedFile: IFileObject, token: FileIdDto): void => {
    FileUploader.upload(currentlyUploadedFile.file, this.getUploadUrl(token.fileId), this.setAbortMethodToFileObject)
      .then(
      response => this.onFileUploadSuccess(currentlyUploadedFile, response),
      error => this.onFileUploadError(currentlyUploadedFile, error)
    );
  }

  private onGetFileTokenSuccess = (currentlyUploadedFile: IFileObject, token: FileIdDto): void => {
    if (this.isFileInQueue(currentlyUploadedFile)) {
      this.fileObjectsToUpload.shift();
      this.sendFileToServer(currentlyUploadedFile, token);
    } else {
      this.onFileUploadEnd();
    }
  }

  private onGetFileTokenError = (currentlyUploadedFile: IFileObject, error: HttpErrorResponse): void => {
    this.fileObjectsToUpload.shift();
    currentlyUploadedFile.reject(error);
    this.onFileUploadEnd();
  }

  private getFileToken = (currentlyUploadedFile: IFileObject): Observable<FileIdDto> =>
    this.FilesService.createFileTokenRoute(currentlyUploadedFile.postProcessOptions)

  private processUpload = (): void => {
    if (!this.isFileUploadInProgress && this.fileObjectsToUpload.length > 0) {
      this.isFileUploadInProgress = true;
      this.currentlyUploadedFile = this.fileObjectsToUpload[0];
      this.getFileToken(this.currentlyUploadedFile)
        .subscribe(
          response => this.onGetFileTokenSuccess(this.currentlyUploadedFile, response),
          error => this.onGetFileTokenError(this.currentlyUploadedFile, error)
        );
    }
  }

  private addFileToQueue = (file: File,
                            postProcessOptions: PostFileDetails): Promise<IUploadFileInfo> =>
    new Promise<IUploadFileInfo>((resolve, reject): void => {
      const uploadObject = {
        file, resolve, reject, postProcessOptions
      };
      this.fileObjectsToUpload.push(uploadObject);
    })

  private removeFileFromQueue = (fileToRemove: File): void => {
    this.fileObjectsToUpload = this.fileObjectsToUpload.filter(currentFile => currentFile.file !== fileToRemove);
  }

  private setAbortMethodToFileObject = (abort: () => void): void => {
    this.currentlyUploadedFile.abortUploading = abort;
  }

  private isFileInQueue = (file: IFileObject): boolean =>
    this.fileObjectsToUpload.filter(fileObj => fileObj === file).length > 0

  private isFileUploading = (fileToRemove: File): boolean => {
    const filesList = [this.currentlyUploadedFile.file];
    return filesList.filter(file => file === fileToRemove).length > 0;
  }

}
