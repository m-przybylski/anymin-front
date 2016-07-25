(function() {

  /* @ngInject */
  function controller($timeout, User) {

    this.isUserMessage = User.getData('id') === this.model.sender
    
    if (angular.isDefined(this.model.incommingMessage) && this.model.incommingMessage) {
      $timeout(() => {
        this.model.incommingMessage = false
      }, 5000)
    }

    return this
  }

  let proTextChatMessage = {
    transclude: true,
    templateUrl:    'components/communicator/pro-text-chat/chat-message/chat-message.tpl.html',
    bindings: {
      model: '<'
    },
    controllerAs: 'vm',
    controller: controller

  }

  angular.module('profitelo.components.communicator.pro-text-chat.chat-message', [
    'pascalprecht.translate',
    'c7s.ng.userAuth',
    'angularMoment'

  ])
    .component('proTextChatMessage', proTextChatMessage)

}())
