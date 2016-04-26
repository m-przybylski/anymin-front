(function() {
  function DashboardController($state, $filter, User, proTopAlertService) {
    let vm = this

    vm.isSidebarOpen = false

    vm.isPending = false

    let _sidebar = $('.sidebar')
    _sidebar.perfectScrollbar()

    vm.toogleSidebar=function() {
      vm.isSidebarOpen = !vm.isSidebarOpen
    }

    vm.logout = () => {



      let action = () => {
        vm.isPending = false
        proTopAlertService.success($filter('translate')('LOGIN.SUCCESSFUL_LOGOUT'), null, 2)
        $state.go('app.login.account')
      }

      if (!vm.isPending) {
        vm.isPending = true
        User.logout().then(action, action)
      }


    }

    return vm
  }


  angular.module('profitelo.controller.dashboard', [
    'ui.router',
    'c7s.ng.userAuth',
    'hmTouchEvents',
    'profitelo.directives.pro-top-alert-service'
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

}())