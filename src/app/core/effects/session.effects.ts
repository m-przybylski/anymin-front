import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, defer } from 'rxjs';
import { catchError, switchMap, tap, map } from 'rxjs/operators';
import { SessionActions } from '../actions';
import { SessionService } from '@anymind-ng/api';
import { ApiKeyService } from '@platform/core/services/api-key/api-key.service';

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

  @Effect({ dispatch: false })
  public fetchSessionSuccess$ = this.actions$.pipe(
    ofType<SessionActions.FetchSessionSuccessAction>(SessionActions.SessionActionTypes.FetchSessionFromServerSuccess),
    tap(({ payload }) => {
      this.apiKeyService.setApiKey(payload.session.apiKey);
    }),
  );

  @Effect()
  public init$ = defer(() => of(undefined)).pipe(map(() => new SessionActions.FetchSessionAction()));

  constructor(
    private actions$: Actions,
    private sessionService: SessionService,
    private apiKeyService: ApiKeyService,
  ) {}
}
