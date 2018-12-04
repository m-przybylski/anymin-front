import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { GetSessionWithAccount } from '@anymind-ng/api';

import * as fromCore from '../reducers';
import * as fromRoot from '@platform/reducers';

export const getNotUndefinedSession = (
  store: Store<fromCore.IState | fromRoot.IState>,
): Observable<GetSessionWithAccount> =>
  store.pipe(
    select(fromCore.getSession),
    filter(getSessionWithAccount => getSessionWithAccount !== undefined),
  ) as Observable<GetSessionWithAccount>;
