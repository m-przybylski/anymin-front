import {IProfileGalleryComponentBindings} from './profile-gallery'
import {FileInfo} from 'profitelo-api-ng/model/models'
import {FilesApi} from 'profitelo-api-ng/api/api'
import {ModalsService} from '../../../services/modals/modals.service'

export class ProfileGalleryComponentController implements IProfileGalleryComponentBindings {
  documents: string[]
  uploadedFiles: FileInfo[] = []
  idDocumentsContainerCollapsed: boolean
  documentsCollapsedLength: number
  lastDocument: string
  readonly documentsLimit: number = 5

  /* @ngInject */
  constructor(private modalsService: ModalsService, private FilesApi: FilesApi) {
    this.idDocumentsContainerCollapsed = false
  }

  $onInit = (): void => {
    this.documents.forEach((token) => {
      this.FilesApi.fileInfoPath(token).then((response) => {
        this.uploadedFiles.push(response)
      }, (error: any) => {
        throw new Error('Can not get File Info: ' + error)
      })
    })

    if (this.documents) {
      this.documentsCollapsedLength = this.documents.length - this.documentsLimit

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
