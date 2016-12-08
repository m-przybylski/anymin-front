(function() {
  /* @ngInject */
  function controller() {

    return this
  }

  const component = {
    templateUrl: 'components/dashboard/client/favourites/no-favourite-experts/no-favourite-experts.tpl.html',
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.dashboard.client.favourites.no-favourite-experts', [
    'pascalprecht.translate'
  ])
    .component('clientNoFavouriteExperts', component)
}())


