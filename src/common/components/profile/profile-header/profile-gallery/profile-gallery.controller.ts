import {IProfileGalleryComponentBindings} from './profile-gallery'
import {ModalsService} from '../../../../services/modals/modals.service'
import {ProfileDocument} from 'profitelo-api-ng/model/models'
import {UrlService} from '../../../../services/url/url.service'

export class ProfileGalleryComponentController implements IProfileGalleryComponentBindings {

  documents: Array<ProfileDocument>
  idDocumentsContainerCollapsed: boolean
  documentsCollapsedLength: number
  lastDocument: ProfileDocument
  readonly documentsLimit: number = 5

  /* @ngInject */
  constructor(private modalsService: ModalsService, private urlService: UrlService) {
    this.idDocumentsContainerCollapsed = false
  }

  $onInit = () => {
    if (this.documents) {
      this.documentsCollapsedLength = this.documents.length - this.documentsLimit - 1

      if (this.documents.length > this.documentsLimit) {
        this.idDocumentsContainerCollapsed = true
        this.lastDocument = this.documents[this.documentsLimit]
      }
    }
  }

  public createUrl = (imageToken: string) => {
    if (imageToken) {
      return this.urlService.resolveFileUrl(imageToken)
    } else {
      return 'no-image'
    }
  }

  public createGalleryPreviewControllerModal = (token: string): void => {
    this.modalsService.createGalleryPreviewControllerModal(token)
  }
}
