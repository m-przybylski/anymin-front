namespace profitelo.components.communicator.messenger.maximized {

  import IMessengerService = profitelo.services.messenger.IMessengerService
  import IUrlService = profitelo.services.helper.IUrlService
  import IUploaderFactory = profitelo.services.uploader.IUploaderFactory
  import IUploaderService = profitelo.services.uploader.IUploaderService
  import Money = profitelo.models.Money

  interface MessengerMaximizedComponentBindings {
    callCost: Money
    isMessenger: boolean
    minimizeMessenger: Function
    callLength: number
  }

  class MessengerMaximizedComponentController implements ng.IController, MessengerMaximizedComponentBindings {

    public callCost: Money
    public isMessenger: boolean
    public minimizeMessenger: Function
    public callLength: number

    public participantAvatar = ''
    public isTyping = false
    public groupedMessages: Array<Array<any>> = []
    public uploadedFile: {
      progress?: boolean,
      file?: File
    } = {}
    public isFileUploadError = false

    private messagesScroll = angular.element('.messenger-scroll')
    private indicateTypingDebounceTimeout = 1000
    private typingTimeout = 2000
    private fileUploadErrorMessageTimeout = 15000
    private uploader: IUploaderService

    /* @ngInject */
    constructor(private $log: ng.ILogService, private $timeout: ng.ITimeoutService, private $scope: ng.IScope,
                private $element: ng.IRootElementService, private messengerService: IMessengerService,
                private lodash: _.LoDashStatic, private urlService: IUrlService,
                private uploaderFactory: IUploaderFactory) {

      uploaderFactory.getInstance(1, uploaderFactory.collectionTypes.avatar)
      this.messagesScroll.perfectScrollbar()

      messengerService.onExpertMessage(this.addMessage)
      messengerService.onClientMessage(this.addMessage)
      messengerService.onExpertTyping(this.onTyping)
      messengerService.onClientTyping(this.onTyping)
      messengerService.onClientCreatingRoom(this.clientInit)
      messengerService.onExpertCreatedRoom(this.expertInit)
      messengerService.onChatLeft(this.destroy)
    }

    $onChanges = (onChangesObj: ng.IOnChangesObject) => {
      if (this.isMessenger) {
        angular.element(this.$element).find('.messenger-input input').focus()
      }
    }

    public onUploadFiles = (files) => {
      this.isFileUploadError = false
      angular.forEach(files, (file) => {
        this.uploadedFile.file = file
        this.uploadedFile.progress = true
        this.uploadFile(file)
      })
    }

    public uploadAgain = () => {
      this.onUploadFiles([this.uploadedFile.file])
    }

    public indicateTypingDebounce =
      this.lodash.throttle(this.messengerService.indicateTyping, this.indicateTypingDebounceTimeout, {
        'leading': true,
        'trailing': false
      })

    public onSendMessage = (messageBody) => {
      this.sendMessage(this.serializeMessageBody(messageBody))
    }

    private clientInit = (expert) => {
      this.participantAvatar = this.urlService.resolveFileUrl(expert.expertDetails.avatar)
    }

    private expertInit = () => {
      this.participantAvatar = ''
    }

    private scrollMessagesBottom = () => {
      this.messagesScroll.perfectScrollbar('update')
      this.$timeout(() => {
        if (angular.element('grouped-messages .message:last-child img')) {
          angular.element('grouped-messages .message:last-child img').on('load', () => {
            this.messagesScroll.scrollTop(this.messagesScroll[0].scrollHeight)
            angular.element('grouped-messages .message:last-child img').off('load')
          })
        }
        this.messagesScroll.scrollTop(this.messagesScroll[0].scrollHeight)
      })
    }

    private addGroupedMessage = (message) => {
      if (this.groupedMessages.length === 0) {
        this.groupedMessages.push([message])
      } else {
        const lastMessageGroup = this.groupedMessages[this.groupedMessages.length - 1]

        if (this.lodash.head(lastMessageGroup).user === message.user) {
          lastMessageGroup.push(message)
        } else {
          this.groupedMessages.push([message])
        }
      }
    }

    private onTypingEnd = () => {
      this.isTyping = false
      this.$timeout(this.scrollMessagesBottom)
    }

    private addMessage = (msg) => {
      this.addGroupedMessage(msg)
      msg.isNew = true
      this.$timeout(() => msg.isNew = false, 500)
      this.onTypingEnd()
    }

    private onMessageSendSuccess = (message) => {
      message.isMine = true
      this.addMessage(message)
    }

    private onMessageSendError = (err) =>
      this.$log.error('msg send err:', JSON.stringify(err))

    private serializeMessageBody = (text) =>
      JSON.stringify({body: text})

    private sendMessage = (messageObject) =>
      this.messengerService.sendMessage(messageObject)
        .then(this.onMessageSendSuccess, this.onMessageSendError)

    private onUploadProgess = (res) =>
      this.$log.debug(res)

    private onFileUpload = (res) => {
      const fileMessage = {
        body: res.name,
        fileUrl: this.urlService.resolveFileUrl(res.token)
      }
      this.uploadedFile.progress = false
      this.sendMessage(JSON.stringify(fileMessage))
    }

    private onFileUploadError = (err) => {
      this.uploadedFile.progress = false
      this.isFileUploadError = true
      this.$timeout(() => {
        this.isFileUploadError = false
      }, this.fileUploadErrorMessageTimeout)
    }

    private uploadFile = (file) =>
      this.uploader.uploadFile(file, this.onUploadProgess)
        .then(this.onFileUpload, this.onFileUploadError)

    private onTyping = () => {
      this.isTyping = true
      this.scrollMessagesBottom()
      this.$timeout(this.onTypingEnd, this.typingTimeout)
    }

    private destroy = () => {
      this.participantAvatar = ''
      this.isTyping = false
      this.groupedMessages = []
      this.uploadedFile = {}
    }
  }

  class MessengerMaximizedComponent implements ng.IComponentOptions {
    templateUrl: string = 'components/communicator/messenger/maximized/maximized.tpl.html'
    controller: ng.Injectable<ng.IControllerConstructor> = MessengerMaximizedComponentController
    bindings: {[boundProperty: string]: string} = {
      callCost: '<',
      isMessenger: '<',
      minimizeMessenger: '<',
      callLength: '<'
    }
  }

  angular.module('profitelo.components.communicator.messenger.maximized', [
    'profitelo.services.messenger',
    'profitelo.services.url',
    'profitelo.services.uploader',
    'ngLodash',
    'profitelo.filters.seconds-to-datetime',
    'profitelo.filters.money',
    'profitelo.components.communicator.messenger.maximized.grouped-messages',
    'profitelo.components.communicator.messenger.maximized.messenger-input'
  ])
    .component('messengerMaximized', new MessengerMaximizedComponent())
}