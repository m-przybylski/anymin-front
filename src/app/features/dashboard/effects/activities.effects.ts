import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DashboardActions } from '@platform/features/dashboard/actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ActivitiesService } from '@anymind-ng/api';
import { defer, of } from 'rxjs';

@Injectable()
export class DashboardEffects {
  @Effect()
  public fetchImportantActivitiesCounter$ = this.actions$.pipe(
    ofType(DashboardActions.DashboardActionTypes.FetchImportantActivitiesCounterFromServer),
    switchMap(() =>
      this.activitiesService.getImportantActivitiesCountersRoute().pipe(
        map(counters => new DashboardActions.FetchImportantActivitiesCounterSuccessAction(counters)),
        catchError(error => of(new DashboardActions.FetchImportantActivitiesCounterErrorAction(error))),
      ),
    ),
  );

  @Effect()
  public init$ = defer(() => of(undefined)).pipe(
    map(() => new DashboardActions.FetchImportantActivitiesCounterAction()),
  );

  constructor(private actions$: Actions, private activitiesService: ActivitiesService) {}
}
