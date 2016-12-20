(function() {
  /* @ngInject */
  function controller() {

    return this
  }

  const component = {
    templateUrl: 'components/dashboard/client/activities/modals/consultation-details/consultation-details-chat/consultation-details-chat.tpl.html',
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.dashboard.client.activities.modals.consultation-details.consultation-details-chat', [
    'pascalprecht.translate',
    'profitelo.components.communicator.communicator-maximized.messenger.messenger-maximized.grouped-messages'
  ])
    .component('clientConsultationDetailsChat', component)
}())
