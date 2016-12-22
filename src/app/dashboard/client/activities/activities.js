(function () {

  function DashboardClientActivitiesController($scope, $timeout, clientActivities, clientActivitiesService) {

    this.queryParams = {}
    this.isSearchLoading = false
    this.isParamChange = false
    this.activities = _.sortBy(clientActivities.activities, (activity) => activity.financialOperation.createdAt)
    this.balance = clientActivities.balance
    this.expertServiceTuples = clientActivities.expertServiceTuples
    this.filters = {
      activityTypes: clientActivities.activityTypes,
      expertServiceTuples: clientActivities.expertServiceTuples
    }

    this.onSetSearchParams = () => {
      this.isSearchLoading = true
    }

    this.sendRequestAgain = () => {
      clientActivitiesService.setClientActivitiesParam(this.queryParams)
      this.isSearchLoading = true
    }

    this.loadMoreActivities = () => {
      clientActivitiesService.getMoreResults()

    }


    clientActivitiesService.onActivitiesResults($scope, (error, results, queryParams) => {
      $timeout(() => {
        this.isSearchLoading = !results
        this.isError = !!error
      }, 400)
      this.queryParams = queryParams
      this.isParamChange = true
      if (angular.isDefined(results)) {
        if (queryParams.offset === 0) {
          if (queryParams.offset + queryParams.limit )
          this.activities =  _.sortBy(results.activities, (activity) => activity.financialOperation.createdAt)
        } else {
          this.activities +=  results.activities
        }
      }
    })

    $scope.$on("$destroy",  () => {
      clientActivitiesService.clearQueryParam()
    })


    return this
  }


  angular.module('profitelo.controller.dashboard.client.activities', [
    'ui.router',
    'c7s.ng.userAuth',
    'profitelo.filters.money',
    'profitelo.components.interface.preloader-container',
    'profitelo.components.dashboard.client.activities.no-activities',
    'profitelo.components.complaints.status',
    'profitelo.components.dashboard.client.activities.client-activities.filters',
    'profitelo.components.dashboard.client.activities.client-activity',
    'profitelo.services.client-activities-service'
  ])

    .config(function ($stateProvider, UserRolesProvider) {
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
          clientActivities: (clientActivitiesService) =>
            clientActivitiesService.resolve()
        }
      })
    })
    .controller('DashboardClientActivitiesController', DashboardClientActivitiesController)

}())
