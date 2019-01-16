// tslint:disable:newline-before-return
import { Observable, EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { GetSessionWithAccount, PostRecoverPassword, RecoverPasswordService } from '@anymind-ng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { BackendErrors, isBackendError } from '@platform/shared/models/backend-error/backend-error';
import { HttpErrorResponse } from '@angular/common/http';
import { RegistrationInvitationService } from '@platform/shared/services/registration-invitation/registration-invitation.service';
import { RouterPaths } from '@platform/shared/routes/routes';
import { SetNewPasswordActions } from '@platform/core/actions';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { InputSetPasswordErrors } from '@platform/shared/components/inputs/input-set-password/input-set-password.component';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class SetNewPasswordFromEmailViewService {
  private readonly clientAppType?: PostRecoverPassword.ClientAppTypeEnum;
  private readonly token: string;
  private logger: LoggerService;

  constructor(
    private router: Router,
    private recoverPasswordService: RecoverPasswordService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private store: Store<fromCore.IState>,
    private registrationInvitationService: RegistrationInvitationService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('SetNewPasswordFromEmailViewService');
    this.token = this.route.snapshot.params.token;
    this.clientAppType = this.route.snapshot.queryParams.clientAppType;
  }

  public handleNewPassword(passwordControl: AbstractControl): Observable<GetSessionWithAccount> {
    return this.recoverPasswordService
      .putRecoverPasswordEmailRoute({ token: this.token, password: passwordControl.value })
      .pipe(
        tap(session => {
          this.store.dispatch(new SetNewPasswordActions.SetNewPasswordSuccessAction(session));
          this.determinateRedirectPath();
        }),
      )
      .pipe(catchError(err => this.handleSetNewPasswordError(err, passwordControl)));
  }

  private determinateRedirectPath(): void {
    if (this.clientAppType === PostRecoverPassword.ClientAppTypeEnum.WIDGET) {
      this.redirect('/forgot-password/widget-information');
      return;
    }

    const invitationObject = this.registrationInvitationService.getInvitationObject();
    this.alertService.pushSuccessAlert(Alerts.ChangePasswordSuccess);
    invitationObject !== void 0 && invitationObject.token !== void 0
      ? this.redirect(`/invitations/${invitationObject.token}`)
      : this.redirect(RouterPaths.dashboard.user.welcome.asPath);
  }

  private handleSetNewPasswordError(
    httpError: HttpErrorResponse,
    passwordControl: AbstractControl,
  ): Observable<GetSessionWithAccount> {
    const error = httpError.error;

    if (isBackendError(error)) {
      switch (error.code) {
        case BackendErrors.CannotFindEmailToken:
          this.logger.warn('Email verification password token is not correct', httpError);
          this.alertService.pushDangerAlert(Alerts.CannotFindEmailToken);
          this.redirect('/login');
          break;

        case BackendErrors.IncorrectValidation:
          this.displayIncorrectPasswordError(passwordControl);
          break;

        case BackendErrors.IncorrectRequest:
          this.displayIncorrectPasswordError(passwordControl);
          break;

        default:
          this.logger.error('Unhandled backend error ', httpError);
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      }
    } else {
      this.logger.warn('Error when handling password', httpError);
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    }

    return EMPTY;
  }

  private displayIncorrectPasswordError(control: AbstractControl): void {
    control.setErrors({ [InputSetPasswordErrors.IncorrectPassword]: true });
    control.markAsTouched();
  }

  private redirect(url: string): void {
    this.router.navigate([url]).catch(() => {
      this.logger.warn(`Error when redirect to ${url}`);
    });
  }
}
