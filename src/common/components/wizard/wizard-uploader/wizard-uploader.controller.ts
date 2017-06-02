import {IWizardUploaderModuleComponentBindings} from './wizard-uploader'
import {UploaderFactory} from '../../../services/uploader/uploader.factory'
import {UploaderService} from '../../../services/uploader/uploader.service'
import {FilesApi} from 'profitelo-api-ng/api/api'
import {PostProcessOption, FileInfo} from 'profitelo-api-ng/model/models'
import * as _ from 'lodash'
export class WizardUploaderComponentController implements IWizardUploaderModuleComponentBindings {

  private uploader: UploaderService
  public uploadedFiles: Array<FileInfo> = []
  public tokenList: Array<string>

  /* @ngInject */
  constructor(private $log: ng.ILogService, uploaderFactory: UploaderFactory, private FilesApi: FilesApi) {
    this.uploader = uploaderFactory.getInstance(1, uploaderFactory.collectionTypes.avatar)
  }

  $onInit() {
    this.tokenList.forEach((token) => {
      this.FilesApi.fileInfoPath(token).then((response) => {
        this.uploadedFiles.push(response)
      }, (error) => {
        throw new Error('Can not get File Info: ' + error)
      })
    })
  }

  private onUploadProgess = (res: any) =>
    this.$log.debug(res)

  private postProcessOptions: PostProcessOption = {
    croppingDetails: undefined
  }

  private onFilesUpload = (res: any) => {
    this.uploadedFiles.push(res)
    this.tokenList.push(res.token)
  }

  private onFileUploadError = (err: any) => {
    this.$log.error(err)
  }

  public uploadFiles = (files: Array<File>) => {
    files.forEach((file) => {
      this.uploader.uploadFile(file, this.postProcessOptions, this.onUploadProgess)
      .then(this.onFilesUpload, this.onFileUploadError)
    })
  }

  public removeFile = (file: FileInfo) => {
    _.remove(this.uploadedFiles, (currentFile) => {
      return currentFile === file
    })

    _.remove(this.tokenList, (token) => {
      return file.token === token
    })

  }

}
