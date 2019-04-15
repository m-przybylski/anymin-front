import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { ThreeDSecureUrl, PostAddNewCard } from '@anymind-ng/api';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StepperComponent } from '@platform/shared/components/stepper/stepper.component';
import { AnymindWebsocketService } from '@platform/core/services/anymind-websocket/anymind-websocket.service';
import { Store } from '@ngrx/store';
import * as fromPayments from '../../../../features/dashboard/views/user-dashboard/payments/reducers/payments.reducer';
import {
  FetchInitDefaultPaymentMethodAction,
  FetchInitPaymentsMethodAction,
} from '@platform/features/dashboard/views/user-dashboard/payments/actions/payments-init.actions';
import { TooltipComponentDestinationEnum } from '@platform/shared/components/tooltip/tooltip-injector.service';
import { Config } from 'config';
import { AddPaymentCardFormComponentService } from '@platform/shared/components/payments/add-payment-card-form/add-payment-card-form.component.service';
import { RegistrationModalService } from '@platform/shared/components/modals/login/registration-modal/registration-modal.service';
import { FormUtilsService } from '@anymind-ng/core';

export interface ICreditCardForm {
  codeCVControlName: string;
  cardNumberControlName: string;
  expireDateControlName: string;
  nameSurnameControl: string;
  emailControl: string;
  cvcCardType: PostAddNewCard.CardTypeEnum;
}

@Component({
  selector: 'plat-add-payment-card-form',
  templateUrl: './add-payment-card-form.component.html',
  styleUrls: ['./add-payment-card-form.component.sass'],
})
export class AddPaymentCardFormComponent implements OnInit, AfterViewInit {
  @Output()
  public promoCodeLinkClick = new EventEmitter<void>();

  @Output()
  public headerTitle = new EventEmitter<string>();

  @Input()
  public isOpenInModal = false;

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
  public isPending = false;

  public urlRedirect: string;
  @ViewChild(StepperComponent)
  public stepper: StepperComponent;

  constructor(
    private modalAnimationComponentService: ModalAnimationComponentService,
    private activeModal: NgbActiveModal,
    private anymindWebSocket: AnymindWebsocketService,
    private addPaymentCardComponentService: AddPaymentCardFormComponentService,
    private store: Store<fromPayments.IState>,
    private registrationModalService: RegistrationModalService,
    private formUtils: FormUtilsService,
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
    if (this.addPaymentCardFormGroup.valid) {
      this.isPending = true;
      this.addPaymentCardComponentService
        .sendPaymentCard(this.addPaymentCardFormGroup)
        .pipe(
          switchMap((threeDSecureUrl: ThreeDSecureUrl) => {
            if (typeof threeDSecureUrl.url !== 'undefined') {
              this.urlRedirect = threeDSecureUrl.url;
              this.stepper.next();
              this.headerTitle.emit('DASHBOARD.PAYMENTS.PAYMENTS_METHOD.MODAL.CARD_AUTHORIZE.TITLE');

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

          if (this.isOpenInModal) {
            this.registrationModalService.pushCloseModalEvent$();
          }
        });
    } else {
      this.formUtils.validateAllFormFields(this.addPaymentCardFormGroup);
    }
  }

  public onGoToPromoCodeLinkClick(): void {
    this.promoCodeLinkClick.emit();
  }

  public onCreditCardTypeChange(type: string): void {
    this.addPaymentCardFormGroup.controls[this.cvcCardType].setValue(type);
  }

  public authorizeCard(): void {
    this.stepper.next();
    this.headerTitle.emit('DASHBOARD.PAYMENTS.PAYMENTS_METHOD.MODAL.CARD_VERIFICATION.TITLE');
  }
}
