function DashboardController() {
  var vm = this

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
    controllerAs: 'vm'
  })
})
.controller('DashboardController', DashboardController)
