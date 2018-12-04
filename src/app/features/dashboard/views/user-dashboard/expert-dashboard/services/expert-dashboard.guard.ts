import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { Observable } from 'rxjs';
import { GetSessionWithAccount } from '@anymind-ng/api';
import { RouterPaths } from '@platform/shared/routes/routes';
import { dashboardGuardHelper } from '@platform/features/dashboard/dashboard.helper';

@Injectable()
export class ExpertDashboardGuard implements CanActivate {
  constructor(private store: Store<fromCore.IState>, private router: Router) {}

  public canActivate(): Observable<boolean> {
    return this.store.pipe(dashboardGuardHelper(this.navigateToSettingsWhenNotExpert));
  }

  private navigateToSettingsWhenNotExpert = (getSessionWithAccount: GetSessionWithAccount): boolean => {
    if (!getSessionWithAccount.isExpert) {
      void this.router.navigate([RouterPaths.dashboard.user.settings.asPath]);
    }

    return getSessionWithAccount.isExpert;
  };
}
