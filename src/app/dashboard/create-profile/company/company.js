angular.module('profitelo.controller.dashboard.company-profile', [
  'ui.router'
])
.config(($stateProvider) =>{
  $stateProvider.state('app.dashboard.company-profile', {
    controllerAs: 'vm',
    url: '/company-profile',
    templateUrl: 'dashboard/create-profile/company/primary-data/primary-data.tpl.html',
    controller: 'DashboardCompanyProfileController'
  })
})
.controller('DashboardCompanyProfileController', DashboardCompanyProfileController)


function DashboardCompanyProfileController() {
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
