namespace profitelo.components.settings.navigation {

  /* @ngInject */
  function controller() {

    return this
  }

  const component = {
    template: require('./navigation.jade')(),
    controller: controller,
    controllerAs: '$ctrl',
    bindings: {
      stateNames: '<'
    }
  }

  angular.module('profitelo.components.settings.navigation', [
    'pascalprecht.translate',
    'ui.router'
  ])
    .component('settingsNavigation', component)
}

