import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, throwError } from 'rxjs';
import { ActivitiesService, GetProfileActivities, ViewsService } from '@anymind-ng/api';
import { catchError, map } from 'rxjs/operators';
import { Logger } from '@platform/core/logger';
import { LoggerFactory } from '@anymind-ng/core';

export interface IActivitiesResolverData {
  importantActivitiesList: GetProfileActivities;
  activitiesList: GetProfileActivities;
}

@Injectable()
export class ExpertActivitiesResolverService extends Logger implements Resolve<IActivitiesResolverData> {
  private static readonly activitiesLimit = '10';
  private static readonly activitiesOffset = '0';

  constructor(
    private viewsService: ViewsService,
    private activitiesService: ActivitiesService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ExpertActivitiesResolverService'));
  }

  public resolve(): Observable<IActivitiesResolverData> {
    return forkJoin([
      this.activitiesService.getProfileImportantActivitiesRoute(),
      this.viewsService.getDashboardActivitiesProfileRoute(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        ExpertActivitiesResolverService.activitiesLimit,
        ExpertActivitiesResolverService.activitiesOffset,
      ),
    ]).pipe(
      map(([importantActivitiesList, activitiesList]) => ({
        importantActivitiesList,
        activitiesList,
      })),
      catchError(error => {
        this.loggerService.warn(`Can not resolve expert activities view: ${error}`);

        return throwError(error);
      }),
    );
  }
}
