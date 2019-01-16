import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoggerFactory, LoggerService, Alerts, AlertService } from '@anymind-ng/core';
import { Config } from '../../../../../config';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class SetNewPasswordFromMsisdnViewGuard implements CanActivate {
  private logger: LoggerService;

  constructor(
    private alertService: AlertService,
    private router: Router,
    private store: Store<fromCore.IState>,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('SetNewPasswordFromMsisdnViewGuard');
  }

  public canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromCore.getForgotPasswordMsisdnToken),
      map(msisdnToken => typeof msisdnToken === 'string' && Config.patterns.smsCodePattern.test(msisdnToken)),
      tap(isMsisdnTokenValid => {
        if (!isMsisdnTokenValid) {
          this.logger.warn('invalid sms token, redirecting to login');
          this.router
            .navigate(['/login'])
            .then(isRedirectSuccessful => {
              if (!isRedirectSuccessful) {
                this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
                this.logger.warn('Can not redirect to login');
              }
            })
            .catch(this.logger.error.bind(this));
        }
      }),
      take(1),
    );
  }
}
