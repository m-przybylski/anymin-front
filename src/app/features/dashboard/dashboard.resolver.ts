import { Resolve } from '@angular/router';
import * as fromCore from '@platform/core/reducers';
import { select, Store } from '@ngrx/store';
import { map, take, switchMap } from 'rxjs/operators';
import { NavbarActions } from '@platform/core/actions';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import { GetSessionWithAccount } from '@anymind-ng/api';
import { Observable, defer, of } from 'rxjs';
import { Logger } from '@platform/core/logger';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Injectable } from '@angular/core';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';

@Injectable()
export class DashboardResolver extends Logger implements Resolve<boolean> {
  protected loggerService: LoggerService;

  constructor(private store: Store<fromCore.IState>, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('DashboardResolver'));
  }

  public resolve = (): Observable<boolean> =>
    this.getUserType().pipe(
      switchMap(userType => defer(() => (userType !== undefined ? of(true) : this.dispatchUserFromSession()))),
      take(1),
    );

  private getUserType = (): Observable<UserTypeEnum | undefined> => this.store.pipe(select(fromCore.getUserType));
  private dispatchUserFromSession = (): Observable<boolean> =>
    getNotUndefinedSession(this.store).pipe(
      map((session: GetSessionWithAccount) => {
        if (session.isCompany) {
          this.store.dispatch(new NavbarActions.SetUserType(UserTypeEnum.COMPANY));

          return true;
        }
        if (session.isExpert) {
          this.store.dispatch(new NavbarActions.SetUserType(UserTypeEnum.EXPERT));

          return true;
        }
        this.store.dispatch(new NavbarActions.SetUserType(UserTypeEnum.USER));

        return true;
      }),
    );
}
