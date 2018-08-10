// tslint:disable:newline-before-return
import { Observable } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { RecoverPasswordService } from '@anymind-ng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { of } from 'rxjs/observable/of';
import { BackendErrors, isBackendError } from '../../../../shared/models/backend-error/backend-error';
import { HttpErrorResponse } from '@angular/common/http';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { LocalStorageWrapperService } from '../../../../shared/services/local-storage/local-storage.service';
import { RegistrationInvitationService } from '../../../../shared/services/registration-invitation/registration-invitation.service';

export enum SetNewPasswordFromEmailStatus {
  SUCCESS,
  INVALID,
  NO_TOKEN,
  ERROR,
}

@Injectable()
export class SetNewPasswordFromEmailViewService {
  private logger: LoggerService;
  private msisdn: string;
  private token: string;

  constructor(
    private router: Router,
    private userSessionService: UserSessionService,
    private recoverPasswordService: RecoverPasswordService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private localStorageWrapperService: LocalStorageWrapperService,
    private registrationInvitationService: RegistrationInvitationService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('SetNewPasswordFromEmailViewService');
    this.msisdn = this.route.snapshot.data.msisdn;
    this.token = this.route.snapshot.params.token;
  }

  public handleNewPassword = (password: string): Observable<SetNewPasswordFromEmailStatus> =>
    this.recoverPasswordService
      .putRecoverPasswordEmailRoute({ token: this.token, password })
      .pipe(mergeMap(() => fromPromise(this.login(this.msisdn, password))))
      .pipe(mergeMap(this.determinateRedirectPath))
      .pipe(catchError(err => of(this.handleSetNewPasswordError(err))));

  private login = (msisdn: string, password: string): Promise<SetNewPasswordFromEmailStatus> =>
    this.userSessionService.login({ msisdn, password }).then(() => SetNewPasswordFromEmailStatus.SUCCESS);

  private redirectToDashboard = (): Promise<SetNewPasswordFromEmailStatus> =>
    this.router.navigate(['/dashboard/expert/activities']).then(isRedirectSuccessful => {
      if (!isRedirectSuccessful) {
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
        this.logger.warn('Error when redirect to dashboard/expert/activities');
        return SetNewPasswordFromEmailStatus.ERROR;
      } else {
        return SetNewPasswordFromEmailStatus.SUCCESS;
      }
    });

  private redirectToInvitations = (token: string): Promise<SetNewPasswordFromEmailStatus> =>
    this.router.navigate([`/invitations/${token}`]).then(isRedirectSuccessful => {
      if (!isRedirectSuccessful) {
        this.localStorageWrapperService.removeItem('invitation');
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
        this.logger.warn('Error when redirect to invitation');
        return SetNewPasswordFromEmailStatus.ERROR;
      } else {
        return SetNewPasswordFromEmailStatus.SUCCESS;
      }
    });

  private determinateRedirectPath = (): Promise<SetNewPasswordFromEmailStatus> => {
    const invitationObject = this.registrationInvitationService.getInvitationObject();
    this.alertService.pushSuccessAlert(Alerts.ChangePasswordSuccess);

    return invitationObject !== void 0 && invitationObject.token !== void 0
      ? this.redirectToInvitations(invitationObject.token)
      : this.redirectToDashboard();
  };

  private handleSetNewPasswordError = (httpError: HttpErrorResponse): SetNewPasswordFromEmailStatus => {
    const error = httpError.error;

    if (isBackendError(error)) {
      switch (error.code) {
        case BackendErrors.CannotFindEmailToken:
          this.logger.warn('Email verification password token is not correct', httpError);
          return SetNewPasswordFromEmailStatus.NO_TOKEN;

        case BackendErrors.IncorrectValidation:
          return SetNewPasswordFromEmailStatus.INVALID;

        case BackendErrors.IncorrectRequest:
          return SetNewPasswordFromEmailStatus.ERROR;

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
  };
}
