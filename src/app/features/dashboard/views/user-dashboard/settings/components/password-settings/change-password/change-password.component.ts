import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  ChangePasswordStatusEnum,
  ChangePasswordComponentService,
  ResetPasswordStatusEnum,
} from './change-password.component.service';
import {
  Alerts,
  AlertService,
  FormUtilsService,
  LoggerService,
  LoggerFactory,
  InputPasswordErrorsEnum,
} from '@anymind-ng/core';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InputSetPasswordErrors } from '../../../../../../../../shared/components/inputs/input-set-password/input-set-password.component';
import { ModalAnimationComponentService } from '../../../../../../../../shared/components/modals/modal/animation/modal-animation.animation.service';
import { PostRecoverPassword } from '@anymind-ng/api';

@Component({
  selector: 'plat-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass'],
  providers: [ChangePasswordComponentService],
})
export class ChangePasswordComponent implements OnDestroy {
  @Input() public msisdn: string;

  @Output()
  public resetPasswordMethodEmitter$: EventEmitter<PostRecoverPassword.MethodEnum> = new EventEmitter<
    PostRecoverPassword.MethodEnum
  >();

  public readonly passwordFormId = 'passwordForm';
  public readonly currentPasswordControlName = 'currentPassword';
  public readonly newPasswordControlName = 'newPassword';

  public passwordForm: FormGroup = new FormGroup({});
  public isRequestPending = false;

  private logger: LoggerService;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private passwordService: ChangePasswordComponentService,
    private formUtils: FormUtilsService,
    private alertService: AlertService,
    private activeModal: NgbActiveModal,
    private modalAnimationComponentService: ModalAnimationComponentService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('ChangePasswordComponent');
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public onFormSubmit = (passwordForm: FormGroup): void => {
    this.updateValidationNewPasswordInput();
    if (passwordForm.valid) {
      this.isRequestPending = true;
      const currentPassword = passwordForm.value[this.currentPasswordControlName];
      const newPassword = passwordForm.value[this.newPasswordControlName];

      this.passwordService
        .changePassword(currentPassword, newPassword)
        .pipe(finalize(() => (this.isRequestPending = false)))
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(this.handleChangePasswordStatus);
    } else {
      this.formUtils.validateAllFormFields(passwordForm);
    }
  };

  public onResetPassword = (): void => {
    this.modalAnimationComponentService.isPendingRequest().next(true);
    this.passwordService
      .resetPassword(this.msisdn)
      .pipe(finalize(() => this.modalAnimationComponentService.isPendingRequest().next(false)))
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(this.handleResetPasswordStatus);
  };

  private arePasswordsTheSame = (): boolean =>
    this.passwordForm.controls[this.currentPasswordControlName].value ===
    this.passwordForm.controls[this.newPasswordControlName].value;

  private updateValidationNewPasswordInput = (): void => {
    if (this.arePasswordsTheSame()) {
      this.passwordForm.controls[this.newPasswordControlName].setErrors({
        [InputSetPasswordErrors.DuplicatedPassword]: true,
      });
    } else {
      this.passwordForm.controls[this.newPasswordControlName].updateValueAndValidity();
    }
  };

  private displayIncorrectPasswordError = (): void => {
    this.passwordForm.controls[this.currentPasswordControlName].setErrors({
      [InputPasswordErrorsEnum.IncorrectPassword]: true,
    });
    this.formUtils.validateAllFormFields(this.passwordForm);
  };

  private displayTooManyUnsuccessfulAttemptsError = (): void => {
    this.passwordForm.controls[this.currentPasswordControlName].setErrors({
      [InputPasswordErrorsEnum.ToManyUnsuccessfulAttempts]: true,
    });
    this.formUtils.validateAllFormFields(this.passwordForm);
  };

  private handleChangePasswordStatus = (status: ChangePasswordStatusEnum): void => {
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
        this.logger.info('handle change password ERROR status');
        break;

      default:
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
        this.logger.error('unhandled change password status', status);
    }
  };

  private handleResetPasswordStatus = (status: ResetPasswordStatusEnum): void => {
    switch (status) {
      case ResetPasswordStatusEnum.RECOVER_BY_EMAIL:
        this.resetPasswordMethodEmitter$.emit(PostRecoverPassword.MethodEnum.EMAIL);
        break;

      case ResetPasswordStatusEnum.RECOVER_BY_SMS:
        this.resetPasswordMethodEmitter$.emit(PostRecoverPassword.MethodEnum.SMS);
        break;

      case ResetPasswordStatusEnum.CREATE_PIN_CODE_TOO_RECENTLY:
        this.logger.info('handled CREATE_PIN_CODE_TOO_RECENTLY status');
        break;

      case ResetPasswordStatusEnum.ERROR:
        this.logger.info('handle ERROR status');
        break;

      default:
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
        this.logger.error('unhandled change password status', status);
    }
  };
}
