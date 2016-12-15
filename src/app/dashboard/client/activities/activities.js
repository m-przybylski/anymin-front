(function() {

  function DashboardClientActivitiesController($scope, $timeout, clientActivities, clientActivitiesService) {

    const filter = (activities) => _.filter(activities, (activity) => activity.sueProfileServiceTuple !== null)

    this.isSearchLoading = false
    this.isParamChange = false
    this.activities = filter(clientActivities.activities)
    this.balance = clientActivities.balance
    this.expertServiceTuples = clientActivities.expertServiceTuples
    this.filters = {
      activityTypes: clientActivities.activityTypes,
      experts: _.map(clientActivities.expertServiceTuples , (expertServiceTuple) =>
        expertServiceTuple.profile),
      services: _.map(clientActivities.expertServiceTuples, (expertServiceTuple) =>
        expertServiceTuple.service)
    }

    clientActivitiesService.onQueryParamsChange($scope, (param) => {
      this.isSearchLoading = false
    })



    clientActivitiesService.onActivitiesResults($scope, (err, results, prevResults) => {
      this.isSearchLoading = false
      this.isParamChange = true
      this.noMoreResults = filter(results.activities) === this.activities
      this.activities = filter(results.activities)
    })

    $scope.$on("$destroy", function() {
      clientActivitiesService.clearQueryParam()
    })


    return this
  }


  angular.module('profitelo.controller.dashboard.client.activities', [
    'ui.router',
    'c7s.ng.userAuth',
    'profitelo.filters.money',
    'profitelo.components.interface.preloader',
    'profitelo.components.dashboard.client.activities.no-activities',
    'profitelo.components.complaints.status',
    'profitelo.components.dashboard.client.activities.client-activities.filters',
    'profitelo.components.dashboard.client.activities.client-activity',
    'profitelo.services.client-activities-service'
  ])

  .config( function($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.client.activities', {
      url: '/activities',
      templateUrl: 'dashboard/client/activities/activities.tpl.html',
      controller: 'DashboardClientActivitiesController',
      controllerAs: 'vm',
      data          : {
        access : UserRolesProvider.getAccessLevel('user')
      },
      resolve: {
        /* istanbul ignore next */
        clientActivities:  (clientActivitiesService) =>
          clientActivitiesService.resolve()
      }
    })
  })
  .controller('DashboardClientActivitiesController', DashboardClientActivitiesController)

}())
