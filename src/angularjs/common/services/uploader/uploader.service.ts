import * as angular from 'angular';
import { FileIdDto, PostFileDetails } from 'profitelo-api-ng/model/models';
import { FilesApi } from 'profitelo-api-ng/api/api';
import { CommonConfig } from '../../../../../generated_modules/common-config/common-config';
import { IDeferred } from 'angular';

export interface ICroppingDetails {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

interface IFileObject {
  file: File;
  deferred: ng.IDeferred<any>;
  postFileDetails: PostFileDetails;
  callback: (data: any) => void;
}

// tslint:disable:member-ordering
export class UploaderService {

  private uploadingCount = 0;
  private fileObjectsToUpload: IFileObject[] = [];
  private urls = CommonConfig.settings.urls;

  public static $inject = ['$q', '$timeout', 'FilesApi', 'Upload', 'simultaneousUploadCount'];

    constructor(private $q: ng.IQService, private $timeout: ng.ITimeoutService,
              private FilesApi: FilesApi, private Upload: any, private simultaneousUploadCount: number) {
  }

  private getUploadUrl = (fileId: string): string =>
    this.urls.files + this.urls['file-upload'].replace('%s', fileId)

  private scheduleUpload = (): ng.IPromise<void> =>
    this.$timeout(this.processUpload)

  private onFileUploadEnd = (): void => {
    this.uploadingCount--;
    this.scheduleUpload();
  }

  private onFileUpload = (fileObj: IFileObject, res: any): void => {
    fileObj.deferred.resolve(res.data);
    this.onFileUploadEnd();
  }

  private onFileUploadError = (fileObj: IFileObject, err: any): void => {
    fileObj.deferred.reject(err);
    this.onFileUploadEnd();
  }

  private onFileUploadProgress = (fileObj: IFileObject, res: any): void => {
    if (typeof fileObj.callback === 'function') {
      this.$timeout(_ => fileObj.callback(res));
    }
  }

  private _uploadFile = (fileObj: IFileObject, token: FileIdDto): void =>
  /*// FIXME
    this.$q.resolve()*/
    this.Upload.upload({
      url: this.getUploadUrl(token.fileId),
      data: {
        file: fileObj.file
      }
    }).then(
      (res: any) => this.onFileUpload(fileObj, res),
      (err: any) => this.onFileUploadError(fileObj, err),
      (res: any) => this.onFileUploadProgress(fileObj, res)
    )

  private onGetFileToken = (fileObj: IFileObject, token: FileIdDto): void => {
    this._uploadFile(fileObj, token);
  }

  private onGetFileTokenError = (fileObj: IFileObject, err: any): void => {
    fileObj.deferred.reject(err);
    this.onFileUploadEnd();
  }

  private getFileToken = (fileObj: IFileObject): ng.IPromise<FileIdDto> =>
    this.FilesApi.createFileTokenPath(fileObj.postFileDetails)

  private processUpload = (): void => {
    if ((this.uploadingCount < this.simultaneousUploadCount || this.simultaneousUploadCount === 0) &&
      this.fileObjectsToUpload.length > 0) {
      this.uploadingCount++;

      const fileObj: IFileObject | undefined = this.fileObjectsToUpload.shift();

      if (angular.isDefined(fileObj) && fileObj) {
        this.getFileToken(fileObj)
          .then(
            (response) => this.onGetFileToken(fileObj, response),
            (err: any) => this.onGetFileTokenError(fileObj, err)
          );
      }
    }
  }

  private addFileToQueue = (file: File,
                            postFileDetails: PostFileDetails,
                            callback: (res: any) => void): IDeferred<{}> => {
    const deferred = this.$q.defer();
    this.fileObjectsToUpload.push({
      file,
      deferred,
      postFileDetails,
      callback
    });
    return deferred;
  }

  public uploadFile = (file: File,
                       postFileDetails: PostFileDetails,
                       callback: (data: any) => void): ng.IPromise<{}> => {
    if (!file || !(file instanceof File)) {
      return this.$q.reject('Expected File, got ' + typeof file);
    }

    const deferred = this.addFileToQueue(file, postFileDetails, callback);

    this.scheduleUpload();

    return deferred.promise;
  }
}
