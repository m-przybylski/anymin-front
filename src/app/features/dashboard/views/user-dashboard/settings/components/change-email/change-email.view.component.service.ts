import { AccountService } from '@anymind-ng/api';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BackendErrors, isBackendError } from '../../../../../../../shared/models/backend-error/backend-error';
import { Store } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import { SessionApiActions } from '@platform/core/actions';

export enum ChangeEmailStatusEnum {
  SUCCESS,
  ALREADY_EXIST,
  INVALID,
  ERROR,
}

@Injectable()
export class ChangeEmailViewComponentService {
  private logger: LoggerService;

  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    private store: Store<fromRoot.IState>,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('ChangeEmailViewComponentService');
  }

  public changeEmail(email: string): Observable<ChangeEmailStatusEnum> {
    return this.accountService
      .putEmailRoute({ email })
      .pipe(
        map(account => {
          this.store.dispatch(new SessionApiActions.UpdateAccountInSession(account));

          return ChangeEmailStatusEnum.SUCCESS;
        }),
      )
      .pipe(catchError(error => of(this.handleError(error))));
  }

  private handleError(httpError: HttpErrorResponse): ChangeEmailStatusEnum {
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
  }
}
