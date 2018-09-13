// tslint:disable:newline-before-return
import { Injectable } from '@angular/core';
import { LoggerFactory, LoggerService, Alerts, AlertService } from '@anymind-ng/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { RegistrationService } from '@anymind-ng/api';
import { Observable, of } from 'rxjs';
import { BackendErrors, isBackendError } from '@platform/shared/models/backend-error/backend-error';
import { HttpErrorResponse } from '@angular/common/http';
import { EventsService } from '../../../../../angularjs/common/services/events/events.service';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { SessionActions } from '@platform/core/actions';

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
    private store: Store<fromCore.IState>,
    private alertService: AlertService,
    private registrationService: RegistrationService,
    private eventsService: EventsService,
    private router: Router,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('PinCodeViewService');

    this.route.params.subscribe(params => {
      this.msisdn = params.msisdn;
    });
  }

  public handleRegistration = (sessionId: string, token: string): Observable<PinCodeServiceStatus> =>
    this.registrationService.confirmVerificationRoute({ sessionId, token }).pipe(
      map(session => {
        this.store.dispatch(new SessionActions.FetchSessionSuccessAction(session));
        this.eventsService.emit('login');
        this.redirectToSetPassword();

        return PinCodeServiceStatus.SUCCESS;
      }),
      catchError(error => of(this.handleCheckPinCodeError(error))),
    );

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
  private redirectToSetPassword = (): void => {
    this.router
      .navigate(['/account/set-password'])
      .then(isRedirectSuccessful => {
        if (!isRedirectSuccessful) {
          this.logger.warn('Error when redirect to account/set-password');
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
        }
      })
      .catch(err => {
        this.logger.error('Error when redirect to account/set-password', err);
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      });
  };
}
