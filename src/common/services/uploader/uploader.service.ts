namespace profitelo.services.uploader {

  export interface IUploaderFactory {
    getInstance(simultaneousUploadCount: number, collectionType: string): IUploaderService
    collectionTypes: {
      avatar: string
    }
  }

  export interface IUploaderService {
    uploadFile(file: File, cb: (data: any) => void): ng.IPromise<any>
  }

  interface FileObject {
    file: File,
    deferred: ng.IDeferred<any>,
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

    private getFileToken = () =>
      this.FilesApi.tokenPath({collectionType: this.collectionType}).$promise

    private processUpload = () => {
      if ((this.uploadingCount < this.simultaneousUploadCount || this.simultaneousUploadCount === 0) &&
        this.fileObjectsToUpload.length > 0) {
        this.uploadingCount++

        const fileObj = this.fileObjectsToUpload.shift()

        if(fileObj) {
          this.getFileToken()
            .then(
              (token: FileToken) => this.onGetFileToken(fileObj, token),
              (err: any) => this.onGetFileTokenError(fileObj, err)
            )
        }
      }
    }

    private addFileToQueue = (file: File, callback: (res: any) => void) => {
      const deferred = this.$q.defer()
      this.fileObjectsToUpload.push({
        file: file,
        deferred: deferred,
        callback: callback
      })
      return deferred
    }

    public uploadFile = (file: File, callback: (data: any) => void) => {
      if (!file || !(file instanceof File)) {
        return this.$q.reject('Expected File, got ' + typeof file)
      }

      const deferred = this.addFileToQueue(file, callback)

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
