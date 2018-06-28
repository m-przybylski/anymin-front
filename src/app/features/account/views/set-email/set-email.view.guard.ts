// tslint:disable:newline-before-return
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { GetSession } from '@anymind-ng/api';
import { Alerts, AlertService } from '@anymind-ng/components';

@Injectable()
export class SetEmailViewGuard implements CanActivate {

  private logger: LoggerService;

  constructor(private router: Router,
              private alertService: AlertService,
              private userSessionService: UserSessionService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('SetEmailViewGuard');
  }

  public canActivate = (): Promise<boolean> =>
    this.userSessionService.getSession().then((session) => {
      if (this.hasUserEmail(session)) {
        this.logger.info('user has email, redirecting to dashboard');
        this.router.navigate(['/dashboard/expert/activities']).then(isRedirectSuccessful => {
          if (!isRedirectSuccessful) {
            this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
            this.logger.warn('can not redirect to dashboard/expert/activities');
          }
        });
        return false;
      } else {
        this.logger.info('user has no email, allowing access');
        return true;
      }
    })

  private hasUserEmail = (session: GetSession): boolean => {
    const userAccount = session.account;
    return userAccount !== undefined && userAccount.email !== undefined
      || userAccount !== undefined && userAccount.unverifiedEmail !== undefined;
  }

}
