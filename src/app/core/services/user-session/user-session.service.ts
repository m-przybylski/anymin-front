import { Injectable } from '@angular/core';
import { LoginCredentials, SessionService } from '@anymind-ng/api';
import { GetSessionWithAccount } from '@anymind-ng/api/model/getSessionWithAccount';
import { Store } from '@ngrx/store';
import * as fromCore from '../../reducers';
import { AuthActions } from '../../actions';
import { tap, map, mergeMap, take, reduce } from 'rxjs/operators';
import { Observable, from, forkJoin } from 'rxjs';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';

@Injectable()
export class UserSessionService {
  constructor(private sessionService: SessionService, private store: Store<fromCore.IState>) {}

  public logout(): void {
    this.store.dispatch(new AuthActions.LogoutAction());
  }

  public login(loginDetails: LoginCredentials): Observable<GetSessionWithAccount> {
    return this.sessionService.login(loginDetails).pipe(
      tap(session => {
        this.store.dispatch(new AuthActions.LoginSuccessAction(session));
      }),
    );
  }

  /**
   * function removes all sessions except current one.
   */
  public removeAllSessionsExceptCurrent(): void {
    /**
     * reducer puts api keys into a list
     * @param apiKeys list of keys
     * @param apiKey current key for iteration
     */
    const concatReducer: (apiKeys: ReadonlyArray<string>, apiKey: string) => ReadonlyArray<string> = (
      apiKeys,
      apiKey,
    ): ReadonlyArray<string> => apiKeys.concat([apiKey]);
    /**
     * stream emits current apiKey from store
     */
    const currentApiKey$ = getNotUndefinedSession(this.store).pipe(
      take(1),
      map(getSessionWithAccount => getSessionWithAccount.session.apiKey),
    );
    /**
     * stream emits list of all api keys assign to current, logged in user
     */
    const apiKeys$ = this.sessionService.getSessionsRoute().pipe(
      take(1),
      /**
       * Observable<string[]> -> Observable<string>
       */
      mergeMap(sessions => from([...sessions])),
      /**
       * gets apiKey
       */
      map(session => session.apiKey),
      /**
       * Observable<string> -> Observable<string[]>
       */
      reduce(concatReducer, [] as ReadonlyArray<string>),
    );
    /**
     * function makes logout request for each apiKey except current one.
     */
    forkJoin(currentApiKey$, apiKeys$)
      .pipe(
        mergeMap(([currentApiKey, apiKeys]) =>
          forkJoin(
            apiKeys.filter(apiKey => apiKey !== currentApiKey).map(apiKey => this.sessionService.logoutRoute(apiKey)),
          ),
        ),
      )
      .subscribe();
  }
}
