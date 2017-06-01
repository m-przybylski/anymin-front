import {IWizardAvatarComponentBindings} from './wizard-avatar'
import {UploaderFactory} from '../../../services/uploader/uploader.factory'
import {UploaderService} from '../../../services/uploader/uploader.service'
import {PostProcessOption} from 'profitelo-api-ng/model/models'
import {UrlService} from '../../../services/url/url.service'
export class WizardAvatarComponentController implements IWizardAvatarComponentBindings, ng.IController {

  private isUploadInProgress: boolean = false
  private uploadedFile: File
  private uploader: UploaderService
  private isUserUploadImage: boolean
  public avatarPreview: string
  private clearFormAfterCropping: () => void
  private imageSource: string

  public avatarToken?: string

  /* @ngInject */
  constructor( uploaderFactory: UploaderFactory, private urlService: UrlService, private $scope: ng.IScope) {
    this.uploader = uploaderFactory.getInstance(1, uploaderFactory.collectionTypes.avatar)
  }

  $onInit() {
    this.avatarPreview = this.urlService.resolveFileUrl(this.avatarToken || '')
  }

  public addPhoto = (imagePath: string, file: File, callback: () => void) => {
    if (imagePath.length > 0) {
      this.imageSource = imagePath
      this.isUserUploadImage = true
      this.uploadedFile = file
      this.clearFormAfterCropping = callback
      this.$scope.$digest()
    }
  }

  public removePhoto = () => {
    this.avatarToken = void 0
    this.avatarPreview = this.urlService.resolveFileUrl(this.avatarToken || '')
  }

  public saveCrop = (data: any) => {
    const squareSideLength: number = data.points[2] - data.points[0] - 1
    const postProcessOptions: PostProcessOption = {
      croppingDetails: {
        x: Number(data.points[0]),
        y: Number(data.points[1]),
        width: squareSideLength,
        height: squareSideLength
      }
    }
    this.isUploadInProgress = true
    this.uploader.uploadFile(this.uploadedFile, postProcessOptions, this.onUploadProgess)
    .then(this.onFileUpload, this.onFileUploadError)

    this.isUserUploadImage = false
  }
  private onUploadProgess = () => {
  }

  private onFileUpload = (res: any) => {
    this.avatarPreview = res.previews[0]
    this.avatarToken = res.token
    this.isUploadInProgress = false
    this.imageSource = ''
    this.clearFormAfterCropping()
  }

  private onFileUploadError = (err: any) => {
    this.isUploadInProgress = false
    throw new Error('Can not upload file: ' + err)
  }

}
