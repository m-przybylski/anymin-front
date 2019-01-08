import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { GetSessionWithAccount } from '@anymind-ng/api';

import * as fromCore from '../reducers';
import * as fromRoot from '@platform/reducers';

export const getNotUndefinedSession = (
  store: Store<fromCore.IState | fromRoot.IState>,
): Observable<GetSessionWithAccount> =>
  store.pipe(
    select(fromCore.selectSession),
    filter(session => !session.isPending),
    map(session => session.session),
    filter(getSessionWithAccount => getSessionWithAccount !== undefined),
  ) as Observable<GetSessionWithAccount>;
