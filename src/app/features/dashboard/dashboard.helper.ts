import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { GetSessionWithAccount } from '@anymind-ng/api';

export const dashboardGuardHelper = (
  action: (session: GetSessionWithAccount) => boolean,
): ((source: Store<fromCore.IState>) => Observable<boolean>) => (source: Store<fromCore.IState>): Observable<boolean> =>
  source.pipe(
    select(fromCore.getSession),
    filter(getSessionWithAccount => typeof getSessionWithAccount !== 'undefined'),
    map(action),
    take(1),
  );
