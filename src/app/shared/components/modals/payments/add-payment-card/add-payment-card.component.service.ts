import { Injectable } from '@angular/core';
import { PaymentsService, PostAddNewCard, ThreeDSecureUrl } from '@anymind-ng/api';
import { Observable, throwError, EMPTY } from 'rxjs';
import { Config } from '../../../../../../config';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { BackendError, isBackendError } from '@platform/shared/models/backend-error/backend-error';
import { ICreditCardForm } from './add-payment-card.component';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService, Alerts } from '@anymind-ng/core';
import { TPayService } from '@platform/shared/services/tpay/tpay.service';

@Injectable()
export class AddPaymentCardComponentService {
  private readonly monthSignsLength = 2;

  constructor(
    private paymentsService: PaymentsService,
    private alertService: AlertService,
    private tpayService: TPayService,
  ) {}

  public sendPaymentCard(form: FormGroup): Observable<ThreeDSecureUrl> {
    const creditCardForm = form.value;

    return this.encryptCardData(creditCardForm).pipe(
      map(encryptedCard => this.mapFormValues(creditCardForm, encryptedCard)),
      switchMap(postAddNewCard => this.paymentsService.postCreditCardRoute(postAddNewCard)),
      tap(() => {
        this.alertService.pushSuccessAlert('DASHBOARD.PAYMENTS.PAYMENTS_METHOD.CARD.ADDED');
      }),
      catchError(err => this.handlePostCreditCardError(err, form)),
    );
  }

  private handlePostCreditCardError(err: HttpErrorResponse, form: FormGroup): Observable<never> {
    const error: BackendError = err.error;
    let formKey: keyof (ICreditCardForm) | undefined;
    if (isBackendError(error)) {
      switch (error.code) {
        case Config.errorCodes.creditCardUnknown:
          formKey = 'cardNumberControlName';
          break;
        case Config.errorCodes.creditCardExpired:
        case Config.errorCodes.creditCardWrongDate:
          formKey = 'expireDateControlName';
          break;
        case Config.errorCodes.creditCardCVV:
          formKey = 'codeCVControlName';
          break;
        default:
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      }
      if (formKey !== undefined) {
        form.controls[formKey].setErrors({});
      }

      return EMPTY;
    }

    return throwError(err);
  }

  private mapFormValues(creditCardForm: ICreditCardForm, encryptedCard: string): PostAddNewCard {
    this.validateCardType(creditCardForm);
    const { nameSurnameControl, emailControl, expireDateControlName, cvcCardType } = creditCardForm;

    return {
      name: nameSurnameControl,
      email: emailControl,
      encryptedCard,
      expiryDate: this.adjustFormatExpireDate(expireDateControlName),
      cardType: cvcCardType,
      language: 'pl',
      redirectUrlOnSuccess: `${window.location.origin}/assets/html/self_close/self_close.html`,
      redirectUrlOnFailure: `${window.location.origin}/assets/html/self_close/self_close.html`,
    };
  }

  private validateCardType(creditCardForm: ICreditCardForm): ICreditCardForm {
    if (!creditCardForm.cvcCardType) {
      const error = new BackendError(Config.errorCodes.creditCardUnknown, '', []);
      throw { error };
    }

    return creditCardForm;
  }

  private encryptCardData(creditCardForm: ICreditCardForm): Observable<string> {
    return this.tpayService.encryptCardData(
      creditCardForm.cardNumberControlName,
      this.adjustFormatExpireDate(creditCardForm.expireDateControlName),
      creditCardForm.codeCVControlName,
    );
  }

  private adjustFormatExpireDate(expireDate: string): string {
    return `${expireDate.slice(0, this.monthSignsLength)}/${expireDate.slice(this.monthSignsLength)}`;
  }
}
