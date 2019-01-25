import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { Config } from '../../../../../../config';
import { AddPaymentCardComponentService } from '@platform/shared/components/modals/payments/add-payment-card/add-payment-card.component.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { BackendError, isBackendError } from '@platform/shared/models/backend-error/backend-error';
import { Alerts, AlertService } from '@anymind-ng/core';
import { ThreeDSecureUrl } from '@anymind-ng/api';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StepperComponent } from '@platform/shared/components/stepper/stepper.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AnymindWebsocketService } from '@platform/core/services/anymind-websocket/anymind-websocket.service';

@Component({
  selector: 'plat-add-payment-card',
  templateUrl: './add-payment-card.component.html',
  styleUrls: ['./add-payment-card.component.sass'],
})
export class AddPaymentCard implements OnInit {
  public readonly expireDatePattern = Config.patterns.expireDate;
  public readonly codeCVControlName = 'codeCVControlName';
  public readonly cardNumberControlName = 'cardNumberControlName';
  public readonly expireDateControlName = 'expireDateControlName';
  public readonly nameSurnameControl = 'nameSurnameControl';
  public readonly emailControl = 'emailControl';
  public readonly cvcCardType = 'cvcCardType';

  public modalHeaderTitle = 'DASHBOARD.PAYMENTS.PAYMENTS_METHOD.MODAL.TITLE';
  public addPaymentCardFormGroup = new FormGroup({});
  public modalWidth = ModalContainerTypeEnum.SMALL_WIDTH;
  public isPending = false;

  public urlRedirect: string;
  @ViewChild(StepperComponent)
  public stepper: StepperComponent;

  constructor(
    private modalAnimationComponentService: ModalAnimationComponentService,
    private activeModal: NgbActiveModal,
    private alertService: AlertService,
    private anymindWebSocket: AnymindWebsocketService,
    private addPaymentCardComponentService: AddPaymentCardComponentService,
  ) {}

  public ngOnInit(): void {
    this.modalAnimationComponentService.stopLoadingAnimation();

    this.addPaymentCardFormGroup.setControl(this.cvcCardType, new FormControl('', []));

    this.addPaymentCardFormGroup.setControl(
      this.codeCVControlName,
      new FormControl('OTHER', [
        Validators.required,
        Validators.minLength(Config.paymentCardDetails.minMaxLengthCodeCVC),
        Validators.maxLength(Config.paymentCardDetails.minMaxLengthCodeCVC),
      ]),
    );

    this.addPaymentCardFormGroup.setControl(
      this.cardNumberControlName,
      new FormControl('', [
        Validators.required,
        Validators.minLength(Config.paymentCardDetails.minMaxCardNumberLength),
      ]),
    );
  }

  public onSendClick = (): void => {
    this.isPending = true;

    this.addPaymentCardComponentService
      .sendPaymentCard(this.addPaymentCardFormGroup)
      .pipe(
        catchError(er => this.handlePostCreditCardError(er)),
        map((threeDSecureUrl: ThreeDSecureUrl) => {
          if (typeof threeDSecureUrl.url !== 'undefined') {
            this.urlRedirect = threeDSecureUrl.url;
            this.stepper.next();
            this.modalHeaderTitle = 'DASHBOARD.PAYMENTS.PAYMENTS_METHOD.MODAL.CARD_AUTHORIZE.TITLE';
          } else {
            this.alertService.pushSuccessAlert('DASHBOARD.PAYMENTS.PAYMENTS_METHOD.CARD.ADDED');
          }
        }),
        switchMap(() => this.anymindWebSocket.creditCardAdded.pipe(map(response => this.activeModal.close(response)))),
      )
      .subscribe(() => {
        this.isPending = false;
      });
  };

  public onCreditCardTypeChange = (type: string): void =>
    this.addPaymentCardFormGroup.controls[this.cvcCardType].setValue(type);

  public authorizeCard = (): void => {
    this.stepper.next();
    this.modalHeaderTitle = 'DASHBOARD.PAYMENTS.PAYMENTS_METHOD.MODAL.CARD_VERIFICATION.TITLE';
  };

  private handlePostCreditCardError = (err: HttpErrorResponse): Observable<void> => {
    this.isPending = false;

    const error: BackendError = err.error;
    if (isBackendError(error)) {
      switch (error.code) {
        case Config.errorCodes.creditCardWrongDate:
          this.addPaymentCardFormGroup.controls[this.expireDateControlName].setErrors({});
          break;
        case Config.errorCodes.creditCardExpired:
          this.addPaymentCardFormGroup.controls[this.expireDateControlName].setErrors({});
          break;
        case Config.errorCodes.creditCardCVV:
          this.addPaymentCardFormGroup.controls[this.cvcCardType].setErrors({});
          break;
        case Config.errorCodes.creditCardUnknown:
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          break;
        default:
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      }
    }

    return EMPTY;
  };
}
