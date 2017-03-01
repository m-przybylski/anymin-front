namespace app.dashboard.client.activities {

  import IClientActivitiesService = profitelo.services.clientActivities.IClientActivitiesService
  import GetActivities = profitelo.api.GetActivities
  import MoneyDto = profitelo.api.MoneyDto
  import GetActivity = profitelo.api.GetActivity
  import GetExpertServiceTuple = profitelo.api.GetExpertServiceTuple

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

    constructor($scope: ng.IScope, $timeout: ng.ITimeoutService,
                clientActivities: GetActivities, private clientActivitiesService: IClientActivitiesService) {

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
    'profitelo.services.session',
    'ngLodash',
    'profitelo.filters.money',
    'profitelo.components.dashboard.client.activities.client-activity',
    'profitelo.components.interface.preloader-container',
    'profitelo.components.dashboard.client.activities.no-activities',
    'profitelo.components.complaints.status',
    'profitelo.components.dashboard.client.activities.client-activities.filters',
    'profitelo.services.client-activities-service'
  ])
  .config(function ($stateProvider: ng.ui.IStateProvider) {
    $stateProvider.state('app.dashboard.client.activities', {
      url: '/activities',
      templateUrl: 'dashboard/client/activities/activities.tpl.html',
      controller: 'DashboardClientActivitiesController',
      controllerAs: 'vm',
      resolve: {
        /* istanbul ignore next */
        clientActivities: (clientActivitiesService: IClientActivitiesService) =>
          clientActivitiesService.resolve()
      }
    })
  })
  .controller('DashboardClientActivitiesController', DashboardClientActivitiesController)
}
