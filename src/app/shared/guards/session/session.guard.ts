import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Store, select } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { SessionActions, AuthActions } from '@platform/core/actions';
import { filter, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class SessionGuard implements CanActivate {
  private logger: LoggerService;

  constructor(private store: Store<fromCore.IState>, loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('SessionGuard');
  }

  public canActivate = (): Observable<boolean> => this.isLoggedIn();

  public isLoggedIn = (): Observable<boolean> =>
    this.store.pipe(
      select(fromCore.getLoggedIn),
      map(isLoggedIn => {
        if (isLoggedIn.isPending) {
          return undefined;
        }
        if (!isLoggedIn.isFromBackend) {
          this.store.dispatch(new SessionActions.FetchSessionAction());

          return undefined;
        }

        return isLoggedIn.isLoggedIn;
      }),
      filter(result => typeof result !== 'undefined'),
      map((canActivate: boolean) => {
        if (!canActivate) {
          this.store.dispatch(new AuthActions.LoginRedirectAction());
        }

        return canActivate;
      }),
      take(1),
    );
}
