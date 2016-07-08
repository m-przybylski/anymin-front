(function() {

  function DashboardController() {

    this.isSidebarOpen = false
    this.switchUser = false

    this.changeAccount=function() {
      this.switchUser = !this.switchUser
    }

    let _sidebar = $('.dashboard-left-menu')
    _sidebar.perfectScrollbar()

    this.toogleSidebar=function() {
      this.isSidebarOpen = !this.isSidebarOpen
    }


    return this
  }


  angular.module('profitelo.controller.dashboard', [
    'profitelo.directives.dashboard.dashboard-left-menu',
    'ui.router',
    'ngTouch',
    'c7s.ng.userAuth'
  ])
  .config( function($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard', {
      abstract:     true,
      url:          '/dashboard',
      templateUrl:  'dashboard/dashboard.tpl.html',
      controller:   'DashboardController',
      controllerAs: 'dashboardController',
      data : {
        access : UserRolesProvider.getAccessLevel('user'),
        pageTitle: 'PAGE_TITLE.DASHBOARD'
      }
    })
  })
  .controller('DashboardController', DashboardController)

}())
