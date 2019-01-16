import { catchError, tap } from 'rxjs/operators';
import { RecoverPasswordService, PostRecoverPassword } from '@anymind-ng/api';
import { LoggerFactory, AlertService, Alerts, IInputPhoneEmailValueObject, FormUtilsService } from '@anymind-ng/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { BackendErrors, isBackendError } from '@platform/shared/models/backend-error/backend-error';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { Logger } from '@platform/core/logger';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

enum RecoverPasswordMethod {
  EMAIL,
  SMS,
}

@Injectable()
export class ForgotPasswordViewService extends Logger {
  constructor(
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private recoverPasswordService: RecoverPasswordService,
    private formUtils: FormUtilsService,
    loggerServiceFactory: LoggerFactory,
  ) {
    super(loggerServiceFactory.createLoggerService('ForgotPasswordViewService'));
  }

  public recoverPassword(
    login: IInputPhoneEmailValueObject,
    loginControlName: string,
    forgotPasswordForm: FormGroup,
  ): Observable<void> {
    if (forgotPasswordForm.valid) {
      const postRecoverPassword: PostRecoverPassword = {
        ...login,
        clientAppType:
          typeof this.route.snapshot.queryParams.clientAppType !== 'undefined'
            ? this.route.snapshot.queryParams.clientAppType
            : PostRecoverPassword.ClientAppTypeEnum.PLATFORM,
      };

      return this.recoverPasswordService.postRecoverPasswordRoute(postRecoverPassword).pipe(
        tap(() => {
          this.isEmail(login)
            ? this.redirectToForgotPassword(RecoverPasswordMethod.EMAIL)
            : this.redirectToForgotPassword(RecoverPasswordMethod.SMS, login.msisdn);
        }),
        catchError(err => this.handleError(err, loginControlName, forgotPasswordForm)),
      );
    } else {
      this.formUtils.validateAllFormFields(forgotPasswordForm);

      return EMPTY;
    }
  }

  private redirectToForgotPassword(methodType: RecoverPasswordMethod, msisdn?: string): void {
    const redirectUrl =
      methodType === RecoverPasswordMethod.EMAIL ? `/forgot-password/email/` : `/forgot-password/pin-code/${msisdn}`;

    const queryParam =
      typeof this.route.snapshot.queryParams.clientAppType !== 'undefined'
        ? { clientAppType: this.route.snapshot.queryParams.clientAppType }
        : {};

    this.redirect(redirectUrl, { queryParams: queryParam });
  }

  // tslint:disable-next-line:cyclomatic-complexity
  private handleError(
    httpError: HttpErrorResponse,
    loginControlName: string,
    forgotPasswordForm: FormGroup,
  ): Observable<void> {
    const err = httpError.error;

    if (isBackendError(err)) {
      switch (err.code) {
        case BackendErrors.CreateAnotherPinCodeTokenRecently:
          this.alertService.pushDangerAlert(Alerts.CreateAnotherPinCodeTokenTooRecently);
          break;

        case BackendErrors.PincodeSentTooRecently:
          this.alertService.pushDangerAlert(Alerts.PincodeSentTooRecently);
          break;

        case BackendErrors.CanNotFindAccount:
          this.showInputError(forgotPasswordForm, loginControlName, 'FORGOT_PASSWORD.NO_SUCH_ACCOUNT.ERROR');
          break;

        case BackendErrors.NoSuchAccount:
          this.showInputError(forgotPasswordForm, loginControlName, 'FORGOT_PASSWORD.NO_SUCH_ACCOUNT.ERROR');
          break;

        case BackendErrors.IncorrectValidation:
          this.showInputError(forgotPasswordForm, loginControlName, 'FORGOT_PASSWORD.VALIDATION.ERROR');
          break;

        default:
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.redirect('login');
          this.loggerService.error('Unhandled backend pin code error', err);
      }
    } else {
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      this.loggerService.warn('ForgotPasswordGuard: error when recover password', err);
    }

    return throwError(httpError);
  }

  private isEmail(value: IInputPhoneEmailValueObject): boolean {
    return typeof value.email !== 'undefined';
  }

  private redirect(url: string, params?: NavigationExtras): void {
    this.router.navigate([url], params).then(isRedirectSuccessful => {
      if (!isRedirectSuccessful) {
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
        this.loggerService.warn(`Error when redirect to ${url}`);
      }
    });
  }

  private showInputError(form: FormGroup, controlName: string, error: string): void {
    form.controls[controlName].setErrors({ [error]: true });
    this.formUtils.validateAllFormFields(form);
  }
}
