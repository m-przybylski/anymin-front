(function() {

  /* @ngInject */
  function controller() {

    this.$onInit = () => {

      const message = this.messages[0]

      this.isMine = (angular.isDefined(message) && angular.isDefined(message.isMine) && message.isMine)
    }

    return this
  }

  const component = {
    templateUrl: 'components/communicator/messenger/messenger-maximized/grouped-messages/grouped-messages.tpl.html',
    controller: controller,
    bindings: {
      messages: '<',
      participantAvatar: '@'
    }
  }

  angular.module('profitelo.components.communicator.messenger.messenger-maximized.grouped-messages', [
    'profitelo.filters.message-filter'
  ])
    .component('groupedMessages', component)

}())
