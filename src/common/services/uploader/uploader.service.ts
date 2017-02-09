namespace profitelo.services.uploader {

  export interface IUploaderFactory {
    getInstance(simultaneousUploadCount: number, collectionType: string): IUploaderService
    collectionTypes: {
      avatar: string
    }
  }

  export interface IUploaderService {
    uploadFile(file: File, postProcessOptions:IPostProcessOptions, cb: (data: any) => void): ng.IPromise<any>
  }

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

  interface FileToken {
    fileId: string
  }

  class UploaderService implements IUploaderService {

    private uploadingCount = 0
    private fileObjectsToUpload: Array<FileObject> = []
    private urls: any

    constructor(private $q: ng.IQService, private $timeout: ng.ITimeoutService, CommonConfig: ICommonConfig,
                private FilesApi: any, private Upload: any, private simultaneousUploadCount: number,
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

    private _uploadFile = (fileObj: FileObject, token: FileToken) =>
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

    private onGetFileToken = (fileObj: FileObject, token: FileToken) => {
      this._uploadFile(fileObj, token)
    }

    private onGetFileTokenError = (fileObj: FileObject, err: any) => {
      fileObj.deferred.reject(err)
      this.onFileUploadEnd()
    }

    private getFileToken = (fileObj) => {
     return this.FilesApi.createFileTokenPath({collectionType: this.collectionType}, fileObj.postProcessOptions).$promise
    }
    private processUpload = () => {
      if ((this.uploadingCount < this.simultaneousUploadCount || this.simultaneousUploadCount === 0) &&
        this.fileObjectsToUpload.length > 0) {
        this.uploadingCount++

        const fileObj = this.fileObjectsToUpload.shift()

        if(fileObj) {
          this.getFileToken(fileObj)
            .then(
              (token: FileToken) => this.onGetFileToken(fileObj, token),
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

  class UploaderFactory implements IUploaderFactory {

    public collectionTypes = {
      avatar: 'avatar'
    }

    constructor(private $q: ng.IQService, private $timeout: ng.ITimeoutService,
                private CommonConfig: ICommonConfig, private FilesApi: any, private Upload: any) {
    }

    public getInstance = (simultaneousUploadCount: number = 1,
                          collectionType: string = this.collectionTypes.avatar) => {

      return new UploaderService(this.$q, this.$timeout, this.CommonConfig, this.FilesApi, this.Upload,
        simultaneousUploadCount, collectionType)
    }
  }

  angular.module('profitelo.services.uploader', [
    'profitelo.swaggerResources',
    'commonConfig'
  ])
  .config(($qProvider: any) => {
    $qProvider.errorOnUnhandledRejections(false)
  })
  .service('uploaderFactory', UploaderFactory)
}
