angular.module('profitelo.controller.dashboard.consultation-range', [
  'ui.router'
])
.config(($stateProvider) =>{
  $stateProvider.state('app.dashboard.consultation-range', {
    controllerAs: 'vm',
    url: '/consultation-range',
    templateUrl: 'dashboard/consultation-range/consultation-range.tpl.html',
    controller: 'DashboardConsultationRangeController'
  })
})
.controller('DashboardConsultationRangeController', DashboardConsultationRangeController)


function DashboardConsultationRangeController() {
  var vm = this
  vm.currency = [
    {id: 1, name: 'PLN'},
    {id: 2, name: 'USD'},
    {id: 3, name: 'EUR'}
  ]
  return vm
}
