import {IWizardUploaderModuleComponentBindings} from './wizard-uploader'
import {UploaderFactory} from '../../../services/uploader/uploader.factory'
import {UploaderService} from '../../../services/uploader/uploader.service'
import {FilesApi} from 'profitelo-api-ng/api/api'
import {PostProcessOption, FileInfo} from 'profitelo-api-ng/model/models'
import * as _ from 'lodash'

export interface IDocumentFile {
  file?: File,
  fileInfo?: FileInfo,
  fileUploadInfo?: any
}

export class WizardUploaderComponentController implements IWizardUploaderModuleComponentBindings {

  private uploader: UploaderService
  public documentFiles: IDocumentFile[] = []
  public tokenList: string[]

  /* @ngInject */
  constructor(private $log: ng.ILogService, uploaderFactory: UploaderFactory, private FilesApi: FilesApi) {
    this.uploader = uploaderFactory.getInstance(1, uploaderFactory.collectionTypes.avatar)
  }

  $onInit() {
    this.tokenList.forEach((token) => {
      this.FilesApi.fileInfoPath(token).then((response) => {
        const documentObject = {
          fileInfo: response
        }
        this.documentFiles.push(documentObject)
      }, (error) => {
        throw new Error('Can not get File Info: ' + error)
      })
    })
  }

  private postProcessOptions: PostProcessOption = {
    croppingDetails: undefined
  }

  private onFileUploadError = (err: any) => {
    this.$log.error(err)
  }

  public uploadFiles = (files: File[]) => {
    files.forEach((file) => {
      const currentFile: IDocumentFile = {
        file: file
      }
      this.documentFiles.push(currentFile)
      this.uploader.uploadFile(file, this.postProcessOptions, (res: any) => {
        currentFile.fileUploadInfo = res
      })
      .then((res: any) => {
        currentFile.fileInfo = res
        this.tokenList.push(res.token)
      }, this.onFileUploadError)
    })
  }

  public removeFile = (file: IDocumentFile) => {
    _.remove(this.documentFiles, (currentFile) => {
      return currentFile === file
    })

    _.remove(this.tokenList, (token) => {
      if (file.fileInfo) {
        return file.fileInfo.token === token
      } else {
        this.$log.error('Can not find file')
        return void 0
      }
    })

  }

}
