namespace profitelo.dashboard {

  /* ngInject */
  class DashboardController {

    constructor() {}
  }


  angular.module('profitelo.controller.dashboard', [
    'profitelo.directives.pro-top-navbar',
    'ui.router',
    'permission',
    'permission.ui',
    'ngTouch',
    'profitelo.services.session'
  ])
    .config(($stateProvider: ng.ui.IStateProvider) => {
      $stateProvider.state('app.dashboard', {
        abstract: true,
        url: '/dashboard',
        templateUrl: 'dashboard/dashboard.tpl.html',
        controller: 'DashboardController',
        controllerAs: 'dashboardController',
        data: {
          permissions: {
            only: ['user'],
            redirectTo: 'app.login'
          },
          pageTitle: 'PAGE_TITLE.DASHBOARD'
        }
      })
    })
    .controller('DashboardController', DashboardController)
}
