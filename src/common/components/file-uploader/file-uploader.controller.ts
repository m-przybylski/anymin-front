import {IFileUploaderModuleComponentBindings} from './file-uploader'
import {UploaderFactory} from '../../services/uploader/uploader.factory'
import {UploaderService} from '../../services/uploader/uploader.service'
import {FilesApi} from 'profitelo-api-ng/api/api'
import {PostProcessOption, FileInfo} from 'profitelo-api-ng/model/models'
import * as _ from 'lodash'
import {FileCategoryEnum, FileTypeChecker} from '../../classes/file-type-checker/file-type-checker'
import {TranslatorService} from '../../services/translator/translator.service'

export interface IFileUploaderComponentScope extends ng.IScope {
  tokenList: string[]
}

export interface IDocumentFile {
  file?: File,
  fileInfo?: FileInfo,
  fileUploadInfo?: any,
  isUploadFailed: boolean
}

export class FileUploaderComponentController implements IFileUploaderModuleComponentBindings {

  private uploader: UploaderService
  public documentFiles: IDocumentFile[] = []
  private invalidTypeFilesNames: string[] = []
  public tokenList: string[]
  private countChoosedFiles: number = 0
  public isValidCallback: (status: boolean) => {}
  public isFileTypeError: boolean = false
  private filesNames: string = ''
  public fileValidationErrorMessage: string = ''

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              private FilesApi: FilesApi,
              private translatorService: TranslatorService,
              uploaderFactory: UploaderFactory) {
    this.uploader = uploaderFactory.getInstance()
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
    const reuploadedFile: IDocumentFile | undefined = _.find(this.documentFiles, (documentFile) =>
      file === documentFile)
    if (reuploadedFile && reuploadedFile.file) {
      this.onUploadEnd(false)
      reuploadedFile.isUploadFailed = false
      this.countChoosedFiles += 1
      this.uploadFile(reuploadedFile.file, reuploadedFile)
    }
  }

  public uploadFiles = (files: File[]): void => {
    this.invalidTypeFilesNames = []
    this.isFileTypeError = false
    files.forEach((file) => {
      const currentFile: IDocumentFile = {
        file,
        isUploadFailed: false
      }
      if (FileTypeChecker.isFileFormatValid(file, FileCategoryEnum.EXPERT_FILE)) {
        this.documentFiles.push(currentFile)
        this.countChoosedFiles += 1
        this.onUploadEnd(false)
        this.uploadFile(file, currentFile)
      } else {
        if (currentFile.file) {
          this.invalidTypeFilesNames.push(currentFile.file.name)
        }
      }
    })
    this.showFileTypeError()
  }

  public removeFile = (file: IDocumentFile): void => {
    _.remove(this.documentFiles, (currentFile) => currentFile === file)

    _.remove(this.tokenList, (token) => {
      if (file.fileInfo) {
        return file.fileInfo.token === token
      } else {
        this.$log.error('Can not find file')
        return void 0
      }
    })
  }

  private showFileTypeError = (): void => {
    if (this.invalidTypeFilesNames.length > 0) {
      this.isFileTypeError = true
      this.filesNames = this.invalidTypeFilesNames.join(', ')
    }
    this.fileValidationErrorMessage =
      this.translatorService.translate('WIZARD.UPLOADER.FILE_VALIDATION_ERROR.FILE') + ' ' +
      this.filesNames + ' ' + this.translatorService.translate('WIZARD.UPLOADER.FILE_VALIDATION_ERROR.MESSAGE')
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
