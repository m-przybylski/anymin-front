import { CanActivate, Router } from '@angular/router';
import { LoggerFactory } from '@anymind-ng/core';
import { Injectable } from '@angular/core';
import { GetSessionWithAccount } from '@anymind-ng/api/model/getSessionWithAccount';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import * as fromCore from '@platform/core/reducers';
import { filter, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Logger } from '@platform/core/logger';

@Injectable()
export class SetPasswordViewGuard extends Logger implements CanActivate {
  constructor(private router: Router, private store: Store<fromRoot.IState>, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('SetPasswordViewGuard'));
  }

  public canActivate = (): Observable<boolean> =>
    this.store.pipe(
      select(fromCore.getSession),
      filter(session => typeof session !== 'undefined'),
      map((session: GetSessionWithAccount) => {
        if (this.hasUserPassword(session)) {
          this.loggerService.info('user has password, redirecting to set-email');
          void this.router.navigate(['/account/set-email']);
        }

        return !this.hasUserPassword(session);
      }),
      take(1),
    );

  private hasUserPassword = (sessionWithAccount: GetSessionWithAccount): boolean =>
    sessionWithAccount.account.hasPassword;
}
