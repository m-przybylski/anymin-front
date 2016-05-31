angular.module('profitelo.controller.dashboard.start', [
  'ui.router'
])
.config(($stateProvider, UserRolesProvider) => {
  $stateProvider.state('app.dashboard.start', {
    controllerAs: 'vm',
    url: '/start',
    templateUrl: 'dashboard/start/start.tpl.html',
    controller: 'DashboardController',
    data          : {
      access : UserRolesProvider.getAccessLevel('user')
    }
  })
})
.controller('DashboardStartController', DashboardStartController)


function DashboardStartController() {
  var vm = this


  return vm
}
