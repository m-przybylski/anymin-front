(function() {
  /* @ngInject */
  function controller() {

    return this
  }

  const component = {
    templateUrl: 'components/dashboard/client/favourites/favourite-experts/favourite-experts.tpl.html',
    controller: controller,
    controllerAs: '$ctrl',
    bindings: {
      favouriteExperts: '<'
    }
  }

  angular.module('profitelo.components.dashboard.client.favourites.favourite-experts', [
    'pascalprecht.translate',
    'profitelo.components.expert-profile.similar-experts-slider',
    'profitelo.components.dashboard.client.favourites.favourite-experts.favourite-expert'
  ])
    .component('clientFavouriteExperts', component)
}())
