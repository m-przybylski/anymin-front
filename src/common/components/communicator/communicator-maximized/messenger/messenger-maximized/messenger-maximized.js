(function() {

  /* @ngInject */
  function controller($log, $timeout, $scope, $element, messengerService, _, HelperService, uploaderService) {

    const messagesScroll = angular.element('.messenger-scroll')
    const indicateTypingDebounce = 1000
    const typingTimeout = 2000
    const fileUploadErrorMessageTimeout = 15000
    const uploader = uploaderService.getInstance(1, uploaderService.collectionTypes.avatar)

    messagesScroll.perfectScrollbar()

    this.participantAvatar = ''
    this.isTyping = false
    this.groupedMessages = []
    this.uploadedFile = {}

    const _clientInit = (expert) => {
      this.participantAvatar = HelperService.fileUrlResolver(expert.expertDetails.avatar)
    }

    const _expertInit = () => {
      this.participantAvatar = ''
    }

    const _scrollMessagesBottom = () => {
      messagesScroll.perfectScrollbar('update')
      $timeout(() =>
        messagesScroll.scrollTop(messagesScroll[0].scrollHeight))
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

    const _onTypingEnd = () => {
      this.isTyping = false
      $timeout(_scrollMessagesBottom)
    }

    const _addMessage = (msg) => {
      _addGroupedMessage(msg)
      _onTypingEnd()
    }

    const _onMessageSendSuccess = (message) => {
      _addMessage(message)
    }

    const _onMessageSendError = (err) =>
      $log.error('msg send err:', JSON.stringify(err))

    
    const serializeMessageBody = (text) => 
      JSON.stringify({body: text})
    
    const sendMessage = (messageObject) => 
      messengerService.sendMessage(messageObject)
        .then(_onMessageSendSuccess, _onMessageSendError)
    
    this.onSendMessage = (messageBody) => {
      sendMessage(serializeMessageBody(messageBody))
    }
    
    const onUploadProgess = (res) =>
      $log.debug(res)

    const onFileUpload = (res) => {
      const fileMessage = {
        body: res.name,
        fileUrl: HelperService.fileUrlResolver(res.token)
      }
      this.uploadedFile.progress = false
      sendMessage(JSON.stringify(fileMessage))
    }

    const onFileUploadError = (err) => {
      this.uploadedFile.progress = false
      this.onFileUploadError = true
      $timeout(() => {
        this.onFileUploadError = false
      }, fileUploadErrorMessageTimeout)
    }

    const uploadFile = (file) =>
      uploader.uploadFile(file, onUploadProgess)
        .then(onFileUpload, onFileUploadError)

    this.onUploadFiles = (files) => {
      this.onFileUploadError = false
      angular.forEach(files, (file)=>{
        this.uploadedFile.file = file
        this.uploadedFile.progress = true
        uploadFile(file)
      })
    }

    this.uploadAgain = () => {
      this.onUploadFiles([this.uploadedFile.file])
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

    $scope.$watch(()=>{
      return this.isMessenger
    }, (newValue) => {
      if (newValue) {
        angular.element($element).find('.messenger-input input').focus()
      }
    })

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
      isMessenger: '<',
      minimizeMessenger: '<',
      callLength: '<'
    }
  }

  angular.module('profitelo.components.communicator.communicator-maximized.messenger.messenger-maximized', [
    'profitelo.services.messenger',
    'profitelo.services.helper',
    'profitelo.services.uploader',
    'lodash',
    'profitelo.filters.seconds-to-datetime',
    'profitelo.filters.money',
    'profitelo.components.communicator.communicator-maximized.messenger.messenger-maximized.grouped-messages',
    'profitelo.components.communicator.communicator-maximized.messenger.messenger-maximized.messenger-input'
  ])
    .component('messengerMaximized', component)

}())
