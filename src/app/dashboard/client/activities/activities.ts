import * as angular from 'angular'
import {MoneyDto, GetActivity, GetExpertServiceTuple, GetActivities} from 'profitelo-api-ng/model/models'
import {ClientActivitiesService} from '../../../../common/services/client-activities/client-activities.service'
import filtersModule from '../../../../common/filters/filters'
import 'common/components/dashboard/client/activities/client-activities/activity/activity'
import 'common/components/interface/preloader-container/preloader-container'
import 'common/components/dashboard/client/activities/no-activities/no-activities'
import 'common/components/complaints/status/status'
import 'common/components/dashboard/client/activities/client-activities/filters/filters'
import clientActivitesModule from '../../../../common/services/client-activities/client-activities'

export class DashboardClientActivitiesController {

  public balance: MoneyDto
  public activities: Array<GetActivity>
  public expertServiceTuples: Array<GetExpertServiceTuple>
  public isSearchLoading: boolean = false
  public isParamChange: boolean = false
  public isMoreResults: boolean = false
  public isError: boolean = false
  public filters: {
    activityTypes: Array<string>
    expertServiceTuples: Array<GetExpertServiceTuple>
  }
  public queryParams = {}

  /* @ngInject */
  constructor($scope: ng.IScope, $timeout: ng.ITimeoutService,
              clientActivities: GetActivities, private clientActivitiesService: ClientActivitiesService) {

    this.activities = clientActivities.activities
    this.balance = clientActivities.balance
    this.expertServiceTuples = clientActivities.expertServiceTuples
    this.filters = {
      activityTypes: clientActivities.activityTypes,
      expertServiceTuples: clientActivities.expertServiceTuples
    }

    $scope.$on('$destroy', () => {
      clientActivitiesService.clearQueryParam()
    })

    clientActivitiesService.onActivitiesResults($scope, (error, results, queryParams) => {
      $timeout(() => {
        this.isSearchLoading = !results
        this.isError = !!error
      }, 400)

      this.queryParams = queryParams
      this.isParamChange = true

      if (angular.isDefined(results)) {
        this.isMoreResults = this.isMoreResultsAvailable(results.activities, queryParams.limit - 1)
        if (this.isMoreResults) {
          results.activities.pop()
        }

        if (queryParams.offset === 0) {
          this.activities = results.activities
        } else {
          this.activities = this.activities.concat(results.activities)
        }
      }
    })

    this.isMoreResults = this.isMoreResultsAvailable(clientActivities.activities, 10)
    if (this.isMoreResults) {
      clientActivities.activities.pop()
    }

    this.activities = clientActivities.activities

    this.balance = clientActivities.balance
    this.expertServiceTuples = clientActivities.expertServiceTuples
    this.filters = {
      activityTypes: clientActivities.activityTypes,
      expertServiceTuples: clientActivities.expertServiceTuples
    }

  }

  private isMoreResultsAvailable = (results: any, limit: number) => {
    return results.length > limit
  }

  public sendRequestAgain = () => {
    this.clientActivitiesService.setClientActivitiesParam(this.queryParams)
    this.isSearchLoading = true
  }

  public loadMoreActivities = () => {
    this.clientActivitiesService.getMoreResults(this.activities.length)
  }

}

angular.module('profitelo.controller.dashboard.client.activities', [
  'ui.router',

  filtersModule,
  'profitelo.components.dashboard.client.activities.client-activity',
  'profitelo.components.interface.preloader-container',
  'profitelo.components.dashboard.client.activities.no-activities',
  'profitelo.components.complaints.status',
  'profitelo.components.dashboard.client.activities.client-activities.filters',
  clientActivitesModule
])
  .config(function ($stateProvider: ng.ui.IStateProvider) {
    $stateProvider.state('app.dashboard.client.activities', {
      url: '/activities',
      template: require('./activities.pug')(),
      controller: 'DashboardClientActivitiesController',
      controllerAs: 'vm',
      resolve: {
        /* istanbul ignore next */
        clientActivities: (clientActivitiesService: ClientActivitiesService) =>
          clientActivitiesService.resolve()
      }
    })
  })
  .controller('DashboardClientActivitiesController', DashboardClientActivitiesController)
