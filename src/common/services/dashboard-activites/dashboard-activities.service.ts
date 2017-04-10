import {ViewsApi} from 'profitelo-api-ng/api/api'
import {FinancialOperation} from 'profitelo-api-ng/model/models'
import {ActivitiesQueryParams} from './activities-query-params'

export class DashboardActivitiesService {

  private queryParams: ActivitiesQueryParams

  /* @ngInject */
  constructor(private $q: ng.IQService, private ViewsApi: ViewsApi) {
    this.queryParams = new ActivitiesQueryParams
  }

  private handleActivitiesResponseError = (error: any) => {
    this.$q.reject(error)
    throw new Error('Can not get activities: ' + error)
  }

  private handleFilterResponseError = (error: any) => {
    this.$q.reject(error)
    throw new Error('Can not get filters data: ' + error)
  }

  public resolveFilters = (accountType: FinancialOperation.AccountTypeEnum) => {
    return this.ViewsApi.getDashboardActivityFiltersRoute(String(accountType))
    .catch(this.handleFilterResponseError)
  }

  public getDashboardActivities = (queryParams: ActivitiesQueryParams) => {
    const activityType = !!(queryParams.getActivityType()) ? String(queryParams.getActivityType()) : undefined
    return this.ViewsApi.getDashboardActivitiesRoute(activityType, queryParams.getProfileId(),
      queryParams.getServiceId(), String(queryParams.getAccountType()), queryParams.getDateFrom(),
      queryParams.getDateTo(), queryParams.getLimit(), queryParams.getOffset())
      .catch(this.handleActivitiesResponseError)
  }
}
