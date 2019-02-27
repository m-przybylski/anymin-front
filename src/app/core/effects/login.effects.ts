import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, concat, from, Observable, Observer } from 'rxjs';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { AuthActions, RegisterActions, SetNewPasswordActions } from '@platform/core/actions';
import { GetSessionWithAccount, SessionService } from '@anymind-ng/api';
import { Router } from '@angular/router';
import { Logger } from '@platform/core/logger';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { RouterPaths } from '@platform/shared/routes/routes';
import { CallInvitationService } from '@platform/core/services/call/call-invitation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationInvitationService } from '@platform/shared/services/registration-invitation/registration-invitation.service';
import { TranslateService } from '@ngx-translate/core';

const EMPTY_ACTION = of({ type: 'NO_ACTION' });

@Injectable()
export class LoginEffects extends Logger {
  @Effect()
  public login$ = this.actions$.pipe(
    ofType<AuthActions.LoginAction>(AuthActions.AuthActionTypes.Login),
    map(action => action.payload),
    switchMap(loginCredentials =>
      this.sessionService.login(loginCredentials).pipe(
        switchMap(session =>
          from([new AuthActions.LoginSuccessAction(session), new AuthActions.DashboardRedirectAction(session)]),
        ),
        catchError(error => of(new AuthActions.LoginErrorAction(error))),
      ),
    ),
  );

  @Effect({ dispatch: false })
  public loginRedirect$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LoginRedirect),
    tap(() => {
      this.loggerService.debug('Redirecting to login page');
      this.redirect('/login');
    }),
  );

  @Effect()
  public logout$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.Logout),
    switchMap(() =>
      concat(
        this.callInvitationService.unregisterFromPushNotifications(),
        this.sessionService.logoutCurrentRoute().pipe(
          map(() => new AuthActions.LogoutSuccessAction()),
          catchError(error => of(new AuthActions.LogoutErrorAction(error))),
        ),
      ),
    ),
  );

  @Effect()
  public logoutSuccess$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LogoutSuccess, AuthActions.AuthActionTypes.LogoutRemote),
    tap(() => {
      this.alertService.closeAllAlerts();
      this.ngbModal.dismissAll();
    }),
    switchMap(() => of(new AuthActions.LoginRedirectAction())),
  );

  @Effect({ dispatch: false })
  public dashboardRedirect$ = this.actions$.pipe(
    ofType<AuthActions.DashboardRedirectAction>(
      AuthActions.AuthActionTypes.DashboardRedirect,
      RegisterActions.RegisterActionsTypes.RedirectToDashboardInvitations,
    ),
    map(action => action.payload),
    this.handleInvitation(),
  );

  @Effect({ dispatch: false })
  public loginSuccess$ = this.actions$.pipe(
    ofType<AuthActions.LoginSuccessAction>(AuthActions.AuthActionTypes.LoginSuccess),
    map(action => action.payload),
    tap(sessionWithAccount => {
      this.translateService.use(sessionWithAccount.account.language);
    }),
  );

  @Effect({ dispatch: false })
  public dashboardRedirectOnSetNewPassword$ = this.actions$.pipe(
    ofType<SetNewPasswordActions.SetNewPasswordRedirectDashboardAction>(
      SetNewPasswordActions.SetNewPasswordActionsTypes.SetNewPasswordRedirectDashboard,
    ),
    map(action => action.payload.session),
    this.handleInvitation(),
  );

  @Effect()
  public dashboardRedirectAfterRegister$ = this.actions$.pipe(
    ofType(RegisterActions.RegisterActionsTypes.RedirectToDashboardActivities),
    switchMap(() => {
      this.loggerService.debug('Redirecting to dashboard');

      return Observable.create((observer: Observer<any>) => {
        this.router
          .navigate([RouterPaths.dashboard.user.activities.client.asPath])
          .then(redirectSuccess => {
            if (redirectSuccess) {
              this.loggerService.debug('Redirecting to dashboard success');

              return new AuthActions.FirstLoginAfterRegistrationAction();
            } else {
              this.loggerService.warn('Redirecting to dashboard failed');

              return EMPTY_ACTION;
            }
          })
          .catch(() => EMPTY_ACTION)
          .then((action: any) => {
            observer.next(action);
            observer.complete();
          });
      });
    }),
  );

  constructor(
    private actions$: Actions,
    private sessionService: SessionService,
    private router: Router,
    private alertService: AlertService,
    private callInvitationService: CallInvitationService,
    private ngbModal: NgbModal,
    private registrationInvitationService: RegistrationInvitationService,
    private translateService: TranslateService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('LoginEffects'));
  }

  private redirect(url: string): void {
    this.router
      .navigate([url])
      .then(success => {
        if (success) {
          this.loggerService.debug(`Redirecting to ${url} success`);
        } else {
          this.loggerService.warn(`Redirecting to ${url} failed`);
        }
      })
      .catch(err => {
        this.loggerService.error(`Something went wrong, redirecting to ${url}`, err);
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
      });
  }

  private handleInvitation(): (source: Observable<GetSessionWithAccount>) => Observable<GetSessionWithAccount> {
    return (source: Observable<GetSessionWithAccount>): Observable<GetSessionWithAccount> =>
      source.pipe(
        tap(session => {
          const invitationObject = this.registrationInvitationService.getInvitationObject();
          if (invitationObject !== undefined) {
            this.registrationInvitationService.removeInvitationForDifferentUser(session.account.email);
            this.redirect(RouterPaths.dashboard.user.invitations.asPath);
            this.loggerService.debug('Redirecting to invitations');
          } else {
            this.redirect(RouterPaths.dashboard.user.activities.client.asPath);
            this.loggerService.debug('Redirecting to dashboard/user/activities');
          }
        }),
      );
  }
}
