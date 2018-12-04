import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { GetSessionWithAccount } from '@anymind-ng/api';

import * as fromCore from '../reducers';

export const selectNewSession = (): ((
  state: Store<fromCore.IState>,
) => Observable<GetSessionWithAccount | undefined>) => (
  state: Store<fromCore.IState>,
): Observable<GetSessionWithAccount | undefined> =>
  state.pipe(
    select(fromCore.getSession),
    distinctUntilChanged(
      (oldSession, newSession) =>
        oldSession !== undefined && newSession !== undefined && oldSession.session.apiKey === newSession.session.apiKey,
    ),
  );
