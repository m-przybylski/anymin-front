import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnymindWebsocketService } from '@platform/core/services/anymind-websocket/anymind-websocket.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import { ActivitiesActions, VisibilityWSActions } from '@platform/features/dashboard/actions';
import { Subject, merge } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { GetExpertVisibility } from '@anymind-ng/api';

@Component({
  selector: 'plat-dashboard',
  templateUrl: './dashboard.view.component.html',
  styleUrls: ['./dashboard.view.component.sass'],
})
export class DashboardViewComponent implements OnInit, OnDestroy {
  private readonly destroyed$: Subject<void> = new Subject<void>();

  constructor(private anymindWebscoketService: AnymindWebsocketService, private store: Store<fromRoot.IState>) {}

  public ngOnInit(): void {
    merge(
      this.anymindWebscoketService.importantClientActivity.pipe(
        map(() => new ActivitiesActions.IncrementImportantClientActivitiesCounterAction()),
      ),
      this.anymindWebscoketService.importantClientActivity.pipe(
        map(() => new ActivitiesActions.IncrementImportantClientActivitiesCounterAction()),
      ),
      this.anymindWebscoketService.expertPresence.pipe(
        map(
          getExpertVisibility =>
            getExpertVisibility === GetExpertVisibility.VisibilityEnum.Visible
              ? new VisibilityWSActions.SetWSVisibilityVisibleAction()
              : new VisibilityWSActions.SetWSVisibilityInvisibleAction(),
        ),
      ),
    )
      .pipe(takeUntil(this.destroyed$))
      .subscribe(action => {
        this.store.dispatch(action);
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
