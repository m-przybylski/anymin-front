import * as angular from 'angular'
import '../../../../../../../components/communicator/messenger/maximized/grouped-messages/grouped-messages'

(function() {
  /* @ngInject */
  function controller() {

    return this
  }

  const component = {
    template: require('./consultation-details-chat.pug')(),
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.dashboard.client.activities.modals.consultation-details.consultation-details-chat', [
    'pascalprecht.translate',
    'profitelo.components.communicator.messenger.maximized.grouped-messages'
  ])
    .component('clientConsultationDetailsChat', component)
}())
