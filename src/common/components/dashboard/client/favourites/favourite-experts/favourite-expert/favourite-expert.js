(function() {
  /* @ngInject */
  function controller() {


    return this
  }

  const component = {
    templateUrl: 'components/dashboard/client/favourites/favourite-experts/favourite-expert/favourite-expert.tpl.html',
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.dashboard.client.favourites.favourite-experts.favourite-expert', [
    'pascalprecht.translate'
  ])
    .component('clientFavouriteExpert', component)
}())
