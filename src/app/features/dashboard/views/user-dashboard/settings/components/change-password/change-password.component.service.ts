import { AccountService } from '@anymind-ng/api';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BackendErrors, isBackendError } from '@platform/shared/models/backend-error/backend-error';
import { LoggerService, LoggerFactory, Alerts, AlertService } from '@anymind-ng/core';
import { UserSessionService } from '@platform/core/services/user-session/user-session.service';

export enum ChangePasswordStatusEnum {
  SUCCESS,
  ERROR,
  WRONG_PASSWORD,
  TOO_MANY_ATTEMPTS,
}

@Injectable()
export class ChangePasswordComponentService {
  private logger: LoggerService;

  constructor(
    private accountService: AccountService,
    private userSessionService: UserSessionService,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('ChangePasswordComponentService');
  }

  public changePassword(actualPassword: string, newPassword: string): Observable<ChangePasswordStatusEnum> {
    return this.accountService.changePasswordRoute({ actualPassword, newPassword }).pipe(
      map(() => this.handleChangePassword()),
      catchError(err => throwError(this.handleChangePasswordError(err))),
    );
  }

  private handleChangePassword(): ChangePasswordStatusEnum {
    this.alertService.pushSuccessAlert(Alerts.ChangePasswordSuccess);
    this.userSessionService.removeAllSessionsExceptCurrent();

    return ChangePasswordStatusEnum.SUCCESS;
  }

  private handleChangePasswordError(httpError: HttpErrorResponse): ChangePasswordStatusEnum {
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
  }
}
