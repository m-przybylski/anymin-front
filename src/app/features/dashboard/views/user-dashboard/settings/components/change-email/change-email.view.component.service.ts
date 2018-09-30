import { AccountService } from '@anymind-ng/api';
import { Injectable } from '@angular/core';
import { UserSessionService } from '../../../../../../../core/services/user-session/user-session.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BackendErrors, isBackendError } from '../../../../../../../shared/models/backend-error/backend-error';

export enum ChangeEmailStatusEnum {
  SUCCESS,
  ALREADY_EXIST,
  INVALID,
  ERROR,
}

@Injectable()
export class ChangeEmailViewComponentService {
  private accountId: string;
  private logger: LoggerService;

  constructor(
    private accountService: AccountService,
    private userSessionService: UserSessionService,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('ChangeEmailViewComponentService');

    this.userSessionService
      .getSession()
      .then(session => {
        this.accountId = session.account.id;
      })
      .catch(error => {
        this.logger.warn('error when try to get session', error);
      });
  }

  public changeEmail = (email: string): Observable<ChangeEmailStatusEnum> =>
    this.accountService
      .patchUpdateAccountRoute(this.accountId, { unverifiedEmail: email })
      .pipe(map(() => ChangeEmailStatusEnum.SUCCESS))
      .pipe(catchError(error => of(this.handleError(error))));

  private handleError = (httpError: HttpErrorResponse): ChangeEmailStatusEnum => {
    if (isBackendError(httpError.error)) {
      switch (httpError.error.code) {
        case BackendErrors.IncorrectValidation:
          return ChangeEmailStatusEnum.INVALID;

        case BackendErrors.EmailAlreadyExists:
          return ChangeEmailStatusEnum.ALREADY_EXIST;

        default:
          this.logger.error('unhandled backend error when changing email', httpError.error);
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);

          return ChangeEmailStatusEnum.ERROR;
      }
    } else {
      this.logger.warn('error when changing email', httpError);
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);

      return ChangeEmailStatusEnum.ERROR;
    }
  };
}
