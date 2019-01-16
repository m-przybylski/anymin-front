// tslint:disable:newline-before-return
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, Alerts, LoggerFactory, LoggerService, InputPinCodeErrorsEnum } from '@anymind-ng/core';
import { Observable, of } from 'rxjs';
import { RecoverPasswordService, PostRecoverPassword } from '@anymind-ng/api';
import { catchError, tap } from 'rxjs/operators';
import { BackendErrors, isBackendError } from '@platform/shared/models/backend-error/backend-error';
import { HttpErrorResponse } from '@angular/common/http';
import { MsisdnHelperService } from '@platform/core/services/msisdn-helper/msisdn-helper.service';
import { AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import { ForgotPasswordActions } from '@platform/core/actions';

@Injectable()
export class ForgotPasswordPinCodeViewService {
  private readonly clientAppType: PostRecoverPassword.ClientAppTypeEnum;
  private readonly backendErrorsMap = new Map<BackendErrors, InputPinCodeErrorsEnum>([
    [BackendErrors.MsisdnVerificationTokenIncorrect, InputPinCodeErrorsEnum.IncorrectPinCode],
    [BackendErrors.CannotFindMsisdnToken, InputPinCodeErrorsEnum.IncorrectPinCode],
    [BackendErrors.IncorrectValidation, InputPinCodeErrorsEnum.IncorrectPinCode],
    [BackendErrors.TooManyMsisdnTokenAttempts, InputPinCodeErrorsEnum.ToManyUnsuccessfulAttempts],
  ]);
  private readonly msisdn: string;
  private logger: LoggerService;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private recoverPasswordService: RecoverPasswordService,
    private msisdnHelper: MsisdnHelperService,
    private store: Store<fromRoot.IState>,
    loggerFactory: LoggerFactory,
  ) {
    this.clientAppType =
      typeof this.route.snapshot.queryParams.clientAppType !== 'undefined'
        ? this.route.snapshot.queryParams.clientAppType
        : PostRecoverPassword.ClientAppTypeEnum.PLATFORM;
    this.logger = loggerFactory.createLoggerService('ForgotPasswordPinCodeViewService');
    this.msisdn = this.msisdnHelper.addPlusToPhoneNumber(this.route.snapshot.params.msisdn);
  }

  public handlePinToken(pinCodeControl: AbstractControl): Observable<void> {
    return this.recoverPasswordService
      .postRecoverPasswordMsisdnVerifyRoute({
        token: pinCodeControl.value,
        msisdn: this.msisdn,
      })
      .pipe(
        tap(() => {
          this.store.dispatch(new ForgotPasswordActions.SetMsisdnToken(pinCodeControl.value));
          this.redirectToSetNewPassword();
        }),
        catchError(err => of(this.handleCheckPinCodeError(err, pinCodeControl))),
      );
  }

  public resendPinCode(): void {
    this.recoverPasswordService
      .postRecoverPasswordRoute({
        msisdn: this.msisdn,
        clientAppType: this.clientAppType,
      })
      .pipe(catchError(err => this.handleResendPinCodeError(err)))
      .subscribe();
  }

  private handleCheckPinCodeError(httpError: HttpErrorResponse, pinCodeControl: AbstractControl): void {
    if (isBackendError(httpError.error)) {
      this.displayIncorrectPinCodeError(pinCodeControl, httpError.error.code);
    } else {
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      this.logger.warn('error when checking pin code', httpError);
    }
  }

  private displayIncorrectPinCodeError(pinCodeControl: AbstractControl, backendError: BackendErrors): void {
    const error = this.backendErrorsMap.get(backendError);
    if (typeof error !== 'undefined') {
      pinCodeControl.setErrors({ [error]: true });
      pinCodeControl.markAsTouched();
    } else {
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      this.logger.error('unhandled backed error', backendError);
    }
  }

  private redirectToSetNewPassword(): void {
    const queryParam = { clientAppType: this.clientAppType };
    const msisdn = this.msisdnHelper.trimPhoneNumber(this.route.snapshot.params.msisdn);

    this.router
      .navigate(['/forgot-password/set-new-password', msisdn], { queryParams: queryParam })
      .then(isRedirectSuccessful => {
        if (!isRedirectSuccessful) {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.logger.warn('Can not redirect to forgot-password/set-new-password');
        }
      });
  }

  private handleResendPinCodeError(httpError: HttpErrorResponse): Observable<void> {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.logger.warn('ForgotPasswordComponent: error when resolving pin-code', httpError);
    return of();
  }
}
