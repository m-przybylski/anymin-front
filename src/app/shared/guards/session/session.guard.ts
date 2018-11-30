import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import { AuthActions } from '@platform/core/actions';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { isUserLogged } from '@platform/shared/guards/session.helper';

@Injectable()
export class SessionGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromRoot.IState>) {}

  public canLoad(): Observable<boolean> {
    return this.can();
  }

  public canActivate(): Observable<boolean> {
    return this.can();
  }
  private can(): Observable<boolean> {
    return this.store.pipe(
      isUserLogged(),
      map((isUserLoggedIn: boolean) => {
        if (!isUserLoggedIn) {
          this.store.dispatch(new AuthActions.LoginRedirectAction());
        }

        return isUserLoggedIn;
      }),
      take(1),
    );
  }
}
