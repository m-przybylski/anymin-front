/* istanbul ignore next function */
(function() {
  /* @ngInject */
  function proTextChatComponentController($scope, $filter, $timeout, $element, $log, User, communicatorService) {

    const _chatConversation = $($element).find('.chat-conversation')
    const _proTextChat = $($element).find('.pro-text-chat')

    let _pushChatToBottom = () => {
      $timeout(() => {
        _proTextChat.scrollTop(_chatConversation.height() + 1000)
        _chatConversation.perfectScrollbar('update')
      })
    }
    

    let _pushMessageObject = (message) => {
      this.messages.push(message)
      _pushChatToBottom()
    }


    communicatorService.onNewMessage(messagePayload => {

      _pushMessageObject(messagePayload.message)

    })

    _chatConversation.perfectScrollbar()


    let _isValidMessage = (message) => {
      return (angular.isDefined(message) && message !== null && message.length > 0)
    }

    let _interlocutorWritesMessage = () => {
      // TODO do zrobienia jak będzie backend
      // Dodac klase do elementu p "writing" - animacja z 3ma spanami o clasie .circle
      this.messages.push({
        isUserMessage: false,
        messageText: '...',
        messageTime: $filter('translate')('COMMUNICATOR.TEXT_CHAT.WRITES_MESSAGE')
      })
    }

    // _interlocutorWritesMessage()

    this.sendMessage = () => {
      if (_isValidMessage(this.newMessage)) {

        let messageRawObject = {
          sender: User.getData('id'),
          body: this.newMessage,
          timestamp: Date.now(),
          incommingMessage: true
        }

        this.session.sendMessage(this.newMessage)

        _pushMessageObject(messageRawObject)
        this.newMessage = null
      } else {
        // TODO Error Msg - Komunikat dla usera
      }
    }

    this.uploadFile = () => {
      // TODO files uploading jak będzie backend
    }

    return this


  }

  let proTextChat = {
    transclude: true,
    templateUrl:    'components/communicator/pro-text-chat/pro-text-chat.tpl.html',
    controller: proTextChatComponentController,
    controllerAs: 'vm',
    bindings: {
      showChat: '<',
      toggles: '=',
      session: '=',
      messages: '='
    }
  }

  angular.module('profitelo.components.communicator.pro-text-chat', [
    'profitelo.components.communicator.pro-text-chat.chat-message',
    'profitelo.components.communicator.pro-text-chat.chat-input',
    'profitelo.services.current-call-state',
    'profitelo.services.communicatorService',
    'pascalprecht.translate',
    'c7s.ng.userAuth'

  ])
  .component('proTextChat', proTextChat)

}())
