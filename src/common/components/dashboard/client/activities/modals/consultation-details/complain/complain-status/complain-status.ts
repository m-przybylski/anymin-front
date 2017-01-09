(function() {
  /* @ngInject */
  function controller() {

    return this
  }

  const component = {
    templateUrl: 'components/dashboard/client/activities/modals/consultation-details/complain/complain-status/complain-status.tpl.html',
    controller: controller,
    controllerAs: '$ctrl',
    bindings: {
      complainMessage: '@'
    }
  }

  angular.module('profitelo.components.dashboard.client.activities.modals.consultation-details.complain.complain-status', [
    'pascalprecht.translate',
    'profitelo.components.complaints.status'
  ])
    .component('clientComplainStatus', component)
}())

