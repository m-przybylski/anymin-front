(function() {
  function clientController() {

    return this
  }

  function config($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.client', {
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
    'profitelo.components.dashboard.client.navigation',
    'profitelo.components.dashboard.client.activities'
  ])
    .config(config)
    .controller('clientController', clientController)

}())
