import { Component, OnInit } from '@angular/core';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { InvoiceDetailsComponentService } from '@platform/features/dashboard/views/user-dashboard/payments/components/invoice-details/invoice-details.component.service';
import { catchError, finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { ICompanyInvoiceDetails } from '@platform/features/dashboard/views/user-dashboard/payments/components/invoice-details/components/company-invoice-details/company-invoice-details.component';
import { Logger } from '@platform/core/logger';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { httpCodes } from '@platform/shared/constants/httpCodes';

@Component({
  selector: 'plat-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.sass'],
  providers: [InvoiceDetailsComponentService],
})
export class InvoiceDetailsComponent extends Logger implements OnInit {
  public readonly modalClass: ModalContainerTypeEnum = ModalContainerTypeEnum.SMALL_WIDTH;
  public companyInvoiceDetails: ICompanyInvoiceDetails;

  constructor(
    private modalAnimationComponentService: ModalAnimationComponentService,
    private invoiceDetailsComponentService: InvoiceDetailsComponentService,
    private alertService: AlertService,
    private activeModal: NgbActiveModal,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('InvoiceDetailsComponent'));
  }

  public ngOnInit(): void {
    this.modalAnimationComponentService.startLoadingAnimation();
    this.invoiceDetailsComponentService
      .getInvoiceDetails()
      .pipe(
        catchError(this.handleGetInvoiceDetailsError),
        finalize(() => this.modalAnimationComponentService.stopLoadingAnimation()),
      )
      .subscribe(response => (this.companyInvoiceDetails = response));
  }

  private handleGetInvoiceDetailsError = (httpError: HttpErrorResponse): Observable<ICompanyInvoiceDetails> => {
    if (httpError.status === httpCodes.notFound) {
      this.loggerService.debug('There are no invoice details', httpError);

      return of();
    }
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.loggerService.warn('error when try to get invoice details', httpError);
    this.activeModal.close();

    return of();
  };
}
