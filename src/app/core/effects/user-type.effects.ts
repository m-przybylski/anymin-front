import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { NavbarActions, SessionActions } from '../actions';

@Injectable()
export class UserTypeEffects {
  @Effect()
  public updateSessionAndUserType$ = this.actions$.pipe(
    ofType<NavbarActions.UpdateUserTypeAndSession>(NavbarActions.NavbarActionTypes.UpdateSessionAndUserType),
    map(action => new NavbarActions.SetUserType(action.payload)),
  );

  @Effect()
  public updateSessionAndUserType_Fetch$ = this.actions$.pipe(
    ofType<NavbarActions.UpdateUserTypeAndSession>(NavbarActions.NavbarActionTypes.UpdateSessionAndUserType),
    map(() => new SessionActions.FetchSessionAction()),
  );

  constructor(private actions$: Actions) {}
}
