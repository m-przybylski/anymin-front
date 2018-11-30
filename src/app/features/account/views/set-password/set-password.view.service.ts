// tslint:disable:strict-boolean-expressions
// tslint:disable:prefer-template
// tslint:disable:newline-before-return
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@anymind-ng/api';
import { catchError, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LoggerFactory, LoggerService, Alerts, AlertService } from '@anymind-ng/core';
import { RegistrationInvitationService } from '../../../../shared/services/registration-invitation/registration-invitation.service';
import { IInvitationObject } from '../../../../../angularjs/app/invitations/invitation.interface';
import { BackendErrors, isBackendError } from '../../../../shared/models/backend-error/backend-error';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterPaths } from '@platform/shared/routes/routes';

export enum SetPasswordStatus {
  SUCCESS,
  INVALID_PASSWORD,
  ERROR,
}

@Injectable()
export class SetPasswordViewService {
  private logger: LoggerService;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private registrationInvitationService: RegistrationInvitationService,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('SetPasswordViewService');
  }

  public setPassword = (accountId: string, password: string): Observable<SetPasswordStatus> => {
    const invitationObject = this.registrationInvitationService.getInvitationObject();
    const invitationEmail =
      this.isInvitationByEmail(invitationObject) && invitationObject ? invitationObject.email : undefined;

    return this.isInvitationByEmail(invitationObject) && invitationEmail !== void 0
      ? this.checkIsEmailExists(invitationEmail)
          .pipe(mergeMap(() => this.setPasswordWithoutInvitation(accountId, password)))
          .pipe(catchError(() => this.setPasswordByInvitation(accountId, password)))
      : this.setPasswordWithoutInvitation(accountId, password);
  };
  private redirectToSetEmail = (): Promise<SetPasswordStatus> =>
    this.router.navigate(['/account/set-email']).then(isRedirectSuccessful => {
      if (!isRedirectSuccessful) {
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
        this.logger.warn('Error when redirect to account/set-email');
        return SetPasswordStatus.ERROR;
      } else {
        this.alertService.pushSuccessAlert(Alerts.SetPasswordViewSuccess);
        return SetPasswordStatus.SUCCESS;
      }
    });

  private redirectToInvitations = (): Promise<SetPasswordStatus> =>
    this.router.navigate([RouterPaths.dashboard.user.invitations.asPath]).then(isRedirectSuccessful => {
      if (!isRedirectSuccessful) {
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
        this.logger.warn('Error when redirect to invitations');
        return SetPasswordStatus.ERROR;
      } else {
        this.alertService.pushSuccessAlert(Alerts.UserLoggedIn);
        return SetPasswordStatus.SUCCESS;
      }
    });

  private handleSetPasswordError = (httpError: HttpErrorResponse): SetPasswordStatus => {
    const err = httpError.error;
    if (isBackendError(err)) {
      switch (err.code) {
        case BackendErrors.IncorrectValidation:
          return SetPasswordStatus.INVALID_PASSWORD;

        default:
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.logger.warn('Unhandled set password status ');
          return SetPasswordStatus.ERROR;
      }
    } else {
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      this.logger.warn('Error when set password', err);
      return SetPasswordStatus.ERROR;
    }
  };

  private handleVerifyTokenError = (err: HttpErrorResponse): Observable<SetPasswordStatus> => {
    this.logger.warn('Error when verify email by token', err);
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    return of(SetPasswordStatus.ERROR);
  };

  private handleSetPasswordByInvitationError = (err: HttpErrorResponse): Observable<SetPasswordStatus> => {
    this.logger.warn('Error when setting password with invitation', err);
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    return of(SetPasswordStatus.ERROR);
  };

  private checkIsEmailExists = (email: string): Observable<SetPasswordStatus> =>
    this.accountService.getAccountEmailExistsRoute(email);

  private isInvitationByEmail = (invitation?: IInvitationObject): boolean =>
    invitation !== void 0 && invitation.email !== void 0;

  private verifyEmailByToken = (token: string): Observable<SetPasswordStatus> =>
    this.accountService
      .postConfirmEmailViaInvitationRoute(token)
      .pipe(mergeMap(() => this.redirectToInvitations()))
      .pipe(catchError(this.handleVerifyTokenError));

  private setPasswordByInvitation = (accountId: string, password: string): Observable<SetPasswordStatus> => {
    const invitationObject = this.registrationInvitationService.getInvitationObject();
    const invitationEmail =
      this.isInvitationByEmail(invitationObject) && invitationObject ? invitationObject.email : undefined;
    const token = invitationObject ? invitationObject.token : '';

    return this.accountService
      .patchUpdateAccountRoute(accountId, {
        password,
        unverifiedEmail: invitationEmail,
      })
      .pipe(mergeMap(() => this.verifyEmailByToken(token)))
      .pipe(catchError(this.handleSetPasswordByInvitationError));
  };

  private setPasswordWithoutInvitation = (accountId: string, password: string): Observable<SetPasswordStatus> =>
    this.accountService
      .patchUpdateAccountRoute(accountId, { password })
      .pipe(mergeMap(this.redirectToSetEmail))
      .pipe(catchError(err => of(this.handleSetPasswordError(err))));
}
