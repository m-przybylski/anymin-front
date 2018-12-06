import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';

@Injectable()
export class AccountIdResolver implements Resolve<string> {
  constructor(private store: Store<fromRoot.IState>) {}

  public resolve = (): Observable<string> =>
    getNotUndefinedSession(this.store).pipe(
      take(1),
      map(session => session.account.id),
    );
}
