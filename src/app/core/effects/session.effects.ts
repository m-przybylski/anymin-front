import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, defer } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { SessionActions, AuthActions } from '../actions';
import { SessionService } from '@anymind-ng/api';

@Injectable()
export class SessionEffects {
  @Effect()
  public fetchSession$ = this.actions$.pipe(
    ofType(SessionActions.SessionActionTypes.FetchSessionFromServer),
    switchMap(() =>
      this.sessionService.checkRoute().pipe(
        map(session => new SessionActions.FetchSessionSuccessAction(session)),
        catchError(error => of(new SessionActions.FetchSessionErrorAction(error))),
      ),
    ),
  );

  @Effect()
  public fetchSessionError$ = this.actions$.pipe(
    ofType(SessionActions.SessionActionTypes.FetchSessionFromServerError),
    map(() => new AuthActions.LoginRedirectAction()),
  );

  @Effect()
  public init$ = defer(() => of(undefined)).pipe(map(() => new SessionActions.FetchSessionAction()));

  constructor(private actions$: Actions, private sessionService: SessionService) {}
}
