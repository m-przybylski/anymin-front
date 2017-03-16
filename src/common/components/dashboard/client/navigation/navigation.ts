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
      stateNames: '<'
    }
  }

  angular.module('profitelo.components.dashboard.client.navigation', [
    'pascalprecht.translate',
    'ui.router'
  ])
    .component('clientNavigation', component)
}())

