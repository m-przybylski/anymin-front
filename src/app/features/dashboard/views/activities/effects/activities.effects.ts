import { Injectable, Injector } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  ActivitiesActions,
  ActivitiesApiActions,
  ActivitiesPageActions,
  ActivitiesWsActions,
  BalanceApiActions,
} from '../actions';
import { exhaustMap, catchError, switchMap, map } from 'rxjs/operators';
import { forkJoin, from, of, defer, Observable } from 'rxjs';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ACTIVITY_DETAILS_DATA } from '@platform/shared/components/modals/activity-details/activity-details-helpers';
import {
  ActivityDetailsViewComponent,
  MODAL_CLOSED_WITH_ERROR,
} from '@platform/shared/components/modals/activity-details/activity-details.view.component';
import { GetProfileActivities, GetProfileActivity, MoneyDto } from '@anymind-ng/api';
import { Action } from '@ngrx/store';
import { IProfileActivitiesWithStatus } from '@platform/features/dashboard/views/activities/activities.component';
import { ActivitiesListService } from '@platform/features/dashboard/views/activities/services/activities-list.service';
import { DashboardActions } from '@platform/features/dashboard/actions';
import { IActivitiesData } from '@platform/features/dashboard/views/activities/activities.interface';

const EMPTY_ACTION = of({ type: 'NO_ACTION' });

@Injectable()
export class ActivitiesEffects {
  @Effect()
  public loadAllExpertActivitiesWithBalance$ = this.actions$.pipe(
    ofType(ActivitiesActions.ActivitiesActionTypes.LoadExpertActivitiesWithBalance),
    this.loadAllActivitiesWithBalance(
      () => this.activitiesListService.getExpertProfilePayment(),
      () => this.activitiesListService.getExpertAllActivities(),
    ),
  );

  @Effect()
  public loadAllCompanyActivitiesWithBalance$ = this.actions$.pipe(
    ofType(ActivitiesActions.ActivitiesActionTypes.LoadCompanyActivitiesWithBalance),
    this.loadAllActivitiesWithBalance(
      () => this.activitiesListService.getCompanyProfilePayment(),
      () => this.activitiesListService.getAllCompanyActivities(),
    ),
  );

  @Effect()
  public loadMoreExpertActivities$ = this.actions$.pipe(
    ofType<ActivitiesPageActions.LoadMoreCompanyActivitiesAction>(
      ActivitiesPageActions.ActivitiesPageActionTypes.LoadMoreExpertActivities,
    ),
    map(action => action.payload),
    this.loadMoreActivities(offsetConfig =>
      this.activitiesListService.getExpertActivities(offsetConfig.offsetIterator, offsetConfig.currentOffset),
    ),
  );

  @Effect()
  public loadMoreCompanyActivities$ = this.actions$.pipe(
    ofType<ActivitiesPageActions.LoadMoreCompanyActivitiesAction>(
      ActivitiesPageActions.ActivitiesPageActionTypes.LoadMoreCompanyActivities,
    ),
    map(action => action.payload),
    this.loadMoreActivities(offsetConfig =>
      this.activitiesListService.getCompanyActivities(offsetConfig.offsetIterator, offsetConfig.currentOffset),
    ),
  );

  @Effect()
  public openExpertActivityDetails$ = this.actions$.pipe(
    ofType<ActivitiesPageActions.ExpertActivityRowClickAction>(
      ActivitiesPageActions.ActivitiesPageActionTypes.ExpertActivityRowClick,
    ),
    map(action => action.payload),
    this.openExpertActivityDetails(actionPayload => this.createExpertActions(actionPayload.getProfileActivity)),
  );

  @Effect()
  public openCompanyActivityDetails$ = this.actions$.pipe(
    ofType<ActivitiesPageActions.CompanyActivityRowClickAction>(
      ActivitiesPageActions.ActivitiesPageActionTypes.CompanyActivityRowClick,
    ),
    map(action => action.payload),
    this.openCompanyActivityDetails(actionPayload => this.createCompanyActions(actionPayload.getProfileActivity)),
  );

  @Effect()
  public loadExpertActivityById$ = this.actions$.pipe(
    ofType<ActivitiesWsActions.NewExpertActivityNotificationAction>(
      ActivitiesWsActions.ActivitiesWsActionTypes.NewExpertActivityNotification,
    ),
    map(action => action.payload),
    this.loadActivityId(activityId => this.activitiesListService.getExpertActivity(activityId)),
  );

  @Effect()
  public loadCompanyActivityById$ = this.actions$.pipe(
    ofType<ActivitiesWsActions.NewCompanyActivityNotificationAction>(
      ActivitiesWsActions.ActivitiesWsActionTypes.NewCompanyActivityNotification,
    ),
    map(action => action.payload),
    this.loadActivityId(activityId => this.activitiesListService.getCompanyActivity(activityId)),
  );

