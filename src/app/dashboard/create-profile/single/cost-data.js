angular.module('profitelo.controller.dashboard.cost-data', [
  'ui.router'
])
.config(($stateProvider) =>{
  $stateProvider.state('app.dashboard.cost-data', {
    controllerAs: 'vm',
    url: '/single/cost-data',
    templateUrl: 'dashboard/create-profile/single/cost-data/cost-data.tpl.html',
    controller: 'DashboardCostDataController'
  })
})
.controller('DashboardCostDataController', DashboardCostDataController)


function DashboardCostDataController() {
  var vm = this
  vm.currency = [
    {id: 1, name: 'PLN'},
    {id: 2, name: 'USD'},
    {id: 3, name: 'EUR'}
  ]
  return vm
}
