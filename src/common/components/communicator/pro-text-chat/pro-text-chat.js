(function() {

  function proTextChatComponentController($scope, $timeout) {
    $scope.messages = [{
      isUserMessage: true,
      messageText: 'alsalslaslaslalslaslalsalslaslas',
      messageTime: '12:12'
    },
      {
        isUserMessage: false,
        messageText: 'alsalslaslaslalslaslalsalslaslas',
        messageTime: '12:12'}]
  }

  let proTextChat = {
    transclude: true,
    templateUrl:    'components/communicator/pro-text-chat/pro-text-chat.tpl.html',
    controller: ['$scope', '$timeout', proTextChatComponentController ]
  }

  angular.module('profitelo.components.communicator.pro-text-chat', [
    'profitelo.components.communicator.pro-text-chat.chat-message',
    'pascalprecht.translate'

  ])
  .component('proTextChat', proTextChat)

}())