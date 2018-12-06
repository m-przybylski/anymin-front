import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoggerFactory, LoggerService, Alerts, AlertService } from '@anymind-ng/core';
import { GetSessionWithAccount } from '@anymind-ng/api/model/getSessionWithAccount';
import { RouterPaths } from '@platform/shared/routes/routes';
import { Observable } from 'rxjs';
import * as fromRoot from '@platform/reducers';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Injectable()
export class SetEmailViewGuard implements CanActivate {
  private logger: LoggerService;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private store: Store<fromRoot.IState>,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('SetEmailViewGuard');
  }

  public canActivate = (): Observable<boolean> =>
    getNotUndefinedSession(this.store).pipe(
      map(getSessionWithAccount => {
        if (this.hasUserEmail(getSessionWithAccount)) {
          this.logger.info('user has email, redirecting to dashboard');
          this.router
            .navigate([RouterPaths.dashboard.user.welcome.asPath])
            .then(isRedirectSuccessful => {
              if (!isRedirectSuccessful) {
                this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
                this.logger.warn('can not redirect to dashboard/expert/activities');
              } else {
                this.logger.debug('navigated to dashboard/expert/activities');
              }
            })
            .catch(err => {
              this.logger.warn('something went wrong', err);
            });

          return false;
        } else {
          this.logger.info('user has no email, allowing access');

          return true;
        }
      }),
      map(() => true),
    );

  private hasUserEmail = (sessionWithAccount: GetSessionWithAccount): boolean =>
    sessionWithAccount.account.email !== undefined || sessionWithAccount.account.unverifiedEmail !== undefined;
}
