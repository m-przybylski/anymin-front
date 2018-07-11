// tslint:disable:newline-before-return
import { Observable } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { RecoverPasswordService } from '@anymind-ng/api';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { of } from 'rxjs/observable/of';
import { BackendErrors, isBackendError } from '../../../../shared/models/backend-error/backend-error';
import { HttpErrorResponse } from '@angular/common/http';

export enum SetNewPasswordFromEmailStatus {
  SUCCESS,
  INVALID,
  NO_TOKEN,
  ERROR
}

@Injectable()
export class SetNewPasswordFromEmailViewService {

  private logger: LoggerService;

  constructor(private router: Router,
              private recoverPasswordService: RecoverPasswordService,
              private alertService: AlertService,
              loggerFactory: LoggerFactory) {

    this.logger = loggerFactory.createLoggerService('SetNewPasswordFromEmailViewService');
  }

  public handleNewPassword = (token: string, password: string): Observable<SetNewPasswordFromEmailStatus> =>
    this.recoverPasswordService.putRecoverPasswordEmailRoute({token, password})
      .pipe(mergeMap(this.redirectToDashboard))
      .pipe(catchError((err) => of(this.handleSetNewPasswordError(err))))

  private redirectToDashboard = (): Observable<SetNewPasswordFromEmailStatus> => {
    this.router.navigate(['/dashboard/expert/activities'])
      .then(isRedirectSuccessful => {
          if (!isRedirectSuccessful) {
            this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
            this.logger.error('Error when redirect to dashboard/expert/activities');
          }
        }
      );
    return of(SetNewPasswordFromEmailStatus.SUCCESS);
  }

  private handleSetNewPasswordError = (httpError: HttpErrorResponse): SetNewPasswordFromEmailStatus => {
    const error = httpError.error;

    if (isBackendError(error)) {
      switch (error.code) {
        case BackendErrors.CannotFindEmailToken:
          this.logger.warn('Msisdn verification password token is not correct', httpError);
          return SetNewPasswordFromEmailStatus.NO_TOKEN;

        case BackendErrors.IncorrectValidation:
          return SetNewPasswordFromEmailStatus.INVALID;

        default:
          this.logger.error('Unhandled backend error ', httpError);
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          return SetNewPasswordFromEmailStatus.ERROR;
      }
    } else {
      this.logger.warn('Error when handling password', httpError);
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      return SetNewPasswordFromEmailStatus.ERROR;
    }
  }
}
