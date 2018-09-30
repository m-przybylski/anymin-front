// tslint:disable:newline-before-return
import { Observable, of, from } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { RecoverPasswordService } from '@anymind-ng/api';
import { Router } from '@angular/router';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { Injectable } from '@angular/core';
import { LoggerFactory, LoggerService, Alerts, AlertService } from '@anymind-ng/core';
import { LocalStorageWrapperService } from '../../../../shared/services/local-storage/local-storage.service';
import { RegistrationInvitationService } from '../../../../shared/services/registration-invitation/registration-invitation.service';
import { BackendErrors, isBackendError } from '../../../../shared/models/backend-error/backend-error';
import { HttpErrorResponse } from '@angular/common/http';

export enum SetNewPasswordFromMsisdnStatus {
  SUCCESS,
  INVALID,
  NO_TOKEN,
  ERROR,
}

@Injectable()
export class SetNewPasswordFromMsisdnViewService {
  private logger: LoggerService;

  constructor(
    private router: Router,
    private userSessionService: UserSessionService,
    private recoverPasswordService: RecoverPasswordService,
    private alertService: AlertService,
    private registrationInvitationService: RegistrationInvitationService,
    private localStorageWrapperService: LocalStorageWrapperService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('SetNewPasswordFromMsisdnViewService');
  }

  public handleNewPassword = (
    msisdn: string,
    token: string,
    password: string,
  ): Observable<SetNewPasswordFromMsisdnStatus> =>
    this.recoverPasswordService
      .putRecoverPasswordMsisdnRoute({ msisdn, token, password })
      .pipe(mergeMap(() => from(this.login(msisdn, password))))
      .pipe(mergeMap(this.determinateRedirectPath))
      .pipe(catchError(this.handlePutRecoverPasswordMsisdnRoute));

  private login = (msisdn: string, password: string): Promise<SetNewPasswordFromMsisdnStatus> =>
    this.userSessionService.login({ msisdn, password }).then(() => SetNewPasswordFromMsisdnStatus.SUCCESS);

  private handlePutRecoverPasswordMsisdnRoute = (
    httpError: HttpErrorResponse,
  ): Observable<SetNewPasswordFromMsisdnStatus> => {
    const err = httpError.error;

    if (isBackendError(err)) {
      switch (err.code) {
        case BackendErrors.IncorrectValidation:
          return of(SetNewPasswordFromMsisdnStatus.INVALID);

        case BackendErrors.CannotFindMsisdnToken:
          this.alertService.pushDangerAlert(Alerts.CannotFindMsisdnToken);
          return of(SetNewPasswordFromMsisdnStatus.NO_TOKEN);

        default:
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.logger.error('Error when handling password recover msisdn route ', err);
          return of(SetNewPasswordFromMsisdnStatus.ERROR);
      }
    } else {
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      this.logger.warn('Error when handling phone recover msisdn route', httpError);
      return of(SetNewPasswordFromMsisdnStatus.ERROR);
    }
  };

  private redirectToDashboard = (): Promise<SetNewPasswordFromMsisdnStatus> =>
    this.router.navigate(['/dashboard/expert/activities']).then(isRedirectSuccessful => {
      if (!isRedirectSuccessful) {
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
        this.logger.warn('Error when redirect to dashboard/expert/activities');
        return SetNewPasswordFromMsisdnStatus.ERROR;
      } else {
        return SetNewPasswordFromMsisdnStatus.SUCCESS;
      }
    });

  private redirectToInvitations = (token: string): Promise<SetNewPasswordFromMsisdnStatus> =>
    this.router.navigate([`/invitations/${token}`]).then(isRedirectSuccessful => {
      if (!isRedirectSuccessful) {
        this.localStorageWrapperService.removeItem('invitation');
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
        this.logger.warn('Error when redirect to inviation');
        return SetNewPasswordFromMsisdnStatus.ERROR;
      } else {
        return SetNewPasswordFromMsisdnStatus.SUCCESS;
      }
    });

  private determinateRedirectPath = (): Promise<SetNewPasswordFromMsisdnStatus> => {
    const invitationObject = this.registrationInvitationService.getInvitationObject();
    this.alertService.pushSuccessAlert(Alerts.ChangePasswordSuccess);

    return invitationObject !== void 0 && invitationObject.token !== void 0
      ? this.redirectToInvitations(invitationObject.token)
      : this.redirectToDashboard();
  };
}
