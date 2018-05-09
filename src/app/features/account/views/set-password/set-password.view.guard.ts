import { CanActivate, Router } from '@angular/router';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { LoggerService } from '@anymind-ng/core';
import { GetSession } from '@anymind-ng/api';
import { Injectable } from '@angular/core';
import { Alerts, AlertService } from '@anymind-ng/components';

@Injectable()
export class SetPasswordViewGuard implements CanActivate {

  constructor(private router: Router,
              private alertService: AlertService,
              private userSessionService: UserSessionService,
              private logger: LoggerService) {
  }

  public canActivate = (): Promise<boolean> =>
    this.userSessionService.getSession().then((session) => {
        if (this.hasUserPassword(session)) {
          this.logger.info('SetPasswordViewGuard: user has password, redirecting to set-email');
          this.router.navigate(['/account/set-email']).then(isRedirectSuccessful => {
            if (!isRedirectSuccessful) {
              this.logger.warn('Error when redirect to account/set-email');
              this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
            }
          });
          return false;
        } else {
          this.logger.info('SetPasswordViewGuard: user has not password, allowing access');
          return true;
        }
      }
    )

  private hasUserPassword = (session: GetSession): boolean => {
    const userAccount = session.account;
    return userAccount !== undefined && userAccount.hasPassword;
  }
}
