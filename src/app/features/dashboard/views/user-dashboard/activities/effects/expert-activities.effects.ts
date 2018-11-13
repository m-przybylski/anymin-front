import { Injectable, Injector } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  ExpertActivitiesActions,
  ExpertActivitiesApiActions,
  ExpertActivitiesPageActions,
  ExpertActivitiesWsActions,
  BalanceApiActions,
} from '../actions';
import { exhaustMap, catchError, switchMap, map } from 'rxjs/operators';
import { ExpertActivitiesService } from '../services/expert-activities.service';
import { forkJoin, from, of, defer } from 'rxjs';
import { IProfileActivitiesWithStatus } from '../views/expert-activities/expert-activities.view.component';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ACTIVITY_DETAILS_DATA } from '@platform/shared/components/modals/activity-details/activity-details-helpers';
import {
  ActivityDetailsViewComponent,
  MODAL_CLOSED_WITH_ERROR,
} from '@platform/shared/components/modals/activity-details/activity-details.view.component';
import { ActivitiesActions } from '@platform/features/dashboard/actions';
import { GetProfileActivity } from '@anymind-ng/api';
import { Action } from '@ngrx/store';

const EMPTY_ACTION = of({ type: 'NO_ACTION' });

@Injectable()
export class ExpertActivitiesEffects {
  @Effect()
  public loadExpertAllActivitiesWithBalance$ = this.actions$.pipe(
    ofType(ExpertActivitiesActions.ExpertActivitiesActionTypes.LoadExpertActivitiesWithBalance),
    exhaustMap(() =>
      forkJoin(this.expertActivitiesService.getProfilePayment(), this.expertActivitiesService.getAllActivieties()).pipe(
        switchMap(([getProfileBalance, activitiesData]) =>
          from([
            new BalanceApiActions.LoadExpertBalanceSuccessAction(getProfileBalance),
            new ExpertActivitiesApiActions.LoadExpertActivitiesWithImportantSuccessAction(activitiesData),
          ]),
        ),
        catchError(error =>
          from([
            new BalanceApiActions.LoadExpertBalanceFailureAction(error),
            new ExpertActivitiesApiActions.LoadExpertActivitiesWithImportantFailureAction(error),
          ]),
        ),
      ),
    ),
  );

  @Effect()
  public loadMoreExpertActivities$ = this.actions$.pipe(
    ofType<ExpertActivitiesPageActions.LoadMoreExpertActivitiesAction>(
      ExpertActivitiesPageActions.ExpertActivitiesPageActionTypes.LoadMoreExpertActivities,
    ),
    map(action => action.payload),
    exhaustMap(offsetConfig =>
      this.expertActivitiesService.getActivieties(offsetConfig.offsetIterator, offsetConfig.currentOffset).pipe(
        map(
          getProfileActivities =>
            new ExpertActivitiesApiActions.LoadExpertActivitiesSuccessAction(getProfileActivities),
        ),
        catchError(error => of(new ExpertActivitiesApiActions.LoadExpertActivitiesFailureAction(error))),
      ),
    ),
  );

  @Effect()
  public openActivityDetails$ = this.actions$.pipe(
    ofType<ExpertActivitiesPageActions.ActivityRowClickAction>(
      ExpertActivitiesPageActions.ExpertActivitiesPageActionTypes.ActivityRowClick,
    ),
    map(action => action.payload),
    exhaustMap(({ getProfileActivity, isImportant }) => {
      const profileActivity: IProfileActivitiesWithStatus = {
        activity: getProfileActivity,
        isImportant,
      };
      const options: NgbModalOptions = {
        injector: Injector.create({
          providers: [{ provide: ACTIVITY_DETAILS_DATA, useValue: profileActivity }],
          parent: this.injector,
        }),
      };

      return from(this.modalService.open(ActivityDetailsViewComponent, options).result).pipe(
        switchMap((result: string) => {
          if (isImportant && result !== MODAL_CLOSED_WITH_ERROR) {
            return from(this.createActions(getProfileActivity));
          }

          return EMPTY_ACTION;
        }),
        catchError(() => defer(() => (isImportant ? from(this.createActions(getProfileActivity)) : EMPTY_ACTION))),
      );
    }),
  );

  @Effect()
  public loadExpertActivityById$ = this.actions$.pipe(
    ofType<ExpertActivitiesWsActions.NewActivityNotificationAction>(
      ExpertActivitiesWsActions.ExpertActivitiesWsActionTypes.NewActivityNotification,
    ),
    map(action => action.payload),
    exhaustMap(activityId =>
      this.expertActivitiesService.getActivity(activityId).pipe(
        map(activity => new ExpertActivitiesApiActions.LoadExpertActivitySuccessAction(activity)),
        catchError(error => of(new ExpertActivitiesApiActions.LoadExpertActivityFailureAction(error))),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private expertActivitiesService: ExpertActivitiesService,
    private modalService: NgbModal,
    private injector: Injector,
  ) {}

  private createActions(getProfileActivity: GetProfileActivity): ReadonlyArray<Action> {
    return [
      new ActivitiesActions.DecrementImportantExpertActivitiesCounterAction(),
      new ExpertActivitiesPageActions.ActivityDetailsClosedAction(getProfileActivity),
    ];
  }
}
