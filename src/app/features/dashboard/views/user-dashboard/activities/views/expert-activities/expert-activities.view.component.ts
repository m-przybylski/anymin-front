import { Component, OnInit, ChangeDetectionStrategy, TrackByFunction, OnDestroy } from '@angular/core';
import { GetProfileActivity } from '@anymind-ng/api';
import { Animations } from '@anymind-ng/core';
import { Store, select } from '@ngrx/store';
import * as fromExpertActivietes from '../../reducers';
import { ExpertActivitiesPageActions } from '@platform/features/dashboard/views/user-dashboard/activities/actions';
import { take, map } from 'rxjs/operators';
import { ExpertActivitiesService } from '../../services/expert-activities.service';
import { Subscription } from 'rxjs';

export interface IProfileActivitiesWithStatus {
  activity: GetProfileActivity;
  isImportant: boolean;
}

@Component({
  selector: 'plat-expert-activities',
  templateUrl: './expert-activities.view.component.html',
  styleUrls: ['./expert-activities.view.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: Animations.addItemAnimation,
})
export class ExpertActivitiesViewComponent implements OnInit, OnDestroy {
  public isImportantListShown$ = this.store.pipe(select(fromExpertActivietes.getShowImportantActivities));
  public isMoreActivity$ = this.store.pipe(select(fromExpertActivietes.isMoreActivity));
  public displayedImportantActivities$ = this.store.pipe(select(fromExpertActivietes.getDisplayedImportantActivities));
  public importantActivitiesCounter$ = this.store.pipe(select(fromExpertActivietes.getImportantActivitiesCount));
  public balance$ = this.store.pipe(select(fromExpertActivietes.getBalanceAmount));
  public importantActivitiesOffset$ = this.store.pipe(select(fromExpertActivietes.getImportantActivitiesOffset));
  public profileActivities$ = this.store.pipe(
    select(fromExpertActivietes.getAllActivitiesList),
    map(({ importantActivitiesList, activitiesList }) =>
      this.updateActivitiesStatus(activitiesList, importantActivitiesList),
    ),
  );
  /**
   * bacause only one subscription is kept in component
   * there is a better to unsubscribe manually.
   * less code, less memory usage
   */
  private wsSubscription: Subscription;

  constructor(
    private store: Store<fromExpertActivietes.IState>,
    private expertActivitiesService: ExpertActivitiesService,
  ) {}

  public ngOnInit(): void {
    this.wsSubscription = this.expertActivitiesService.listenToWS().subscribe();
  }

  public ngOnDestroy(): void {
    this.wsSubscription.unsubscribe();
  }

  public trackByActivities: TrackByFunction<IProfileActivitiesWithStatus> = (_, item): string => item.activity.id;

  public trackByImportantActivities: TrackByFunction<GetProfileActivity> = (_, item): string => item.id;

  public loadMore = (): void => {
    this.store
      .pipe(
        select(fromExpertActivietes.getCurrentOffsets),
        take(1),
      )
      .subscribe(({ current, iterator }) => {
        this.store.dispatch(
          new ExpertActivitiesPageActions.LoadMoreExpertActivitiesAction({
            currentOffset: current,
            offsetIterator: iterator,
          }),
        );
      });
  };

  public showMore = (): void => {
    this.store.dispatch(new ExpertActivitiesPageActions.ShowImportantActivitiesAction());
  };

  public hideMore = (): void => {
    this.store.dispatch(new ExpertActivitiesPageActions.HideImportantActivitiesAction());
  };

  public onActivityRowClicked = (selectedGetProfileActivity: GetProfileActivity, isImportant: boolean): void => {
    this.store.dispatch(
      new ExpertActivitiesPageActions.ActivityRowClickAction({
        getProfileActivity: selectedGetProfileActivity,
        isImportant,
      }),
    );
  };

  private updateActivitiesStatus(
    activities: ReadonlyArray<GetProfileActivity>,
    importantActivities: ReadonlyArray<GetProfileActivity>,
  ): ReadonlyArray<IProfileActivitiesWithStatus> {
    return activities.map(activity => ({
      activity,
      isImportant: importantActivities.some(importantActivity => importantActivity.id === activity.id),
    }));
  }
}
