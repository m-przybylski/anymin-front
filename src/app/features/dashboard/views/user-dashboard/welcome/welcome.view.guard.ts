import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { filter, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GetSessionWithAccount } from '@anymind-ng/api';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { RouterPaths } from '@platform/shared/routes/routes';

@Injectable()
export class WelcomeViewGuard implements CanActivate {
  private logger: LoggerService;

  constructor(private store: Store<fromCore.IState>, loggerFactory: LoggerFactory, private router: Router) {
    this.logger = loggerFactory.createLoggerService('WelcomeGuard');
  }

  public canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromCore.getSession),
      filter(getSessionWithAccount => typeof getSessionWithAccount !== 'undefined'),
      map((getSessionWithAccount: GetSessionWithAccount) => {
        if (getSessionWithAccount.isCompany) {
          void this.router.navigate([RouterPaths.dashboard.company.activities.asPath]);

          return false;
        }

        if (getSessionWithAccount.isExpert) {
          void this.router.navigate([RouterPaths.dashboard.user.activities.expert.asPath]);

          return false;
        }

        return !getSessionWithAccount.isCompany && !getSessionWithAccount.isExpert;
      }),
      take(1),
    );
  }
}
