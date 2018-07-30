// tslint:disable:newline-before-return
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { VerifiedCodeService } from '../../verified-code.service';
import { LoggerFactory, LoggerService, Alerts, AlertService } from '@anymind-ng/core';
import { CommonSettingsService } from '../../../../../angularjs/common/services/common-settings/common-settings.service';

@Injectable()
export class SetNewPasswordFromMsisdnViewGuard implements CanActivate {
  private logger: LoggerService;

  constructor(
    private tokenService: VerifiedCodeService,
    private alertService: AlertService,
    private router: Router,
    private commonSettingService: CommonSettingsService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('SetNewPasswordFromMsisdnViewGuard');
  }

  public canActivate(): boolean {
    if (this.isTokenValid()) {
      return true;
    } else {
      this.logger.warn('invalid sms token, redirecting to login');
      this.router.navigate(['/login']).then(isRedirectSuccessful => {
        if (!isRedirectSuccessful) {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
          this.logger.warn('Can not redirect to login');
        }
      });
      return false;
    }
  }

  private isTokenValid = (): boolean => {
    const token = this.tokenService.getVerifiedCode();
    return typeof token === 'string' && this.commonSettingService.localSettings.smsCodePattern.test(token);
  };
}
