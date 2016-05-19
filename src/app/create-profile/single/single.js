angular.module('profitelo.controller.dashboard.single-profile', [
  'ui.router'
])
.config(($stateProvider) =>{
  $stateProvider.state('app.dashboard.single-profile', {
    controllerAs: 'vm',
    url: '/single-profile',
    templateUrl: 'dashboard/create-profile/single/primary-data/primary-data.tpl.html',
    controller: 'DashboardSingleProfileController'
  })
})
.controller('DashboardSingleProfileController', DashboardSingleProfileController)


function DashboardSingleProfileController() {
  var vm = this


  vm.tab = 0
  vm.setTab = function(tabId) {
    if (vm.tab === tabId) {
      vm.tab = 0
    } else {
      vm.tab = tabId
    }
  }
  vm.isSet = function(tabId) {
    return vm.tab === tabId
  }

  return vm
}
