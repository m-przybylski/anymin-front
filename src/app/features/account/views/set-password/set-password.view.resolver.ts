import { Resolve } from '@angular/router';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { LoggerService } from '@anymind-ng/core';
import { Alerts, AlertService } from '@anymind-ng/components';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SetPasswordViewResolver implements Resolve<string> {

  constructor(private userService: UserSessionService,
              private logger: LoggerService,
              private alertService: AlertService) {}

  public resolve = (): Promise<string> =>
    this.userService.getSession(true)
      .then(session => session.accountId)
      .catch(this.handleGetSessionError)

  private handleGetSessionError = (error: HttpErrorResponse): string => {
    this.logger.warn('SetPasswordViewResolver: error when getting session', error);
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    throw error;
  }

}
