import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnymindWebsocketService } from '@platform/core/services/anymind-websocket/anymind-websocket.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import {
  DashboardActions,
  VisibilityWSActions,
  VisibilityInitActions,
  InvitationsWsActions,
  InvitationsActions,
} from '@platform/features/dashboard/actions';
import { Subject, merge } from 'rxjs';
import { takeUntil, map, take } from 'rxjs/operators';
import { GetExpertVisibility } from '@anymind-ng/api';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';

@Component({
  selector: 'plat-dashboard',
  templateUrl: './dashboard.view.component.html',
  styleUrls: ['./dashboard.view.component.sass'],
})
export class DashboardViewComponent implements OnInit, OnDestroy {
  private readonly destroyed$: Subject<void> = new Subject<void>();

  constructor(private anymindWebsocketService: AnymindWebsocketService, private store: Store<fromRoot.IState>) {}

  public ngOnInit(): void {
    /**
     * once there user is not an expert do not fetch visibility
     * for the moment company does not have visibility.
     */
    getNotUndefinedSession(this.store)
      .pipe(
        map(session => (session.isExpert ? [new VisibilityInitActions.FetchInitVisibilityAction()] : [])),
        take(1),
      )
      .subscribe(actions => {
        /**
         * when array is empty nothing will be send
         */
        actions.forEach(action => {
          this.store.dispatch(action);
        });
      });

    this.store.dispatch(new DashboardActions.FetchImportantActivitiesCounterAction());
    this.store.dispatch(new InvitationsActions.FetchInvitationsAction());

    /**
     * web socket handler.
     * activities counters for
     *  - client
     *  - expert
     *  - organization
     * and visibility.
     */
    merge(
      this.anymindWebsocketService.newInvitation.pipe(
        map(() => new InvitationsWsActions.IncrementWsInvitationsCounterAction()),
      ),
      this.anymindWebsocketService.importantClientActivity.pipe(
        map(() => new DashboardActions.IncrementImportantClientActivitiesCounterAction()),
      ),
      this.anymindWebsocketService.importantExpertActivity.pipe(
        map(() => new DashboardActions.IncrementImportantExpertActivitiesCounterAction()),
      ),
      this.anymindWebsocketService.importantCompanyActivity.pipe(
        map(() => new DashboardActions.IncrementImportantOrganizationActivitiesCounterAction()),
      ),
      this.anymindWebsocketService.expertPresence.pipe(
        map(getExpertVisibility =>
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
