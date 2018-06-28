// tslint:disable:no-implicit-dependencies
import * as angular from 'angular';
import 'angularjs/common/components/expert-profile/similar-experts-slider/similar-experts-slider';
import 'angularjs/common/components/dashboard/client/favourites/favourite-experts/favourite-expert/favourite-expert';

function controller(): void {

  return this;
}

const component = {
  template: require('./favourite-experts.html'),
  controller: [controller],
  controllerAs: '$ctrl',
  bindings: {
    favouriteExperts: '<'
  }
};

angular.module('profitelo.components.dashboard.client.favourites.favourite-experts', [
  'pascalprecht.translate',
  'profitelo.components.expert-profile.similar-experts-slider',
  'profitelo.components.dashboard.client.favourites.favourite-experts.favourite-expert'
])
  .component('clientFavouriteExperts', component);
