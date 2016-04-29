angular.module('profitelo.controller.dashboard.company-summary', [
  'ui.router'
])
.config(($stateProvider) =>{
  $stateProvider.state('app.dashboard.company-summary', {
    controllerAs: 'vm',
    url: '/company/summary',
    templateUrl: 'dashboard/create-profile/company/summary/summary.tpl.html',
    controller: 'DashboardCompanySummaryController'
  })
})
.controller('DashboardCompanySummaryController', DashboardCompanySummaryController)


function DashboardCompanySummaryController() {
  var vm = this
  
  return vm
}
