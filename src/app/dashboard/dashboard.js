function DashboardController() {
  var vm = this

  vm.isSidebarOpen = false

  vm.toogleSidebar=function() {
    vm.isSidebarOpen = !vm.isSidebarOpen
  }
  return vm
}


angular.module('profitelo.controller.dashboard', [
  'ui.router'
])
.config( function($stateProvider) {
  $stateProvider.state('app.dashboard', {
    abstract:     true,
    url:          '/dashboard',
    templateUrl:  'dashboard/dashboard.tpl.html',
    controller:   'DashboardController',
    controllerAs: 'dashboardController'
  })
})
.controller('DashboardController', DashboardController)
