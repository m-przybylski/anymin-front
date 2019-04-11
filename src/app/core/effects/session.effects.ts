import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, defer } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { SessionActions, SessionApiActions } from '../actions';
import { SessionService } from '@anymind-ng/api';

@Injectable()
export class SessionEffects {
  @Effect()
  public fetchSession$ = this.actions$.pipe(
    ofType(
      SessionActions.SessionActionTypes.FetchSessionFromServer,
      SessionActions.SessionActionTypes.FetchSessionFromServerForProfileCreation,
    ),
    switchMap(() =>
      this.sessionService.checkRoute().pipe(
        map(session => new SessionApiActions.FetchSessionSuccessAction(session)),
        catchError(error => of(new SessionApiActions.FetchSessionErrorAction(error))),
      ),
    ),
  );

  @Effect()
  public init$ = defer(() => of(undefined)).pipe(map(() => new SessionActions.FetchSessionAction()));

  constructor(private actions$: Actions, private sessionService: SessionService) {}
}
