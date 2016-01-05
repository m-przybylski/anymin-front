angular.module('profitelo.controller.dashboard', [
  'ui.router'
])
.config(($stateProvider) =>{
  $stateProvider.state('app.dashboard', {
    controllerAs: 'vm',
    url: '/dashboard',
    templateUrl: 'dashboard/dashboard.tpl.html',
    controller: 'DashboardController'
  })
})
.controller('DashboardController', DashboardController)


function DashboardController() {
  var vm = this
  console.log("It's WORKING! DashboardController")


  return vm
}
