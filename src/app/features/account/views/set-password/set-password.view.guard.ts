// tslint:disable:newline-before-return
import { CanActivate, Router } from '@angular/router';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { LoggerService, Alerts, AlertService } from '@anymind-ng/core';
import { Injectable } from '@angular/core';
import { GetSessionWithAccount } from '@anymind-ng/api/model/getSessionWithAccount';

@Injectable()
export class SetPasswordViewGuard implements CanActivate {
  constructor(
    private router: Router,
    private alertService: AlertService,
    private userSessionService: UserSessionService,
    private logger: LoggerService,
  ) {}

  public canActivate = (): Promise<boolean> =>
    this.userSessionService.getSession().then(session => {
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
    });

  private hasUserPassword = (sessionWithAccount: GetSessionWithAccount): boolean =>
    sessionWithAccount.account.hasPassword;
}
