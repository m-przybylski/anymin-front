import { Resolve } from '@angular/router';
import { LoggerService } from '@anymind-ng/core';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { Alerts, AlertService } from '@anymind-ng/components';
import { Injectable } from '@angular/core';
import { isBackendError } from '../../../../shared/models/backend-error/backend-error';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SetEmailViewResolver implements Resolve<string> {

  constructor(private userService: UserSessionService,
              private logger: LoggerService,
              private alertService: AlertService) {
  }

  public resolve = (): Promise<string> =>
    this.userService.getSession(true)
      .then(session => session.accountId)
      .catch(this.handleGetSessionError)

  private handleGetSessionError = (httpError: HttpErrorResponse): string => {
    const err = httpError.error;

    if (isBackendError(err)) {
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
        this.logger.error('SetEmailViewResolver unhandled backend status when getting session ', httpError);
    } else {
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      this.logger.warn('SetEmailViewResolver: error when getting session', httpError);
    }

    throw httpError;
  }

}
