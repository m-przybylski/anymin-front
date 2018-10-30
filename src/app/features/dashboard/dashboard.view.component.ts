import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnymindWebsocketService } from '@platform/core/services/anymind-websocket/anymind-websocket.service';
import { Store } from '@ngrx/store';
import * as fromActivities from '@platform/features/dashboard/reducers';
import { ActivitiesActions } from '@platform/features/dashboard/actions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'plat-dashboard',
  templateUrl: './dashboard.view.component.html',
  styleUrls: ['./dashboard.view.component.sass'],
})
export class DashboardViewComponent implements OnInit, OnDestroy {
  private readonly destroyed$: Subject<void> = new Subject<void>();

  constructor(private anymindWebscoketService: AnymindWebsocketService, private store: Store<fromActivities.IState>) {}

  public ngOnInit(): void {
    this.anymindWebscoketService.importantClientActivity.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.store.dispatch(new ActivitiesActions.IncrementImportantClientActivitiesCounterAction());
    });

    this.anymindWebscoketService.importantProfileActivity.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.store.dispatch(new ActivitiesActions.IncrementImportantProfileActivitiesCounterAction());
    });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
