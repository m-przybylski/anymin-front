import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as fromActivities from '@platform/features/dashboard/views/activities/reducers';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { ActivitiesActions } from '@platform/features/dashboard/views/activities/actions';

export enum ActivityListTypeEnum {
  EXPERT,
  COMPANY,
}

@Injectable()
export class ActivitiesGuard implements CanActivate {
  constructor(private store: Store<fromActivities.IState>) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const activityListType = route.data.activityListType;
    this.store.dispatch(
      activityListType === ActivityListTypeEnum.EXPERT
        ? new ActivitiesActions.LoadExpertActivitiesWithBalanceAction()
        : new ActivitiesActions.LoadCompanyActivitiesWithBalanceAction(),
    );

    return this.waitForCollectionToLoad();
  }

  /**
   * This method creates an observable that waits for the `isLoaded`
   * property of both balance and activity state to turn `true`,
   * emitting one time once loading has finished.
   */
  private waitForCollectionToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(fromActivities.getIsLoaded),
      filter(loaded => loaded),
      take(1),
    );
  }
}
