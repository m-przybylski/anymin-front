import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { LoggerFactory, LoggerService, Alerts, AlertService } from '@anymind-ng/core';

@Injectable()
export class UserDashboardViewGuard implements CanActivate {
  private logger: LoggerService;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private userSessionService: UserSessionService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('UserDashboardViewGuard');
  }

  public canActivate = (): Promise<boolean> =>
    this.userSessionService.getSession().then(session => {
      if (session.account !== undefined) {
        return true;
      } else {
        this.logger.info('User has not logged in, redirecting to user login');
        this.router.navigate(['/login']).then(isRedirectSuccessful => {
          if (!isRedirectSuccessful) {
            this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
            this.logger.warn('Can not redirect to /login');
          }
        });

        return false;
      }
    });
}
