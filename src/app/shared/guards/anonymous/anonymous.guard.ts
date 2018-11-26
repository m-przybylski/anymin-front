import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { Observable } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';
import { SessionActions, AuthActions } from '@platform/core/actions';

@Injectable()
export class AnonymousGuard implements CanActivate {
  constructor(private store: Store<fromCore.IState>) {}

  public canActivate = (): Observable<boolean> =>
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
        if (canActivate) {
          this.store.dispatch(new AuthActions.DashboardRedirectAction());
        }

        return !canActivate;
      }),
      take(1),
    );
}
