(function() {

  function DashboardClientActivitiesController() {

    return this
  }


  angular.module('profitelo.controller.dashboard.client.activities', [
    'ui.router',
    'c7s.ng.userAuth',
    'profitelo.components.dashboard.client.activities.last-activities',
    'profitelo.components.dashboard.client.activities.no-activities'
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
      bindings: {
        communicatorTurnOn: '=?'
      }
    })
  })
  .controller('DashboardClientActivitiesController', DashboardClientActivitiesController)

}())
