(function() {
  /* @ngInject */
  function controller() {

    return this
  }

  const component = {
    templateUrl: 'components/dashboard/client/activities/no-activities/no-activities.tpl.html',
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.dashboard.client.activities.no-activities', [
    'pascalprecht.translate'
  ])
    .component('clientNoActivities', component)
}())
