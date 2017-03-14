import * as angular from "angular"
import {FileIdDto} from "profitelo-api-ng/model/models"
import {FilesApi} from "profitelo-api-ng/api/api"
import {CommonConfig} from "../../../../generated_modules/common-config/common-config"

export interface ICroppingDetails {
  x?: number
  y?: number
  width?: number
  height?: number
}

export interface IPostProcessOptions {
  croppingDetails?: ICroppingDetails
}

interface FileObject {
  file: File
  deferred: ng.IDeferred<any>
  postProcessOptions: IPostProcessOptions
  callback: (data: any) => void
}

export class UploaderService {

  private uploadingCount = 0
  private fileObjectsToUpload: Array<FileObject> = []
  private urls: any

  /* @ngInject */
  constructor(private $q: ng.IQService, private $timeout: ng.ITimeoutService, CommonConfig: CommonConfig,
              private FilesApi: FilesApi, private Upload: any, private simultaneousUploadCount: number,
              private collectionType: string) {

    this.urls = CommonConfig.getAllData().urls
  }

  private getUploadUrl = (fileId: string): string => {
    return this.urls.files + this.urls['file-upload'].replace('%s', fileId)
  }

  private scheduleUpload = () =>
    this.$timeout(this.processUpload)

  private onFileUploadEnd = () => {
    this.uploadingCount--
    this.scheduleUpload()
  }

  private onFileUpload = (fileObj: FileObject, res: any) => {
    fileObj.deferred.resolve(res.data)
    this.onFileUploadEnd()
  }

  private onFileUploadError = (fileObj: FileObject, err: any) => {
    fileObj.deferred.reject(err)
    this.onFileUploadEnd()
  }

  private onFileUploadProgress = (fileObj: FileObject, res: any) => {
    if (typeof fileObj.callback === 'function') {
      this.$timeout(_ => fileObj.callback(res))
    }
  }

  private _uploadFile = (fileObj: FileObject, token: FileIdDto) =>
  /*//FIXME
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

  private onGetFileToken = (fileObj: FileObject, token: FileIdDto) => {
    this._uploadFile(fileObj, token)
  }

  private onGetFileTokenError = (fileObj: FileObject, err: any) => {
    fileObj.deferred.reject(err)
    this.onFileUploadEnd()
  }

  private getFileToken = (fileObj: FileObject) => {
    return this.FilesApi.createFileTokenPath(this.collectionType, fileObj.postProcessOptions)
  }
  private processUpload = () => {
    if ((this.uploadingCount < this.simultaneousUploadCount || this.simultaneousUploadCount === 0) &&
      this.fileObjectsToUpload.length > 0) {
      this.uploadingCount++

      const fileObj: FileObject | undefined = this.fileObjectsToUpload.shift()

      if (angular.isDefined(fileObj) && fileObj) {
        this.getFileToken(fileObj)
          .then(
            (response) => this.onGetFileToken(fileObj, response),
            (err: any) => this.onGetFileTokenError(fileObj, err)
          )
      }
    }
  }

  private addFileToQueue = (file: File, postProcessOptions: IPostProcessOptions, callback: (res: any) => void) => {
    const deferred = this.$q.defer()
    this.fileObjectsToUpload.push({
      file: file,
      deferred: deferred,
      postProcessOptions: postProcessOptions,
      callback: callback
    })
    return deferred
  }

  public uploadFile = (file: File, postProcessOptions: IPostProcessOptions, callback: (data: any) => void) => {
    if (!file || !(file instanceof File)) {
      return this.$q.reject('Expected File, got ' + typeof file)
    }

    const deferred = this.addFileToQueue(file, postProcessOptions, callback)

    this.scheduleUpload()

    return deferred.promise
  }
}
