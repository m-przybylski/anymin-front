import { UploaderService } from './uploader.service';
import { FilesApi } from 'profitelo-api-ng/api/api';

// tslint:disable:member-ordering
export class UploaderFactory {

  public static $inject = ['$q', '$timeout', 'FilesApi', 'Upload'];

    constructor(private $q: ng.IQService, private $timeout: ng.ITimeoutService,
              private FilesApi: FilesApi, private Upload: any) {
  }

  public getInstance = (simultaneousUploadCount = 1): UploaderService =>
    new UploaderService(this.$q, this.$timeout, this.FilesApi, this.Upload, simultaneousUploadCount)
}
