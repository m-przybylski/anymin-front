import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { iif, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthActions } from '@platform/core/actions';
import { isUserLogged } from '@platform/shared/guards/session.helper';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';

@Injectable()
export class AnonymousGuard implements CanActivate {
  constructor(private store: Store<fromCore.IState>) {}

  public canActivate(): Observable<boolean> {
    return this.store.pipe(
      isUserLogged(),
      switchMap(isUserLoggedIn =>
        iif(
          () => isUserLoggedIn,
          getNotUndefinedSession(this.store).pipe(
            tap(session => {
              this.store.dispatch(new AuthActions.DashboardRedirectAction(session));
            }),
            map(() => false),
          ),
          of(true),
        ),
      ),
      take(1),
    );
  }
}
