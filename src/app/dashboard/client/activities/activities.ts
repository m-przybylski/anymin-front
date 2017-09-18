import * as angular from 'angular'
import {
  MoneyDto, GetActivity, FinancialOperation, GetActivityFilters, GetActivities
} from 'profitelo-api-ng/model/models'
import 'common/components/dashboard/client/activities/client-activities/activity/activity'
import 'common/components/interface/preloader-container/preloader-container'
import 'common/components/complaints/status/status'
import dashboardFiltersModule from '../../../../common/components/dashboard/shared/filters/filters'
import {
  DashboardActivitiesService
} from '../../../../common/services/dashboard-activites/dashboard-activities.service'
import dashboardActivitiesModule from '../../../../common/services/dashboard-activites/dashboard-activites'
import {ActivitiesQueryParams} from '../../../../common/services/dashboard-activites/activities-query-params'
import noResultsInformationModule
  from '../../../../common/components/dashboard/no-results-information/no-results-information'
import promiseModule from '../../../../common/services/promise/promise'
import {PromiseService} from '../../../../common/services/promise/promise.service'
import errorHandlerModule from '../../../../common/services/error-handler/error-handler'
import {ErrorHandlerService} from '../../../../common/services/error-handler/error-handler.service'

export class DashboardClientActivitiesController {

  public balance: MoneyDto
  public activities: GetActivity[]
  public isSearchLoading: boolean = true
  public isActivitiesHistory: boolean = false
  public isMoreResults: boolean
  public isError: boolean = false
  public filters: GetActivityFilters
  public accountType = FinancialOperation.AccountTypeEnum.CLIENT
  public isActivitiesLoading = false
  public translationCounter: {
    currentResultsCount: number
    allResultsCount: number
  }

  private activitiesQueryParam: ActivitiesQueryParams
  private static readonly queryLimit: number = 10
  private static readonly timeoutDelay: number = 400
  private static readonly promiseLoaderDelay = 500

  /* @ngInject */
  constructor(private dashboardActivitiesService: DashboardActivitiesService,
              private promiseService: PromiseService,
              private $state: ng.ui.IStateService,
              private errorHandler: ErrorHandlerService,
              filtersData: GetActivityFilters,
              $timeout: ng.ITimeoutService) {

    this.activitiesQueryParam = new ActivitiesQueryParams
    this.setBasicQueryParam(this.activitiesQueryParam)
    this.getDashboardActivities(this.activitiesQueryParam)
    .then((getActivities) => {
      this.isActivitiesHistory = getActivities.activities.length > 0
      this.activities = getActivities.activities
      $timeout(() => {
        this.isSearchLoading = false
        this.isError = false
      }, DashboardClientActivitiesController.timeoutDelay)
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
      DashboardClientActivitiesController.promiseLoaderDelay).then((getActivities) => {
      this.activities = this.activities.concat(getActivities.activities)
      this.isMoreResults = getActivities.count > DashboardClientActivitiesController.queryLimit
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

  public searchForExpert = (): void => {
    this.$state.go('app.search-result')
  }

  private getDashboardActivities = (activitiesQueryParams: ActivitiesQueryParams): ng.IPromise<GetActivities> =>
    this.dashboardActivitiesService.getDashboardActivities(activitiesQueryParams)
    .catch((error) => {
      this.isSearchLoading = false
      this.isError = true
      this.errorHandler.handleServerError(error, 'Can not load activities')
    })

  private setBasicQueryParam = (activitiesQueryParams: ActivitiesQueryParams): void => {
    activitiesQueryParams.setLimit(DashboardClientActivitiesController.queryLimit)
    activitiesQueryParams.setOffset(0)
    activitiesQueryParams.setAccountType(this.accountType)
  }

}

angular.module('profitelo.controller.dashboard.client.activities', [
  'ui.router',
  dashboardFiltersModule,
  dashboardActivitiesModule,
  'profitelo.components.dashboard.client.activities.client-activity',
  'profitelo.components.interface.preloader-container',
  'profitelo.components.complaints.status',
  noResultsInformationModule,
  promiseModule,
  errorHandlerModule
])
.config(function ($stateProvider: ng.ui.IStateProvider): void {
  $stateProvider.state('app.dashboard.client.activities', {
    url: '/activities',
    template: require('./activities.pug')(),
    controller: 'dashboardClientActivitiesController',
    controllerAs: 'vm',
    resolve: {
      /* istanbul ignore next */
      filtersData: (dashboardActivitiesService: DashboardActivitiesService): ng.IPromise<GetActivityFilters> =>
        dashboardActivitiesService.resolveFilters(FinancialOperation.AccountTypeEnum.CLIENT)
    }
  })
})
.controller('dashboardClientActivitiesController', DashboardClientActivitiesController)
