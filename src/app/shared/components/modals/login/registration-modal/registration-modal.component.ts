import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { StepperComponent } from '@platform/shared/components/stepper/stepper.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'plat-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.sass'],
})
export class RegistrationModalComponent implements AfterViewInit {
  public modalHeaderTranslate = 'MODAL.REGISTRATION.TITLE';
  public modalContainerClass = ModalContainerTypeEnum.MEDIUM_WIDTH;

  @ViewChild(StepperComponent)
  public stepper: StepperComponent;

  constructor(
    private activeModal: NgbActiveModal,
    private store: Store<fromCore.IState>,
    private modalAnimationComponentService: ModalAnimationComponentService,
  ) {
    this.store
      .pipe(
        select(fromCore.getLoginByModal),
        filter(isLoginByModal => isLoginByModal !== undefined),
        take(1),
      )
      .subscribe(() => {
        this.closeModal();
      });

    this.store
      .pipe(
        select(fromCore.getRegisterByModal),
        filter(isRegisterByModal => isRegisterByModal !== undefined),
        take(1),
      )
      .subscribe(() => {
        this.goToAddPaymentCardStep();
      });
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

  private goToAddPaymentCardStep(): void {
    const addcreditCardFormStepperIndex = 2;
    this.stepper.selectedIndex = addcreditCardFormStepperIndex;
  }
}
