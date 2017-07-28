import {GetActivity, FinancialOperation, GetActivityFilters} from 'profitelo-api-ng/model/models'
import {
DashboardActivitiesService
} from '../../../../common/services/dashboard-activites/dashboard-activities.service'
import {ActivitiesQueryParams} from '../../../../common/services/dashboard-activites/activities-query-params'
import {TopAlertService} from '../../../../common/services/top-alert/top-alert.service'

import {GetActivities} from 'profitelo-api-ng/model/models'

export class DashboardExpertActivitiesController {

  public areActivities: boolean
  public activities: Array<GetActivity>

  public isSearchLoading: boolean = true
  public isError: boolean = false
  public isMoreResults: boolean = false
  public filters: GetActivityFilters
  public translationCounter: {
    currentResults: string
    allResults: string
  }
  public accountType = FinancialOperation.AccountTypeEnum.PROFILE

  private activitiesQueryParam: ActivitiesQueryParams
  private static queryLimit = 11
  private timeoutDelay: number = 400

  /* @ngInject */
  constructor(filtersData: GetActivityFilters, private topAlertService: TopAlertService, $timeout: ng.ITimeoutService,
              private dashboardActivitiesService: DashboardActivitiesService, private $filter: ng.IFilterService) {

    this.activitiesQueryParam = new ActivitiesQueryParams
    this.setBasicQueryParam(this.activitiesQueryParam)
    this.getDashboardActivities(this.activitiesQueryParam)
    .then((getActivities) => {
      this.activities = getActivities.activities
      this.areActivities = getActivities.activities.length > 0
      $timeout(() => {
        this.isSearchLoading = false
        this.isError = false
      }, this.timeoutDelay)
      this.translationCounter = {
        currentResults: String(this.activities.length),
        allResults: '20'
      }
    })

    this.filters = filtersData
  }
  public sendRequestAgain = (activitiesQueryParams: ActivitiesQueryParams): void => {
    this.isSearchLoading = true
    this.getDashboardActivities(activitiesQueryParams).then((getActivities) => {
      this.activities = getActivities.activities
      this.isSearchLoading = false
      this.isError = false
    })
  }

  public loadMoreActivities = (): void => {
    this.dashboardActivitiesService.getDashboardActivities(this.activitiesQueryParam).then((getActivities) => {
      this.activities.concat(getActivities.activities)
    })
  }

  public onSetFiltersParams = (activitiesQueryParams: ActivitiesQueryParams): void => {
    this.setBasicQueryParam(activitiesQueryParams)
    this.getDashboardActivities(activitiesQueryParams)
    .then((getActivities) => {
      this.activitiesQueryParam = activitiesQueryParams
      this.activities = getActivities.activities
    })
  }

  private getDashboardActivities = (activitiesQueryParams: ActivitiesQueryParams): ng.IPromise<GetActivities> => {
    return this.dashboardActivitiesService.getDashboardActivities(activitiesQueryParams)
    .catch((error) => {
      this.isSearchLoading = false
      this.isError = true
      this.topAlertService.error({
        message: this.$filter('translate')('INTERFACE.API_ERROR'),
        timeout: 4
      })
      throw new Error('Can not get expert activity list ' + error)
    })
  }

  private setBasicQueryParam = (activitiesQueryParams: ActivitiesQueryParams): void => {
    activitiesQueryParams.setLimit(DashboardExpertActivitiesController.queryLimit)
    activitiesQueryParams.setOffset(0)
    activitiesQueryParams.setAccountType(this.accountType)
  }

}
