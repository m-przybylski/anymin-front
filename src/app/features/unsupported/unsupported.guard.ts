import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Alerts, AlertService, LoggerService } from '@anymind-ng/core';
import { BrowserUtils } from 'ratel-sdk-js';

@Injectable()
export class UnsupportedGuard implements CanActivate {
  constructor(private router: Router, private logger: LoggerService, private alertService: AlertService) {}

  public canActivate(): boolean {
    if (BrowserUtils.isBrowserSupported(true)) {
      return true;
    } else {
      this.router
        .navigate(['/unsupported'])
        .then(isRedirectSuccessful => {
          if (!isRedirectSuccessful) {
            this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
            this.logger.warn('Can not redirect to unsupported');
          }
        })
        .catch(this.logger.error.bind(this));

      return false;
    }
  }
}
