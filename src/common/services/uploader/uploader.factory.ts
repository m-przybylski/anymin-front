import {UploaderService} from "./uploader.service"
import {FilesApi} from "../../api/api/FilesApi"
import {ICommonConfig} from "../common-config/common-config"

export class UploaderFactory {

  public collectionTypes = {
    avatar: 'avatar'
  }

  /* @ngInject */
  constructor(private $q: ng.IQService, private $timeout: ng.ITimeoutService,
              private CommonConfig: ICommonConfig, private FilesApi: FilesApi, private Upload: any) {
  }

  public getInstance = (simultaneousUploadCount: number = 1,
                        collectionType: string = this.collectionTypes.avatar) => {

    return new UploaderService(this.$q, this.$timeout, this.CommonConfig, this.FilesApi, this.Upload,
      simultaneousUploadCount, collectionType)
  }
}
