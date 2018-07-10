import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { catchError, map } from 'rxjs/internal/operators';
import { of } from 'rxjs/index';
import { Observable } from 'rxjs/Rx';
import { AccountService } from '@anymind-ng/api';

@Injectable()
export class ConfirmEmailGuard implements CanActivate {

  private logger: LoggerService;

  constructor(private alertService: AlertService,
              private router: Router,
              private accountService: AccountService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('ConfirmEmailGuard');
  }

  public canActivate = (route: ActivatedRouteSnapshot): Observable<boolean> => {
    const token = route.params.token;

    return this.accountService.postAccountVerifyEmailRoute(token)
      .pipe(map(() => {
        this.logger.log('valid email token, allow access');
        this.alertService.pushSuccessAlert(Alerts.SetEmailViewSuccess);
        this.redirectToDashboard();

        return true;
      }))
      .pipe(catchError((error) => {
        this.alertService.pushDangerAlert(Alerts.SetEmailViewSuccess);
        this.logger.warn('error when try to verify email token, error: ', error);
        this.redirectToDashboard();

        return of(false);
      }));
  }

  private redirectToDashboard = (): void => {
    this.router.navigate(['/dashboard/expert/activities'])
      .then(isRedirectSuccessful => {
        if (!isRedirectSuccessful) {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
          this.logger.warn('Can not redirect to /dashboard/expert/activities');
        }
      });
  }

}
