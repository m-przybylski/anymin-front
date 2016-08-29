(function() {

  function DashboardController($rootScope, $state) {

    this.isSidebarOpen = false
    this.switchUser = false
    
    this.isNavbarShown = true
    this.isSidebarShown = true

    this.changeAccount=function() {
      this.switchUser = !this.switchUser
    }

    let _sidebar = $('.dashboard-left-menu')
    _sidebar.perfectScrollbar()

    this.toogleSidebar=function() {
      this.isSidebarOpen = !this.isSidebarOpen
    }

    this.showSidebar = ()=> {
      this.isSidebarShown = this.isSidebarShown === false
    }

    const _checkSidebarVisibility = (toState) => {
      if (angular.isUndefined(toState.data.showMenu)) {
        this.isSidebarShown = true
        this.isNavbarShown = true
      } else {
        this.isSidebarShown = toState.data.showMenu
        this.isNavbarShown = toState.data.showTopMenu
      }
    }

    $rootScope.$on('$stateChangeSuccess', (event, toState) => {
      _checkSidebarVisibility(toState)
    })

    _checkSidebarVisibility($state.current)
    this.toggleChat = () => {
      
      $rootScope.$broadcast('toggleChat')
    }
    return this
  }


  angular.module('profitelo.controller.dashboard', [
    'profitelo.directives.dashboard.dashboard-left-menu',
    'profitelo.directives.pro-top-navbar',
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
