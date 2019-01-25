import { Injectable } from '@angular/core';
import { Observable, throwError, EMPTY } from 'rxjs';
import { AlertService, LoggerFactory, Alerts } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, take } from 'rxjs/operators';
import { PushNotificationService } from '@platform/core/services/call/push-notifications.service';

@Injectable()
export class ChangeNotificationComponentService extends Logger {
  constructor(
    private alertService: AlertService,
    private pushNotificationService: PushNotificationService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ChangeAnonymityComponent'));
  }

  public changeNotificationSubscription(isSubscribe: boolean): Observable<void> {
    return this.pushNotificationService.setSubscription(isSubscribe).pipe(
      catchError(err => {
        this.handleChangeAnonymityError(err);

        return EMPTY;
      }),
    );
  }

  public getNotificationSubscription(): Observable<boolean> {
    return this.pushNotificationService.getSubscription().pipe(take(1));
  }

  private handleChangeAnonymityError(err: HttpErrorResponse): Observable<void> {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.loggerService.warn('error when try to change anonymity', err);

    return throwError(err);
  }
}
