angular.module('profitelo.controller.dashboard.company-cost-data', [
  'ui.router'
])
.config(($stateProvider) =>{
  $stateProvider.state('app.dashboard.company-cost-data', {
    controllerAs: 'vm',
    url: '/company/cost-data',
    templateUrl: 'dashboard/create-profile/company/cost-data/cost-data.tpl.html',
    controller: 'DashboardCompanyCostDataController'
  })
})
.controller('DashboardCompanyCostDataController', DashboardCompanyCostDataController)


function DashboardCompanyCostDataController() {
  var vm = this
  vm.currency = [
    {id: 1, name: 'PLN'},
    {id: 2, name: 'USD'},
    {id: 3, name: 'EUR'}
  ]
  return vm
}
