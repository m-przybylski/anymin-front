import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, takeUntil } from 'rxjs/operators';
import { Alerts, AlertService, FormUtilsService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import {
  SetNewPasswordFromEmailStatus,
  SetNewPasswordFromEmailViewService,
} from './set-new-password-from-email.view.service';
import { InputSetPasswordErrors } from '../../../../shared/components/inputs/input-set-password/input-set-password.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'set-password',
  templateUrl: './set-new-password-from-email.view.component.html',
  styleUrls: ['./set-new-password-from-email.view.component.sass'],
  providers: [SetNewPasswordFromEmailViewService],
})
export class SetNewPasswordFromEmailViewComponent implements OnInit, OnDestroy {
  public readonly passwordControlName = 'password';
  public readonly setPasswordFormId = 'passwordForm';

  public msisdn: string;
  public setPasswordForm: FormGroup;
  public isRequestPending = false;
  public isInputInitialFocused = true;

  private logger: LoggerService;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private setNewPasswordFromEmailService: SetNewPasswordFromEmailViewService,
    private formUtils: FormUtilsService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('SetNewPasswordFromEmailViewComponent');
  }

  public ngOnInit(): void {
    this.setPasswordForm = new FormGroup({});
    this.msisdn = this.route.snapshot.data.msisdn;
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public onFormSubmit = (setPasswordForm: FormGroup): void => {
    if (setPasswordForm.valid) {
      this.isRequestPending = true;
      const password = setPasswordForm.controls[this.passwordControlName].value;
      this.setNewPasswordFromEmailService
        .handleNewPassword(password)
        .pipe(
          finalize(() => {
            this.isRequestPending = false;
          }),
        )
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(this.handleSetNewPasswordStatus);
    } else {
      this.formUtils.validateAllFormFields(setPasswordForm);
    }
  };

  private handleSetNewPasswordStatus = (status: SetNewPasswordFromEmailStatus): void => {
    switch (status) {
      case SetNewPasswordFromEmailStatus.INVALID:
        this.displayIncorrectPasswordError();
        break;

      case SetNewPasswordFromEmailStatus.NO_TOKEN:
        this.alertService.pushDangerAlert(Alerts.CannotFindEmailToken);
        this.router
          .navigate(['/login'])
          .then(isRedirectSuccessful => {
            if (!isRedirectSuccessful) {
              this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
              this.logger.warn('Can not redirect to login', status);
            }
          })
          .catch(this.logger.error.bind(this));
        break;

      case SetNewPasswordFromEmailStatus.ERROR:
        this.logger.info('Handled error status when set new password from email', status);
        break;

      case SetNewPasswordFromEmailStatus.SUCCESS:
        this.logger.info('Handled success status when set new password from email', status);
        break;

      default:
        this.logger.error('Unhandled status when set new password from email', status);
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    }
  };

  private displayIncorrectPasswordError = (): void => {
    this.setPasswordForm.controls[this.passwordControlName].setErrors({
      [InputSetPasswordErrors.IncorrectPassword]: true,
    });
    this.formUtils.validateAllFormFields(this.setPasswordForm);
  };
}
