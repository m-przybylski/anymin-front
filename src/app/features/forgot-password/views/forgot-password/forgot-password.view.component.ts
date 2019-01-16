import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordViewService } from '@platform/features/forgot-password/views/forgot-password/forgot-password.view.service';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { IInputPhoneEmailValueObject } from '@anymind-ng/core';

@Component({
  selector: 'plat-forgot-password',
  templateUrl: './forgot-password.view.component.html',
  styleUrls: ['./forgot-password.view.component.sass'],
  providers: [ForgotPasswordViewService],
})
export class ForgotPasswordViewComponent implements OnInit {
  public readonly forgotPasswordFormId = 'forgotPasswordForm';
  public readonly loginControlName = 'login';
  public forgotPasswordForm: FormGroup;
  public loginControl = new FormControl('', { validators: Validators.required, updateOn: 'change' });
  public isRequestPending = false;

  private loginObject: IInputPhoneEmailValueObject;

  constructor(private forgotPasswordService: ForgotPasswordViewService, private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      [this.loginControlName]: this.loginControl,
    });
    this.forgotPasswordForm.controls[this.loginControlName].patchValue(this.route.snapshot.params.login);
  }

  public onFormSubmit(form: FormGroup): void {
    this.isRequestPending = true;
    this.forgotPasswordService
      .recoverPassword(this.loginObject, this.loginControlName, form)
      .pipe(
        finalize(() => {
          this.isRequestPending = false;
        }),
      )
      .subscribe();
  }

  public onLoginValueChange(loginObject: IInputPhoneEmailValueObject): void {
    this.loginObject = loginObject;
  }
}
