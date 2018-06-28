// tslint:disable:strict-boolean-expressions
// tslint:disable:prefer-template
// tslint:disable:no-shadowed-variable
// tslint:disable:no-duplicate-imports
// tslint:disable:no-any
// tslint:disable:newline-before-return
import { ViewsApi, AccountApi } from 'profitelo-api-ng/api/api';
import { GetPayoutMethodDto } from 'profitelo-api-ng/model/models';
import { ActivitiesQueryParams } from './activities-query-params';
import { GetProfileActivities, GetActivityFilters, GetCompanyInvoiceDetails } from 'profitelo-api-ng/model/models';
import { PayoutsApi } from 'profitelo-api-ng/api/api';
import { LoggerService } from '@anymind-ng/core';

export class DashboardProfileActivitiesService {

  public static $inject = ['ViewsApi', 'PayoutsApi', 'AccountApi', 'logger'];

  constructor(private ViewsApi: ViewsApi,
              private PayoutsApi: PayoutsApi,
              private AccountApi: AccountApi,
              private logger: LoggerService) {
  }

  public resolveFilters = (): ng.IPromise<GetActivityFilters> =>
    this.ViewsApi.getDashboardActivitiesProfileFiltersRoute()

  public getDashboardProfileActivities = (queryParams: ActivitiesQueryParams): ng.IPromise<GetProfileActivities> => {
    const activityType = !!(queryParams.getActivityType()) ? String(queryParams.getActivityType()) : undefined;

    const promise = this.ViewsApi.getDashboardActivitiesProfileRoute(activityType, queryParams.getProfileId(),
      queryParams.getServiceId(), queryParams.getDateFrom(), queryParams.getDateTo(), queryParams.getLimit(),
      queryParams.getOffset());

    promise.catch(this.handleActivitiesResponseError);
    return promise;
  }

  public getInvoiceDetails = (): ng.IPromise<GetCompanyInvoiceDetails> =>
    this.AccountApi.getCompanyPayoutInvoiceDetailsRoute()

  public getPayoutMethods = (): ng.IPromise<GetPayoutMethodDto> => this.PayoutsApi.getPayoutMethodsRoute();

  private handleActivitiesResponseError = (error: any): void => {
    this.logger.warn('Can not get activities: ' + String(error));
  }

}
