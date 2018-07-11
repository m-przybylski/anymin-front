// tslint:disable:prefer-template
// tslint:disable:newline-before-return
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { Alerts, AlertService, LoggerFactory, LoggerService  } from '@anymind-ng/core';
import { BackendErrors, isBackendError } from '../../../../shared/models/backend-error/backend-error';
import {
  RegistrationInvitationService
} from '../../../../shared/services/registration-invitation/registration-invitation.service';
import { LocalStorageWrapperService } from '../../../../shared/services/local-storage/local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';

export enum PasswordLoginStatus {
  SUCCESS,
  ERROR,
  WRONG_PASSWORD,
  TOO_MANY_ATTEMPTS,
  SUCCESS_WITH_INVITATION
}

@Injectable()
export class PasswordViewService {

  private logger: LoggerService;

  constructor(private userSessionService: UserSessionService,
              private router: Router,
              private registrationInvitationService: RegistrationInvitationService,
              private alertService: AlertService,
              private localStorageWrapperService: LocalStorageWrapperService,
              loggerFactory: LoggerFactory) {

    this.logger = loggerFactory.createLoggerService('PasswordViewService');
  }

  public login = (msisdn: string, password: string): Promise<PasswordLoginStatus> =>
    this.userSessionService.login({msisdn, password})
      .then(this.determinateRedirectPath)
      .catch(this.handlePasswordStatus)

  private redirectToDashboard = (): Promise<PasswordLoginStatus> =>
    this.router.navigate(['/dashboard/expert/activities'])
      .then(isRedirectSuccessful => {
        if (!isRedirectSuccessful) {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
          this.logger.warn('Error when redirect to dashboard/expert/activities');
          return PasswordLoginStatus.ERROR;
        } else {
          this.alertService.pushSuccessAlert(Alerts.UserLoggedIn);
          return PasswordLoginStatus.SUCCESS;
        }
      })

  private redirectToInvitations = (token: string): Promise<PasswordLoginStatus> =>
    this.router.navigate(['/invitations/' + token])
      .then(isRedirectSuccessful => {
        if (!isRedirectSuccessful) {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
          this.logger.warn('Error when redirect to invitations');
          return PasswordLoginStatus.ERROR;
        } else {
          this.alertService.pushSuccessAlert(Alerts.UserLoggedIn);
          this.localStorageWrapperService.removeItem('invitation');
          return PasswordLoginStatus.SUCCESS_WITH_INVITATION;
        }
      })

  private handlePasswordStatus = (httpError: HttpErrorResponse): PasswordLoginStatus => {
    const err = httpError.error;

    if (isBackendError(err)) {
      switch (err.code) {
        case BackendErrors.IncorrectValidation:
          return PasswordLoginStatus.WRONG_PASSWORD;

        case BackendErrors.BadAuthenticationCredentials:
          return PasswordLoginStatus.WRONG_PASSWORD;

        case BackendErrors.MsisdnBlocked:
          this.router.navigate(['/login/blocked']).then(isRedirectSuccessful => {
            if (!isRedirectSuccessful) {
              this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
              this.logger.warn('Error when redirect to login/blocked');
            }
          });
          break;

        case BackendErrors.ToManyIncorrectPasswordAttempts:
          return PasswordLoginStatus.TOO_MANY_ATTEMPTS;

        default:
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.logger.error('Unhandled backend error status when userSessionService', err);
          return PasswordLoginStatus.ERROR;
      }
    } else {
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      this.logger.warn('Error when handling password', httpError);
      return PasswordLoginStatus.ERROR;
    }

    throw err;
  }

  private determinateRedirectPath = (): Promise<PasswordLoginStatus> => {
    const invitationObject = this.registrationInvitationService.getInvitationObject();

    return invitationObject !== void 0 && invitationObject.token !== void 0
      ? this.redirectToInvitations(invitationObject.token) : this.redirectToDashboard();
  }

}
