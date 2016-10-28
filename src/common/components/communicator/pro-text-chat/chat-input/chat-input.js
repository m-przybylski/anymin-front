/* istanbul ignore next function */
(function() {
  let proTextChatInput = {
    transclude: true,
    templateUrl:    'components/communicator/pro-text-chat/chat-input/chat-input.tpl.html',
    bindings: {
      placeholder: '@',
      ngModel: '=',
      uploadFileAction: '<',
      sendMessageAction: '<'
    }
  }

  angular.module('profitelo.components.communicator.pro-text-chat.chat-input', [
    'profitelo.directives.ng-enter',
    'pascalprecht.translate'

  ])
    .component('proTextChatInput', proTextChatInput)

}())