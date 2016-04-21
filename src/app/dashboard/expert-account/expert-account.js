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
