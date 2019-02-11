import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { Observable } from 'rxjs';
import { GetSessionWithAccount } from '@anymind-ng/api';
import { RouterPaths } from '@platform/shared/routes/routes';
import { dashboardGuardHelper } from '@platform/features/dashboard/dashboard.helper';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';

@Injectable()
export class CompanyDashboardGuard implements CanActivate {
  private logger: LoggerService;

  constructor(private store: Store<fromCore.IState>, private router: Router, loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('CompanyDashboardGuard');
  }

  public canActivate(): Observable<boolean> {
    return this.store.pipe(
      dashboardGuardHelper(getSessionWithAccount => this.navigateToSettingsWhenNotCompany(getSessionWithAccount)),
    );
  }

  private navigateToSettingsWhenNotCompany(getSessionWithAccount: GetSessionWithAccount): boolean {
    if (!getSessionWithAccount.isCompany) {
      this.logger.warn('You shall not pass - redirecting to settings');
      void this.router.navigate([RouterPaths.dashboard.user.settings.asPath]);
    }

    return getSessionWithAccount.isCompany;
  }
}
