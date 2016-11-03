(function() {

  /* @ngInject */
  function controller() {

    const message = this.messages[0]

    this.isMine = (typeof message !== 'undefined' && message.sender === message.api.apiKey)

    return this
  }

  const component = {
    templateUrl: 'components/communicator/communicator-maximized/messenger/messenger-maximized/grouped-messages/grouped-messages.tpl.html',
    controller: controller,
    bindings: {
      messages: '<',
      participantAvatar: '@'
    }
  }

  angular.module('profitelo.components.communicator.communicator-maximized.messenger.messenger-maximized.grouped-messages', [
  ])
    .component('groupedMessages', component)

}())
