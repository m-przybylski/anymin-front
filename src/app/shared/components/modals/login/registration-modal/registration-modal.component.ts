import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { StepperComponent } from '@platform/shared/components/stepper/stepper.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { filter, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { RegistrationModalService } from '@platform/shared/components/modals/login/registration-modal/registration-modal.service';

@Component({
  selector: 'plat-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.sass'],
})
export class RegistrationModalComponent implements OnInit, AfterViewInit, OnDestroy {
  public modalHeaderTranslate = 'MODAL.REGISTRATION.TITLE';
  public modalContainerClass = ModalContainerTypeEnum.MEDIUM_WIDTH;
  @ViewChild(StepperComponent)
  public stepper: StepperComponent;

  public isPaymentCardStep = false;
  public isPromoCodeStep = false;

  private ngUnsubscribe$ = new EventEmitter<void>();

  constructor(
    private activeModal: NgbActiveModal,
    private store: Store<fromCore.IState>,
    private registrationModalService: RegistrationModalService,
    private modalAnimationComponentService: ModalAnimationComponentService,
  ) {}

  public ngOnInit(): void {
    this.store
      .pipe(
        select(fromCore.getRegisterByModal),
        filter(isRegisterByModal => isRegisterByModal !== undefined),
        take(1),
      )
      .subscribe(() => {
        this.goToAddPaymentCardStep();
      });

    this.store
      .pipe(
        select(fromCore.getLoginByModal),
        filter(isLoginByModal => isLoginByModal !== undefined),
        switchMap(() => this.registrationModalService.getCreditCardsList()),
        map(creditCardList => {
          if (creditCardList.length !== 0) {
            this.closeModal();
          } else {
            this.goToAddPaymentCardStep();
          }
        }),
        take(1),
      )
      .subscribe();

    this.registrationModalService.getCloseModalEvent$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
      this.closeModal();
    });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public ngAfterViewInit(): void {
    this.modalAnimationComponentService.stopLoadingAnimation();
  }

  public closeModal(): void {
    this.activeModal.close();
  }

  public onLoginClick(): void {
    this.modalHeaderTranslate = 'MODAL.LOGIN.TITLE';
    this.stepper.next();
  }

  public onRegistrationClick(): void {
    this.modalHeaderTranslate = 'MODAL.REGISTRATION.TITLE';
    this.stepper.previous();
  }

  public goToAddPaymentCardStep(): void {
    this.isPaymentCardStep = true;
    this.isPromoCodeStep = false;
    this.changeModalTitle('MODAL.ADD_PAYMENT_CARD.MODAL.TITLE');
    const addcreditCardFormStepperIndex = 2;
    this.stepper.selectedIndex = addcreditCardFormStepperIndex;
  }

  public goToPromoCodeStep(): void {
    this.isPaymentCardStep = false;
    this.isPromoCodeStep = true;
    this.changeModalTitle('MODAL.PROMO_CODE.MODAL.TITLE');
    const addcreditCardFormStepperIndex = 3;
    this.stepper.selectedIndex = addcreditCardFormStepperIndex;
  }

  public changeModalTitle(modalTitle: string): void {
    this.modalHeaderTranslate = modalTitle;
  }
}
