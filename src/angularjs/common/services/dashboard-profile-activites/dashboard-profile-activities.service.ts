import { ViewsApi } from 'profitelo-api-ng/api/api';
import { GetPayoutMethodDto } from 'profitelo-api-ng/model/models';
import { ActivitiesQueryParams } from './activities-query-params';
import { GetProfileActivities, GetActivityFilters } from 'profitelo-api-ng/model/models';
import { PayoutsApi } from 'profitelo-api-ng/api/api';

// tslint:disable:member-ordering
export class DashboardProfileActivitiesService {

  public static $inject = ['ViewsApi', 'PayoutsApi'];

  constructor(private ViewsApi: ViewsApi,
              private PayoutsApi: PayoutsApi) {
  }

  private handleActivitiesResponseError = (error: any): void => {
    throw new Error('Can not get activities: ' + String(error));
  }

  private handleFilterResponseError = (error: any): void => {
    throw new Error('Can not get filters data: ' + String(error));
  }

  public resolveFilters = (): ng.IPromise<GetActivityFilters> => {
    const promise = this.ViewsApi.getDashboardActivitiesProfileFiltersRoute();
    promise.catch(this.handleFilterResponseError);
    return promise;
  }

  public getDashboardProfileActivities = (queryParams: ActivitiesQueryParams): ng.IPromise<GetProfileActivities> => {
    const activityType = !!(queryParams.getActivityType()) ? String(queryParams.getActivityType()) : undefined;

    const promise = this.ViewsApi.getDashboardActivitiesProfileRoute(activityType, queryParams.getProfileId(),
      queryParams.getServiceId(), queryParams.getDateFrom(), queryParams.getDateTo(), queryParams.getLimit(),
      queryParams.getOffset());

    promise.catch(this.handleActivitiesResponseError);
    return promise;
  }

  public getPayoutMethods = (): ng.IPromise<GetPayoutMethodDto> => this.PayoutsApi.getPayoutMethodsRoute();
}
