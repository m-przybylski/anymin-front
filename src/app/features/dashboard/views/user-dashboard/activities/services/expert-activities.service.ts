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
import { Logger } from '@platform/core/logger';
import { AnymindWebsocketService } from '@platform/core/services/anymind-websocket/anymind-websocket.service';
import { Store } from '@ngrx/store';
import * as fromActivities from '../reducers';
import { ExpertActivitiesWsActions } from '../actions';
export interface IActivitiesData {
  importantActivitiesList: GetProfileActivities;
  activitiesList: GetProfileActivities;
}

@Injectable()
export class ExpertActivitiesService extends Logger {
  private readonly activitiesLimit = 10;
  private readonly activitiesOffset = 0;

  constructor(
    private activitiesService: ActivitiesService,
    private financesService: FinancesService,
    private anymindWebSocket: AnymindWebsocketService,
    private store: Store<fromActivities.IState>,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ExpertActivitiesResolverService'));
  }

  public getAllActivieties(
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
      this.getActivieties(activitiesLimit, activitiesOffset),
    ]).pipe(
      map(([importantActivitiesList, activitiesList]) => ({
        importantActivitiesList,
        activitiesList,
      })),
    );
  }

  public getActivieties(
    _activitiesLimit = this.activitiesLimit,
    _activitiesOffset = this.activitiesOffset,
  ): Observable<GetProfileActivities> {
    // TODO: add paggination once backend is ready
    return this.activitiesService.getExpertProfileActivitiesRoute();
  }

  public getProfilePayment(): Observable<MoneyDto> {
    return this.financesService
      .getExpertProfileBalanceRoute()
      .pipe(map(getProfileBalance => getProfileBalance.balance));
  }

  public getActivity(activityId: string): Observable<GetProfileActivity> {
    return this.activitiesService.getProfileActivityRoute(activityId);
  }

  public listenToWS(): Observable<void> {
    return merge(
      this.anymindWebSocket.importantProfileActivity.pipe(
        tap(activityId => this.store.dispatch(new ExpertActivitiesWsActions.NewActivityNotificationAction(activityId))),
      ),
      this.anymindWebSocket.profileCallProfit.pipe(
        tap(({ balanceAfter }) => this.store.dispatch(new ExpertActivitiesWsActions.BalanceUpdateAction(balanceAfter))),
      ),
    ).pipe(map(() => undefined));
  }
}
