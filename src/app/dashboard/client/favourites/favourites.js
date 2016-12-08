(function() {

  function DashboardClientFavouritesController() {

    return this
  }


  angular.module('profitelo.controller.dashboard.client.favourites', [
    'ui.router',
    'c7s.ng.userAuth',
    'profitelo.components.dashboard.client.favourites.no-favourite-experts',
    'profitelo.components.dashboard.client.favourites.favourite-experts',
    'profitelo.components.expert-profile.similar-experts-slider'
  ])
  .config( function($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.client.favourites', {
      url: '/favourites',
      templateUrl: 'dashboard/client/favourites/favourites.tpl.html',
      controller: 'DashboardClientFavouritesController',
      controllerAs: 'vm',
      data          : {
        access : UserRolesProvider.getAccessLevel('user')
      },
      bindings: {
        communicatorTurnOn: '=?'
      }
    })
  })
  .controller('DashboardClientFavouritesController', DashboardClientFavouritesController)

}())
