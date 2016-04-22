angular.module('profitelo.controller.dashboard.summary', [
  'ui.router'
])
.config(($stateProvider) =>{
  $stateProvider.state('app.dashboard.summary', {
    controllerAs: 'vm',
    url: '/single/summary',
    templateUrl: 'dashboard/create-profile/single/summary/summary.tpl.html',
    controller: 'DashboardSummaryController'
  })
})
.controller('DashboardSummaryController', DashboardSummaryController)


function DashboardSummaryController() {
  var vm = this

  return vm
}
