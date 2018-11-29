import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { select, Store, Action } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { SessionActions } from '@platform/core/actions';

/**
 * isKnownUser is a wrapper for guards which operates on session.
 * it checks store and call backend for session.
 *
 * as parameter it accepts action factory to be able to make an request
 * once session is not present in the store and was never requested
 */
export const isKnownUser = (
  action: () => Action = (): Action => new SessionActions.FetchSessionAction(),
): ((source: Store<fromCore.IState>) => Observable<boolean>) => (source: Store<fromCore.IState>): Observable<boolean> =>
  source.pipe(
    select(fromCore.getLoggedIn),
    map(isLoggedIn => {
      if (isLoggedIn.isPending) {
        return undefined;
      }
      if (!isLoggedIn.isFromBackend) {
        source.dispatch(action());

        return undefined;
      }

      return isLoggedIn.isLoggedIn;
    }),
    filter(result => typeof result !== 'undefined'),
  ) as Observable<boolean>; // TypeScript cannot determine type because of filter operator
