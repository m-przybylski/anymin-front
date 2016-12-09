(function() {
  /* @ngInject */
  function controller(modalsService) {
    this.showComplainReasonModal = () => {
      modalsService.createClientComplainReportModal()
    }

    return this
  }

  const component = {
    templateUrl: 'components/dashboard/client/activities/modals/consultation-details/complain/complain-reason/complain-reason.tpl.html',
    controller: controller,
    controllerAs: '$ctrl',
    bindings: {

    }
  }

  angular.module('profitelo.components.dashboard.client.activities.modals.consultation-details.complain.complain-reason', [
    'pascalprecht.translate',
    'profitelo.services.modals',
    'profitelo.components.interface.radio-text',
    'profitelo.components.interface.radio',

  ])
    .component('clientComplainReason', component)
}())

