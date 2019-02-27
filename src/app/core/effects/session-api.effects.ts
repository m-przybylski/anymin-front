import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { SessionApiActions } from '../actions';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class SessionApiEffects {
  @Effect({ dispatch: false })
  public updateAccount$ = this.actions$.pipe(
    ofType<SessionApiActions.UpdateAccountInSession>(SessionApiActions.SessionWithAccountApiActionTypes.UpdateAccount),
    map(action => action.payload),
    switchMap(account => {
      this.translateService.use(account.language);

      return of(account);
    }),
  );

  constructor(private actions$: Actions, private translateService: TranslateService) {}
}
