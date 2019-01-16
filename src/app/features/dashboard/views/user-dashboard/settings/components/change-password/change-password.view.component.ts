import { AfterViewInit, Component } from '@angular/core';
import { ModalContainerTypeEnum } from '@platform//shared/components/modals/modal/modal.component';
import { Alerts, AlertService, FormUtilsService, InputPasswordErrorsEnum, LoggerFactory } from '@anymind-ng/core';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { Store } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import { finalize, take } from 'rxjs/operators';
import { Logger } from '@platform/core/logger';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { InputSetPasswordErrors } from '@platform/shared/components/inputs/input-set-password/input-set-password.component';
import { ChangePasswordComponentService, ChangePasswordStatusEnum } from './change-password.component.service';

@Component({
  selector: 'plat-password-settings',
  templateUrl: './change-password.view.component.html',
  styleUrls: ['./change-password.view.component.sass'],
  providers: [ChangePasswordComponentService],
})
export class ChangePasswordViewComponent extends Logger implements AfterViewInit {
  public readonly modalWidth = ModalContainerTypeEnum.SMALL_WIDTH;
  public readonly passwordFormId = 'passwordForm';
  public readonly currentPasswordControlName = 'currentPassword';
  public readonly newPasswordControlName = 'newPassword';

  public modalHeaderTrKey: string;
  public login?: string;
  public passwordForm: FormGroup = new FormGroup({});
  public isRequestPending = false;

  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<fromRoot.IState>,
    private modalAnimationComponentService: ModalAnimationComponentService,
    private passwordService: ChangePasswordComponentService,
    private formUtils: FormUtilsService,
    private alertService: AlertService,
    private activeModal: NgbActiveModal,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('PasswordSettingsViewComponent'));
    this.getUserLogin();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public ngAfterViewInit(): void {
    this.modalAnimationComponentService.onModalContentChange().next(false);
  }

  public onFormSubmit(passwordForm: FormGroup): void {
    this.updateValidationNewPasswordInput();
    if (passwordForm.valid) {
      this.isRequestPending = true;
      const currentPassword = passwordForm.value[this.currentPasswordControlName];
      const newPassword = passwordForm.value[this.newPasswordControlName];

      this.passwordService
        .changePassword(currentPassword, newPassword)
        .pipe(
          finalize(() => {
            this.isRequestPending = false;
          }),
        )
        .subscribe(status => {
          this.handleChangePasswordStatus(status);
        });
    } else {
      this.formUtils.validateAllFormFields(passwordForm);
    }
  }

  private arePasswordsTheSame(): boolean {
    return (
      this.passwordForm.controls[this.currentPasswordControlName].value ===
      this.passwordForm.controls[this.newPasswordControlName].value
    );
  }

  private updateValidationNewPasswordInput(): void {
    if (this.arePasswordsTheSame()) {
      this.passwordForm.controls[this.newPasswordControlName].setErrors({
        [InputSetPasswordErrors.DuplicatedPassword]: true,
      });
    } else {
      this.passwordForm.controls[this.newPasswordControlName].updateValueAndValidity();
    }
  }

  private displayTooManyUnsuccessfulAttemptsError(): void {
    this.passwordForm.controls[this.currentPasswordControlName].setErrors({
      [InputPasswordErrorsEnum.ToManyUnsuccessfulAttempts]: true,
    });
    this.formUtils.validateAllFormFields(this.passwordForm);
  }

  private handleChangePasswordStatus(status: ChangePasswordStatusEnum): void {
    switch (status) {
      case ChangePasswordStatusEnum.SUCCESS:
        this.activeModal.close();
        break;

      case ChangePasswordStatusEnum.WRONG_PASSWORD:
        this.displayIncorrectPasswordError();
        break;

      case ChangePasswordStatusEnum.TOO_MANY_ATTEMPTS:
        this.displayTooManyUnsuccessfulAttemptsError();
        break;

      case ChangePasswordStatusEnum.ERROR:
        this.loggerService.info('handle change password ERROR status');
        break;

      default:
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
        this.loggerService.error('unhandled change password status', status);
    }
  }

  private displayIncorrectPasswordError(): void {
    this.passwordForm.controls[this.currentPasswordControlName].setErrors({
      [InputPasswordErrorsEnum.IncorrectPassword]: true,
    });
    this.formUtils.validateAllFormFields(this.passwordForm);
  }

  private getUserLogin(): void {
    getNotUndefinedSession(this.store)
      .pipe(take(1))
      .subscribe(getSessionWithAccount => {
        this.login =
          getSessionWithAccount.account.email ||
          getSessionWithAccount.account.unverifiedEmail ||
          getSessionWithAccount.account.msisdn;
      });
  }
}
