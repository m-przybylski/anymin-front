(function() {
  /* @ngInject */
  function controller() {
    this.isComplaint = false

    return this
  }

  const component = {
    templateUrl: 'components/dashboard/client/activities/modals/consultation-details/complain/complain.tpl.html',
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.dashboard.client.activities.modals.consultation-details.complain', [
    'pascalprecht.translate',
    'profitelo.components.dashboard.client.activities.modals.consultation-details.complain.complain-status',
    'profitelo.components.dashboard.client.activities.modals.consultation-details.complain.complain-reason'
  ])
    .component('clientComplain', component)
}())

