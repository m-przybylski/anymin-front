// tslint:disable:newline-before-return
import { throwError, Observable } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { GetSessionWithAccount, PostRecoverPassword, RecoverPasswordService } from '@anymind-ng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoggerFactory, LoggerService, Alerts, AlertService } from '@anymind-ng/core';
import { RegistrationInvitationService } from '@platform/shared/services/registration-invitation/registration-invitation.service';
import { BackendErrors, isBackendError } from '@platform/shared/models/backend-error/backend-error';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterPaths } from '@platform/shared/routes/routes';
import { MsisdnHelperService } from '@platform/core/services/msisdn-helper/msisdn-helper.service';
import { AbstractControl } from '@angular/forms';
import { InputSetPasswordErrors } from '@platform/shared/components/inputs/input-set-password/input-set-password.component';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { SetNewPasswordActions, ForgotPasswordActions } from '@platform/core/actions';
import { UserSessionService } from '@platform/core/services/user-session/user-session.service';

@Injectable()
export class SetNewPasswordFromMsisdnViewService {
  private readonly msisdn: string;
  private readonly clientAppType?: PostRecoverPassword.ClientAppTypeEnum;
  private logger: LoggerService;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recoverPasswordService: RecoverPasswordService,
    private alertService: AlertService,
    private msisdnHelper: MsisdnHelperService,
    private registrationInvitationService: RegistrationInvitationService,
    private userSessionService: UserSessionService,
    private store: Store<fromCore.IState>,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('SetNewPasswordFromMsisdnViewService');
    this.msisdn = this.msisdnHelper.addPlusToPhoneNumber(this.route.snapshot.params.msisdn);
    this.clientAppType = this.route.snapshot.queryParams.clientAppType;
  }

  public setNewPassword(passwordControl: AbstractControl): Observable<GetSessionWithAccount> {
    return this.store.pipe(
      select(fromCore.getForgotPasswordMsisdnToken),
      /**
       * checking this is only for types reason, we are sure that there is msisdnToken
       * SetNewPasswordFromMsisdnViewGuard takes care of it
       */
      filter(msisdnToken => typeof msisdnToken !== 'undefined'),
      take(1),
      switchMap((msisdnToken: string) =>
        this.recoverPasswordService
          .putRecoverPasswordMsisdnRoute({
            token: msisdnToken,
            msisdn: this.msisdn,
            password: passwordControl.value,
          })
          .pipe(
            tap(session => {
              this.store.dispatch(new SetNewPasswordActions.SetNewPasswordSuccessAction(session));
              this.determinateRedirectPath();
              this.userSessionService.removeAllSessionsExceptCurrent();
              this.store.dispatch(new ForgotPasswordActions.UnsetMsisdnTokenAction());
            }),
            catchError(err => this.handleSetNewPasswordError(err, passwordControl)),
          ),
      ),
    );
  }

  public getMsisdn(): string {
    return this.msisdn;
  }

  private handleSetNewPasswordError(
    httpError: HttpErrorResponse,
    passwordControl: AbstractControl,
  ): Observable<GetSessionWithAccount> {
    const err = httpError.error;

    if (isBackendError(err)) {
      switch (err.code) {
        case BackendErrors.IncorrectValidation:
          this.displayIncorrectPasswordError(passwordControl);
          break;

        case BackendErrors.CannotFindMsisdnToken:
          this.alertService.pushDangerAlert(Alerts.CannotFindMsisdnToken);
          break;

        default:
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.logger.error('Error when handling password recover', err);
      }
    } else {
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      this.logger.warn('Error when handling phone recover', httpError);
    }
    return throwError('error when try to set new password');
  }

  private determinateRedirectPath(): void {
    if (this.clientAppType === PostRecoverPassword.ClientAppTypeEnum.WIDGET) {
      this.redirect('/forgot-password/widget-information');
      return;
    }
    const invitationObject = this.registrationInvitationService.getInvitationObject();
    this.alertService.pushSuccessAlert(Alerts.ChangePasswordSuccess);
    invitationObject !== undefined
      ? this.redirect(`/invitations/${invitationObject.token}`)
      : this.redirect(RouterPaths.dashboard.user.welcome.asPath);
  }

  private displayIncorrectPasswordError(control: AbstractControl): void {
    control.setErrors({ [InputSetPasswordErrors.IncorrectPassword]: true });
    control.markAsTouched();
  }

  private redirect(url: string): void {
    this.router.navigate([url]).then(isRedirectSuccessful => {
      if (!isRedirectSuccessful) {
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
        this.logger.warn(`Error when redirect to ${url}`);
      }
    });
  }
}
