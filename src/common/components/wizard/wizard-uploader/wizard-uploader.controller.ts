import {IWizardUploaderModuleComponentBindings} from './wizard-uploader'
import {UploaderFactory} from '../../../services/uploader/uploader.factory'
import {UploaderService} from '../../../services/uploader/uploader.service'
import {FilesApi} from 'profitelo-api-ng/api/api'
import {PostProcessOption, FileInfo} from 'profitelo-api-ng/model/models'
import * as _ from 'lodash'
import {FileCategoryEnum, FileTypeChecker} from '../../../classes/file-type-checker'

export interface IDocumentFile {
  file?: File,
  fileInfo?: FileInfo,
  fileUploadInfo?: any,
  isUploadFailed: boolean
}

export class WizardUploaderComponentController implements IWizardUploaderModuleComponentBindings {

  private uploader: UploaderService
  public documentFiles: IDocumentFile[] = []
  public tokenList: string[]
  private countChoosedFiles: number = 0
  public isValidCallback: (status: boolean) => {}

  /* @ngInject */
  constructor(private $log: ng.ILogService, uploaderFactory: UploaderFactory, private FilesApi: FilesApi) {
    this.uploader = uploaderFactory.getInstance(1, uploaderFactory.collectionTypes.avatar)
  }

  public onUploadEnd = (uploadingStatus: boolean): void => {
    this.isValidCallback(uploadingStatus)
  }

  $onInit(): void {
    this.tokenList.forEach((token) => {
      this.FilesApi.fileInfoPath(token).then((response) => {
        const documentObject = {
          fileInfo: response,
          isUploadFailed: false
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

  private onFileUploadError = (error: any, currentFile: IDocumentFile): void => {
    currentFile.isUploadFailed = true
    this.$log.error(error)
  }

  public reuploadFile = (file: IDocumentFile): void => {
    const reuploadedFile: IDocumentFile | undefined = _.find(this.documentFiles, (documentFile) => {
      return file === documentFile
    })
    if (reuploadedFile && reuploadedFile.file) {
      this.onUploadEnd(false)
      reuploadedFile.isUploadFailed = false
      this.countChoosedFiles += 1
      this.uploadFile(reuploadedFile.file, reuploadedFile)
    }

  }

  public uploadFiles = (files: File[]): void => {
    files.forEach((file) => {
      const currentFile: IDocumentFile = {
        file,
        isUploadFailed: false
      }
      this.documentFiles.push(currentFile)
      if (FileTypeChecker.isFileFormatValid(file, FileCategoryEnum.EXPERT_FILE)) {
        this.countChoosedFiles += 1
        this.onUploadEnd(false)
        this.uploadFile(file, currentFile)
      }
    })
  }

  public removeFile = (file: IDocumentFile): void => {
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

  private uploadFile = (file: File, currenFile: IDocumentFile): void => {
    this.uploader.uploadFile(file, this.postProcessOptions, (res: any) => {
      currenFile.fileUploadInfo = res
    }).then((res: any) => {
      currenFile.fileInfo = res
      this.tokenList.push(res.token)
      this.countChoosedFiles -= 1
      this.onUploadEnd(this.countChoosedFiles === 0)
    }, (error) => {
      this.onFileUploadError(error, currenFile)
    })
  }
}
