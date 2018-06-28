// tslint:disable:newline-before-return
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { PostRecoverPassword, RecoverPasswordService } from '@anymind-ng/api';
import { BackendErrors, isBackendError } from '../../shared/models/backend-error/backend-error';
import { Alerts, AlertService } from '@anymind-ng/components';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { HttpErrorResponse } from '@angular/common/http';
import { GetRecoverMethod } from '@anymind-ng/api';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';

@Injectable()
export class ForgotPasswordGuard implements CanActivate {

  private logger: LoggerService;

  constructor(private router: Router,
              private alertService: AlertService,
              private recoverPasswordService: RecoverPasswordService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('ForgotPasswordGuard');
  }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.recoverPasswordService.postRecoverPasswordRoute({msisdn: route.params.msisdn})
      .pipe(tap(getRecoverMethod => this.redirect(getRecoverMethod.method, route.params.msisdn)))
      .pipe(catchError(this.handleError))
      .pipe(map(() => false));
  }

  private redirect = (methodType: PostRecoverPassword.MethodEnum, msisdn: string): void => {
    switch (methodType) {
      case PostRecoverPassword.MethodEnum.EMAIL:
        this.router.navigate(['/forgot-password/email/' + msisdn])
          .then(isRedirectSuccessful => {
            if (!isRedirectSuccessful) {
              this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
              this.logger.warn('Can not redirect to forgot-password/email by method: ', methodType);
            }
          });
        break;

      case PostRecoverPassword.MethodEnum.SMS:
        this.router.navigate(['/forgot-password/pin-code/' + msisdn])
          .then(isRedirectSuccessful => {
            if (!isRedirectSuccessful) {
              this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
              this.logger.warn('Can not redirect to forgot-password/pin-code by method: ', methodType);
            }
          });
        break;

      default:
        this.logger.error('unhandled recover password method ', methodType);
        this.router.navigate(['/login'])
          .then(isRedirectSuccessful => {
            if (!isRedirectSuccessful) {
              this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
              this.logger.warn('Can not redirect to login by method: ', methodType);
            }
          });
    }
  }

  private handleError = (httpError: HttpErrorResponse): Observable<GetRecoverMethod> => {
    const err = httpError.error;

    if (isBackendError(err)) {
      switch (err.code) {
        case BackendErrors.CreateAnotherPinCodeTokenRecently:
          this.alertService.pushDangerAlert(Alerts.CreateAnotherPinCodeTokenTooRecently);
          break;

        case BackendErrors.PincodeSentTooRecently:
          this.alertService.pushDangerAlert(Alerts.PincodeSentTooRecently);
          break;

        default:
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.router.navigate(['/login']).then(isRedirectSuccessful => {
            if (!isRedirectSuccessful) {
              this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
              this.logger.warn('Can not redirect to login', err);
            }
          });
          this.logger.error('Unhandled backend pin code error', err);
      }
    } else {
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      this.logger.warn('ForgotPasswordGuard: error when resolving method', err);
    }
    return _throw(err);
  }
}
