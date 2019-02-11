import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { map, take, switchMap, catchError, tap } from 'rxjs/operators';
import { AccountService, GetInvitation, InvitationService, Account } from '@anymind-ng/api';
import { RegistrationInvitationService } from '@platform/shared/services/registration-invitation/registration-invitation.service';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { RouterPaths } from '@platform/shared/routes/routes';
import { AuthActions } from '@platform/core/actions';
import { HttpErrorResponse } from '@angular/common/http';
import { isUserLogged } from '@platform/shared/guards/session.helper';
import { BackendErrors, isBackendError } from '@platform/shared/models/backend-error/backend-error';

interface IInvitationData {
  token: string;
  invitation: GetInvitation;
}

@Injectable()
export class InvitationsGuard extends Logger implements CanActivate {
  constructor(
    private store: Store<fromCore.IState>,
    private router: Router,
    private alertService: AlertService,
    private accountService: AccountService,
    private registrationInvitationService: RegistrationInvitationService,
    private invitationService: InvitationService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('InvitationsGuard'));
  }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.pipe(
      isUserLogged(),
      switchMap((isLoggedIn: boolean) => {
        const token = route.params.token;

        return this.invitationService.getInvitationRoute(token).pipe(
          switchMap(invitation => this.determinatePathToRedirect(isLoggedIn, { token, invitation })),
          map(() => false),
          catchError((error: HttpErrorResponse) => {
            this.alertService.pushDangerAlert('INVITATIONS.INVITE_DOES_NOT_EXIST');
            this.store.dispatch(new AuthActions.LoginRedirectAction());
            this.loggerService.debug('Invitation does not exist', error);

            return of(false);
          }),
        );
      }),
      take(1),
    );
  }

  private determinatePathToRedirect(isLoggedIn: boolean, invitationData: IInvitationData): Observable<Account> {
    return this.accountService.postEmailConfirmInvitationRoute({ token: invitationData.token }).pipe(
      catchError(httpError => {
        // if user has account and already confirmed email
        if (isBackendError(httpError.error) && httpError.error.code === BackendErrors.AccountAlreadyconfirmedEmail) {
          // if user is logged in - redirect to invitations
          if (isLoggedIn) {
            this.redirect(RouterPaths.dashboard.user.invitations.asPath, invitationData);

            return EMPTY;
          } else {
            // if user is logged out - redirect to login
            this.redirect('/login', invitationData);

            return EMPTY;
          }
        }
        // if user does not have account - redirect to register route
        if (isBackendError(httpError.error) && httpError.error.code === BackendErrors.NoSuchAccount) {
          this.redirect('/register', invitationData);

          return EMPTY;
        }

        // if something goes wrong with request - redirect to login route
        this.redirect('/login', invitationData);

        return throwError(httpError);
      }),
      tap(() => {
        // when email confirmation succeed
        isLoggedIn
          ? // user is logged in - redirect to invitations
            this.redirect(RouterPaths.dashboard.user.invitations.asPath, invitationData)
          : // user is logged out - redirect to login
            this.redirect('/login', invitationData);

        return of();
      }),
    );
  }

  private redirect(url: string, invitationData: IInvitationData): void {
    this.router.navigate([url]).then(isRedirectSuccessful => {
      if (!isRedirectSuccessful) {
        this.loggerService.warn(`Error when redirect to ${url}`);
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
      } else {
        this.registrationInvitationService.setInvitationObject({
          token: invitationData.token,
          id: invitationData.invitation.id,
          msisdn: invitationData.invitation.msisdn,
          email: invitationData.invitation.email,
        });
      }
    });
  }
}
