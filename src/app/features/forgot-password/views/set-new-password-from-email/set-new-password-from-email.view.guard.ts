import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Alerts, AlertService } from '@anymind-ng/components';
import { LoggerService } from '@anymind-ng/core';

@Injectable()
export class SetNewPasswordFromEmailViewGuard implements CanActivate {

  constructor(private router: Router,
              private logger: LoggerService,
              private alertService: AlertService,
              private route: ActivatedRouteSnapshot) {
  }

  // TODO WAIT FOR BACKEND
  public canActivate(): boolean {
    if (this.isTokenValid()) {
      return true;
    } else {
      this.router.navigate(['/login']) .then(isRedirectSuccessful => {
        if (!isRedirectSuccessful) {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
          this.logger.warn('Can not redirect to login');
        }
      });
      return false;
    }
  }

  private isTokenValid = (): boolean =>
    typeof this.route.params.token === 'string' && this.route.params.token.length > 0

}
