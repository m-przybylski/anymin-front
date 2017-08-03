import * as angular from 'angular'
import 'common/components/expert-profile/similar-experts-slider/similar-experts-slider'
import 'common/components/dashboard/client/favourites/favourite-experts/favourite-expert/favourite-expert'
/* @ngInject */
function controller(): void {

  return this
}

const component = {
  template: require('./favourite-experts.pug')(),
  controller,
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
