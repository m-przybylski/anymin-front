// tslint:disable:no-duplicate-imports
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoggerService } from '@anymind-ng/core';
import { UserSessionService } from '../../../core/services/user-session/user-session.service';
import { Alerts, AlertService } from '@anymind-ng/core';

@Injectable()
export class AnonymousGuard implements CanActivate {
  constructor(
    private userSessionService: UserSessionService,
    private alertService: AlertService,
    private logger: LoggerService,
    private router: Router,
  ) {}

  public canActivate = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> =>
    this.userSessionService.getSession().then(() => {
      this.logger.info('AnonymousGuard: user has session, redirecting to dashboard');
      this.router.navigate(['/dashboard/expert/activities']).then(isRedirectSuccessful => {
        if (!isRedirectSuccessful) {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
          this.logger.warn('AnonymousGuard can not redirect to dashboard/expert/activities');
        }
      });

      return false;
    }, () => true);
}
