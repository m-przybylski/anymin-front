// tslint:disable:newline-before-return
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Alerts, AlertService } from '@anymind-ng/components';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
const phonenumbers = require('libphonenumber-js');

@Injectable()
export class MsisdnGuard implements CanActivate {

  private logger: LoggerService;

  constructor(private router: Router,
              private alertService: AlertService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('MsisdnGuard');
  }

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    if (phonenumbers.isValidNumber(route.params.msisdn)) {
      this.logger.debug('allow to access');
      return true;
    } else {
      this.router.navigate(['/login']).then(isRedirectSuccessful => {
        if (!isRedirectSuccessful) {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
          this.logger.warn('Can not redirect to login');
        }
      });
      this.logger.warn('not allow to access');
      return false;
    }
  }

}
