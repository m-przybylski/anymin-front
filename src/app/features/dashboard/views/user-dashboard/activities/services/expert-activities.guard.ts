import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as fromActivities from '../reducers';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { ExpertActivitiesActions } from '../actions';

@Injectable()
export class ExpertActivitiesGuard implements CanActivate {
  constructor(private store: Store<fromActivities.IState>) {}

  public canActivate(): Observable<boolean> {
    this.store.dispatch(new ExpertActivitiesActions.LoadExpertActivitiesWithBalance());

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
