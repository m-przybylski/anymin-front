// tslint:disable:strict-boolean-expressions
// tslint:disable:prefer-template
// tslint:disable:newline-before-return
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@anymind-ng/api';
import { catchError, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RegistrationInvitationService } from '@platform/shared/services/registration-invitation/registration-invitation.service';
import { BackendErrors, isBackendError } from '@platform/shared/models/backend-error/backend-error';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggerFactory, LoggerService, Alerts, AlertService } from '@anymind-ng/core';
import { RouterPaths } from '@platform/shared/routes/routes';

export enum SetEmailStatus {
  SUCCESS,
  INVALID,
  ALREADY_EXIST,
  ERROR,
}

@Injectable()
export class SetEmailViewService {
  private logger: LoggerService;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private alertService: AlertService,
    private registrationInvitationService: RegistrationInvitationService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('SetEmailViewService');
  }

  public setEmail = (accountId: string, email: string): Observable<SetEmailStatus> =>
    this.accountService
      .patchUpdateAccountRoute(accountId, { unverifiedEmail: email })
      .pipe(mergeMap(this.determinateRedirectPath))
      .pipe(catchError(this.handleSetEmailError));

  private handleSetEmailError = (err: HttpErrorResponse): Observable<SetEmailStatus> => {
    const error = err.error;

    if (isBackendError(error)) {
      switch (error.code) {
        case BackendErrors.IncorrectValidation:
          return of(SetEmailStatus.INVALID);

        case BackendErrors.EmailAlreadyExists:
          return of(SetEmailStatus.ALREADY_EXIST);

        default:
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.logger.error('Unhandled backend status when getting session', err);
          return of(SetEmailStatus.ERROR);
      }
    } else {
      this.logger.debug('error when setting email first time', err);
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      return of(SetEmailStatus.ERROR);
    }
  };

  private redirectToDashboard = (): Promise<SetEmailStatus> =>
    this.router.navigate([RouterPaths.dashboard.user.welcome.asPath]).then(isRedirectSuccessful => {
      if (!isRedirectSuccessful) {
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
        this.logger.warn('Error when redirect to dashboard/expert/activities');
        return SetEmailStatus.ERROR;
      } else {
        this.alertService.pushSuccessAlert(Alerts.SetEmailViewSuccess);
        return SetEmailStatus.SUCCESS;
      }
    });

  private redirectToInvitations = (): Promise<SetEmailStatus> =>
    this.router.navigate([RouterPaths.dashboard.user.invitations.asPath]).then(isRedirectSuccessful => {
      if (!isRedirectSuccessful) {
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
        this.logger.warn('Error when redirect to /invitations');
        return SetEmailStatus.ERROR;
      } else {
        this.alertService.pushSuccessAlert(Alerts.SetEmailViewSuccess);
        return SetEmailStatus.SUCCESS;
      }
    });

  private determinateRedirectPath = (): Promise<SetEmailStatus> => {
    const invitationObject = this.registrationInvitationService.getInvitationObject();

    return invitationObject && invitationObject.token ? this.redirectToInvitations() : this.redirectToDashboard();
  };
}
