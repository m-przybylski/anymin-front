namespace profitelo.dashboard {

  /* ngInject */
  class DashboardController {

    constructor() {}
  }


  angular.module('profitelo.controller.dashboard', [
    'profitelo.directives.pro-top-navbar',
    'ui.router',
    'ngTouch',
    'c7s.ng.userAuth'
  ])
    .config(($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) => {
      $stateProvider.state('app.dashboard', {
        abstract: true,
        url: '/dashboard',
        templateUrl: 'dashboard/dashboard.tpl.html',
        controller: 'DashboardController',
        controllerAs: 'dashboardController',
        data: {
          access: UserRolesProvider.getAccessLevel('user'),
          pageTitle: 'PAGE_TITLE.DASHBOARD'
        }
      })
    })
    .controller('DashboardController', DashboardController)
}
