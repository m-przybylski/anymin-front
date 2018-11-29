import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { Observable, of } from 'rxjs';
import { map, take, switchMap, catchError, filter, tap } from 'rxjs/operators';
import { InvitationService } from '@anymind-ng/api';
import { RegistrationInvitationService } from '@platform/shared/services/registration-invitation/registration-invitation.service';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { RouterPaths } from '@platform/shared/routes/routes';
import * as SessionActions from '@platform/core/actions/session.actions';
import { AuthActions } from '@platform/core/actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class InvitationsGuard extends Logger implements CanActivate {
  constructor(
    private store: Store<fromCore.IState>,
    private router: Router,
    private alertService: AlertService,
    private registrationInvitationService: RegistrationInvitationService,
    private invitationService: InvitationService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('InvitationsGuard'));
  }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(fromCore.getLoggedIn),
      map(isLoggedIn => {
        if (isLoggedIn.isPending) {
          return undefined;
        }
        if (!isLoggedIn.isFromBackend) {
          this.store.dispatch(new SessionActions.FetchSessionAction());

          return undefined;
        }

        return isLoggedIn.isLoggedIn;
      }),
      filter(result => typeof result !== 'undefined'),
      switchMap((isLoggedIn: boolean) => {
        const token = route.params.token;

        return this.invitationService.getInvitationRoute(token).pipe(
          tap(tokenInvitation => {
            void this.determinatePathToRedirect(isLoggedIn).then(isRedirectSuccessful => {
              if (!isRedirectSuccessful) {
                this.loggerService.warn('Error when redirect to login or invitation');
                this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
              } else {
                this.registrationInvitationService.setInvitationObject({
                  token,
                  id: tokenInvitation.id,
                  msisdn: tokenInvitation.msisdn,
                  email: tokenInvitation.email,
                });
              }
            });
          }),
          map(() => false),
          catchError((error: HttpErrorResponse) => {
            this.alertService.pushDangerAlert('INVITATIONS.INVITE_DOES_NOT_EXIST');
            this.store.dispatch(new AuthActions.DashboardRedirectAction());
            this.loggerService.debug('Invitation does not exist', error);

            return of(false);
          }),
        );
      }),
      take(1),
    );
  }

  private determinatePathToRedirect = (isLoggedIn: boolean): Promise<boolean> =>
    isLoggedIn
      ? this.router.navigate([RouterPaths.dashboard.user.invitations.asPath])
      : this.router.navigate(['/login']);
}
