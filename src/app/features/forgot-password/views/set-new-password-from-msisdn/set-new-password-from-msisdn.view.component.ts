// tslint:disable:strict-boolean-expressions
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormUtilsService } from '@anymind-ng/core';
import { SetNewPasswordFromMsisdnViewService } from './set-new-password-from-msisdn.view.service';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'set-new-password-from-msisdn',
  templateUrl: './set-new-password-from-msisdn.view.component.html',
  styleUrls: ['./set-new-password-from-msisdn.view.component.sass'],
  providers: [SetNewPasswordFromMsisdnViewService],
})
export class SetNewPasswordFromMsisdnViewComponent implements OnInit, OnDestroy {
  public readonly passwordControlName = 'password';
  public readonly setPasswordFormId = 'passwordForm';

  public msisdn: string;
  public setPasswordForm: FormGroup;
  public isRequestPending = false;
  public isInputInitialFocused = true;

  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private setNewPasswordService: SetNewPasswordFromMsisdnViewService,
    private formUtils: FormUtilsService,
  ) {}

  public ngOnInit(): void {
    this.setPasswordForm = new FormGroup({});
    this.msisdn = this.setNewPasswordService.getMsisdn();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public onFormSubmit(setPasswordForm: FormGroup): void {
    if (setPasswordForm.valid) {
      this.isRequestPending = true;
      this.setNewPasswordService
        .setNewPassword(setPasswordForm.controls[this.passwordControlName])
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
