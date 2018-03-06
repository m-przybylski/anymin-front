import { Injectable } from '@angular/core';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { RegistrationService } from '@anymind-ng/api';
import { Observable } from 'rxjs/Observable';
import { BackendErrors, isBackendError } from '../../../../shared/models/backend-error/backend-error';
import { HttpErrorResponse } from '@angular/common/http';
import { Alerts, AlertService } from '@anymind-ng/components';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { _throw } from 'rxjs/observable/throw';

export enum PinCodeServiceStatus {
  SUCCESS,
  ERROR,
  INVALID,
  MSISDN_VERIFICATION_TOKEN_INCORRECT,
  CAN_NOT_FIND_MSISDN_TOKEN,
  TOO_MANY_MSISDN_TOKEN_ATTEMPTS
}

@Injectable()
export class PinCodeViewService {

  private logger: LoggerService;
  private msisdn: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private userSessionService: UserSessionService,
              private registrationService: RegistrationService,
              loggerFactory: LoggerFactory) {

    this.logger = loggerFactory.createLoggerService('PinCodeViewService');

    this.route.params.subscribe(params => {
      this.msisdn = params.msisdn;
    });

  }
  public handleRegistration = (sessionId: string, token: string): Observable<PinCodeServiceStatus> =>
    this.registrationService.confirmVerificationRoute({sessionId, token})
      .pipe(mergeMap(() => fromPromise(this.purgeSessionCache())))
      .pipe(tap(this.redirectToSetPassword))
      .pipe(catchError(this.handleCheckPinCodeError))

  // tslint:disable:cyclomatic-complexity
  private handleCheckPinCodeError = (err: HttpErrorResponse): Observable<PinCodeServiceStatus> => {
    const error = err.error;

    if (isBackendError(error)) {
      switch (error.code) {
        case BackendErrors.CreateAnotherPinCodeTokenRecently:
          this.alertService.pushDangerAlert(Alerts.CreateAnotherPinCodeTokenTooRecently);
          break;

        case BackendErrors.MsisdnVerificationTokenIncorrect:
          return of(PinCodeServiceStatus.MSISDN_VERIFICATION_TOKEN_INCORRECT);

        case BackendErrors.CannotFindMsisdnToken:
          return of(PinCodeServiceStatus.CAN_NOT_FIND_MSISDN_TOKEN);

        case BackendErrors.IncorrectValidation:
          return of(PinCodeServiceStatus.INVALID);

        case BackendErrors.TooManyMsisdnTokenAttempts:
          return of(PinCodeServiceStatus.TOO_MANY_MSISDN_TOKEN_ATTEMPTS);

        case BackendErrors.PincodeSentTooRecently:
          this.alertService.pushDangerAlert(Alerts.PincodeSentTooRecently);
          break;

        default:
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.logger.error('Unhandled backend pin code error', error);
          return of(PinCodeServiceStatus.ERROR);
      }
    } else {
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      this.logger.warn('Error when handling pin code', error);
      return of(PinCodeServiceStatus.ERROR);
    }

    return _throw(err);
  }

  private purgeSessionCache = (): Promise<PinCodeServiceStatus> =>
    this.userSessionService.getSession(true).then(() => PinCodeServiceStatus.SUCCESS)

  private redirectToSetPassword = (): Promise<void> =>
    this.router.navigate(['/account/set-password/' + this.msisdn])
      .then(isRedirectSuccessful => {
        if (!isRedirectSuccessful) {
          this.logger.warn('Error when redirect to account/set-password');
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
        }
      })

}
