import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PayoutMethodComponent } from '@platform/features/dashboard/views/user-dashboard/payments/components/payout-method/payout-method.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { AddPaymentCard } from '@platform/shared/components/modals/payments/add-payment-card/add-payment-card.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetCreditCard } from '@anymind-ng/api';
import { PaymentsViewComponentService } from '@platform/features/dashboard/views/user-dashboard/payments/payments.view.component.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { filter, map, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'plat-payments',
  templateUrl: './payments.view.component.html',
  styleUrls: ['./payments.view.component.sass'],
  providers: [PaymentsViewComponentService],
})
export class PaymentsViewComponent extends Logger implements OnInit {
  public paymentsCardFormGroup = new FormGroup({});
  public paymentsCardControlName = 'paymentsCardControlName';
  public currentCreditCardId = '';
  public paymentsCardList: ReadonlyArray<GetCreditCard> = [];

  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private ngbModalService: NgbModal,
    private fb: FormBuilder,
    private paymentsViewComponentService: PaymentsViewComponentService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('PaymentsViewComponent'));
  }

  public ngOnInit(): void {
    this.paymentsCardFormGroup = this.fb.group({
      paymentsCardControlName: '',
    });

    if (this.route.snapshot.data.getPayoutMethod[0].creditCardId) {
      this.currentCreditCardId = this.route.snapshot.data.getPayoutMethod[0].creditCardId;
    }

    this.paymentsCardList = this.route.snapshot.data.getPayoutMethod[1];
  }

  public openInvoiceModal = (): void => {
    this.ngbModalService.open(InvoiceDetailsComponent);
  };

  public openPayoutMethod = (): void => {
    this.ngbModalService.open(
      PayoutMethodComponent,
    ).componentInstance.getPayoutMethod = this.route.snapshot.data.getPayoutMethod;
  };

  public onAddPaymentCard = (): void => {
    const addPaymentCardModalRef = this.ngbModalService.open(AddPaymentCard);
    from(addPaymentCardModalRef.result)
      .pipe(
        filter(paymentCard => typeof paymentCard !== 'undefined'),
        switchMap(card =>
          this.paymentsViewComponentService.getPaymentCardList().pipe(
            map((paymentCards: ReadonlyArray<GetCreditCard>) => {
              this.paymentsCardList = paymentCards;
              this.currentCreditCardId = card.creditCardId;
            }),
          ),
        ),
      )
      .subscribe();
  };

  public onSelectCard = (id: string): void => {
    const _currentId = this.currentCreditCardId;

    this.paymentsViewComponentService
      .setDefaultPaymentMethod(id)
      .pipe(catchError(error => this.handleError(error, _currentId)))
      .subscribe(() => (this.currentCreditCardId = id));
  };

  public onDeleteCard = (id: string): void => {
    this.paymentsViewComponentService
      .deletePaymentCard(id)
      .pipe(
        catchError(error => {
          this.loggerService.warn('Can not delete credit payment card', error);
          this.alertService.pushDangerAlert('DASHBOARD.PAYMENTS.PAYMENTS_METHOD.CARD.DELETE.ALERT');

          return of();
        }),
      )
      .subscribe(() => {
        this.paymentsCardList = [...this.paymentsCardList.filter(item => item.id !== id)];
      });
  };

  private handleError = (error: HttpErrorResponse, currentId: string): Observable<void> => {
    this.currentCreditCardId = currentId;
    this.loggerService.warn('Can not set default payment card', error);
    this.alertService.pushDangerAlert('DASHBOARD.PAYMENTS.PAYMENTS_METHOD.CARD.SET_AS_DEFAULT.ALERT');

    return of();
  };
}
