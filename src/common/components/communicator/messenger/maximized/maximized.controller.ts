import * as angular from 'angular'
import * as _ from 'lodash'
import {IMessengerMaximizedComponentBindings} from './maximized'
import {MoneyDto} from 'profitelo-api-ng/model/models'
import {UploaderService, IPostProcessOptions} from '../../../../services/uploader/uploader.service'
import {MessengerService} from '../messenger.service'
import {UrlService} from '../../../../services/url/url.service'
import {UploaderFactory} from '../../../../services/uploader/uploader.factory'
import {ExpertProfile} from '../../../../models/ExpertProfile'

export class MessengerMaximizedComponentController implements ng.IController, IMessengerMaximizedComponentBindings {

  public callCost: MoneyDto
  public isMessenger: boolean
  public minimizeMessenger: () => void
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
  private uploader: UploaderService

  /* @ngInject */
  constructor(private $log: ng.ILogService, private $timeout: ng.ITimeoutService,
              private $element: ng.IRootElementService, private messengerService: MessengerService,
               private urlService: UrlService,
              uploaderFactory: UploaderFactory) {

    this.uploader = uploaderFactory.getInstance(1, uploaderFactory.collectionTypes.avatar)
    this.messagesScroll.perfectScrollbar()

    messengerService.onExpertMessage(this.addMessage)
    messengerService.onClientMessage(this.addMessage)
    messengerService.onExpertTyping(this.onTyping)
    messengerService.onClientTyping(this.onTyping)
    messengerService.onClientCreatingRoom(this.clientInit)
    messengerService.onExpertCreatedRoom(this.expertInit)
    messengerService.onChatLeft(this.destroy)
  }

  $onChanges = () => {
    if (this.isMessenger) {
      angular.element(this.$element).find('.messenger-input input').focus()
    }
  }

  public onUploadFiles = (files: Array<File>) => {
    this.isFileUploadError = false
    angular.forEach(files, (file) => {
      this.uploadedFile.file = file
      this.uploadedFile.progress = true
      this.uploadFile(file)
    })
  }

  public uploadAgain = () => {
    this.onUploadFiles((this.uploadedFile.file) ? [this.uploadedFile.file] : [])
  }

  public indicateTypingDebounce =
    _.throttle(this.messengerService.indicateTyping, this.indicateTypingDebounceTimeout, {
      'leading': true,
      'trailing': false
    })

  public onSendMessage = (messageBody: any) => {
    this.sendMessage(this.serializeMessageBody(messageBody))
  }

  private clientInit = (expert: ExpertProfile) => {
    this.participantAvatar = this.urlService.resolveFileUrl(expert.expertDetails.avatar || '')
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

  private addGroupedMessage = (message: any) => {
    if (this.groupedMessages.length === 0) {
      this.groupedMessages.push([message])
    } else {
      const lastMessageGroup = this.groupedMessages[this.groupedMessages.length - 1]

      if (_.head(lastMessageGroup).user === message.user) {
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

  private addMessage = (msg: any) => {
    this.addGroupedMessage(msg)
    msg.isNew = true
    this.$timeout(() => msg.isNew = false, 500)
    this.onTypingEnd()
  }

  private onMessageSendSuccess = (message: any) => {
    message.isMine = true
    this.addMessage(message)
  }

  private onMessageSendError = (err: any) =>
    this.$log.error('msg send err:', JSON.stringify(err))

  private serializeMessageBody = (text: string) =>
    JSON.stringify({body: text})

  private sendMessage = (messageObject: any) =>
    this.messengerService.sendMessage(messageObject)
      .then(this.onMessageSendSuccess, this.onMessageSendError)

  private onUploadProgess = (res: any) =>
    this.$log.debug(res)

  private postProcessOptions: IPostProcessOptions = {
    croppingDetails: {}
  }

  private onFileUpload = (res: any) => {
    const fileMessage = {
      body: res.name,
      fileUrl: this.urlService.resolveFileUrl(res.token)
    }
    this.uploadedFile.progress = false
    this.sendMessage(JSON.stringify(fileMessage))
  }

  private onFileUploadError = (err: any) => {
    this.$log.error(err)
    this.uploadedFile.progress = false
    this.isFileUploadError = true
    this.$timeout(() => {
      this.isFileUploadError = false
    }, this.fileUploadErrorMessageTimeout)
  }

  private uploadFile = (file: File) =>
    this.uploader.uploadFile(file, this.postProcessOptions, this.onUploadProgess)
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
