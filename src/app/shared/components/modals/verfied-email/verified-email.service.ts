import { Injectable, Injector } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, from, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import {
  IVerifiedEmailModalConfig,
  VERIFIED_EMAIL_MODAL_DATA,
} from '@platform/shared/components/modals/verfied-email/verified-email.helper';
import { VerifiedEmailComponent } from '@platform/shared/components/modals/verfied-email/verified-email.component';
import { AccountService } from '@anymind-ng/api';

@Injectable()
export class VerifiedEmailService {
  constructor(private modalService: NgbModal, private accountService: AccountService, private injector: Injector) {}

  public openVerifiedEmailDialog = (modalHeaderTr: string, modalContentTr: string): Observable<boolean> => {
    const verifiedEmailModalConfig: IVerifiedEmailModalConfig = {
      modalHeaderTr,
      modalContentTr,
    };
    const options: NgbModalOptions = {
      injector: Injector.create({
        providers: [{ provide: VERIFIED_EMAIL_MODAL_DATA, useValue: verifiedEmailModalConfig }],
        parent: this.injector,
      }),
    };

    const modal = this.modalService.open(VerifiedEmailComponent, options);

    return this.accountService
      .postEmailResendRoute()
      .pipe(switchMap(() => from(modal.result).pipe(catchError(() => of(false)))));
  };
}
