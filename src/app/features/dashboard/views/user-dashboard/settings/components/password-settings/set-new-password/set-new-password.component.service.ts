import { Injectable } from '@angular/core';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { BackendErrors, isBackendError } from '../../../../../../../../shared/models/backend-error/backend-error';
import { RecoverPasswordService } from '@anymind-ng/api';

export enum SetNewPasswordStatusEnum {
  SUCCESS,
  INVALID,
  NO_TOKEN,
  ERROR
}

@Injectable()
export class SetNewPasswordComponentService {

  private logger: LoggerService;

  constructor(private recoverPasswordService: RecoverPasswordService,
              private alertService: AlertService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('SetNewPasswordComponentService');
  }

  public setNewPassword =
    (msisdn: string, token: string, password: string): Observable<SetNewPasswordStatusEnum> =>
      this.recoverPasswordService.putRecoverPasswordMsisdnRoute({msisdn, token, password})
        .pipe(map(this.handleChangePassword))
        .pipe(catchError(this.handleChangePasswordError))

  private handleChangePasswordError =
    (httpError: HttpErrorResponse): Observable<SetNewPasswordStatusEnum> => {
      const err = httpError.error;

      if (isBackendError(err)) {
        switch (err.code) {
          case BackendErrors.IncorrectValidation:
            return of(SetNewPasswordStatusEnum.INVALID);

          case BackendErrors.CannotFindMsisdnToken:
            this.alertService.pushDangerAlert(Alerts.CannotFindMsisdnToken);

            return of(SetNewPasswordStatusEnum.NO_TOKEN);

          default:
            this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
            this.logger.error('unhandled backend error when try to recover password', err);

            return of(SetNewPasswordStatusEnum.ERROR);
        }
      } else {
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
        this.logger.warn('Error when try to recover password', httpError);

        return of(SetNewPasswordStatusEnum.ERROR);
      }
    }

  private handleChangePassword = (): SetNewPasswordStatusEnum => {
    this.alertService.pushSuccessAlert(Alerts.ChangePasswordSuccess);

    return SetNewPasswordStatusEnum.SUCCESS;
  }

}
