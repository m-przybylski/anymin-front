import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RecoverPasswordService } from '@anymind-ng/api';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { BackendError, BackendErrors, isBackendError } from '../../../../shared/models/backend-error/backend-error';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Injectable } from '@angular/core';

@Injectable()
export class SetNewPasswordFromEmailViewResolver implements Resolve<string> {

  private logger: LoggerService;

  constructor(private router: Router,
              private recoverPasswordService: RecoverPasswordService,
              private alertService: AlertService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('SetNewPasswordFromEmailViewResolver');
  }

  public resolve = (route: ActivatedRouteSnapshot): Observable<string> =>
    this.recoverPasswordService.postRecoverPasswordVerifyEmailRoute({token: route.params.token})
      .pipe(map(response => response.msisdn))
      .pipe(catchError(this.handleError))

  private handleError = (httpError: HttpErrorResponse): Observable<string> => {
    const err = httpError.error;

    if (isBackendError(err)) {
      switch (err.code) {

        case BackendErrors.IncorrectRequest:
          this.handleBackendError(err);

          return of();

        case BackendErrors.NoSuchAccount:
          this.handleBackendError(err);

          return of();

        case BackendErrors.MissingTokenModelId:
          this.handleBackendError(err);

          return of();

        case BackendErrors.CannotFindEmailToken:
          this.handleBackendError(err);

          return of();

        default:
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.redirectToLogin();
          this.logger.error('Unhandled backend recover password verify email error', httpError);

          return of();

      }
    } else {
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      this.logger.warn('error when recover password verify email', httpError);
      this.redirectToLogin();

      return of();
    }
  }

  private redirectToLogin = (): Observable<void> => {
    this.router.navigate(['/login']).then(isRedirectSuccessful => {
      if (!isRedirectSuccessful) {
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
        this.logger.warn('Can not redirect to login');
      }
    });

    return of();
  }

  private handleBackendError = (error: BackendError): void => {
    this.logger.warn('error when try to r recover password verify email', error);
    this.alertService.pushDangerAlert(Alerts.CannotFindEmailToken);
    this.redirectToLogin();
  }

}
