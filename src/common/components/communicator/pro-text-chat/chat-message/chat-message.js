(function() {

  let proTextChatMessage = {
    transclude: true,
    templateUrl:    'components/communicator/pro-text-chat/chat-message/chat-message.tpl.html',
    bindings: {
      model: '<'
    }
  }

  angular.module('profitelo.components.communicator.pro-text-chat.chat-message', [
    'pascalprecht.translate'

  ])
    .component('proTextChatMessage', proTextChatMessage)

}())