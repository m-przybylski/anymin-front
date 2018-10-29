import { Resolve } from '@angular/router';
import * as fromCore from '@platform/core/reducers';
import { select, Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs/operators';
import { NavbarActions } from '@platform/core/actions';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';
import { GetSessionWithAccount } from '@anymind-ng/api';
import { Observable } from 'rxjs';
import { Logger } from '@platform/core/logger';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Injectable } from '@angular/core';

@Injectable()
export class DashboardResolver extends Logger implements Resolve<boolean> {
  protected loggerService: LoggerService;

  constructor(private store: Store<fromCore.IState>, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('DashboardResolver'));
  }

  public resolve = (): Observable<boolean> =>
    this.store.pipe(
      select(fromCore.getSession),
      filter(session => typeof session !== 'undefined'),
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
      take(1),
    );
}
