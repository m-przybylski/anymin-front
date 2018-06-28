// tslint:disable:newline-before-return
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Alerts, AlertService } from '@anymind-ng/components';
import { LoggerService } from '@anymind-ng/core';

@Injectable()
export class SetNewPasswordFromEmailViewGuard implements CanActivate {

  constructor(private router: Router,
              private logger: LoggerService,
              private alertService: AlertService) {
  }

  public canActivate(route: ActivatedRouteSnapshot): boolean {

    if (this.isTokenValid(route)) {
      return true;
    } else {
      this.router.navigate(['/login']).then(isRedirectSuccessful => {
        if (!isRedirectSuccessful) {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
          this.logger.warn('Can not redirect to login');
        }
      });
      return false;
    }
  }

  private isTokenValid = (route: ActivatedRouteSnapshot): boolean =>
    typeof route.params.token === 'string' && route.params.token.length > 0

}
