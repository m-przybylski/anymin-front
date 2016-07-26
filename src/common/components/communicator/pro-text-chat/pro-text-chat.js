(function() {

  /* @ngInject */
  function proTextChatComponentController($filter, $element) {

    const _chatConversation = $($element).find('.chat-conversation')
    const _proTextChat = $($element).find('.pro-text-chat')

    this.messages = [
      {
        isUserMessage: true,
        messageText: 'Testowa wiadomosc',
        messageTime: '12:12'
      },
      {
        isUserMessage: true,
        messageText: 'Testowa wiadomosc',
        messageTime: '12:12'
      },
      {
        isUserMessage: true,
        messageText: 'Testowa wiadomosc',
        messageTime: '12:12'
      },
      {
        isUserMessage: true,
        messageText: 'Testowa wiadomosc',
        messageTime: '12:12'
      },
      {
        isUserMessage: true,
        messageText: 'Testowa wiadomosc',
        messageTime: '12:12'
      },
      {
        isUserMessage: true,
        messageText: 'Testowa wiadomosc',
        messageTime: '12:12'
      }]


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

    _interlocutorWritesMessage()

    this.sendMessage = () => {
      if (_isValidMessage(this.newMessage)) {
        this.messages.push({
          isUserMessage: true,
          messageText: this.newMessage,
          messageTime: '12:12',
          incommingMessage: true
        })
        this.newMessage = null
        _proTextChat.scrollTop(_chatConversation.height() + 1000)
        _chatConversation.perfectScrollbar('update')
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
