import {IProfileGalleryComponentBindings} from './profile-gallery'
import {ModalsService} from '../../../../services/modals/modals.service'
import {ProfileDocument} from 'profitelo-api-ng/model/models'

export class ProfileGalleryComponentController implements IProfileGalleryComponentBindings {

  documents: Array<ProfileDocument>
  idDocumentsContainerCollapsed: boolean
  documentsCollapsedLength: number
  lastDocument: ProfileDocument
  readonly documentsLimit: number = 5

  /* @ngInject */
  constructor(private modalsService: ModalsService) {
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

  public createGalleryPreviewControllerModal = (preview: string): void => {
    this.modalsService.createGalleryPreviewControllerModal(preview)
  }
}
