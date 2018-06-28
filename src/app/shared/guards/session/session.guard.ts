// tslint:disable:no-duplicate-imports
// tslint:disable:newline-before-return
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { UserSessionService } from '../../../core/services/user-session/user-session.service';
import { Alerts, AlertService } from '@anymind-ng/components';

@Injectable()
export class SessionGuard implements CanActivate {

  private logger: LoggerService;

  constructor(private userSessionService: UserSessionService,
              private alertService: AlertService,
              private router: Router,
              loggerFactory: LoggerFactory) {

    this.logger = loggerFactory.createLoggerService('SessionGuard');
  }

  public canActivate = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> =>
    this.userSessionService.getSession().then(() => {
      this.logger.info('user has session, allowing');
      return true;
    }, () => {
      this.logger.warn('user does not have session, redirecting to /login');
      this.router.navigate(['/login']).then(isRedirectSuccessful => {
        if (!isRedirectSuccessful) {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
          this.logger.warn('Can not redirect to login');
        }
      });
      return false;
    })

}
