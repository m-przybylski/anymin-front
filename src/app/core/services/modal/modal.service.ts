import { Injectable, ComponentFactoryResolver, Injector } from '@angular/core';
import { NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';

@Injectable()
export class ModalStack extends NgbModalStack {
  private modalRefs: ReadonlyArray<NgbModalRef> = [];
  public open(
    moduleCFR: ComponentFactoryResolver,
    contentInjector: Injector,
    // tslint:disable-next-line:no-any
    content: any,
    options: NgbModalOptions,
  ): NgbModalRef {
    const modalRef = super.open(moduleCFR, contentInjector, content, options);
    this.registerModalRef(modalRef);

    return modalRef;
  }

  public dismissAll(): void {
    this.modalRefs.forEach(modal => modal.dismiss());
    this.modalRefs = [];
  }

  private registerModalRef(ngbModalRef: NgbModalRef): void {
    const unregisterModalRef = (): void => {
      this.modalRefs = this.modalRefs.filter(modal => modal !== ngbModalRef);
    };
    this.modalRefs = [...this.modalRefs, ngbModalRef];
    ngbModalRef.result.then(unregisterModalRef, unregisterModalRef);
  }
}
