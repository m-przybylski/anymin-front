(function() {
  /* @ngInject */
  function controller() {

    return this
  }

  const component = {
    template: require('./no-activities.jade')(),
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.dashboard.client.activities.no-activities', [
    'pascalprecht.translate'
  ])
    .component('clientNoActivities', component)
}())
