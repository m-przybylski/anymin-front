(function() {
  /* @ngInject */
  function controller() {

    return this
  }

  const component = {
    templateUrl: 'components/settings/navigation/navigation.tpl.html',
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
}())

