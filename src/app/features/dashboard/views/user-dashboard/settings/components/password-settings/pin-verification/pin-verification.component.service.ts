import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { BackendErrors, isBackendError } from '../../../../../../../../shared/models/backend-error/backend-error';
import { map, catchError } from 'rxjs/operators';
import { RecoverPasswordService } from '@anymind-ng/api';
import { Injectable } from '@angular/core';

export enum RecoverPasswordStatus {
  SUCCESS,
  ERROR,
  INVALID_TOKEN,
  CAN_NOT_FIND_TOKEN,
  TOO_MANY_ATTEMPTS,
}

@Injectable()
export class PinVerificationComponentService {
  private logger: LoggerService;

  constructor(
    private alertService: AlertService,
    private recoverPasswordService: RecoverPasswordService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('PinVerificationComponentService');
  }

  public checkPinToken = (token: string, msisdn: string): Observable<RecoverPasswordStatus> =>
    this.recoverPasswordService
      .postRecoverPasswordVerifyMsisdnRoute({
        token,
        msisdn,
      })
      .pipe(map(() => RecoverPasswordStatus.SUCCESS))
      .pipe(catchError(err => of(this.handleError(err))));

  private handleError = (err: HttpErrorResponse): RecoverPasswordStatus => {
    const error = err.error;

    if (isBackendError(error)) {
      switch (error.code) {
        case BackendErrors.MsisdnVerificationTokenIncorrect:
          return RecoverPasswordStatus.INVALID_TOKEN;

        case BackendErrors.CannotFindMsisdnToken:
          return RecoverPasswordStatus.CAN_NOT_FIND_TOKEN;

        case BackendErrors.IncorrectValidation:
          return RecoverPasswordStatus.INVALID_TOKEN;

        case BackendErrors.TooManyMsisdnTokenAttempts:
          return RecoverPasswordStatus.TOO_MANY_ATTEMPTS;

        default:
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.logger.error('unhandled backed error', error);

          return RecoverPasswordStatus.ERROR;
      }
    } else {
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      this.logger.warn('error when checking pin code', error);

      return RecoverPasswordStatus.ERROR;
    }
  };
}
