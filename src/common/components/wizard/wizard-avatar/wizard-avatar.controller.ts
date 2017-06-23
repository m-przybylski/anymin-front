import {IWizardAvatarComponentBindings} from './wizard-avatar'
import {UploaderFactory} from '../../../services/uploader/uploader.factory'
import {UploaderService} from '../../../services/uploader/uploader.service'
import {PostProcessOption} from 'profitelo-api-ng/model/models'
import {UrlService} from '../../../services/url/url.service'
export class WizardAvatarComponentController implements IWizardAvatarComponentBindings, ng.IController {

  private isUploadInProgress: boolean = false
  private uploadedFile: File
  private uploader: UploaderService
  private isUserUploadImage: boolean = false
  public avatarPreview: string
  private clearFormAfterCropping: () => void
  private imageSource: string
  public isLoading: boolean = false

  public avatarToken?: string
  public isValid?: boolean
  public isSubmitted?: boolean
  public isFocus: boolean = true
  public isFileUploadError: boolean = false

  /* @ngInject */
  constructor(uploaderFactory: UploaderFactory, private urlService: UrlService, private $scope: ng.IScope) {
    this.uploader = uploaderFactory.getInstance(1, uploaderFactory.collectionTypes.avatar)
  }

  $onInit() {
    this.avatarPreview = this.urlService.resolveFileUrl(this.avatarToken || '')
  }

  public addPhoto = (imagePath: string, file: File, callback: () => void): void => {
    if (imagePath.length > 0) {
      this.imageSource = imagePath
      this.isUserUploadImage = true
      this.uploadedFile = file
      this.clearFormAfterCropping = callback
      this.$scope.$digest()
    }
  }

  public onFocus = () => {
    this.isFocus = true
  }

  public onBlur = () => {
    this.isFocus = false
  }

  public removePhoto = (): void => {
    this.avatarToken = void 0
    this.avatarPreview = this.urlService.resolveFileUrl(this.avatarToken || '')
  }

  public saveCrop = (data: any): void => {
    const squareSideLength: number = data.points[2] - data.points[0] - 1
    const postProcessOptions: PostProcessOption = {
      croppingDetails: {
        x: Number(data.points[0]),
        y: Number(data.points[1]),
        width: squareSideLength,
        height: squareSideLength
      }
    }
    this.isLoading = true
    this.isUploadInProgress = true
    this.uploader.uploadFile(this.uploadedFile, postProcessOptions, this.onUploadProgess)
    .then(this.onFileUpload, this.onFileUploadError)

    this.isUserUploadImage = false
  }
  private onUploadProgess = (): void => {
    this.isLoading = true
  }

  private onFileUpload = (res: any): void => {
    this.isLoading = false
    this.avatarPreview = res.previews[0]
    this.avatarToken = res.token
    this.isUploadInProgress = false
    this.imageSource = ''
    this.clearFormAfterCropping()
    this.isFocus = true
    this.isFileUploadError = false
  }

  private onFileUploadError = (err: any): void => {
    this.isLoading = false
    this.isFileUploadError = true
    throw new Error('Can not upload file: ' + err)
  }

}
