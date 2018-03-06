import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SetPasswordViewService, SetPasswordStatus } from './set-password.view.service';
import { FormUtilsService } from '@anymind-ng/components';
import { finalize, takeUntil } from 'rxjs/operators';
import { InputSetPasswordErrors } from '../../../../shared/components/input-set-password/input-set-password.component';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Subject } from 'rxjs/Subject';

@Component({
  templateUrl: './set-password.view.component.html',
  providers: [SetPasswordViewService]
})
export class SetPasswordViewComponent implements OnInit, OnDestroy {

  public readonly setPasswordFormName = 'setPasswordForm';
  public readonly passwordControlName = 'password';

  public setPasswordForm: FormGroup;
  public isRequestPending = false;
  public msisdn: string;
  public isInputInitialFocused = true;

  private accountId: string;
  private logger: LoggerService;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private setPasswordService: SetPasswordViewService,
              private formUtils: FormUtilsService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('SetPasswordViewComponent');
  }

  public ngOnInit(): void {
    this.setPasswordForm = new FormGroup({});

    this.accountId = this.route.snapshot.data.accountId;

    this.route.params.subscribe(params => {
      this.msisdn = params.msisdn;
    });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public onFormSubmit = (setPasswordForm: FormGroup): void => {
    if (setPasswordForm.valid) {
      this.isRequestPending = true;
      const password = setPasswordForm.value[this.passwordControlName];
      this.setPasswordService.setPassword(this.accountId, password)
        .pipe(finalize(() => this.isRequestPending = false))
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(this.handleSetPasswordStatus);
    } else {
      this.formUtils.validateAllFormFields(setPasswordForm);
    }
  }

  private handleSetPasswordStatus = (status: SetPasswordStatus): void => {
    switch (status) {
      case SetPasswordStatus.INVALID_PASSWORD:
        this.displayIncorrectPasswordError();
        break;

      case SetPasswordStatus.SUCCESS:
        this.logger.warn('Handled SUCCESS status when set password');
        break;

      case SetPasswordStatus.ERROR:
        this.logger.warn('Handled ERROR status when set password');
        break;

      default:
        this.logger.error('Unhandled set password status', status);
    }
  }

  private displayIncorrectPasswordError = (): void => {
    this.setPasswordForm.controls[this.passwordControlName]
      .setErrors({[InputSetPasswordErrors.IncorrectPassword]: true});
    this.formUtils.validateAllFormFields(this.setPasswordForm);
  }

}
