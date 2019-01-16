import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoggerFactory, LoggerService, Alerts, AlertService } from '@anymind-ng/core';
import { isValidNumber } from 'libphonenumber-js';
import { MsisdnHelperService } from '../../core/services/msisdn-helper/msisdn-helper.service';

@Injectable()
export class MsisdnGuard implements CanActivate {
  private logger: LoggerService;

  constructor(
    private router: Router,
    private msisdnHelper: MsisdnHelperService,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('MsisdnGuard');
  }

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    if (isValidNumber(this.msisdnHelper.addPlusToPhoneNumber(route.params.msisdn))) {
      this.logger.debug('allow to access');

      return true;
    } else {
      this.router
        .navigate(['/login'])
        .then(isRedirectSuccessful => {
          if (!isRedirectSuccessful) {
            this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
            this.logger.warn('Can not redirect to login');
          }
        })
        .catch(this.logger.error.bind(this));
      this.logger.warn('not allow to access');

      return false;
    }
  }
}
