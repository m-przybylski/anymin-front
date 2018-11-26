import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { from, Observable } from 'rxjs';
import { map, take, switchMap, catchError, filter } from 'rxjs/operators';
import { InvitationService } from '@anymind-ng/api';
import { RegistrationInvitationService } from '@platform/shared/services/registration-invitation/registration-invitation.service';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { RouterPaths } from '@platform/shared/routes/routes';
import * as SessionActions from '@platform/core/actions/session.actions';

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

  public canActivate = (route: ActivatedRouteSnapshot): Observable<boolean> =>
    this.store.pipe(
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
          map(tokenInvitation => {
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

              return tokenInvitation;
            });
          }),
          catchError(error => {
            this.alertService.pushDangerAlert('INVITATIONS.INVITE_DOES_NOT_EXIST');
            void this.router.navigate(['/login']).then(isRedirectSuccessful => {
              if (!isRedirectSuccessful) {
                this.loggerService.warn('Error when redirect to login');
                this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
              }
            });

            return from(error);
          }),
        );
      }),
      map(() => false),
      take(1),
    );

  private determinatePathToRedirect = (isLoggedIn: boolean): Promise<boolean> =>
    isLoggedIn
      ? this.router.navigate([RouterPaths.dashboard.user.invitations.asPath])
      : this.router.navigate(['/login']);
}
