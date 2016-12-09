(function() {
  /* @ngInject */
  function controller() {

    return this
  }

  const component = {
    templateUrl: 'components/dashboard/client/activities/last-activities/last-activities.tpl.html',
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.dashboard.client.activities.last-activities', [
    'pascalprecht.translate',
    'profitelo.components.complaints.status',
    'profitelo.components.dashboard.client.activities.last-activities.filters',
    'profitelo.components.dashboard.client.activities.last-activities.last-activities-list'
  ])
    .component('clientLastActivities', component)
}())
