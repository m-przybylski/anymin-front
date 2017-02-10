namespace app.dashboard.client.activities {

  import IClientActivitiesService = profitelo.services.clientActivities.IClientActivitiesService
  import IClientActivities = profitelo.services.clientActivities.IClientActivities
  import ClientActivity = profitelo.models.ClientActivity
  import IExpertServiceTuple = profitelo.services.clientActivities.IExpertServiceTuple
  import Money = profitelo.models.Money

  export class DashboardClientActivitiesController {

    public balance: Money
    public activities: Array<ClientActivity>
    public expertServiceTuples: Array<IExpertServiceTuple>
    public isSearchLoading: boolean = false
    public isParamChange: boolean = false
    public isMoreResults: boolean = false
    public isError: boolean = false
    public filters: {
      activityTypes: Array<string>
      expertServiceTuples: Array<IExpertServiceTuple>
    }
    public queryParams = {}

    constructor($scope: ng.IScope, $timeout: ng.ITimeoutService,
                clientActivities: IClientActivities, private clientActivitiesService: IClientActivitiesService) {

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
    'c7s.ng.userAuth',
    'ngLodash',
    'profitelo.filters.money',
    'profitelo.components.dashboard.client.activities.client-activity',
    'profitelo.components.interface.preloader-container',
    'profitelo.components.dashboard.client.activities.no-activities',
    'profitelo.components.complaints.status',
    'profitelo.components.dashboard.client.activities.client-activities.filters',
    'profitelo.services.client-activities-service'
  ])
  .config(function ($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) {
    $stateProvider.state('app.dashboard.client.activities', {
      url: '/activities',
      templateUrl: 'dashboard/client/activities/activities.tpl.html',
      controller: 'DashboardClientActivitiesController',
      controllerAs: 'vm',
      data: {
        access: UserRolesProvider.getAccessLevel('user')
      },
      resolve: {
        /* istanbul ignore next */
        clientActivities: (clientActivitiesService: IClientActivitiesService) =>
          clientActivitiesService.resolve()
      }
    })
  })
  .controller('DashboardClientActivitiesController', DashboardClientActivitiesController)
}
