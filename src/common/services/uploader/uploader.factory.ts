import {UploaderService} from "./uploader.service"
import {FilesApi} from "profitelo-api-ng/api/api"
import {CommonConfig} from "../../../../generated_modules/common-config/common-config"

export class UploaderFactory {

  public collectionTypes = {
    avatar: 'avatar'
  }

  /* @ngInject */
  constructor(private $q: ng.IQService, private $timeout: ng.ITimeoutService,
              private CommonConfig: CommonConfig, private FilesApi: FilesApi, private Upload: any) {
  }

  public getInstance = (simultaneousUploadCount: number = 1,
                        collectionType: string = this.collectionTypes.avatar) => {

    return new UploaderService(this.$q, this.$timeout, this.CommonConfig, this.FilesApi, this.Upload,
      simultaneousUploadCount, collectionType)
  }
}
