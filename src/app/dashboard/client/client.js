(function() {
  function clientController() {

    return this
  }

  function config($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.client', {
      abstract: true,
      url: '/client',
      controllerAs: 'vm',
      controller: 'clientController',
      templateUrl: 'dashboard/client/client.tpl.html',
      data: {
        access: UserRolesProvider.getAccessLevel('user'),
        pageTitle: 'PAGE_TITLE.CLIENT_DASHBOARD',
        showMenu: false
      }
    })
  }

  angular.module('profitelo.controller.dashboard.client', [
    'ui.router',
    'ngTouch',
    'c7s.ng.userAuth',
    'profitelo.components.dashboard.client.navigation'

  ])
    .config(config)
    .controller('clientController', clientController)

}())
