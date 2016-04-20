angular.module('profitelo.controller.dashboard.expert-account', [
  'ui.router'
])
.config(($stateProvider) =>{
  $stateProvider.state('app.dashboard.expert-account', {
    controllerAs: 'vm',
    url: '/expert-account',
    templateUrl: 'dashboard/expert-account/expert-account.tpl.html',
    controller: 'DashboardExpertAccountController'
  })
})
.controller('DashboardExpertAccountController', DashboardExpertAccountController)


function DashboardExpertAccountController() {
  var vm = this

  vm.isActive = false
  vm.activeButton = function() {
    vm.isActive = !vm.isActive
  }

  return vm
}
