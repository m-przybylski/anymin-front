import { Injectable, Injector } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from './modal/confirmation-modal.component';
import { Observable, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IConfirmationConfig, CONFIRMATION_DATA } from './confirmations.helpers';

@Injectable()
export class ConfirmationService {
  constructor(private modalService: NgbModal, private injector: Injector) {}

  public confirm(modalHeader: string, header: string): Observable<boolean> {
    const confirmationConfig: IConfirmationConfig = {
      header,
      modalHeader,
    };
    const options: NgbModalOptions = {
      injector: Injector.create({
        providers: [{ provide: CONFIRMATION_DATA, useValue: confirmationConfig }],
        parent: this.injector,
      }),
    };

    const modal = this.modalService.open(ConfirmationModalComponent, options);

    return from(modal.result).pipe(catchError(() => of(false)));
  }
}
