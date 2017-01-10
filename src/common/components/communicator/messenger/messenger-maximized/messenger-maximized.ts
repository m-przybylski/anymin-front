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

    const clientInit = (expert) => {
      this.participantAvatar = HelperService.fileUrlResolver(expert.expertDetails.avatar)
    }

    const expertInit = () => {
      this.participantAvatar = ''
    }

    const scrollMessagesBottom = () => {
      messagesScroll.perfectScrollbar('update')
      $timeout(() => {
        if (angular.element('grouped-messages .message:last-child img')){
          angular.element('grouped-messages .message:last-child img').on('load', () => {
            messagesScroll.scrollTop(messagesScroll[0].scrollHeight)
            angular.element('grouped-messages .message:last-child img').off('load')
          })
        }
        messagesScroll.scrollTop(messagesScroll[0].scrollHeight)
      })
    }

    const addGroupedMessage = (message) => {
      if (this.groupedMessages.length === 0) {
        this.groupedMessages.push([message])
      } else {
        const lastMessageGroup = this.groupedMessages[this.groupedMessages.length-1]

        if (_.head(lastMessageGroup).user === message.user) {
          lastMessageGroup.push(message)
        } else {
          this.groupedMessages.push([message])
        }
      }
    }

    const onTypingEnd = () => {
      this.isTyping = false
      $timeout(scrollMessagesBottom)
    }

    const addMessage = (msg) => {
      addGroupedMessage(msg)
      msg.isNew = true
      $timeout(() => msg.isNew = false, 500)
      onTypingEnd()
    }

    const onMessageSendSuccess = (message) => {
      message.isMine = true
      addMessage(message)
    }

    const onMessageSendError = (err) =>
      $log.error('msg send err:', JSON.stringify(err))

    
    const serializeMessageBody = (text) => 
      JSON.stringify({body: text})
    
    const sendMessage = (messageObject) => 
      messengerService.sendMessage(messageObject)
        .then(onMessageSendSuccess, onMessageSendError)
    
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

    const onTyping = () => {
      this.isTyping = true
      scrollMessagesBottom()
      $timeout(onTypingEnd, typingTimeout)
    }

    this.indicateTypingDebounce = _.throttle(messengerService.indicateTyping, indicateTypingDebounce, {
      'leading': true,
      'trailing': false
    })

    const destroy = () => {
      this.participantAvatar = ''
      this.isTyping = false
      this.groupedMessages = []
      this.uploadedFile = {}
    }

    $scope.$watch(()=>{
      return this.isMessenger
    }, (newValue) => {
      if (newValue) {
        angular.element($element).find('.messenger-input input').focus()
      }
    })

    messengerService.onExpertMessage(addMessage)

    messengerService.onClientMessage(addMessage)

    messengerService.onExpertTyping(onTyping)

    messengerService.onClientTyping(onTyping)

    messengerService.onClientCreatingRoom(clientInit)

    messengerService.onExpertCreatedRoom(expertInit)

    messengerService.onChatLeft(destroy)

    return this
  }

  const component = {
    templateUrl:    'components/communicator/messenger/messenger-maximized/messenger-maximized.tpl.html',
    controller: controller,
    bindings: {
      callCost: '<',
      isMessenger: '<',
      minimizeMessenger: '<',
      callLength: '<'
    }
  }

  angular.module('profitelo.components.communicator.messenger.messenger-maximized', [
    'profitelo.services.messenger',
    'profitelo.services.helper',
    'profitelo.services.uploader',
    'lodash',
    'profitelo.filters.seconds-to-datetime',
    'profitelo.filters.money',
    'profitelo.components.communicator.messenger.messenger-maximized.grouped-messages',
    'profitelo.components.communicator.messenger.messenger-maximized.messenger-input'
  ])
    .component('messengerMaximized', component)

}())
