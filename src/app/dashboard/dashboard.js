(function() {

  function DashboardController($state, User) {

    this.isSidebarOpen = false
    this.isPending = false
    this.switchUser = false

    this.changeAccount=function() {
      this.switchUser = !this.switchUser
    }

    let _sidebar = $('.sidebar')
    _sidebar.perfectScrollbar()

    this.toogleSidebar=function() {
      this.isSidebarOpen = !this.isSidebarOpen
    }

    this.logout = () => {

      let action = () => {
        this.isPending = false
        $state.go('app.login.account')
      }

      if (!this.isPending) {
        this.isPending = true
        User.logout().then(action, action)
      }


    }

    return this
  }


  angular.module('profitelo.controller.dashboard', [
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
