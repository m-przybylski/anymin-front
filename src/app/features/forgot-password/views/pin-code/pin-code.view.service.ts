// tslint:disable:newline-before-return
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService, Alerts, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Observable, of } from 'rxjs';
import { PostRecoverPassword, RecoverPasswordService } from '@anymind-ng/api';
import { catchError, map } from 'rxjs/operators';
import { BackendErrors, isBackendError } from '@platform/shared/models/backend-error/backend-error';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginHelperService } from '../../../login/services/login-helper.service';
import ClientAppTypeEnum = PostRecoverPassword.ClientAppTypeEnum;

export enum ForgotPasswordPinCodeServiceStatus {
  SUCCESS,
  ERROR,
  INVALID,
  VERIFICATION_TOKEN_INCORRECT,
  CAN_NOT_FIND_TOKEN,
  TO_MANY_ATTEMPTS,
}

@Injectable()
export class ForgotPasswordPinCodeViewService {
  private msisdn: string;
  private logger: LoggerService;

  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private recoverPasswordService: RecoverPasswordService,
    private helper: LoginHelperService,
    loggerFactory: LoggerFactory,
  ) {
    this.msisdn = this.helper.addPlusToPhoneNumber(this.route.snapshot.params.msisdn);

    this.logger = loggerFactory.createLoggerService('ForgotPasswordPinCodeViewService');
  }

  public checkPinCode = (_token: string): Observable<ForgotPasswordPinCodeServiceStatus> =>
    this.recoverPasswordService
      .postRecoverPasswordRoute({
        clientAppType: ClientAppTypeEnum.PLATFORM,
        msisdn: this.msisdn,
      })
      .pipe(map(() => ForgotPasswordPinCodeServiceStatus.SUCCESS))
      .pipe(catchError(err => of(this.handleCheckPinCodeError(err))));

  private handleCheckPinCodeError = (err: HttpErrorResponse): ForgotPasswordPinCodeServiceStatus => {
    const error = err.error;

    if (isBackendError(error)) {
      switch (error.code) {
        case BackendErrors.MsisdnVerificationTokenIncorrect:
          return ForgotPasswordPinCodeServiceStatus.VERIFICATION_TOKEN_INCORRECT;

        case BackendErrors.CannotFindMsisdnToken:
          return ForgotPasswordPinCodeServiceStatus.CAN_NOT_FIND_TOKEN;

        case BackendErrors.IncorrectValidation:
          return ForgotPasswordPinCodeServiceStatus.INVALID;

        case BackendErrors.TooManyMsisdnTokenAttempts:
          return ForgotPasswordPinCodeServiceStatus.TO_MANY_ATTEMPTS;

        default:
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.logger.error('unhandled backed error', error);
          return ForgotPasswordPinCodeServiceStatus.ERROR;
      }
    } else {
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      this.logger.warn('error when checking pin code', error);
      return ForgotPasswordPinCodeServiceStatus.ERROR;
    }
  };
}
