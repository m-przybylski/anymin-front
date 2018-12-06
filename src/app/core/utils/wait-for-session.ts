import { Observable } from 'rxjs';
import { mergeMap, map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromCore from '../reducers';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';

export const waitForSession = <T>(store: Store<fromCore.IState>): ((source: Observable<T>) => Observable<T>) => (
  source: Observable<T>,
): Observable<T> =>
  source.pipe(
    mergeMap(value =>
      getNotUndefinedSession(store).pipe(
        take(1),
        map(() => value),
      ),
    ),
  );
