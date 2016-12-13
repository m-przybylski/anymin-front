(function() {
  /* @ngInject */
  function controller() {

    this.items = {
      item: 'Asdasdasd'
    }

    return this
  }

  const component = {
    templateUrl: 'components/dashboard/client/activities/modals/consultation-details/conversation-rate/conversation-rate.tpl.html',
    controller: controller,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.dashboard.client.activities.modals.consultation-details.conversation-rate', [
    'pascalprecht.translate',
    'profitelo.components.interface.multiselect'
  ])
    .component('clientConversationRate', component)
}())

