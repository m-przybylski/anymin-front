import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { PresenceService } from '@anymind-ng/api';
import { of } from 'rxjs';
import { GetExpertVisibility } from '@anymind-ng/api/model/getExpertVisibility';
import { AlertService } from '@anymind-ng/core';
import { VisibilityApiActions, VisibilityInitActions, VisibilityUiActions } from '@platform/core/actions';

@Injectable()
export class VisibilityEffects {
  @Effect()
  public fetchVisibilityStatus$ = this.actions$.pipe(
    ofType(VisibilityInitActions.VisibilityInitActionTypes.FetchInitVisibility),
    switchMap(() =>
      this.presenceService.expertVisibilityRoute().pipe(
        map(
          (expertVisibility: GetExpertVisibility) =>
            new VisibilityApiActions.FetchApiVisibilitySuccessAction(expertVisibility),
        ),
        catchError(() => of(new VisibilityApiActions.FetchApiVisibilityErrorAction())),
      ),
    ),
  );

  @Effect()
  public setVisibilityVisible$ = this.actions$.pipe(
    ofType(VisibilityUiActions.VisibilityUiActionTypes.SetUiVisibilityVisible),
    switchMap(() =>
      this.presenceService.expertVisibleRoute().pipe(
        map(() => new VisibilityApiActions.SetUiVisibilityVisibleSuccessAction()),
        catchError(() => {
          this.alertService.pushDangerAlert('DASHBOARD.EXPERT_ACCOUNT.NAVBAR.VISIBILITY.SWITCH_BUTTON.ERROR');

          return of(new VisibilityApiActions.SetUiVisibilityVisibleErrorAction());
        }),
      ),
    ),
  );

  @Effect()
  public setVisibilityInvisible$ = this.actions$.pipe(
    ofType(VisibilityUiActions.VisibilityUiActionTypes.SetUiVisibilityInvisible),
    switchMap(() =>
      this.presenceService.expertInvisibleRoute().pipe(
        map(() => new VisibilityApiActions.SetUiVisibilityInvisibleSuccessAction()),
        catchError(() => {
          this.alertService.pushDangerAlert('DASHBOARD.EXPERT_ACCOUNT.NAVBAR.VISIBILITY.SWITCH_BUTTON.ERROR');

          return of(new VisibilityApiActions.SetUiVisibilityInvisibleErrorAction());
        }),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private presenceService: PresenceService,
    private alertService: AlertService,
  ) {}
}
