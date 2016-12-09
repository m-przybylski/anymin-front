(function() {
  /* @ngInject */
  function controller() {

    return this
  }

  const component = {
    templateUrl: 'components/dashboard/client/activities/last-activities/last-activities-list/last-activities-list.tpl.html',
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.dashboard.client.activities.last-activities.last-activities-list', [
    'pascalprecht.translate',
    'profitelo.components.complaints.status'
  ])
    .component('clientLastActivitiesList', component)
}())
