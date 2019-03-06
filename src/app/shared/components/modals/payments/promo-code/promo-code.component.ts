import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { FormGroup } from '@angular/forms';
import { StepperComponent } from '@platform/shared/components/stepper/stepper.component';
import { PromoCodeComponentService } from '@platform/shared/components/modals/payments/promo-code/promo-code.component.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Alerts, AlertService, FormUtilsService, InputSize, LoggerFactory } from '@anymind-ng/core';
import { Config } from '../../../../../../config';
import { Logger } from '@platform/core/logger';
import { EMPTY, Observable } from 'rxjs';
import { BackendError, isBackendError } from '@platform/shared/models/backend-error/backend-error';
import { GetPromoCode } from '@anymind-ng/api';
import { Store } from '@ngrx/store';
import * as fromPayments from '@platform/features/dashboard/views/user-dashboard/payments/reducers';
import {
  FetchInitDefaultPaymentMethodAction,
  FetchInitPromoCodesAction,
} from '@platform/features/dashboard/views/user-dashboard/payments/actions/payments-init.actions';

@Component({
  selector: 'plat-promo-code',
  templateUrl: './promo-code.component.html',
  styleUrls: ['./promo-code.component.sass'],
})
export class PromoCodeComponent extends Logger implements OnInit {
  public readonly inputSize = InputSize.BIG;
  public modalHeaderTitle = 'DASHBOARD.PAYMENTS.PROMO_CODE.TITLE';
  public modalWidth = ModalContainerTypeEnum.SMALL_WIDTH;
  public promoCodeFormGroup = new FormGroup({});
  public promoCodeFormControl = 'promoCodeFormControl';
  public isPending = false;
  public promoCodeTranslation = 'DASHBOARD.PAYMENTS.PROMO_CODE.SUMMARY.DESCRIPTION';
  public promoCodeAmount: string;
  public errorTranslation: string;

  @ViewChild(StepperComponent)
  public stepper: StepperComponent;

  constructor(
    private modalAnimationComponentService: ModalAnimationComponentService,
    private store: Store<fromPayments.IState>,
    private alertService: AlertService,
    private formUtils: FormUtilsService,
    private promoCodeService: PromoCodeComponentService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('PromoCodeComponent'));
  }

  public ngOnInit(): void {
    this.modalAnimationComponentService.stopLoadingAnimation();
  }

  public onSendClick(): void {
    this.isPending = true;

    this.promoCodeService
      .sendPromoCode(this.promoCodeFormGroup.value.promoCodeFormControl)
      .pipe(
        catchError(error => this.handlePostPromoCodeError(error)),
        map((promoCode: GetPromoCode) => {
          this.promoCodeAmount = `${promoCode.amount.value / Config.moneyDivider} ${promoCode.amount.currency}`;
          this.modalHeaderTitle = 'DASHBOARD.PAYMENTS.PROMO_CODE.SUMMARY.TITLE';
          this.stepper.next();
          this.isPending = false;
          this.store.dispatch(new FetchInitPromoCodesAction());
          this.store.dispatch(new FetchInitDefaultPaymentMethodAction());
          this.alertService.pushSuccessAlert('DASHBOARD.PAYMENTS.PROMO_CODE.SUMMARY.ALERT_SUCCESS');
        }),
      )
      .subscribe();
  }

  private handlePostPromoCodeError(err: HttpErrorResponse): Observable<void> {
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
  }
}
