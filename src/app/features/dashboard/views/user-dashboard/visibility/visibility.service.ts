import { Injectable } from '@angular/core';
import * as fromVisibility from '@platform/features/dashboard/reducers';
import { select, Store } from '@ngrx/store';
import { GetExpertVisibility } from '@anymind-ng/api';
import { Observable } from 'rxjs';

@Injectable()
export class VisibilityService {
  constructor(private store: Store<fromVisibility.IState>) {}

  public get getVisibility$(): Observable<GetExpertVisibility.VisibilityEnum> {
    return this.store.pipe(select(fromVisibility.getVisibilityStatus));
  }
}
