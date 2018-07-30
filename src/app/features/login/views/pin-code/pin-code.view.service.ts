// tslint:disable:newline-before-return
import { Injectable } from '@angular/core';
import { LoggerFactory, LoggerService, Alerts, AlertService } from '@anymind-ng/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { RegistrationService } from '@anymind-ng/api';
import { Observable } from 'rxjs';
import { BackendErrors, isBackendError } from '../../../../shared/models/backend-error/backend-error';
import { HttpErrorResponse } from '@angular/common/http';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { EventsService } from '../../../../../angularjs/common/services/events/events.service';

export enum PinCodeServiceStatus {
  SUCCESS,
  ERROR,
  INVALID,
  MSISDN_VERIFICATION_TOKEN_INCORRECT,
  CAN_NOT_FIND_MSISDN_TOKEN,
  TOO_MANY_MSISDN_TOKEN_ATTEMPTS,
  CREATE_MSISDN_TOKEN_TOO_RECENTLY,
}

@Injectable()
export class PinCodeViewService {
  private logger: LoggerService;
  private msisdn: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private userSessionService: UserSessionService,
    private registrationService: RegistrationService,
    private eventsService: EventsService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('PinCodeViewService');

    this.route.params.subscribe(params => {
      this.msisdn = params.msisdn;
    });
  }

  public handleRegistration = (sessionId: string, token: string): Observable<PinCodeServiceStatus> =>
    this.registrationService
      .confirmVerificationRoute({ sessionId, token })
      .pipe(mergeMap(() => fromPromise(this.purgeSessionCache())))
      .pipe(tap(this.redirectToSetPassword))
      .pipe(catchError(err => of(this.handleCheckPinCodeError(err))));

  // tslint:disable:cyclomatic-complexity
  private handleCheckPinCodeError = (err: HttpErrorResponse): PinCodeServiceStatus => {
    const error = err.error;

    if (isBackendError(error)) {
      switch (error.code) {
        case BackendErrors.CreateAnotherPinCodeTokenRecently:
          this.alertService.pushDangerAlert(Alerts.CreateAnotherPinCodeTokenTooRecently);
          return PinCodeServiceStatus.CREATE_MSISDN_TOKEN_TOO_RECENTLY;

        case BackendErrors.MsisdnVerificationTokenIncorrect:
          return PinCodeServiceStatus.MSISDN_VERIFICATION_TOKEN_INCORRECT;

        case BackendErrors.CannotFindMsisdnToken:
          return PinCodeServiceStatus.CAN_NOT_FIND_MSISDN_TOKEN;

        case BackendErrors.IncorrectValidation:
          return PinCodeServiceStatus.INVALID;

        case BackendErrors.TooManyMsisdnTokenAttempts:
          return PinCodeServiceStatus.TOO_MANY_MSISDN_TOKEN_ATTEMPTS;

        case BackendErrors.PincodeSentTooRecently:
          this.alertService.pushDangerAlert(Alerts.PincodeSentTooRecently);
          return PinCodeServiceStatus.CREATE_MSISDN_TOKEN_TOO_RECENTLY;

        default:
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.logger.error('Unhandled backend pin code error', error);
          return PinCodeServiceStatus.ERROR;
      }
    } else {
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      this.logger.warn('Error when handling pin code', error);
      return PinCodeServiceStatus.ERROR;
    }
  };

  private purgeSessionCache = (): Promise<PinCodeServiceStatus> =>
    this.userSessionService.getSession(true).then(() => {
      this.eventsService.emit('login');

      return PinCodeServiceStatus.SUCCESS;
    });

  private redirectToSetPassword = (): Promise<void> =>
    this.router.navigate(['/account/set-password']).then(isRedirectSuccessful => {
      if (!isRedirectSuccessful) {
        this.logger.warn('Error when redirect to account/set-password');
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
      }
    });
}
