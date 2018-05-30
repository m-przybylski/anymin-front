import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Alerts, AlertService } from '@anymind-ng/components';
import { LoggerService } from '@anymind-ng/core';

const DetectRTC = require('detectrtc');

@Injectable()
export class UnsupportedGuard implements CanActivate {

  private readonly facebookBrowserName = 'is[FB_IAB/Orca-Android;FBAV';

  constructor(private router: Router,
              private logger: LoggerService,
              private alertService: AlertService) {
  }

  public canActivate(): boolean {
    if (DetectRTC.browser[this.facebookBrowserName] || (DetectRTC.osName !== 'iOS' && DetectRTC.browser.isChrome)) {
      return true;
    } else {
      this.router.navigate(['/unsupported']).then(isRedirectSuccessful => {
        if (!isRedirectSuccessful) {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
          this.logger.warn('Can not redirect to unsupported');
        }
      });
      return false;
    }
  }
}
