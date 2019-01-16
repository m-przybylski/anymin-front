import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { FormUtilsService, LoggerFactory } from '@anymind-ng/core';
import { SetNewPasswordFromEmailViewService } from './set-new-password-from-email.view.service';
import { Logger } from '@platform/core/logger';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'set-password',
  templateUrl: './set-new-password-from-email.view.component.html',
  styleUrls: ['./set-new-password-from-email.view.component.sass'],
  providers: [SetNewPasswordFromEmailViewService],
})
export class SetNewPasswordFromEmailViewComponent extends Logger implements OnInit {
  public readonly passwordControlName = 'password';
  public readonly setPasswordFormId = 'passwordForm';

  public setPasswordForm: FormGroup;
  public isRequestPending = false;
  public isInputInitialFocused = true;
  public login: string;

  constructor(
    private setNewPasswordFromEmailService: SetNewPasswordFromEmailViewService,
    private formUtils: FormUtilsService,
    private route: ActivatedRoute,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('SetNewPasswordFromEmailViewComponent'));
  }

  public ngOnInit(): void {
    this.login = this.route.snapshot.data.login;
    this.setPasswordForm = new FormGroup({});
  }

  public onFormSubmit(setPasswordForm: FormGroup): void {
    if (setPasswordForm.valid) {
      this.isRequestPending = true;
      this.setNewPasswordFromEmailService
        .handleNewPassword(setPasswordForm.controls[this.passwordControlName])
        .pipe(
          finalize(() => {
            this.isRequestPending = false;
          }),
        )
        .subscribe();
    } else {
      this.formUtils.validateAllFormFields(setPasswordForm);
    }
  }
}
