import { Injector, OnDestroy, InjectionToken } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ProfileDocument } from '@anymind-ng/api';
import { Subject } from 'rxjs';
import { ICreateEditConsultationPayload } from '@platform/shared/components/modals/create-edit-consultation/create-edit-consultation.component';
import { FILE_PREVIEW_PAYLOAD } from '@platform/shared/components/modals/file-preview/file-preview';
import { IFilePreviewPayload } from '@platform/shared/components/modals/file-preview/file-preview.service';
import { FilePreviewComponent } from '@platform/shared/components/modals/file-preview/file-preview.component';
import { ActivatedRoute, Router } from '@angular/router';

export type DialogPayload = ICreateEditConsultationPayload | IFilePreviewPayload;

export class ProfileBaseComponent implements OnDestroy {
  protected readonly destroyed$ = new Subject<void>();
  protected router: Router = this.injector.get(Router);
  protected route: ActivatedRoute = this.injector.get(ActivatedRoute);
  protected modalService: NgbModal = this.injector.get(NgbModal);
  private modalRefs: ReadonlyArray<NgbModalRef> = [];

  constructor(protected injector: Injector) {}

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.modalRefs.forEach(modal => modal.dismiss());
    this.modalRefs = [];
  }

  /**
   * helper for opening modal.
   * @param component component to be opened
   * @param options data that is passed to the component
   * @returns modal handler used to pass parameters
   */
  protected openModal<T>(component: T, options?: NgbModalOptions): NgbModalRef {
    const modalRef = this.modalService.open(component, options);
    this.registerModalRef(modalRef);

    return modalRef;
  }

  /**
   * opens gallery modal
   */
  protected openGallery(files: ReadonlyArray<ProfileDocument>): void {
    const payload: IFilePreviewPayload = { files };
    const modalOptions: NgbModalOptions = {
      injector: this.setupInjector(FILE_PREVIEW_PAYLOAD, payload),
    };

    this.openModal(FilePreviewComponent, modalOptions);
  }

  protected setupInjector<T>(token: InjectionToken<T>, payload: T): Injector {
    return Injector.create({
      providers: [{ provide: token, useValue: payload }],
      parent: this.injector,
    });
  }

  /**
   * Keep track of opened modals so it can be closed when main component
   * is destroyed for example by navigating to different route.
   * @param ngbModalRef modal reference for future use
   */
  private registerModalRef(ngbModalRef: NgbModalRef): void {
    const unregisterModalRef = (): void => {
      this.modalRefs = this.modalRefs.filter(modal => modal !== ngbModalRef);
    };
    this.modalRefs = [...this.modalRefs, ngbModalRef];
    /**
     * hook to modal close to remove closed modal from the list
     */
    ngbModalRef.result.then(unregisterModalRef, unregisterModalRef);
  }
}
