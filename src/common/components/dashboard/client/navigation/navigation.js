(function() {
  /* @ngInject */
  function controller() {

    return this
  }

  const component = {
    templateUrl: 'components/dashboard/client/navigation/navigation.tpl.html',
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.dashboard.client.navigation', [
    'pascalprecht.translate'
  ])
    .component('clientNavigation', component)
}())

