import { Injectable } from '@angular/core';
import {
  ActivitiesService,
  FinancesService,
  GetClientActivities,
  GetClientActivity,
  GetProfileActivities,
  GetProfileActivity,
  GetProfileBalance,
  GetSessionWithAccount,
} from '@anymind-ng/api';
import { Observable, forkJoin, throwError, merge, EMPTY } from 'rxjs';
import { map, catchError, tap, switchMap, take, filter } from 'rxjs/operators';
import { LoggerFactory } from '@anymind-ng/core';
import { AnymindWebsocketService } from '@platform/core/services/anymind-websocket/anymind-websocket.service';
import { select, Store } from '@ngrx/store';
import { ActivitiesWsActions } from '@platform/features/dashboard/views/activities/actions';
import { Logger } from '@platform/core/logger';
import { IActivitiesClientData } from '@platform/features/dashboard/views/activities/activities.interface';
import * as fromCore from '@platform/core/reducers';

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
    private store: Store<fromCore.IState>,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ActivitiesService'));
  }

  /* CLIENT ACTIVITIES METHODS */
  public getClientAllActivities(
    activitiesLimit = this.activitiesLimit,
    activitiesOffset = this.activitiesOffset,
  ): Observable<IActivitiesClientData> {
    return forkJoin([
      this.activitiesService.getClientImportantActivitiesRoute().pipe(
        catchError(error => {
          this.loggerService.warn(`Can not get client important activities view: ${error}`);

          return throwError(error);
        }),
      ),
      this.activitiesService.getClientActivitiesRoute(`${activitiesLimit}`, `${activitiesOffset}`),
    ]).pipe(
      map(([importantActivitiesList, activitiesList]) => ({
        importantActivitiesList,
        activitiesList,
      })),
    );
  }

  public getClientActivities(activitiesLimit: number, activitiesOffset: number): Observable<GetClientActivities> {
    return this.activitiesService.getClientActivitiesRoute(`${activitiesLimit}`, `${activitiesOffset}`);
  }

  public listenToClientWS(): Observable<void> {
    return this.anymindWebSocket.importantClientActivity.pipe(
      tap(activityId => this.store.dispatch(new ActivitiesWsActions.NewClientActivityNotificationAction(activityId))),
    );
  }

  public getClientActivity(activityId: string): Observable<GetClientActivity> {
    return this.activitiesService.getClientActivityRoute(activityId);
  }

  /* EXPERT ACTIVITIES METHODS */
  public getExpertAllActivities(
    activitiesLimit = this.activitiesLimit,
    activitiesOffset = this.activitiesOffset,
  ): Observable<IActivitiesData> {
    return forkJoin([
      this.store.pipe(
        select(fromCore.getSession),
        filter(getSessionWithAccount => typeof getSessionWithAccount !== 'undefined'),
        take(1),
        switchMap((sessionWithAccount: GetSessionWithAccount) =>
          sessionWithAccount.session.expertProfileId
            ? this.activitiesService.getProfileImportantActivitiesRoute(sessionWithAccount.session.expertProfileId)
            : EMPTY,
        ),
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
    return this.store.pipe(
      select(fromCore.getSession),
      filter(getSessionWithAccount => typeof getSessionWithAccount !== 'undefined'),
      take(1),
      switchMap((sessionWithAccount: GetSessionWithAccount) =>
        sessionWithAccount.session.expertProfileId
          ? this.activitiesService.getProfileActivitiesRoute(
              sessionWithAccount.session.expertProfileId,
              `${activitiesLimit}`,
              `${activitiesOffset}`,
            )
          : EMPTY,
      ),
    );
  }

  public getExpertProfilePayment(): Observable<GetProfileBalance> {
    return this.store.pipe(
      select(fromCore.getSession),
      filter(getSessionWithAccount => typeof getSessionWithAccount !== 'undefined'),
      take(1),
      switchMap((sessionWithAccount: GetSessionWithAccount) =>
        sessionWithAccount.session.expertProfileId
          ? this.financesService.getProfileBalanceRoute_1(sessionWithAccount.session.expertProfileId)
          : EMPTY,
      ),
    );
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
      this.store.pipe(
        select(fromCore.getSession),
        filter(getSessionWithAccount => typeof getSessionWithAccount !== 'undefined'),
        take(1),
        switchMap((sessionWithAccount: GetSessionWithAccount) =>
          sessionWithAccount.session.organizationProfileId
            ? this.activitiesService.getProfileImportantActivitiesRoute(
                sessionWithAccount.session.organizationProfileId,
              )
            : EMPTY,
        ),
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

  public getCompanyActivities(
    activitiesLimit = this.activitiesLimit,
    activitiesOffset = this.activitiesOffset,
    filters?: string,
  ): Observable<GetProfileActivities> {
    return this.store.pipe(
      select(fromCore.getSession),
      filter(getSessionWithAccount => typeof getSessionWithAccount !== 'undefined'),
      take(1),
      switchMap((sessionWithAccount: GetSessionWithAccount) =>
        sessionWithAccount.session.organizationProfileId
          ? this.activitiesService.getProfileActivitiesRoute(
              sessionWithAccount.session.organizationProfileId,
              `${activitiesLimit}`,
              `${activitiesOffset}`,
              filters,
            )
          : EMPTY,
      ),
    );
  }

  public getCompanyProfilePayment(): Observable<GetProfileBalance> {
    return this.store.pipe(
      select(fromCore.getSession),
      filter(getSessionWithAccount => typeof getSessionWithAccount !== 'undefined'),
      take(1),
      switchMap((sessionWithAccount: GetSessionWithAccount) =>
        sessionWithAccount.session.organizationProfileId
          ? this.financesService.getProfileBalanceRoute_1(sessionWithAccount.session.organizationProfileId)
          : EMPTY,
      ),
    );
  }

  public getCompanyActivity(activityId: string): Observable<GetProfileActivity> {
    return this.activitiesService.getProfileActivityRoute(activityId);
  }

  public listenToCompanyWS(): Observable<void> {
    return merge(
      this.anymindWebSocket.importantCompanyActivity.pipe(
        tap(activityId =>
          this.store.dispatch(new ActivitiesWsActions.NewCompanyActivityNotificationAction(activityId)),
        ),
      ),
      this.anymindWebSocket.profileCallProfit.pipe(
        tap(({ balanceAfter }) => this.store.dispatch(new ActivitiesWsActions.BalanceUpdateAction(balanceAfter))),
      ),
    ).pipe(map(() => undefined));
  }
}
