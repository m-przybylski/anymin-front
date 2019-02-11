import { Injectable } from '@angular/core';
import { AccountService } from '@anymind-ng/api';
import { Observable, throwError } from 'rxjs';
import { AlertService, LoggerFactory, Alerts } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ChangeAnonymityComponentService extends Logger {
  constructor(
    private accountService: AccountService,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ChangeAnonymityComponent'));
  }

  public changeAnonymity(isAnonymous: boolean): Observable<void> {
    return this.accountService
      .putAnonymityRoute({ isAnonymous })
      .pipe(catchError(err => this.handleChangeAnonymityError(err)));
  }

  private handleChangeAnonymityError(err: HttpErrorResponse): Observable<void> {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.loggerService.warn('error when try to change anonymity', err);

    return throwError(err);
  }
}
