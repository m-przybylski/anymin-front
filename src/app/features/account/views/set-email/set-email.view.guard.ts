import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { LoggerService } from '@anymind-ng/core';
import { GetSession } from '@anymind-ng/api';
import { Alerts, AlertService } from '@anymind-ng/components';

@Injectable()
export class SetEmailViewGuard implements CanActivate {

  constructor(private router: Router,
              private alertService: AlertService,
              private userSessionService: UserSessionService,
              private logger: LoggerService) {}

  public canActivate = (): Promise<boolean> =>
    this.userSessionService.getSession().then((session) => {
      if (this.hasUserEmail(session)) {
        this.logger.info('SetEmailViewGuard: user has email, redirecting to dashboard');
        this.router.navigate(['/dashboard/expert/activities']).then(isRedirectSuccessful => {
          if (!isRedirectSuccessful) {
            this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
            this.logger.warn('Can not redirect to dashboard/expert/activities');
          }
        });
        return false;
      } else {
        this.logger.info('SetEmailViewGuard: user has not email, allowing access');
        return true;
      }
    })

  private hasUserEmail = (session: GetSession): boolean | undefined => {
    const userAccount = session.account;
    return userAccount && userAccount.email !== undefined || userAccount && userAccount.unverifiedEmail !== undefined;
  }

}
