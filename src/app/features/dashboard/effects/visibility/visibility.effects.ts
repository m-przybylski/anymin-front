import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { VisibilityInitActions, VisibilityApiActions, VisibilityUiActions } from '@platform/features/dashboard/actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { PresenceService } from '@anymind-ng/api';
import { defer, of } from 'rxjs';
import { GetExpertVisibility } from '@anymind-ng/api/model/getExpertVisibility';
import { AlertService } from '@anymind-ng/core';

@Injectable()
export class VisibilityEffects {
  @Effect()
  public fetchVisibilityStatus$ = this.actions$.pipe(
    ofType(VisibilityInitActions.VisibilityInitActionTypes.FetchInitVisilbility),
    switchMap(() =>
      this.presenceService.expertVisibilityRoute().pipe(
        map(
          (expertVisibility: GetExpertVisibility) =>
            new VisibilityApiActions.FetchApiVisilbilitySuccessAction(expertVisibility),
        ),
        catchError(() => {
          this.alertService.pushDangerAlert('DASHBOARD.EXPERT_ACCOUNT.NAVBAR.VISIBILITY.ERROR');

          return of(new VisibilityApiActions.FetchApiVisilbilityErrorAction());
        }),
      ),
    ),
  );

  @Effect()
  public setVisibilityVisible$ = this.actions$.pipe(
    ofType(VisibilityUiActions.VisibilityUiActionTypes.SetUiVisilbilityVisible),
    switchMap(() =>
      this.presenceService.expertVisibleRoute().pipe(
        map(() => new VisibilityApiActions.SetUiVisilbilityVisibleSuccessAction()),
        catchError(() => {
          this.alertService.pushDangerAlert('DASHBOARD.EXPERT_ACCOUNT.NAVBAR.VISIBILITY.SWITCH_BUTTON.ERROR');

          return of(new VisibilityApiActions.SetUiVisilbilityVisibleErrorAction());
        }),
      ),
    ),
  );

  @Effect()
  public setVisibilityInvisible$ = this.actions$.pipe(
    ofType(VisibilityUiActions.VisibilityUiActionTypes.SetUiVisilbilityInvisible),
    switchMap(() =>
      this.presenceService.expertInvisibleRoute().pipe(
        map(() => new VisibilityApiActions.SetUiVisilbilityInvisibleSuccessAction()),
        catchError(() => {
          this.alertService.pushDangerAlert('DASHBOARD.EXPERT_ACCOUNT.NAVBAR.VISIBILITY.SWITCH_BUTTON.ERROR');

          return of(new VisibilityApiActions.SetUiVisilbilityInvisibleErrorAction());
        }),
      ),
    ),
  );

  @Effect()
  public init$ = defer(() => of(undefined)).pipe(map(() => new VisibilityInitActions.FetchInitVisilbilityAction()));

  constructor(
    private actions$: Actions,
    private presenceService: PresenceService,
    private alertService: AlertService,
  ) {}
}
