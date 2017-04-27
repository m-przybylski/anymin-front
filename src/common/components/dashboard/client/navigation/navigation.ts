import * as angular from 'angular'
import filtersModule from '../../../../filters/filters'
(function() {
  /* @ngInject */
  function controller() {

    return this
  }

  const component = {
    template: require('./navigation.pug')(),
    controller: controller,
    controllerAs: '$ctrl',
    bindings: {
      clientBalance: '<'
    }
  }

  angular.module('profitelo.components.dashboard.client.navigation', [
    'pascalprecht.translate',
    'ui.router',
    filtersModule
  ])
    .component('clientNavigation', component)
}())
