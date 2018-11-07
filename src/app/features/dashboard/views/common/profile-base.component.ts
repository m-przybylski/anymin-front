import { Injector, OnDestroy, InjectionToken } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ProfileDocument } from '@anymind-ng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ICreateEditConsultationPayload } from '@platform/shared/components/modals/create-edit-consultation/create-edit-consultation.component';
import {
  IFilePreviewPayload,
  FilePreviewComponent,
} from '@platform/shared/components/modals/file-preview/file-preview.component';
import { FILE_PREVIEW_PAYLOAD } from '@platform/shared/components/modals/file-preview/file-preview';

export type DialogPayload = ICreateEditConsultationPayload | IFilePreviewPayload;
export class ProfileBaseComponent implements OnDestroy {
  protected readonly destroyed$ = new Subject<void>();
  protected route: ActivatedRoute = this.injector.get(ActivatedRoute);
  private modalService: NgbModal = this.injector.get(NgbModal);
  private router: Router = this.injector.get(Router);
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
   */
  protected openModalWithReload = <T>(component: T, options?: NgbModalOptions): void => {
    this.openModal(component, options)
      .result.then((changed: boolean) => {
        this.reloadIfNeeded(changed);
      })
      .catch(() => undefined);
  };

  /**
   * helper for opening modal.
   * @param component component to be opened
   * @param options data that is passed to the component
   * @returns modal handler used to pass parameters
   */
  protected openModal = <T>(component: T, options?: NgbModalOptions): NgbModalRef => {
    const modalRef = this.modalService.open(component, options);
    this.registerModalRef(modalRef);

    return modalRef;
  };

  /** helper for reloading page. Reload by navigating to the same route */
  protected reloadIfNeeded = (reload: boolean | undefined): void => {
    if (typeof reload !== 'undefined' && reload) {
      this.reload();
    }
  };

  /**
   * reloads the screen by navigating to the same url
   */
  protected reload = (): void => {
    void this.router.navigate(this.route.snapshot.url.map(url => url.toString()), {
      relativeTo: this.route.parent,
    });
  };

  /**
   * opens gallery modal
   */
  protected openGallery = (files: ReadonlyArray<ProfileDocument>): void => {
    const payload: IFilePreviewPayload = { files };
    const modalOptions: NgbModalOptions = {
      injector: this.setupInjector(FILE_PREVIEW_PAYLOAD, payload),
    };

    this.openModal(FilePreviewComponent, modalOptions);
  };

  protected setupInjector = (token: InjectionToken<DialogPayload>, payload: DialogPayload): Injector =>
    Injector.create({
      providers: [{ provide: token, useValue: payload }],
      parent: this.injector,
    });

  private registerModalRef(ngbModalRef: NgbModalRef): void {
    const unregisterModalRef = (): void => {
      this.modalRefs = this.modalRefs.filter(modal => modal !== ngbModalRef);
    };
    this.modalRefs = [...this.modalRefs, ngbModalRef];
    ngbModalRef.result.then(unregisterModalRef, unregisterModalRef);
  }
}
