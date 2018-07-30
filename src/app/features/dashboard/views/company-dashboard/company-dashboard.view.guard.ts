import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { LoggerFactory, LoggerService, Alerts, AlertService } from '@anymind-ng/core';

@Injectable()
export class CompanyDashboardViewGuard implements CanActivate {
  private logger: LoggerService;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private userSessionService: UserSessionService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('CompanyDashboardViewGuard');
  }

  public canActivate = (): Promise<boolean> =>
    this.userSessionService.getSession().then(session => {
      if (session.account !== undefined && session.account.isCompany) {
        this.logger.info('User has company profile, allowing access');

        return true;
      } else {
        this.logger.info('User has not company profile, redirecting to user dashboard');
        this.router.navigate(['/dashboard/user/discover']).then(isRedirectSuccessful => {
          if (!isRedirectSuccessful) {
            this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
            this.logger.warn('Can not redirect to dashboard/user/discover');
          }
        });

        return false;
      }
    });
}
