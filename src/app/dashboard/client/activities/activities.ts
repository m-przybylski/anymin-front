import * as angular from 'angular'
import {MoneyDto, GetActivity, FinancialOperation, GetActivityFilters} from 'profitelo-api-ng/model/models'
import 'common/components/dashboard/client/activities/client-activities/activity/activity'
import 'common/components/interface/preloader-container/preloader-container'
import 'common/components/dashboard/client/activities/no-activities/no-activities'
import 'common/components/complaints/status/status'
import dashboardFiltersModule from '../../../../common/components/dashboard/shared/filters/filters'
import {
  DashboardActivitiesService
} from '../../../../common/services/dashboard-activites/dashboard-activities.service'
import dashboardActivitiesModule from '../../../../common/services/dashboard-activites/dashboard-activites'
import {ActivitiesQueryParams} from '../../../../common/services/dashboard-activites/activities-query-params'
import {TopAlertService} from '../../../../common/services/top-alert/top-alert.service'

export class DashboardClientActivitiesController {

  public balance: MoneyDto
  public activities: Array<GetActivity>
  public isSearchLoading: boolean = true
  public isActivitiesHistory: boolean = false
  public isMoreResults: boolean = false
  public isError: boolean = false
  public filters: GetActivityFilters
  public accountType = FinancialOperation.AccountTypeEnum.CLIENT

  private activitiesQueryParam: ActivitiesQueryParams
  private static queryLimit = 11

  /* @ngInject */
  constructor(filtersData: GetActivityFilters, private topAlertService: TopAlertService, private $filter: ng.IFilterService,
              private dashboardActivitiesService: DashboardActivitiesService, $timeout: ng.ITimeoutService) {

    this.activitiesQueryParam = new ActivitiesQueryParams
    this.setBasicQueryParam(this.activitiesQueryParam)
    this.getDashboardActivities(this.activitiesQueryParam)
    .then((getActivities) => {
      this.isActivitiesHistory = getActivities.activities.length > 0
      this.activities = getActivities.activities
      $timeout(() => {
        this.isSearchLoading = false
        this.isError = false
      }, 400)
    })
    this.filters = filtersData
  }

  public sendRequestAgain = (activitiesQueryParams: ActivitiesQueryParams) => {
    this.isSearchLoading = true
    this.getDashboardActivities(activitiesQueryParams).then((getActivities) => {
      this.activities = getActivities.activities
      this.isSearchLoading = false
      this.isError = false
    })
  }

  public loadMoreActivities = () => {
    this.dashboardActivitiesService.getDashboardActivities(this.activitiesQueryParam).then((getActivities) => {
      this.activities.concat(getActivities.activities)
    })
  }

  public onSetFiltersParams = (activitiesQueryParams: ActivitiesQueryParams) => {
    this.setBasicQueryParam(activitiesQueryParams)
    this.getDashboardActivities(activitiesQueryParams)
    .then((getActivities) => {
      this.activitiesQueryParam = activitiesQueryParams
      this.activities = getActivities.activities
    })
  }

  private getDashboardActivities = (activitiesQueryParams: ActivitiesQueryParams) => {
    return this.dashboardActivitiesService.getDashboardActivities(activitiesQueryParams)
    .catch((error) => {
      this.isSearchLoading = false
      this.isError = true
      this.topAlertService.error({
        message: this.$filter('translate')('INTERFACE.API_ERROR'),
        timeout: 4
      })
      throw new Error('Can not get Client Activity List ' + error)
    })
  }

  private setBasicQueryParam = (activitiesQueryParams: ActivitiesQueryParams) => {
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
  'profitelo.components.dashboard.client.activities.no-activities',
  'profitelo.components.complaints.status'
])
.config(function ($stateProvider: ng.ui.IStateProvider) {
  $stateProvider.state('app.dashboard.client.activities', {
    url: '/activities',
    template: require('./activities.pug')(),
    controller: 'dashboardClientActivitiesController',
    controllerAs: 'vm',
    resolve: {
      /* istanbul ignore next */
      filtersData: (dashboardActivitiesService: DashboardActivitiesService) =>
        dashboardActivitiesService.resolveFilters(FinancialOperation.AccountTypeEnum.CLIENT)
    }
  })
})
.controller('dashboardClientActivitiesController', DashboardClientActivitiesController)
