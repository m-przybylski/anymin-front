import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { Config } from '../../../../../../config';
import { AddPaymentCardComponentService } from '@platform/shared/components/modals/payments/add-payment-card/add-payment-card.component.service';
import { switchMap, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { ThreeDSecureUrl, PostAddNewCard } from '@anymind-ng/api';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StepperComponent } from '@platform/shared/components/stepper/stepper.component';
import { AnymindWebsocketService } from '@platform/core/services/anymind-websocket/anymind-websocket.service';
import { Store } from '@ngrx/store';
import * as fromPayments from '../../../../../features/dashboard/views/user-dashboard/payments/reducers';
import {
  FetchInitDefaultPaymentMethodAction,
  FetchInitPaymentsMethodAction,
} from '@platform/features/dashboard/views/user-dashboard/payments/actions/payments-init.actions';
import { TooltipComponentDestinationEnum } from '@platform/shared/components/tooltip/tooltip.component';

export interface ICreditCardForm {
  codeCVControlName: string;
  cardNumberControlName: string;
  expireDateControlName: string;
  nameSurnameControl: string;
  emailControl: string;
  cvcCardType: PostAddNewCard.CardTypeEnum;
}
@Component({
  selector: 'plat-add-payment-card',
  templateUrl: './add-payment-card.component.html',
  styleUrls: ['./add-payment-card.component.sass'],
})
export class AddPaymentCard implements OnInit, AfterViewInit {
  public readonly expireDatePattern = Config.patterns.expireDate;
  public readonly codeCVControlName = 'codeCVControlName';
  public readonly cardNumberControlName = 'cardNumberControlName';
  public readonly expireDateControlName = 'expireDateControlName';
  public readonly nameSurnameControl = 'nameSurnameControl';
  public readonly emailControl = 'emailControl';
  public readonly cvcCardType = 'cvcCardType';
  public readonly tooltipType: TooltipComponentDestinationEnum = TooltipComponentDestinationEnum.COMPONENT;

  public modalHeaderTitle = 'DASHBOARD.PAYMENTS.PAYMENTS_METHOD.MODAL.TITLE';
  public addPaymentCardFormGroup: FormGroup;
  public modalWidth = ModalContainerTypeEnum.SMALL_WIDTH;
  public isPending = false;

  public urlRedirect: string;
  @ViewChild(StepperComponent)
  public stepper: StepperComponent;

  constructor(
    private modalAnimationComponentService: ModalAnimationComponentService,
    private activeModal: NgbActiveModal,
    private anymindWebSocket: AnymindWebsocketService,
    private addPaymentCardComponentService: AddPaymentCardComponentService,
    private store: Store<fromPayments.IState>,
  ) {}

  public ngOnInit(): void {
    const cardNumberControlName = new FormControl('', [
      Validators.required,
      Validators.minLength(Config.paymentCardDetails.minMaxCardNumberLength),
    ]);
    this.addPaymentCardFormGroup = new FormGroup({
      [this.cvcCardType]: new FormControl('', []),
      [this.codeCVControlName]: new FormControl('OTHER', [
        Validators.required,
        Validators.minLength(Config.paymentCardDetails.minMaxLengthCodeCVC),
        Validators.maxLength(Config.paymentCardDetails.minMaxLengthCodeCVC),
      ]),
      [this.cardNumberControlName]: cardNumberControlName,
    });
  }

  public ngAfterViewInit(): void {
    this.modalAnimationComponentService.stopLoadingAnimation();
  }

  public onSendClick(): void {
    this.isPending = true;

    this.addPaymentCardComponentService
      .sendPaymentCard(this.addPaymentCardFormGroup)
      .pipe(
        switchMap((threeDSecureUrl: ThreeDSecureUrl) => {
          if (typeof threeDSecureUrl.url !== 'undefined') {
            this.urlRedirect = threeDSecureUrl.url;
            this.stepper.next();
            this.modalHeaderTitle = 'DASHBOARD.PAYMENTS.PAYMENTS_METHOD.MODAL.CARD_AUTHORIZE.TITLE';

            return this.anymindWebSocket.creditCardAdded;
          }

          return of(threeDSecureUrl);
        }),
        finalize(() => {
          this.isPending = false;
        }),
      )
      .subscribe(() => {
        this.store.dispatch(new FetchInitPaymentsMethodAction());
        this.store.dispatch(new FetchInitDefaultPaymentMethodAction());
        this.activeModal.close();
      });
  }

  public onCreditCardTypeChange(type: string): void {
    this.addPaymentCardFormGroup.controls[this.cvcCardType].setValue(type);
  }

  public authorizeCard(): void {
    this.stepper.next();
    this.modalHeaderTitle = 'DASHBOARD.PAYMENTS.PAYMENTS_METHOD.MODAL.CARD_VERIFICATION.TITLE';
  }
}
