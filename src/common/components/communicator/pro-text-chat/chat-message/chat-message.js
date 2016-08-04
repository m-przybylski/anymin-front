(function() {

  /* @ngInject */
  function controller($scope, $timeout, User, currentCallSessionService) {

    let session = currentCallSessionService.getSession()

    this.isUserMessage = [String(session.id), String(User.getData('id'))].indexOf(String(this.model.sender)) >= 0

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
    'angularMoment',
    'c7s.ng.userAuth',
    'profitelo.services.current-call-state'

  ])
    .component('proTextChatMessage', proTextChatMessage)

}())
