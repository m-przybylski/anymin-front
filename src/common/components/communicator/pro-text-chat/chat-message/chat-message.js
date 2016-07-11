(function() {

  function proTextChatMessageController($scope, $timeout) {
      console.log($scope.model)

  }

  let proTextChatMessage = {
    transclude: true,
    templateUrl:    'components/communicator/pro-text-chat/chat-message/chat-message.tpl.html',
    controller: ['$scope', '$timeout', proTextChatMessageController ],
    bindings: {
      model: '<'
    }
  }

  angular.module('profitelo.components.communicator.pro-text-chat.chat-message', [
    'pascalprecht.translate'

  ])
    .component('proTextChatMessage', proTextChatMessage)

}())