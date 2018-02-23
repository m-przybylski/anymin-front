import { ViewsApi } from 'profitelo-api-ng/api/api';
import { GetPayoutMethodDto } from 'profitelo-api-ng/model/models';
import { ActivitiesQueryParams } from './activities-query-params';
import { GetClientActivities, GetActivityFilters } from 'profitelo-api-ng/model/models';
import { PayoutsApi } from 'profitelo-api-ng/api/api';
import { LoggerService } from '@anymind-ng/core';

export class DashboardClientActivitiesService {

    public static $inject = ['ViewsApi', 'PayoutsApi', 'logger'];

    constructor(private ViewsApi: ViewsApi,
                private PayoutsApi: PayoutsApi,
                private logger: LoggerService) {

    }

    public resolveFilters = (): ng.IPromise<GetActivityFilters> =>
        this.ViewsApi.getDashboardActivitiesClientFiltersRoute()

    public getDashboardClientActivities = (queryParams: ActivitiesQueryParams): ng.IPromise<GetClientActivities> => {
        const activityType = !!(queryParams.getActivityType()) ? String(queryParams.getActivityType()) : undefined;

        const promise = this.ViewsApi.getDashboardActivitiesClientRoute(activityType, queryParams.getProfileId(),
            queryParams.getServiceId(), queryParams.getDateFrom(), queryParams.getDateTo(), queryParams.getLimit(),
            queryParams.getOffset());

        promise.catch(this.handleActivitiesResponseError);
        return promise;
    }

    public getPayoutMethods = (): ng.IPromise<GetPayoutMethodDto> => this.PayoutsApi.getPayoutMethodsRoute();

    private handleActivitiesResponseError = (error: any): void => {
        this.logger.warn('Can not get activities: ' + String(error));
    }

}
