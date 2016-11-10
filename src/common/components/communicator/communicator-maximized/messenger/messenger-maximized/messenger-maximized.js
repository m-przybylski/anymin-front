(function() {

  /* @ngInject */
  function controller($timeout, messengerService, _, HelperService) {

    const messagesScroll = angular.element('.messenger-scroll')
    const indicateTypingDebounce = 1000
    const typingTimeout = 2000

    messagesScroll.perfectScrollbar()

    this.participantAvatar = ''
    this.isTyping = false
    this.groupedMessages = []

    const _clientInit = (expert) => {
      this.participantAvatar = HelperService.fileUrlResolver(expert.expertDetails.avatar)
    }

    const _expertInit = () => {
      this.participantAvatar = ''
    }

    const _scrollMessagesBottom = () => {
      messagesScroll.perfectScrollbar('update')
      messagesScroll.scrollTop(messagesScroll[0].scrollHeight)
    }

    const _addGroupedMessage = (message) => {
      if (this.groupedMessages.length === 0) {
        this.groupedMessages.push([message])
      } else {
        const lastMessageGroup = this.groupedMessages[this.groupedMessages.length-1]

        if (_.head(lastMessageGroup).sender === message.sender) {
          lastMessageGroup.push(message)
        } else {
          this.groupedMessages.push([message])
        }
      }
    }

    const _addMessage = msg => {
      _addGroupedMessage(msg)
      _onTypingEnd()
      _scrollMessagesBottom()
    }

    const _onMessageSendSuccess = (message) =>
      _addMessage(message)

    const _onMessageSendError = (err) =>
      alert('msg send err:', JSON.stringify(err))

    this.onSendMessage = (messageBody) =>
      messengerService.sendMessage(messageBody)
        .then(_onMessageSendSuccess, _onMessageSendError)

    const _onTypingEnd = () => {
      this.isTyping = false
      $timeout(_scrollMessagesBottom)
    }

    const _onTyping = () => {
      this.isTyping = true
      _scrollMessagesBottom()
      $timeout(_onTypingEnd, typingTimeout)
    }

    this.indicateTypingDebounce = _.throttle(messengerService.indicateTyping, indicateTypingDebounce, {
      'leading': true,
      'trailing': false
    })

    const _destroy = () => {
      this.isTyping = false
      this.groupedMessages = []
    }

    messengerService.onExpertMessage(_addMessage)

    messengerService.onClientMessage(_addMessage)

    messengerService.onExpertTyping(_onTyping)

    messengerService.onClientTyping(_onTyping)

    messengerService.onClientCreatingRoom(_clientInit)

    messengerService.onExpertCreatedRoom(_expertInit)

    messengerService.onChatLeft(_destroy)

    return this
  }

  let component = {
    templateUrl:    'components/communicator/communicator-maximized/messenger/messenger-maximized/messenger-maximized.tpl.html',
    controller: controller,
    bindings: {
      callCost: '<',
      minimizeMessenger: '<',
      callLength: '<'
    }
  }

  angular.module('profitelo.components.communicator.communicator-maximized.messenger.messenger-maximized', [
    'profitelo.services.messenger',
    'profitelo.services.helper',
    'profitelo.filters.seconds-to-datetime',
    'profitelo.filters.money',
    'profitelo.components.communicator.communicator-maximized.messenger.messenger-maximized.grouped-messages',
    'profitelo.components.communicator.communicator-maximized.messenger.messenger-maximized.messenger-input'
  ])
    .component('messengerMaximized', component)

}())
