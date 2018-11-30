import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { filter, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GetSessionWithAccount } from '@anymind-ng/api';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';

@Injectable()
export class WelcomeViewGuard implements CanActivate {
  private logger: LoggerService;

  constructor(private store: Store<fromCore.IState>, loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('WelcomeGuard');
  }

  public canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromCore.getSession),
      filter(getSessionWithAccount => typeof getSessionWithAccount !== 'undefined'),
      map((getSessionWithAccount: GetSessionWithAccount) => {
        /**
         * we allow to enter only for users that don't have profile
         * either expert or company
         */
        this.logger.debug(
          'is user allowed to access: ',
          !getSessionWithAccount.isCompany && !getSessionWithAccount.isExpert,
        );

        return !getSessionWithAccount.isCompany && !getSessionWithAccount.isExpert;
      }),
      take(1),
    );
  }
}
