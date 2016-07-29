(function() {

  /* @ngInject */
  function proTextChatComponentController($scope, $filter, $timeout, $element, $log, User, proRatelService) {

    const _chatConversation = $($element).find('.chat-conversation')
    const _proTextChat = $($element).find('.pro-text-chat')

    this.messages = []
    this.incommingSocket = null
    this.roomId          = null

    let _pushChatToBottom = () => {
      $timeout(() => {
        _proTextChat.scrollTop(_chatConversation.height() + 1000)
        _chatConversation.perfectScrollbar('update')
      })
    }

    let _startConversation = (socket, roomId) => {

      $log.info('Starting conversation')

      this.toggles.chatState(true)
      this.toggles.communicatorState(true)

      this.incommingSocket = socket
      this.roomId = roomId

      proRatelService.getRoomHistory(this.roomId, this.incommingSocket).then(history => {
        $timeout(() => {
          this.messages = history
          _pushChatToBottom()
        })
      })
    }

    let _pushMessageObject = (message) => {
      this.messages.push(message)
      _pushChatToBottom()
    }

    $scope.$on('startConversation', (event, socket, roomId) => {
      $timeout(() => {
        _startConversation(socket, roomId)
      })
    })


    proRatelService.onNewMessage(messagePayload => {

      if (!this.incommingSocket) {
        _startConversation(messagePayload.socket, messagePayload.message.room)
      }

      if (String(this.roomId) === String(messagePayload.message.room)) {
        _pushMessageObject(messagePayload.message)
      } else {
        proRatelService.sendNewMessage(
          $filter('translate')('COMMUNICATOR.TEXT_CHAT.EXPERT_NOT_AVAILABLE'),
          messagePayload.message.room,
          messagePayload.socket)
      }


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

        proRatelService.sendNewMessage(this.newMessage, this.roomId, this.incommingSocket)

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
      toggles: '='
    }
  }

  angular.module('profitelo.components.communicator.pro-text-chat', [
    'profitelo.components.communicator.pro-text-chat.chat-message',
    'profitelo.components.communicator.pro-text-chat.chat-input',
    'pascalprecht.translate',
    'c7s.ng.userAuth'

  ])
  .component('proTextChat', proTextChat)

}())
