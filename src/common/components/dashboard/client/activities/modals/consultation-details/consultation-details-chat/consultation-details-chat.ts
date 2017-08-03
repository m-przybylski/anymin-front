import * as angular from 'angular'
import '../../../../../../../components/communicator/messenger/maximized/grouped-messages/grouped-messages'

(function(): void {
  /* @ngInject */
  function controller(): void {

    return this
  }

  const component = {
    template: require('./consultation-details-chat.pug')(),
    controller,
    controllerAs: '$ctrl'
  }

  angular.module(
    'profitelo.components.dashboard.client.activities.modals.consultation-details.consultation-details-chat', [
    'pascalprecht.translate',
    'profitelo.components.communicator.messenger.maximized.grouped-messages'
  ])
    .component('clientConsultationDetailsChat', component)
}())
