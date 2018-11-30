import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthActions } from '@platform/core/actions';
import { isUserLogged } from '@platform/shared/guards/session.helper';

@Injectable()
export class AnonymousGuard implements CanActivate {
  constructor(private store: Store<fromCore.IState>) {}

  public canActivate = (): Observable<boolean> =>
    this.store.pipe(
      isUserLogged(),
      map((isUserLoggedIn: boolean) => {
        if (isUserLoggedIn) {
          this.store.dispatch(new AuthActions.DashboardRedirectAction());
        }

        return !isUserLoggedIn;
      }),
      take(1),
    );
}
