(function() {

  /* @ngInject */
  function controller($timeout, messengerService) {

    const messageShowTimeout =  5000

    this.messages = []

    const _hideMessage = (message) =>
      this.messages = this.messages.filter(msg => msg !== message)

    const _showMessage = (message) => {
      this.messages.push(message)
      $timeout(_ => _hideMessage(message), messageShowTimeout)
    }

    const _init = () => {
      this.messages = []
    }

    messengerService.onClientMessage(_showMessage)

    messengerService.onExpertMessage(_showMessage)

    messengerService.onClientNewChat(_init)

    messengerService.onExpertNewChat(_init)

    messengerService.onChatLeft(_init)

    return this
  }

  const component = {
    templateUrl: 'components/communicator/messenger/messenger-minimized/messenger-minimized.tpl.html',
    controller: controller,
    bindings: {
      onMessageClick: '<'
    }
  }

  angular.module('profitelo.components.communicator.messenger.messenger-minimized', [
    'profitelo.services.messenger'
  ])
    .component('messengerMinimized', component)

}())
