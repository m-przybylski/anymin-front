import { GetProfileActivity, GetActivityFilters } from 'profitelo-api-ng/model/models';
import {
  DashboardProfileActivitiesService
} from '../../../../common/services/dashboard-profile-activites/dashboard-profile-activities.service';
import { ActivitiesQueryParams } from '../../../../common/services/dashboard-profile-activites/activities-query-params';

import { GetProfileActivities, GetPayoutMethodDto } from 'profitelo-api-ng/model/models';
import { PromiseService } from '../../../../common/services/promise/promise.service';
import { ErrorHandlerService } from '../../../../common/services/error-handler/error-handler.service';
import { httpCodes } from '../../../../common/classes/http-codes';
import { ProfiteloWebsocketService } from '../../../../common/services/profitelo-websocket/profitelo-websocket.service';
import { LoggerService } from '@anymind-ng/core';

// tslint:disable:member-ordering
export class DashboardExpertActivitiesController {

  public static $inject = ['dashboardProfileActivitiesService', 'promiseService', 'errorHandler', '$log',
    '$timeout', 'logger', 'filtersData', 'profiteloWebsocket'];

  private static readonly queryLimit = 10;
  private static readonly promiseLoaderDelay = 500;

  public areActivities: boolean;
  public activities: GetProfileActivity[] = [];

  public isSearchLoading = true;
  public isError = false;
  public areMoreResults: boolean;
  public filters: GetActivityFilters;
  public translationCounter: {
    currentResultsCount: number
    allResultsCount: number
  };
  public isActivitiesLoading = false;
  public areFilteredResults = false;
  public isAnyPayoutMethodSet = false;

  private activitiesQueryParam: ActivitiesQueryParams;
  private timeoutDelay = 400;

  constructor(private dashboardActivitiesService: DashboardProfileActivitiesService,
              private promiseService: PromiseService,
              private errorHandler: ErrorHandlerService,
              private $log: ng.ILogService,
              private $timeout: ng.ITimeoutService,
              private logger: LoggerService,
              filtersData: GetActivityFilters,
              profiteloWebsocket: ProfiteloWebsocketService) {
    this.activitiesQueryParam = new ActivitiesQueryParams;
    this.setBasicQueryParam(this.activitiesQueryParam);
    this.setDashboardActivitiesData();
    this.filters = filtersData;
    this.getPayoutMethods().then(() => this.isAnyPayoutMethodSet = true);
    profiteloWebsocket.onCallSummary(() => {
      this.onSetFiltersParams(this.activitiesQueryParam);
    });
  }

  public sendRequestAgain = (activitiesQueryParams: ActivitiesQueryParams): void => {
    this.isSearchLoading = true;
    this.getDashboardActivities(activitiesQueryParams)
      .then((responses) => {
        this.activities = responses.activities;
        this.isSearchLoading = false;
        this.isError = false;
      });
    this.getPayoutMethods().then(() => this.isAnyPayoutMethodSet = true);
  }

  public loadMoreActivities = (): void => {
    this.isActivitiesLoading = true;
    this.activitiesQueryParam.setOffset(this.activities.length);

    this.promiseService.setMinimalDelay(
      this.dashboardActivitiesService.getDashboardProfileActivities(this.activitiesQueryParam),
      DashboardExpertActivitiesController.promiseLoaderDelay).then((getActivities) => {
      this.activities = this.activities.concat(getActivities.activities);
      this.areMoreResults = getActivities.count > this.activities.length;
      this.translationCounter.currentResultsCount = this.activities.length;
    }).catch((error) => {
      this.errorHandler.handleServerError(error, 'Can not load more activities');
    }).finally(() => {
      this.isActivitiesLoading = false;
    });
  }

  public onSetFiltersParams = (activitiesQueryParams: ActivitiesQueryParams): void => {
    this.dashboardActivitiesService.resolveFilters()
      .then((filters) => {
        this.filters = filters;
      }, error => {
        this.logger.error('DashboardExpertActivitiesController: Can not fetch filters on call summary', error);
      });
    this.setBasicQueryParam(activitiesQueryParams);
    this.getDashboardActivities(activitiesQueryParams)
      .then((getActivities) => {
        this.activitiesQueryParam = activitiesQueryParams;
        this.activities = getActivities.activities;
        this.translationCounter = {
          currentResultsCount: getActivities.activities.length,
          allResultsCount: getActivities.count
        };
        this.areActivities = true;
        this.areFilteredResults = getActivities.count > 0;
        this.areMoreResults = getActivities.count > getActivities.activities.length;
      });
  }

  private setDashboardActivitiesData = (): void => {
    this.getDashboardActivities(this.activitiesQueryParam)
      .then((responses) => {
        this.activities = responses.activities;
        this.areActivities = responses.activities.length > 0;
        this.$timeout(() => {
          this.isSearchLoading = false;
          this.isError = false;
        }, this.timeoutDelay);
        this.translationCounter = {
          currentResultsCount: this.activities.length,
          allResultsCount: responses.count
        };
        this.areFilteredResults = this.activities.length > 0;
        this.areMoreResults = responses.count > this.activities.length;
      });
  }

  private getPayoutMethods = (): ng.IPromise<GetPayoutMethodDto> => {
    const promise = this.dashboardActivitiesService.getPayoutMethods();
    promise.catch((error) => {
      if (error.status === httpCodes.notFound) this.isAnyPayoutMethodSet = false;
      else this.$log.error(error);
    });
    return promise;
  }

  private getDashboardActivities = (activitiesQueryParams: ActivitiesQueryParams):
      ng.IPromise<GetProfileActivities> => {
    const promise = this.dashboardActivitiesService.getDashboardProfileActivities(activitiesQueryParams);

    promise.catch((error) => {
      this.isSearchLoading = false;
      this.isError = true;
      this.errorHandler.handleServerError(error, 'Can not load activities');
    });
    return promise;
  }

  private setBasicQueryParam = (activitiesQueryParams: ActivitiesQueryParams): void => {
    activitiesQueryParams.setLimit(DashboardExpertActivitiesController.queryLimit);
    activitiesQueryParams.setOffset(0);
  }

}
