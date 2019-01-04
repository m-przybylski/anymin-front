import { Component, OnInit, ChangeDetectionStrategy, TrackByFunction, OnDestroy } from '@angular/core';
import { GetProfileActivity } from '@anymind-ng/api';
import { Store, select } from '@ngrx/store';
import * as fromActivities from './reducers';
import { take, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ActivitiesPageActions, ActivitiesActions } from '@platform/features/dashboard/views/activities/actions';
import { ActivitiesListService } from '@platform/features/dashboard/views/activities/services/activities-list.service';
import { ActivatedRoute } from '@angular/router';
import { ActivityListTypeEnum } from '@platform/features/dashboard/views/activities/activities.interface';
import { Animations } from '@platform/shared/animations/animations';

export interface IProfileActivitiesWithStatus {
  activity: GetProfileActivity;
  isImportant: boolean;
  isCompany?: boolean;
}

export enum ActivitiesFilterEnum {
  EMPLOYEES = 'EMPLOYEES',
  FREELANCE = 'FREELANCE',
}

@Component({
  selector: 'plat-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [Animations.addItemAnimation],
})
export class ActivitiesComponent implements OnInit, OnDestroy {
  public isImportantListShown$ = this.store.pipe(select(fromActivities.getShowImportantActivities));
  public isMoreActivity$ = this.store.pipe(select(fromActivities.isMoreActivity));
  public displayedImportantActivities$ = this.store.pipe(select(fromActivities.getDisplayedImportantActivities));
  public importantActivitiesCounter$ = this.store.pipe(select(fromActivities.getImportantActivitiesCount));
  public importantActivitiesOffset$ = this.store.pipe(select(fromActivities.getImportantActivitiesOffset));
  public balance$ = this.store.pipe(select(fromActivities.getBalanceAmount));
  public combinedBalance$ = this.store.pipe(select(fromActivities.getCombinedBalance));
  public combinedBlockedBalance$ = this.store.pipe(select(fromActivities.getCombinedBlockedBalance));
  public profileActivities$ = this.store.pipe(
    select(fromActivities.getAllActivitiesList),
    map(({ importantActivitiesList, activitiesList }) =>
      this.updateActivitiesStatus(activitiesList, importantActivitiesList),
    ),
  );
  public isLoaded$ = this.store.pipe(select(fromActivities.getIsLoaded));
  public isListFiltered$ = this.store.pipe(select(fromActivities.getIsListFiltered));
  public listType: ActivityListTypeEnum;
  public activityListTypeEnum = ActivityListTypeEnum;
  public activitiesFilterEnum = ActivitiesFilterEnum;
  public dropdownVisibility: 'hidden' | 'visible' = 'hidden';
  public currentFilter?: ActivitiesFilterEnum;
  /**
   * because only one subscription is kept in component
   * there is a better to unsubscribe manually.
   * less code, less memory usage
   */
  private wsSubscription: Subscription;

  constructor(
    private store: Store<fromActivities.IState>,
    private activitiesService: ActivitiesListService,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    const activityListType: ActivityListTypeEnum = this.route.snapshot.data.activityListType;
    this.store.dispatch(
      activityListType === ActivityListTypeEnum.EXPERT
        ? new ActivitiesActions.LoadExpertActivitiesWithBalanceAction()
        : new ActivitiesActions.LoadCompanyActivitiesWithBalanceAction(),
    );
    this.listType = this.route.snapshot.data.activityListType;
    this.wsSubscription =
      this.listType === ActivityListTypeEnum.EXPERT
        ? this.activitiesService.listenToExpertWS().subscribe()
        : this.activitiesService.listenToCompanyWS().subscribe();
  }

  public ngOnDestroy(): void {
    this.wsSubscription.unsubscribe();
  }

  public trackByActivities: TrackByFunction<IProfileActivitiesWithStatus> = (_, item): string => item.activity.id;

  public trackByImportantActivities: TrackByFunction<GetProfileActivity> = (_, item): string => item.id;

  public onLoadMoreActivities = (): void => {
    this.store
      .pipe(
        select(fromActivities.getCurrentOffsets),
        take(1),
      )
      .subscribe(({ current, iterator }) => {
        this.store.dispatch(
          this.listType === ActivityListTypeEnum.EXPERT
            ? new ActivitiesPageActions.LoadMoreExpertActivitiesAction({
                currentOffset: current,
                offsetIterator: iterator,
              })
            : new ActivitiesPageActions.LoadMoreCompanyActivitiesAction({
                currentOffset: current,
                offsetIterator: iterator,
              }),
        );
      });
  };

  public showMore = (): void => {
    this.store.dispatch(new ActivitiesPageActions.ShowImportantActivitiesAction());
  };

  public hideMore = (): void => {
    this.store.dispatch(new ActivitiesPageActions.HideImportantActivitiesAction());
  };

  public toggleDropdown = (isVisible: boolean): void => {
    isVisible ? (this.dropdownVisibility = 'visible') : (this.dropdownVisibility = 'hidden');
  };

  public onActivityRowClicked = (selectedGetProfileActivity: GetProfileActivity, isImportant: boolean): void => {
    this.store.dispatch(
      this.listType === ActivityListTypeEnum.EXPERT
        ? new ActivitiesPageActions.ExpertActivityRowClickAction({
            getProfileActivity: selectedGetProfileActivity,
            isImportant,
          })
        : new ActivitiesPageActions.CompanyActivityRowClickAction({
            getProfileActivity: selectedGetProfileActivity,
            isImportant,
          }),
    );
  };

  public onDropdownChoose = (type?: ActivitiesFilterEnum): void => {
    this.currentFilter = type;
    this.store.dispatch(new ActivitiesPageActions.LoadFilteredCompanyActivitiesAction({ filter: type }));
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
