import { AccountService, RecoverPasswordService, GetRecoverMethod, PostRecoverPassword } from '@anymind-ng/api';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BackendErrors, isBackendError } from '../../../../../../../../shared/models/backend-error/backend-error';
import { LoggerService, LoggerFactory, Alerts, AlertService } from '@anymind-ng/core';

export enum ChangePasswordStatusEnum {
  SUCCESS,
  ERROR,
  WRONG_PASSWORD,
  TOO_MANY_ATTEMPTS,
}

export enum ResetPasswordStatusEnum {
  RECOVER_BY_EMAIL,
  RECOVER_BY_SMS,
  CREATE_PIN_CODE_TOO_RECENTLY,
  ERROR,
}

@Injectable()
export class ChangePasswordComponentService {
  private logger: LoggerService;

  constructor(
    private accountService: AccountService,
    private recoverPasswordService: RecoverPasswordService,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('ChangePasswordComponentService');
  }

  public changePassword = (actualPassword: string, newPassword: string): Observable<ChangePasswordStatusEnum> =>
    this.accountService
      .changePasswordRoute({ actualPassword, newPassword })
      .pipe(map(this.handleChangePassword))
      .pipe(catchError(err => of(this.handleChangePasswordError(err))));

  public resetPassword = (msisdn: string): Observable<ResetPasswordStatusEnum> =>
    this.recoverPasswordService
      .postRecoverPasswordRoute({ msisdn })
      .pipe(map(this.handleResetPassword))
      .pipe(catchError(err => of(this.handleResetPasswordError(err))));

  private handleResetPassword = (recoverMethod: GetRecoverMethod): ResetPasswordStatusEnum => {
    const method: PostRecoverPassword.MethodEnum = recoverMethod.method;
    switch (method) {
      case PostRecoverPassword.MethodEnum.EMAIL:
        return ResetPasswordStatusEnum.RECOVER_BY_EMAIL;

      case PostRecoverPassword.MethodEnum.SMS:
        return ResetPasswordStatusEnum.RECOVER_BY_SMS;

      default:
        this.logger.error('unhandled recover password method ', method);
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);

        return ResetPasswordStatusEnum.ERROR;
    }
  };

  private handleResetPasswordError = (httpError: HttpErrorResponse): ResetPasswordStatusEnum => {
    const err = httpError.error;

    if (isBackendError(err)) {
      switch (err.code) {
        case BackendErrors.CreateAnotherPinCodeTokenRecently:
          this.alertService.pushDangerAlert(Alerts.CreateAnotherPinCodeTokenTooRecently);

          return ResetPasswordStatusEnum.CREATE_PIN_CODE_TOO_RECENTLY;

        case BackendErrors.PincodeSentTooRecently:
          this.alertService.pushDangerAlert(Alerts.PincodeSentTooRecently);

          return ResetPasswordStatusEnum.CREATE_PIN_CODE_TOO_RECENTLY;

        default:
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.logger.error('unhandled backend error', httpError);

          return ResetPasswordStatusEnum.ERROR;
      }
    } else {
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      this.logger.warn('Error when recover password', httpError);

      return ResetPasswordStatusEnum.ERROR;
    }
  };

  private handleChangePassword = (): ChangePasswordStatusEnum => {
    this.alertService.pushSuccessAlert(Alerts.ChangePasswordSuccess);

    return ChangePasswordStatusEnum.SUCCESS;
  };

  private handleChangePasswordError = (httpError: HttpErrorResponse): ChangePasswordStatusEnum => {
    const error = httpError.error;
    if (isBackendError(error)) {
      switch (error.code) {
        case BackendErrors.IncorrectValidation:
          return ChangePasswordStatusEnum.WRONG_PASSWORD;

        case BackendErrors.BadAuthenticationCredentials:
          return ChangePasswordStatusEnum.WRONG_PASSWORD;

        case BackendErrors.ToManyIncorrectPasswordAttempts:
          return ChangePasswordStatusEnum.TOO_MANY_ATTEMPTS;

        default:
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.logger.error('unhandled backend error', httpError);

          return ChangePasswordStatusEnum.ERROR;
      }
    } else {
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      this.logger.warn('Error when changing password', httpError);

      return ChangePasswordStatusEnum.ERROR;
    }
  };
}
