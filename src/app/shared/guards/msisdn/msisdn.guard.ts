import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Alerts, AlertService } from '@anymind-ng/components';
import { LoggerService } from '@anymind-ng/core';
const phonenumbers = require('libphonenumber-js');

@Injectable()
export class MsisdnGuard implements CanActivate {

  constructor(private router: Router,
              private logger: LoggerService,
              private alertService: AlertService) {}

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    if (phonenumbers.isValidNumber(route.params.msisdn)) {
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

}
