import * as angular from 'angular'
import * as _ from 'lodash'
import {IMessengerMaximizedComponentBindings} from './maximized'
import {PostProcessOption, MoneyDto} from 'profitelo-api-ng/model/models'
import {UploaderService} from '../../../../services/uploader/uploader.service'
import {UrlService} from '../../../../services/url/url.service'
import {UploaderFactory} from '../../../../services/uploader/uploader.factory'
import {MessageRoom} from '../../models/message-room';
import {ClientCallService} from '../../call-services/client-call.service';
import {ExpertCallService} from '../../call-services/expert-call.service';
import {CurrentCall} from '../../models/current-call';
import {CurrentClientCall} from '../../models/current-client-call';
import {CurrentExpertCall} from '../../models/current-expert-call';

export class MessengerMaximizedComponentController implements ng.IController, IMessengerMaximizedComponentBindings {

  public callCost: MoneyDto
  public isMessenger: boolean
  public minimizeMessenger: () => void
  public callLength: number

  public participantAvatar = ''
  public isTyping = false
  public groupedMessages: any[][] = []
  public uploadedFile: {
    progress?: boolean,
    file?: File
  } = {}
  public isFileUploadError = false

  private messagesScroll = angular.element('.messenger-scroll')
  private indicateTypingDebounceTimeout = 1000
  public indicateTypingDebounce = (): void => {}
  private typingTimeout = 2000
  private fileUploadErrorMessageTimeout = 15000
  private uploader: UploaderService

  private messageRoom: MessageRoom
  public expertName: string = ''

  /* @ngInject */
  constructor(private $log: ng.ILogService, private $timeout: ng.ITimeoutService,
              private $element: ng.IRootElementService,
              private urlService: UrlService,
              private clientCallService: ClientCallService,
              private expertCallService: ExpertCallService,
              uploaderFactory: UploaderFactory) {

    this.uploader = uploaderFactory.getInstance(1, uploaderFactory.collectionTypes.avatar)
    this.messagesScroll.perfectScrollbar()

    this.clientCallService.onNewCall(this.clientInit)
    this.expertCallService.onNewCall(this.expertInit)
  }

  private onNewCall = (currentCall: CurrentCall): void => {
    this.messageRoom = currentCall.getMessageRoom()
    this.messageRoom.onMessage(this.addMessage)
    this.messageRoom.onTyping(this.onTyping)
    currentCall.onTimeCostChange((data) => {
      this.callLength = data.time
      this.callCost = data.money
    })
    this.indicateTypingDebounce = _.throttle(this.messageRoom.indicateTyping, this.indicateTypingDebounceTimeout, {
      leading: true,
      trailing: false
    })
  }

  $onChanges = (): void => {
    if (this.isMessenger) {
      angular.element(this.$element).find('.messenger-input input').focus()
    }
  }

  public onUploadFiles = (files: File[]): void => {
    this.isFileUploadError = false
    angular.forEach(files, (file) => {
      this.uploadedFile.file = file
      this.uploadedFile.progress = true
      this.uploadFile(file)
    })
  }

  public uploadAgain = (): void => {
    this.onUploadFiles((this.uploadedFile.file) ? [this.uploadedFile.file] : [])
  }

  public onSendMessage = (messageBody: string): Promise<void> =>
    this.sendMessage(this.serializeMessageBody(messageBody))

  private clientInit = (currentClientCall: CurrentClientCall): void => {
    this.destroy()
    const expert = currentClientCall.getExpert()

    if (expert.expertDetails && expert.expertDetails.avatar) {
      this.participantAvatar = this.urlService.resolveFileUrl(expert.expertDetails.avatar)
    }

    if (expert.expertDetails && expert.expertDetails.name) {
      this.expertName = expert.expertDetails.name
    }

    this.onNewCall(currentClientCall)
  }

  private expertInit = (currentExpertCall: CurrentExpertCall): void => {
    this.destroy()
    this.participantAvatar = ''
    this.onNewCall(currentExpertCall)
  }

  private scrollMessagesBottom = (): void => {
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

  private addGroupedMessage = (message: any): void => {
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

  private onTypingEnd = (): void => {
    this.isTyping = false
    this.$timeout(this.scrollMessagesBottom)
  }

  private addMessage = (msg: any): void => {
    const changeMessageStatusDelay: number = 500
    this.addGroupedMessage(msg)
    msg.isNew = true
    this.$timeout(() => msg.isNew = false, changeMessageStatusDelay)
    this.onTypingEnd()
  }

  private onMessageSendSuccess = (message: any): void => {
    message.isMine = true
    this.addMessage(message)
  }

  private onMessageSendError = (err: any): void =>
    this.$log.error('msg send err:', JSON.stringify(err))

  private serializeMessageBody = (text: string): string =>
    JSON.stringify({body: text})

  private sendMessage = (messageObject: string): Promise<void> =>
    this.messageRoom.sendMessage(messageObject)
      .then(this.onMessageSendSuccess, this.onMessageSendError)

  private onUploadProgess = (res: any): void =>
    this.$log.debug(res)

  private postProcessOptions: PostProcessOption = {
    croppingDetails: undefined
  }

  private onFileUpload = (res: any): void => {
    const fileMessage = {
      body: res.name,
      fileUrl: this.urlService.resolveFileUrl(res.token)
    }
    this.uploadedFile.progress = false
    this.sendMessage(JSON.stringify(fileMessage))
  }

  private onFileUploadError = (err: any): void => {
    this.$log.error(err)
    this.uploadedFile.progress = false
    this.isFileUploadError = true
    this.$timeout(() => {
      this.isFileUploadError = false
    }, this.fileUploadErrorMessageTimeout)
  }

  private uploadFile = (file: File): ng.IPromise<never> =>
    this.uploader.uploadFile(file, this.postProcessOptions, this.onUploadProgess)
      .then(this.onFileUpload, this.onFileUploadError)

  private onTyping = (): void => {
    this.isTyping = true
    this.scrollMessagesBottom()
    this.$timeout(this.onTypingEnd, this.typingTimeout)
  }

  private destroy = (): void => {
    this.participantAvatar = ''
    this.isTyping = false
    this.groupedMessages = []
    this.uploadedFile = {}
  }
}
