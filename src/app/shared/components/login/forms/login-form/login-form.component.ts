import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
  Alerts,
  AlertService,
  FormUtilsService,
  IInputPhoneEmailValueObject,
  InputPasswordErrorsEnum,
  LoggerFactory,
} from '@anymind-ng/core';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { BackendErrors, isBackendError } from '@platform/shared/models/backend-error/backend-error';
import { Logger } from '@platform/core/logger';
import { LoginFormComponentService } from '@platform/shared/components/login/forms/login-form/login-form.component.service';

@Component({
  selector: 'plat-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass'],
  providers: [LoginFormComponentService],
})
export class LoginFormComponent extends Logger implements OnInit, OnDestroy {
  @Output()
  public onRegistrationLinkClick = new EventEmitter<void>();

  @Output()
  public onResetPasswordClick = new EventEmitter<void>();

  @Input()
  public isOpenInModal = false;

  public readonly loginFormId = 'loginForm';
  public readonly loginControlName = 'login';
  public readonly passwordControlName = 'password';

  public loginForm: FormGroup;
  public loginControl = new FormControl('', { updateOn: 'change' });
  public isRequestPending$: Observable<boolean>;

  private onDestroy$ = new Subject<void>();
  private loginObject: IInputPhoneEmailValueObject;

  constructor(
    private loginService: LoginFormComponentService,
    private formUtils: FormUtilsService,
    private store: Store<fromCore.IState>,
    private router: Router,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('LoginViewComponent'));
  }

  public ngOnInit(): void {
    this.loginForm = new FormGroup({
      [this.loginControlName]: this.loginControl,
    });
    /**
     * if there is invitation in local storage
     * we want to use login from it
     */
    const loginFromInvitation = this.loginService.getLoginFromInvitation();
    if (loginFromInvitation) {
      this.loginControl.patchValue(loginFromInvitation);
      this.loginObject = { email: loginFromInvitation };
    }

    this.store
      .pipe(
        select(fromCore.getLoginError),
        filter(error => error !== undefined),
        takeUntil(this.onDestroy$),
      )
      .subscribe(err => {
        this.handleError(err);
      });
    this.isRequestPending$ = this.store.pipe(select(fromCore.getLoginPending));
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public resetPasswordClick(): void {
    this.router.navigate(['/forgot-password/']).then((isRedirectSuccessful: boolean) => {
      if (!isRedirectSuccessful) {
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
        this.loggerService.warn('Error when redirect to forgot-password');
      }

      this.onResetPasswordClick.emit();
    });
  }

  public registrationClick(): void {
    this.onRegistrationLinkClick.emit();
  }

  public onFormSubmit(msisdnForm: FormGroup): void {
    if (msisdnForm.valid) {
      this.loginService.login(
        {
          ...this.loginObject,
          password: msisdnForm.value[this.passwordControlName],
        },
        this.isOpenInModal,
      );
    } else {
      this.formUtils.validateAllFormFields(msisdnForm);
    }
  }

  public onLoginValueChange(loginObject: IInputPhoneEmailValueObject): void {
    this.loginObject = loginObject;
  }

  private showInputError(inputName: string, error: string): void {
    this.loginForm.controls[inputName].setErrors({ [error]: true });
    this.formUtils.validateAllFormFields(this.loginForm);
  }

  // tslint:disable-next-line:cyclomatic-complexity
  private handleError(error: any): void {
    if (isBackendError(error)) {
      switch (error.code) {
        case BackendErrors.BadAuthenticationCredentials:
        case BackendErrors.PasswordInvalid:
          this.showInputError(this.passwordControlName, InputPasswordErrorsEnum.IncorrectPassword);
          break;

        case BackendErrors.IncorrectValidation:
          this.handleError(error.errors[0]);
          break;

        case BackendErrors.TooManyMsisdnTokenAttempts:
          this.showInputError(this.passwordControlName, InputPasswordErrorsEnum.ToManyUnsuccessfulAttempts);
          break;

        case BackendErrors.MsisdnInvalid:
          this.showInputError(this.loginControlName, 'LOGIN.ERROR.INVALID_LOGIN');
          break;

        case BackendErrors.NoSuchAccount:
          this.showInputError(this.loginControlName, 'LOGIN.ERROR.NO_SUCH_ACCOUNT');
          break;

        case BackendErrors.CanNotFindAccount:
          this.showInputError(this.loginControlName, 'LOGIN.ERROR.NO_SUCH_ACCOUNT');
          break;

        case BackendErrors.MsisdnBlocked:
          this.handleBlockedAccount();
          break;

        default:
          this.loggerService.error('Unhandled backend error', error);
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      }
    } else {
      this.loggerService.warn('Error when try to log in', error);
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    }
    this.formUtils.validateAllFormFields(this.loginForm);
  }

  private handleBlockedAccount(): void {
    this.router.navigate(['login/blocked']).then(isRedirectSuccessful => {
      if (!isRedirectSuccessful) {
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
        this.loggerService.warn('Error when redirect to login/blocked');
      }
    });
  }
}
