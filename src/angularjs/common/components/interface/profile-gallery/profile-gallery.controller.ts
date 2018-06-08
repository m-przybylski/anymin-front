import { IProfileGalleryComponentBindings } from './profile-gallery';
import { GetFileInfo } from 'profitelo-api-ng/model/models';
import { FilesApi } from 'profitelo-api-ng/api/api';
import { ModalsService } from '../../../services/modals/modals.service';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';

export interface IProfileGalleryComponentScope extends ng.IScope {
  documents: string[];
}

// tslint:disable:member-ordering
export class ProfileGalleryComponentController implements IProfileGalleryComponentBindings {
  public documents: string[] = [];
  public uploadedFiles: GetFileInfo[] = [];
  public idDocumentsContainerCollapsed: boolean;
  public documentsCollapsedLength: number;
  public lastDocument: string;
  public readonly documentsLimit = 5;

  public static $inject = ['modalsService', 'FilesApi', 'errorHandler'];

  constructor(private modalsService: ModalsService,
              private FilesApi: FilesApi,
              private errorHandler: ErrorHandlerService) {
    this.idDocumentsContainerCollapsed = false;
  }

  public $onInit = (): void => {

    if (this.documents) {
      this.documents.map((token) => {
        this.FilesApi.fileInfoRoute(token).then((response) => {
          this.uploadedFiles.push(response);
        }, (error: any) => this.errorHandler.handleServerError(error));
      });

      this.documentsCollapsedLength = this.documents.length - this.documentsLimit;

      if (this.documents.length > this.documentsLimit) {
        this.idDocumentsContainerCollapsed = true;
        this.lastDocument = this.documents[this.documentsLimit];
      }
    }
  }

  public createGalleryPreviewControllerModal = (preview: string): void => {
    this.modalsService.createGalleryPreviewControllerModal(preview);
  }
}
