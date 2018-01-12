import {ViewsApi} from 'profitelo-api-ng/api/api'
import {FinancialOperation, GetPayoutMethodDto} from 'profitelo-api-ng/model/models'
import {ActivitiesQueryParams} from './activities-query-params'
import {GetActivities, GetActivityFilters} from 'profitelo-api-ng/model/models'
import {PayoutsApi} from 'profitelo-api-ng/api/api';

export class DashboardActivitiesService {

  static $inject = ['ViewsApi', 'PayoutsApi'];

    constructor(private ViewsApi: ViewsApi,
              private PayoutsApi: PayoutsApi) {
  }

  private handleActivitiesResponseError = (error: any): void => {
    throw new Error('Can not get activities: ' + String(error))
  }

  private handleFilterResponseError = (error: any): void => {
    throw new Error('Can not get filters data: ' + String(error))
  }

  public resolveFilters = (accountType: FinancialOperation.AccountTypeEnum): ng.IPromise<GetActivityFilters> => {
    const promise = this.ViewsApi.getDashboardActivityFiltersRoute(String(accountType))
    promise.catch(this.handleFilterResponseError)
    return promise
  }

  public getDashboardActivities = (queryParams: ActivitiesQueryParams): ng.IPromise<GetActivities> => {
    const activityType = !!(queryParams.getActivityType()) ? String(queryParams.getActivityType()) : undefined

    const promise = this.ViewsApi.getDashboardActivitiesRoute(activityType, queryParams.getProfileId(),
      queryParams.getServiceId(), String(queryParams.getAccountType()), queryParams.getDateFrom(),
      queryParams.getDateTo(), queryParams.getLimit(), queryParams.getOffset())

    promise.catch(this.handleActivitiesResponseError)
    return promise
  }

  public getPayoutMethods = (): ng.IPromise<GetPayoutMethodDto> => this.PayoutsApi.getPayoutMethodsRoute()
}
