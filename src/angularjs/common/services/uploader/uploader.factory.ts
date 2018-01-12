import {UploaderService} from './uploader.service'
import {FilesApi} from 'profitelo-api-ng/api/api'

export class UploaderFactory {

  static $inject = ['$q', '$timeout', 'FilesApi', 'Upload'];

    constructor(private $q: ng.IQService, private $timeout: ng.ITimeoutService,
              private FilesApi: FilesApi, private Upload: any) {
  }

  public getInstance = (simultaneousUploadCount: number = 1): UploaderService =>
    new UploaderService(this.$q, this.$timeout, this.FilesApi, this.Upload, simultaneousUploadCount)
}
