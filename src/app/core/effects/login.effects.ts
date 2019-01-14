import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, concat } from 'rxjs';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { AuthActions } from '@platform/core/actions';
import { SessionService } from '@anymind-ng/api';
import { Router } from '@angular/router';
import { Logger } from '@platform/core/logger';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { RouterPaths } from '@platform/shared/routes/routes';
import { CallInvitationService } from '@platform/core/services/call/call-invitation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class LoginEffects extends Logger {
  @Effect()
  public login$ = this.actions$.pipe(
    ofType<AuthActions.LoginAction>(AuthActions.AuthActionTypes.Login),
    map(action => action.payload),
    switchMap(loginCredentials =>
      this.sessionService.login(loginCredentials).pipe(
        map(session => new AuthActions.LoginSuccessAction(session)),
        catchError(error => of(new AuthActions.LoginErrorAction(error))),
      ),
    ),
  );

  @Effect({ dispatch: false })
  public loginRedirect$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LoginRedirect),
    tap(() => {
      this.loggerService.debug('Redirecting to login page');
      this.router
        .navigate(['/login'])
        .then(success => {
          if (success) {
            this.loggerService.debug('Redirecting to login page success');
          } else {
            this.loggerService.warn('Redirecting to login page failed');
          }
        })
        .catch(() => {
          this.loggerService.error('Something went wrong, redirecting to "/login"');
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
        });
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
    ofType(AuthActions.AuthActionTypes.DashboardRedirect),
    tap(() => {
      this.loggerService.debug('Redirecting to dashboard');
      this.router
        .navigate([RouterPaths.dashboard.user.welcome.asPath])
        .then(success => {
          if (success) {
            this.loggerService.debug('Redirecting to dashboard success');
          } else {
            this.loggerService.warn('Redirecting to dashboard failed');
          }
        })
        .catch(err => {
          this.loggerService.error('Something went wrong, redirecting to "/dashboard/user/activities"', err);
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
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
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('LoginEffects'));
  }
}
