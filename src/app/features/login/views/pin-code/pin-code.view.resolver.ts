import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { RegistrationService, GetRegistrationSession } from '@anymind-ng/api';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { catchError } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';
import { Alerts, AlertService } from '@anymind-ng/components';
import { BackendErrors, isBackendError } from '../../../../shared/models/backend-error/backend-error';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PinCodeViewResolver implements Resolve<GetRegistrationSession> {

  private logger: LoggerService;

  constructor(private registrationService: RegistrationService,
              private router: Router,
              private alertService: AlertService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('PinCodeViewResolver');
  }

  public resolve = (route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<GetRegistrationSession> =>
    this.requestPinCode(route.params.msisdn)
      .pipe(catchError(this.handlePinCodeError))

  private requestPinCode = (msisdn: string): Observable<GetRegistrationSession> =>
    this.registrationService.requestVerificationRoute({msisdn})

  private handlePinCodeError = (httpError: HttpErrorResponse): Observable<GetRegistrationSession> => {
    const err = httpError.error;

    if (isBackendError(err)) {
      switch (err.code) {
        case BackendErrors.CreateAnotherPinCodeTokenRecently:
          this.router.navigate(['/login']).then(isRedirectSuccessful => {
            if (!isRedirectSuccessful) {
              this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
              this.logger.warn('Error when redirect to login');
            }
          });
          this.alertService.pushDangerAlert(Alerts.CreateAnotherPinCodeTokenTooRecently);
          break;

        case BackendErrors.PincodeSentTooRecently:
          this.alertService.pushDangerAlert(Alerts.PincodeSentTooRecently);
          break;

        default:
          this.router.navigate(['/login']).then(isRedirectSuccessful => {
            if (!isRedirectSuccessful) {
              this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
              this.logger.warn('Error when redirect to login');
            }
          });
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.logger.error('Unhandled backend pin code error', err);
      }
    } else {
      this.logger.warn('error when resolving pin-code', err);
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    }
    return _throw(err);
  }
}
