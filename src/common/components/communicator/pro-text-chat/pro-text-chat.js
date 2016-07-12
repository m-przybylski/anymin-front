(function() {

  function proTextChatComponentController($scope, $filter) {

    $scope.messages = []

    let _isValidMessage = (message) => {
      return (angular.isDefined(message) && message !== null && message.length > 0)
    }

    let _interlocutorWritesMessage = () => {
      // TODO do zrobienia jak będzie backend
      $scope.messages.push({
        isUserMessage: false,
        messageText: '...',
        messageTime: $filter('translate')('COMMUNICATOR.TEXT_CHAT.WRITES_MESSAGE')
      })
    }
    
    _interlocutorWritesMessage()

    $scope.sendMessage = () => {
      if (_isValidMessage($scope.newMessage)) {
        $scope.messages.push({
          isUserMessage: true,
          messageText: $scope.newMessage,
          messageTime: '12:12'
        })
        $scope.newMessage = null
      } else {
        // TODO Error Msg - Komunikat dla usera
      }
    }
    
    $scope.uploadFile = () => {
      // TODO files uploading jak będzie backend
    }



  }

  let proTextChat = {
    transclude: true,
    templateUrl:    'components/communicator/pro-text-chat/pro-text-chat.tpl.html',
    controller: ['$scope', '$filter', proTextChatComponentController ],
    bindings: {
      showChat: '<'
    }
  }

  angular.module('profitelo.components.communicator.pro-text-chat', [
    'profitelo.components.communicator.pro-text-chat.chat-message',
    'profitelo.components.communicator.pro-text-chat.chat-input',
    'pascalprecht.translate'

  ])
  .component('proTextChat', proTextChat)

}())