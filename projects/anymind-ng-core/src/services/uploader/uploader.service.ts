import { FileIdDto, PostFileDetails, FilesService } from '@anymind-ng/api';
import { Observable, Subject } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpEventType, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { CoreConfig } from '../../core-config';
import { CORE_CONFIG } from '../../shared/injection-tokens/injection-tokens';
import { tap, last, takeUntil, filter } from 'rxjs/operators';

export interface IUploadFileInfo {
  token: string;
  createdAt?: Date;
  uploadedAt?: Date;
  contentType: string;
  loaded?: number;
  size: number;
  previews?: ReadonlyArray<string>;
  name: string;
}

interface IFileObjectMethods {
  onProgress?(data: IUploadFileInfo): void;
  resolve(arg: IUploadFileInfo): void;
  reject(args: any): void;
}
export interface IFileObject extends IFileObjectMethods {
  postProcessOptions: PostFileDetails;
  file: File;
}

@Injectable({ providedIn: 'root' })
export class UploaderService {
  private fileObjectsToUpload: ReadonlyArray<IFileObject> = [];
  private filesUrl: string;
  private uploadFileUrl: string;
  private currentlyUploadedFile: IFileObject;
  private isFileUploadInProgress = false;

  private abortUpload$ = new Subject<File>();

  constructor(
    private httpClient: HttpClient,
    private filesService: FilesService,
    @Inject(CORE_CONFIG) coreConfig: CoreConfig,
  ) {
    this.filesUrl = coreConfig.urls.files;
    this.uploadFileUrl = coreConfig.urls.fileUpload;
  }

  public uploadFile(
    file: File,
    postProcessOptions: PostFileDetails,
    onProgress: (data: IUploadFileInfo) => void,
  ): Promise<IUploadFileInfo> {
    if (!file || !(file instanceof File)) {
      return Promise.reject<IUploadFileInfo>(`Expected File, got ${typeof file}`);
    }
    const promise = this.addFileToQueue(file, postProcessOptions, onProgress);
    this.processUpload();

    return promise;
  }

  public removeFileFromUpload(fileToRemove: File): void {
    this.abortUpload$.next(fileToRemove);
    this.removeFileFromQueue(fileToRemove);
  }

  public get isAnyFileUploading(): boolean {
    return this.isFileUploadInProgress;
  }

  private getUploadUrl(fileId: string): string {
    // TODO refactor
    // https://anymind.atlassian.net/browse/FRONT-169
    return this.filesUrl + this.uploadFileUrl.replace('%s', fileId);
  }

  private onFileUploadEnd(): void {
    this.isFileUploadInProgress = false;
    this.processUpload();
  }

  private sendFileToServer(currentlyUploadedFile: IFileObject, token: FileIdDto): void {
    const formData = new FormData();
    formData.append('file', currentlyUploadedFile.file);
    this.httpClient
      .post(this.getUploadUrl(token.fileId), formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        takeUntil(this.abortUpload$.pipe(filter(file => file === currentlyUploadedFile.file))),
        tap(event => {
          if (event.type === HttpEventType.UploadProgress) {
            if (typeof currentlyUploadedFile.onProgress === 'function') {
              currentlyUploadedFile.onProgress(this.getFileUploadInfo(currentlyUploadedFile, event, token));
            }
          }
        }),
        last(),
      )
      .subscribe(
        response => {
          if (response.type === HttpEventType.Response) {
            // File was uploaded, and response received from backend
            currentlyUploadedFile.resolve((response as HttpResponse<any>).body);
            this.onFileUploadEnd();

            return;
          }
          // File was canceled by a user
          currentlyUploadedFile.reject('Canceled');
        },
        error => {
          currentlyUploadedFile.reject(error);
          this.onFileUploadEnd();
        },
      );
  }

  private onGetFileTokenSuccess(currentlyUploadedFile: IFileObject, token: FileIdDto): void {
    if (this.isFileInQueue(currentlyUploadedFile)) {
      const [, ...tail] = this.fileObjectsToUpload;
      this.fileObjectsToUpload = tail;
      this.sendFileToServer(currentlyUploadedFile, token);
    } else {
      // file was cancelled to download before upload starts
      currentlyUploadedFile.reject('Canceled');
      this.onFileUploadEnd();
    }
  }

  private getFileUploadInfo = (fileObj: IFileObject, res: HttpProgressEvent, token: FileIdDto): IUploadFileInfo => ({
    name: fileObj.file.name,
    contentType: fileObj.file.type,
    token: token.fileId,
    loaded: res.loaded,
    size: res.total || 0,
  });

  private onGetFileTokenError(currentlyUploadedFile: IFileObject, error: HttpErrorResponse): void {
    const [, ...tail] = this.fileObjectsToUpload;
    this.fileObjectsToUpload = tail;
    currentlyUploadedFile.reject(error);
    this.onFileUploadEnd();
  }

  private getFileToken(currentlyUploadedFile: IFileObject): Observable<FileIdDto> {
    return this.filesService.createFileTokenRoute(currentlyUploadedFile.postProcessOptions);
  }

  private processUpload(): void {
    if (!this.isFileUploadInProgress && this.fileObjectsToUpload.length > 0) {
      this.isFileUploadInProgress = true;
      this.currentlyUploadedFile = this.fileObjectsToUpload[0];
      this.getFileToken(this.currentlyUploadedFile).subscribe(
        response => this.onGetFileTokenSuccess(this.currentlyUploadedFile, response),
        error => this.onGetFileTokenError(this.currentlyUploadedFile, error),
      );
    }
  }

  private addFileToQueue(
    file: File,
    postProcessOptions: PostFileDetails,
    onProgress: (data: IUploadFileInfo) => void,
  ): Promise<IUploadFileInfo> {
    return new Promise<IUploadFileInfo>(
      (resolve, reject): void => {
        const uploadObject: IFileObject = {
          file,
          resolve,
          reject,
          postProcessOptions,
          onProgress,
        };
        this.fileObjectsToUpload = this.fileObjectsToUpload.concat(uploadObject);
      },
    );
  }

  private removeFileFromQueue(fileToRemove: File): void {
    this.fileObjectsToUpload = this.fileObjectsToUpload.filter(currentFile => currentFile.file !== fileToRemove);
  }

  private isFileInQueue(file: IFileObject): boolean {
    return this.fileObjectsToUpload.filter(fileObj => fileObj === file).length > 0;
  }
}
