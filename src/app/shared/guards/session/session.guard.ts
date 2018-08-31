import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, Router } from '@angular/router';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { UserSessionService } from '../../../core/services/user-session/user-session.service';

@Injectable()
export class SessionGuard implements CanActivate, CanLoad {
  private logger: LoggerService;

  constructor(
    private userSessionService: UserSessionService,
    private alertService: AlertService,
    private router: Router,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('SessionGuard');
  }

  public canLoad = (_route: Route): Promise<boolean> => this.can();

  public canActivate = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> => this.can();

  public can = (): Promise<boolean> =>
    this.userSessionService.getSession().then(
      () => {
        this.logger.info('user has session, allowing');

        return true;
      },
      () => {
        this.logger.warn('user does not have session, redirecting to /login');
        setTimeout(() => {
          this.router
            .navigate(['/login'])
            .then(isRedirectSuccessful => {
              if (!isRedirectSuccessful) {
                this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
                this.logger.warn('Can not redirect to login');
              }
            })
            .catch(this.logger.error.bind(this));
        }, 0);

        return false;
      },
    );
}
