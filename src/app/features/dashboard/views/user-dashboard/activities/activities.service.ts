import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromActivities from '@platform/features/dashboard/reducers';
import { Observable } from 'rxjs';
import { GetImportantActivitiesCounters } from '@anymind-ng/api';

@Injectable()
export class ActivitiesService {
  constructor(private store: Store<fromActivities.IState>) {}

  public get getCounters$(): Observable<GetImportantActivitiesCounters> {
    return this.store.pipe(select(fromActivities.getCounters));
  }
}
