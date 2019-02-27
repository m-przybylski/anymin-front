import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Alerts, AlertService, LoggerService } from '@anymind-ng/core';
import { BrowserUtils } from 'machoke-sdk';

@Injectable()
export class UnsupportedGuard implements CanActivate {
  constructor(private router: Router, private logger: LoggerService, private alertService: AlertService) {}

  // It's a headless page renderer to provide a static page for fb/twitter/google bots
  public static isRendertron(): boolean {
    return window.navigator.userAgent.includes('HeadlessChrome');
  }

  public canActivate(): boolean {
    if (BrowserUtils.isBrowserSupported() || UnsupportedGuard.isRendertron()) {
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
