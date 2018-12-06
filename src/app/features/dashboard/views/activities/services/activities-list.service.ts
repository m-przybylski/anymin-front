import { Injectable } from '@angular/core';
import {
  ActivitiesService,
  FinancesService,
  GetProfileActivities,
  MoneyDto,
  GetProfileActivity,
} from '@anymind-ng/api';
import { Observable, forkJoin, throwError, merge } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { LoggerFactory } from '@anymind-ng/core';
import { AnymindWebsocketService } from '@platform/core/services/anymind-websocket/anymind-websocket.service';
import { Store } from '@ngrx/store';
import * as fromActivities from '@platform/features/dashboard/views/activities/reducers';
import { ActivitiesWsActions } from '@platform/features/dashboard/views/activities/actions';
import { Logger } from '@platform/core/logger';

export interface IActivitiesData {
  importantActivitiesList: GetProfileActivities;
  activitiesList: GetProfileActivities;
}

@Injectable()
export class ActivitiesListService extends Logger {
  private readonly activitiesLimit = 10;
  private readonly activitiesOffset = 0;

  constructor(
    private activitiesService: ActivitiesService,
    private financesService: FinancesService,
    private anymindWebSocket: AnymindWebsocketService,
    private store: Store<fromActivities.IState>,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ActivitiesService'));
  }

  /* EXPERT ACTIVITIES METHODS */
  public getExpertAllActivities(
    activitiesLimit = this.activitiesLimit,
    activitiesOffset = this.activitiesOffset,
  ): Observable<IActivitiesData> {
    return forkJoin([
      this.activitiesService.getExpertProfileImportantActivitiesRoute().pipe(
        catchError(error => {
          this.loggerService.warn(`Can not get expert important activities view: ${error}`);

          return throwError(error);
        }),
      ),
      this.getExpertActivities(activitiesLimit, activitiesOffset),
    ]).pipe(
      map(([importantActivitiesList, activitiesList]) => ({
        importantActivitiesList,
        activitiesList,
      })),
    );
  }

  public getExpertActivities(
    activitiesLimit = this.activitiesLimit,
    activitiesOffset = this.activitiesOffset,
  ): Observable<GetProfileActivities> {
    return this.activitiesService.getExpertProfileActivitiesRoute(`${activitiesLimit}`, `${activitiesOffset}`);
  }

  public getExpertProfilePayment(): Observable<MoneyDto> {
    return this.financesService
      .getExpertProfileBalanceRoute()
      .pipe(map(getProfileBalance => getProfileBalance.balance));
  }

  public getExpertActivity(activityId: string): Observable<GetProfileActivity> {
    return this.activitiesService.getProfileActivityRoute(activityId);
  }

  public listenToExpertWS(): Observable<void> {
    return merge(
      this.anymindWebSocket.importantExpertActivity.pipe(
        tap(activityId => this.store.dispatch(new ActivitiesWsActions.NewExpertActivityNotificationAction(activityId))),
      ),
      this.anymindWebSocket.profileCallProfit.pipe(
        tap(({ balanceAfter }) => this.store.dispatch(new ActivitiesWsActions.BalanceUpdateAction(balanceAfter))),
      ),
    ).pipe(map(() => undefined));
  }

  /* COMPANY ACTIVITIES METHODS */
  public getAllCompanyActivities(
    activitiesLimit = this.activitiesLimit,
    activitiesOffset = this.activitiesOffset,
  ): Observable<IActivitiesData> {
    return forkJoin([
      this.activitiesService.getOrganizationProfileImportantActivitiesRoute().pipe(
        catchError(error => {
          this.loggerService.warn(`Can not get company important activities view: ${error}`);

          return throwError(error);
        }),
      ),
      this.getCompanyActivities(activitiesLimit, activitiesOffset),
    ]).pipe(
      map(([importantActivitiesList, activitiesList]) => ({
        importantActivitiesList,
        activitiesList,
      })),
    );
  }

  public getCompanyActivities(
    activitiesLimit = this.activitiesLimit,
    activitiesOffset = this.activitiesOffset,
  ): Observable<GetProfileActivities> {
    return this.activitiesService.getOrganizationProfileActivitiesRoute(`${activitiesLimit}`, `${activitiesOffset}`);
  }

  public getCompanyProfilePayment(): Observable<MoneyDto> {
    return this.financesService
      .getOrganizationProfileBalanceRoute()
      .pipe(map(getProfileBalance => getProfileBalance.balance));
  }

  public getCompanyActivity(activityId: string): Observable<GetProfileActivity> {
    return this.activitiesService.getProfileActivityRoute(activityId);
  }

  public listenToCompanyWS(): Observable<void> {
    return merge(
      this.anymindWebSocket.importantCompanyActivity.pipe(
        tap(activityId => this.store.dispatch(new ActivitiesWsActions.NewExpertActivityNotificationAction(activityId))),
      ),
      this.anymindWebSocket.profileCallProfit.pipe(
        tap(({ balanceAfter }) => this.store.dispatch(new ActivitiesWsActions.BalanceUpdateAction(balanceAfter))),
      ),
    ).pipe(map(() => undefined));
  }
}
