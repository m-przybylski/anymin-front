// tslint:disable:max-file-line-count
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
import { ACTIVITY_DETAILS_DATA } from '@platform/shared/components/modals/activity-details/expert-company-details/expert-company-activity-details-helper';
import {
  ExpertCompanyActivityDetailsComponent,
  MODAL_CLOSED_WITH_ERROR,
} from '@platform/shared/components/modals/activity-details/expert-company-details/expert-company-activity-details.component';
import { GetProfileActivity, GetProfileBalance } from '@anymind-ng/api';
import { Action } from '@ngrx/store';
import { IProfileActivitiesWithStatus } from '@platform/features/dashboard/views/activities/activities.component';
import { ActivitiesListService } from '@platform/features/dashboard/views/activities/services/activities-list.service';
import { DashboardActions } from '@platform/features/dashboard/actions';
import {
  IActivitiesData,
  IActivity,
  IGetActivities,
} from '@platform/features/dashboard/views/activities/activities.interface';
import { ActivitiesUtilsService } from '@platform/features/dashboard/views/activities/services/activities-utils.service';
import {
  ClientActivityDetailsComponent,
  IClientActivityData,
} from '@platform/shared/components/modals/activity-details/client-details/client-activity-details.component';
import { CLIENT_ACTIVITY_DETAILS_DATA } from '@platform/shared/components/modals/activity-details/client-details/client-activity-details-helper';

const EMPTY_ACTION = of({ type: 'NO_ACTION' });

@Injectable()
export class ActivitiesEffects {
  @Effect()
  public loadAllExpertActivitiesWithBalance$ = this.actions$.pipe(
    ofType<ActivitiesActions.ActivitiesActionUnion>(
      ActivitiesActions.ActivitiesActionTypes.LoadExpertActivitiesWithBalance,
      ActivitiesActions.ActivitiesActionTypes.LoadCompanyActivitiesWithBalance,
      ActivitiesActions.ActivitiesActionTypes.LoadClientActivities,
    ),
    map(action => action.type),
    switchMap(actionType => {
      if (actionType === ActivitiesActions.ActivitiesActionTypes.LoadClientActivities) {
        return this.activitiesListService.getClientAllActivities().pipe(
          map(
            getClientActivities =>
              new ActivitiesApiActions.LoadClientActivitiesWithImportantSuccessAction(getClientActivities),
          ),
          catchError(error => of(new ActivitiesApiActions.LoadClientActivitiesWithImportantFailureAction(error))),
        );
      }

      const { getPayments, getActivities } =
        actionType === ActivitiesActions.ActivitiesActionTypes.LoadExpertActivitiesWithBalance
          ? {
              getPayments: this.activitiesListService.getExpertProfilePayment.bind(this.activitiesListService),
              getActivities: this.activitiesListService.getExpertAllActivities.bind(this.activitiesListService),
            }
          : {
              getPayments: this.activitiesListService.getCompanyProfilePayment.bind(this.activitiesListService),
              getActivities: this.activitiesListService.getAllCompanyActivities.bind(this.activitiesListService),
            };

      return this.loadAllActivities(getPayments, getActivities);
    }),
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
  public loadMoreClientActivities$ = this.actions$.pipe(
    ofType<ActivitiesPageActions.LoadMoreClientActivitiesAction>(
      ActivitiesPageActions.ActivitiesPageActionTypes.LoadMoreClientActivities,
    ),
    map(action => action.payload),
    this.loadMoreActivities(offsetConfig =>
      this.activitiesListService
        .getClientActivities(offsetConfig.offsetIterator, offsetConfig.currentOffset)
        .pipe(map(getClientActivities => ActivitiesUtilsService.mapGetClientActivities(getClientActivities))),
    ),
  );

  @Effect()
  public loadFilteredCompanyActivities$ = this.actions$.pipe(
    ofType<ActivitiesPageActions.LoadFilteredCompanyActivitiesAction>(
      ActivitiesPageActions.ActivitiesPageActionTypes.LoadFilteredCompanyActivities,
    ),
    map(action => action.payload),
    exhaustMap(config =>
      this.activitiesListService.getCompanyActivities(undefined, undefined, config.filter).pipe(
        map(getProfileActivities => new ActivitiesApiActions.LoadFilteredActivitiesSuccessAction(getProfileActivities)),
        catchError(error => of(new ActivitiesApiActions.LoadFilteredActivitiesFailureAction(error))),
      ),
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
  public openClientActivityDetails$ = this.actions$.pipe(
    ofType<ActivitiesPageActions.ClientActivityRowClickAction>(
      ActivitiesPageActions.ActivitiesPageActionTypes.ClientActivityRowClick,
    ),
    map(action => action.payload),
    this.openClientActivityDetails(actionPayload => this.createClientActions(actionPayload.getProfileActivity)),
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

  @Effect()
  public loadClientActivityById$ = this.actions$.pipe(
    ofType<ActivitiesWsActions.NewClientActivityNotificationAction>(
      ActivitiesWsActions.ActivitiesWsActionTypes.NewClientActivityNotification,
    ),
    map(action => action.payload),
    this.loadActivityId(activityId =>
      this.activitiesListService
        .getClientActivity(activityId)
        .pipe(map(getClientActivities => ActivitiesUtilsService.mapClientActivity(getClientActivities))),
    ),
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

  private openClientActivityDetails(createAction: ActionFromModalResultFactory): ModalResultToActionMapper {
    return (source: Observable<{ getProfileActivity: GetProfileActivity; isImportant: boolean }>): Observable<Action> =>
      source.pipe(
        exhaustMap(({ getProfileActivity, isImportant }) => {
          const profileActivity: IClientActivityData = {
            activityId: getProfileActivity.id,
            isImportant,
          };
          const options: NgbModalOptions = {
            injector: Injector.create({
              providers: [{ provide: CLIENT_ACTIVITY_DETAILS_DATA, useValue: profileActivity }],
              parent: this.injector,
            }),
          };

          return from(this.modalService.open(ClientActivityDetailsComponent, options).result).pipe(
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

  private createClientActions(getProfileActivity: GetProfileActivity): ReadonlyArray<Action> {
    return [
      new DashboardActions.DecrementImportantClientActivitiesCounterAction(),
      new ActivitiesPageActions.ActivityDetailsClosedAction(getProfileActivity),
    ];
  }

  private loadAllActivities(
    getProfilePayment: () => Observable<GetProfileBalance>,
    getAllActivities: () => Observable<IActivitiesData>,
  ): Observable<Action> {
    return forkJoin(getProfilePayment(), getAllActivities()).pipe(
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
    );
  }

  private loadMoreActivities(
    getActivities: (offsetConfig: { currentOffset: number; offsetIterator: number }) => Observable<IGetActivities>,
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

          return from(this.modalService.open(ExpertCompanyActivityDetailsComponent, options).result).pipe(
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
    getActivity: (activityId: string) => Observable<IActivity>,
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
  payload: {
    getProfileActivity: GetProfileActivity;
    isImportant: boolean;
  },
) => ReadonlyArray<Action>;
type ModalResultToActionMapper = (
  source: Observable<{
    getProfileActivity: GetProfileActivity;
    isImportant: boolean;
  }>,
) => Observable<Action>;