  private get openCompanyActivityDetails(): (createAction: ActionFromModalResultFactory) => ModalResultToActionMapper {
    return this.openActivityDetails(true);
  }

  private get openExpertActivityDetails(): (createAction: ActionFromModalResultFactory) => ModalResultToActionMapper {
    return this.openActivityDetails(false);
  }

  constructor(
    private actions$: Actions,
    private activitiesListService: ActivitiesListService,
    private modalService: NgbModal,
    private injector: Injector,
  ) {}

  private createExpertActions(getProfileActivity: GetProfileActivity): ReadonlyArray<Action> {
    return [
      new DashboardActions.DecrementImportantExpertActivitiesCounterAction(),
      new ActivitiesPageActions.ActivityDetailsClosedAction(getProfileActivity),
    ];
  }

  private createCompanyActions(getProfileActivity: GetProfileActivity): ReadonlyArray<Action> {
    return [
      new DashboardActions.DecrementImportantOrganizationActivitiesCounterAction(),
      new ActivitiesPageActions.ActivityDetailsClosedAction(getProfileActivity),
    ];
  }

  private loadAllActivitiesWithBalance(
    getProfilePayment: () => Observable<MoneyDto>,
    getAllActivities: () => Observable<IActivitiesData>,
  ): (source: Observable<Action>) => Observable<Action> {
    return (source: Observable<Action>): Observable<Action> =>
      source.pipe(
        exhaustMap(() =>
          forkJoin(getProfilePayment(), getAllActivities()).pipe(
            switchMap(([getProfileBalance, activitiesData]) =>
              from([
                new BalanceApiActions.LoadBalanceSuccessAction(getProfileBalance),
                new ActivitiesApiActions.LoadActivitiesWithImportantSuccessAction(activitiesData),
              ]),
            ),
            catchError(error =>
              from([
                new BalanceApiActions.LoadBalanceFailureAction(error),
                new ActivitiesApiActions.LoadActivitiesWithImportantFailureAction(error),
              ]),
            ),
          ),
        ),
      );
  }

  private loadMoreActivities(
    getActivities: (
      offsetConfig: { currentOffset: number; offsetIterator: number },
    ) => Observable<GetProfileActivities>,
  ): (source: Observable<{ currentOffset: number; offsetIterator: number }>) => Observable<Action> {
    return (source: Observable<{ currentOffset: number; offsetIterator: number }>): Observable<Action> =>
      source.pipe(
        exhaustMap(offsetConfig =>
          getActivities(offsetConfig).pipe(
            map(getProfileActivities => new ActivitiesApiActions.LoadActivitiesSuccessAction(getProfileActivities)),
            catchError(error => of(new ActivitiesApiActions.LoadActivitiesFailureAction(error))),
          ),
        ),
      );
  }

  private openActivityDetails(
    isCompany: boolean,
  ): (createAction: ActionFromModalResultFactory) => ModalResultToActionMapper {
    return (createAction: ActionFromModalResultFactory): ModalResultToActionMapper => (
      source: Observable<{ getProfileActivity: GetProfileActivity; isImportant: boolean }>,
    ): Observable<Action> =>
      source.pipe(
        exhaustMap(({ getProfileActivity, isImportant }) => {
          const profileActivity: IProfileActivitiesWithStatus = {
            activity: getProfileActivity,
            isCompany,
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
                return from(createAction({ getProfileActivity, isImportant }));
              }

              return EMPTY_ACTION;
            }),
            catchError(() =>
              defer(() => (isImportant ? from(createAction({ getProfileActivity, isImportant })) : EMPTY_ACTION)),
            ),
          );
        }),
      );
  }

  private loadActivityId(
    getActivity: (activityId: string) => Observable<GetProfileActivity>,
  ): (source: Observable<string>) => Observable<Action> {
    return (source: Observable<string>): Observable<Action> =>
      source.pipe(
        exhaustMap(activityId =>
          getActivity(activityId).pipe(
            map(activity => new ActivitiesApiActions.LoadActivitySuccessAction(activity)),
            catchError(error => of(new ActivitiesApiActions.LoadActivityFailureAction(error))),
          ),
        ),
      );
  }
}

type ActionFromModalResultFactory = (
  payload: { getProfileActivity: GetProfileActivity; isImportant: boolean },
) => ReadonlyArray<Action>;
type ModalResultToActionMapper = (
  source: Observable<{
    getProfileActivity: GetProfileActivity;
    isImportant: boolean;
  }>,
) => Observable<Action>;
