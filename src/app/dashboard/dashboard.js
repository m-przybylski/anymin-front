function DashboardController(User) {
  let vm = this

  vm.isSidebarOpen = false

  let _sidebar = $('.sidebar')
  _sidebar.perfectScrollbar()

  vm.toogleSidebar=function() {
    vm.isSidebarOpen = !vm.isSidebarOpen
  }
  
  vm.logout = () => {
    User.logout()
  }
  
  return vm
}


angular.module('profitelo.controller.dashboard', [
  'ui.router',
  'c7s.ng.userAuth'
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
