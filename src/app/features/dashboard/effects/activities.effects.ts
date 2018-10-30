import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ActivitiesActions } from '@platform/features/dashboard/actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ActivitiesService } from '@anymind-ng/api';
import { defer, of } from 'rxjs';

@Injectable()
export class ActivitiesEffects {
  @Effect()
  public fetchImportantActivitiesCounter$ = this.actions$.pipe(
    ofType(ActivitiesActions.ActivitiesActionTypes.FetchImportantActivitiesCounterFromServer),
    switchMap(() =>
      this.activitiesService.getImportantActivitiesCountersRoute().pipe(
        map(counters => new ActivitiesActions.FetchImportantActivitiesCounterSuccessAction(counters)),
        catchError(error => of(new ActivitiesActions.FetchImportantActivitiesCounterErrorAction(error))),
      ),
    ),
  );

  @Effect()
  public init$ = defer(() => of(undefined)).pipe(
    map(() => new ActivitiesActions.FetchImportantActivitiesCounterAction()),
  );

  constructor(private actions$: Actions, private activitiesService: ActivitiesService) {}
}
