import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
import { GetProfileActivity } from '@anymind-ng/api';
import { select, Store } from '@ngrx/store';
import * as fromActivities from './reducers';
import { map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ActivitiesActions, ActivitiesPageActions } from '@platform/features/dashboard/views/activities/actions';
import { ActivitiesListService } from '@platform/features/dashboard/views/activities/services/activities-list.service';
import { ActivatedRoute } from '@angular/router';
import { ActivityListTypeEnum } from '@platform/features/dashboard/views/activities/activities.interface';
import { Animations } from '@platform/shared/animations/animations';
import { Logger } from '@platform/core/logger';
import { LoggerFactory } from '@anymind-ng/core';

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
export class ActivitiesComponent extends Logger implements OnInit, OnDestroy {
  public listType: ActivityListTypeEnum = this.route.snapshot.data.activityListType;
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
  public isLoaded$ = this.store.pipe(
    select(
      this.listType !== ActivityListTypeEnum.CLIENT ? fromActivities.getIsLoaded : fromActivities.getActivitiesIsLoaded,
    ),
  );
  public isListFiltered$ = this.store.pipe(select(fromActivities.getIsListFiltered));
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
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ActivitiesComponent'));
  }

  public ngOnInit(): void {
    switch (this.listType) {
      case ActivityListTypeEnum.EXPERT:
        this.store.dispatch(new ActivitiesActions.LoadExpertActivitiesWithBalanceAction());
        this.wsSubscription = this.activitiesService.listenToExpertWS().subscribe();
        break;
      case ActivityListTypeEnum.COMPANY:
        this.store.dispatch(new ActivitiesActions.LoadCompanyActivitiesWithBalanceAction());
        this.wsSubscription = this.activitiesService.listenToCompanyWS().subscribe();
        break;
      case ActivityListTypeEnum.CLIENT:
        this.store.dispatch(new ActivitiesActions.LoadClientActivitiesAction());
        this.wsSubscription = this.activitiesService.listenToClientWS().subscribe();
        break;
      default:
        this.loggerService.error('Unhandled activities list type');
    }
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
        const payload = {
          currentOffset: current,
          offsetIterator: iterator,
        };
        switch (this.listType) {
          case ActivityListTypeEnum.EXPERT:
            this.store.dispatch(new ActivitiesPageActions.LoadMoreExpertActivitiesAction(payload));
            break;
          case ActivityListTypeEnum.COMPANY:
            this.store.dispatch(new ActivitiesPageActions.LoadMoreCompanyActivitiesAction(payload));
            break;
          case ActivityListTypeEnum.CLIENT:
            this.store.dispatch(new ActivitiesPageActions.LoadMoreClientActivitiesAction(payload));
            break;
          default:
            this.loggerService.error('Unhandled activities list type');
        }
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
    const payload = {
      getProfileActivity: selectedGetProfileActivity,
      isImportant,
    };

    switch (this.listType) {
      case ActivityListTypeEnum.EXPERT:
        this.store.dispatch(new ActivitiesPageActions.ExpertActivityRowClickAction(payload));
        break;
      case ActivityListTypeEnum.COMPANY:
        this.store.dispatch(new ActivitiesPageActions.CompanyActivityRowClickAction(payload));
        break;
      case ActivityListTypeEnum.CLIENT:
        this.store.dispatch(new ActivitiesPageActions.ClientActivityRowClickAction(payload));
        break;
      default:
        this.loggerService.error('Unhandled activities list type');
    }
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
