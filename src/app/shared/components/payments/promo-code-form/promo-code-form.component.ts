import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Alerts, AlertService, FormUtilsService, InputSize, LoggerFactory } from '@anymind-ng/core';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { Store } from '@ngrx/store';
import * as fromPayments from '@platform/features/dashboard/views/user-dashboard/payments/reducers';
import { catchError, map } from 'rxjs/operators';
import { GetPromoCode } from '@anymind-ng/api';
import { Config } from 'config';
import {
  FetchInitDefaultPaymentMethodAction,
  FetchInitPromoCodesAction,
} from '@platform/features/dashboard/views/user-dashboard/payments/actions/payments-init.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { BackendError, isBackendError } from '@platform/shared/models/backend-error/backend-error';
import { Logger } from '@platform/core/logger';
import { PromoCodeFormComponentService } from '@platform/shared/components/payments/promo-code-form/promo-code-form.component.service';
import { StepperComponent } from '@platform/shared/components/stepper/stepper.component';

@Component({
  selector: 'plat-promo-code-form',
  templateUrl: './promo-code-form.component.html',
  styleUrls: ['./promo-code-form.component.sass'],
})
export class PromoCodeFormComponent extends Logger {
  @Output()
  public paymentCardLinkClick = new EventEmitter<void>();

  @Input()
  public isOpenInModal = false;

  public promoCodeTranslation = 'DASHBOARD.PAYMENTS.PROMO_CODE.SUMMARY.DESCRIPTION';
  public readonly inputSize = InputSize.BIG;
  public modalHeaderTitle = 'DASHBOARD.PAYMENTS.PROMO_CODE.TITLE';
  public modalWidth = ModalContainerTypeEnum.SMALL_NO_PADDING;
  public promoCodeFormGroup = new FormGroup({});
  public promoCodeFormControl = 'promoCodeFormControl';
  public isPending = false;
  public promoCodeAmount: string;
  public errorTranslation: string;

  @ViewChild(StepperComponent)
  public stepper: StepperComponent;

  constructor(
    private store: Store<fromPayments.IState>,
    private alertService: AlertService,
    private formUtils: FormUtilsService,
    private promoCodeService: PromoCodeFormComponentService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('PromoCodeComponent'));
  }

  public onBackToPaymentCardClick(): void {
    this.paymentCardLinkClick.emit();
  }

  public onSendClick = (): void => {
    this.isPending = true;

    this.promoCodeService
      .sendPromoCode(this.promoCodeFormGroup.value.promoCodeFormControl)
      .pipe(
        catchError(error => this.handlePostPromoCodeError(error)),
        map((promoCode: GetPromoCode) => {
          this.promoCodeAmount = `${promoCode.amount.value / Config.moneyDivider} ${promoCode.amount.currency}`;
          this.modalHeaderTitle = 'DASHBOARD.PAYMENTS.PROMO_CODE.SUMMARY.TITLE';
          this.isPending = false;
          this.onStepChange();
          this.store.dispatch(new FetchInitPromoCodesAction());
          this.store.dispatch(new FetchInitDefaultPaymentMethodAction());
          this.alertService.pushSuccessAlert('DASHBOARD.PAYMENTS.PROMO_CODE.SUMMARY.ALERT_SUCCESS');
        }),
      )
      .subscribe();
  };

  private onStepChange(): void {
    this.stepper.next();
  }

  private handlePostPromoCodeError = (err: HttpErrorResponse): Observable<void> => {
    this.isPending = false;

    const error: BackendError = err.error;
    if (isBackendError(error)) {
      switch (error.code) {
        case Config.errorCodes.noSuchPromoCode:
          this.errorTranslation = 'DASHBOARD.PAYMENTS.PROMO_CODE.SUMMARY.ALERT_ERROR.INCORRECT';
          break;

        case Config.errorCodes.promoCodeExpired:
          this.errorTranslation = 'DASHBOARD.PAYMENTS.PROMO_CODE.SUMMARY.ALERT_ERROR.EXPIRED';
          break;

        case Config.errorCodes.promoCodeRedeemed:
          this.errorTranslation = 'DASHBOARD.PAYMENTS.PROMO_CODE.SUMMARY.ALERT_ERROR.REDEEMED';
          break;

        default:
          this.loggerService.error('Unhandled promo code error: ', error);
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      }
      this.promoCodeFormGroup.controls[this.promoCodeFormControl].setErrors({ invalid: true });
      this.formUtils.validateAllFormFields(this.promoCodeFormGroup);
    }

    return EMPTY;
  };
}
