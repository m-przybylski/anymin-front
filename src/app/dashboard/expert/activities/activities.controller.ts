import {GetActivity, FinancialOperation, GetActivityFilters} from 'profitelo-api-ng/model/models'
import {
  DashboardActivitiesService
} from '../../../../common/services/dashboard-activites/dashboard-activities.service'
import {ActivitiesQueryParams} from '../../../../common/services/dashboard-activites/activities-query-params'

import {GetActivities} from 'profitelo-api-ng/model/models'
import {PromiseService} from '../../../../common/services/promise/promise.service'
import {ErrorHandlerService} from '../../../../common/services/error-handler/error-handler.service'

export class DashboardExpertActivitiesController {

  public areActivities: boolean
  public activities: GetActivity[]

  public isSearchLoading: boolean = true
  public isError: boolean = false
  public isMoreResults: boolean
  public filters: GetActivityFilters
  public translationCounter: {
    currentResultsCount: number
    allResultsCount: number
  }
  public accountType = FinancialOperation.AccountTypeEnum.PROFILE
  public isActivitiesLoading = false

  private activitiesQueryParam: ActivitiesQueryParams
  private static readonly queryLimit: number = 10
  private timeoutDelay: number = 400
  private static readonly promiseLoaderDelay = 500

  /* @ngInject */
  constructor(private dashboardActivitiesService: DashboardActivitiesService,
              private promiseService: PromiseService,
              private errorHandler: ErrorHandlerService,
              filtersData: GetActivityFilters,
              $timeout: ng.ITimeoutService) {

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
        currentResultsCount: this.activities.length,
        allResultsCount: getActivities.count
      }
      this.isMoreResults = !(getActivities.count === this.activities.length)
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
    this.isActivitiesLoading = true
    this.activitiesQueryParam.setOffset(this.activities.length)

    this.promiseService.setMinimalDelay(
      this.dashboardActivitiesService.getDashboardActivities(this.activitiesQueryParam),
      DashboardExpertActivitiesController.promiseLoaderDelay).then((getActivities) => {
      this.activities = this.activities.concat(getActivities.activities)
      this.isMoreResults = getActivities.count > DashboardExpertActivitiesController.queryLimit
      this.translationCounter.currentResultsCount = this.activities.length
    }).catch((error) => {
      this.errorHandler.handleServerError(error, 'Can not load more activities')
    }).finally(() => {
      this.isActivitiesLoading = false
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

  private getDashboardActivities = (activitiesQueryParams: ActivitiesQueryParams): ng.IPromise<GetActivities> =>
    this.dashboardActivitiesService.getDashboardActivities(activitiesQueryParams)
    .catch((error) => {
      this.isSearchLoading = false
      this.isError = true
      this.errorHandler.handleServerError(error, 'Can not load activities')
    })

  private setBasicQueryParam = (activitiesQueryParams: ActivitiesQueryParams): void => {
    activitiesQueryParams.setLimit(DashboardExpertActivitiesController.queryLimit)
    activitiesQueryParams.setOffset(0)
    activitiesQueryParams.setAccountType(this.accountType)
  }

}
