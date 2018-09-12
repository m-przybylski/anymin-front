import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { RegistrationService, GetRegistrationSession } from '@anymind-ng/api';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { catchError } from 'rxjs/operators';
import { BackendErrors, isBackendError } from '@platform/shared/models/backend-error/backend-error';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { LoginHelperService } from '../../services/login-helper.service';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { AuthActions } from '@platform/core/actions';

@Injectable()
export class PinCodeViewResolver implements Resolve<GetRegistrationSession> {
  private logger: LoggerService;

  constructor(
    private store: Store<fromCore.IState>,
    private registrationService: RegistrationService,
    private alertService: AlertService,
    private helper: LoginHelperService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('PinCodeViewResolver');
  }

  public resolve = (route: ActivatedRouteSnapshot): Observable<GetRegistrationSession> =>
    this.requestPinCode(this.helper.addPlusToPhoneNumber(route.params.msisdn)).pipe(
      catchError(error => this.handlePinCodeError(error)),
    );

  private requestPinCode = (msisdn: string): Observable<GetRegistrationSession> =>
    this.registrationService.requestVerificationRoute({ msisdn });

  private handlePinCodeError = (httpError: HttpErrorResponse): Observable<GetRegistrationSession> => {
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
          this.store.dispatch(new AuthActions.LoginRedirectAction());
      }
    } else {
      this.logger.warn('error when resolving pin-code', err);
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    }

    return EMPTY;
  };
}
