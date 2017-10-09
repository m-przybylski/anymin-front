import * as angular from 'angular'
import * as _ from 'lodash'
import {IMessengerMaximizedComponentBindings} from './maximized'
import {PostProcessOption, MoneyDto} from 'profitelo-api-ng/model/models'
import {UploaderService} from '../../../../services/uploader/uploader.service'
import {UploaderFactory} from '../../../../services/uploader/uploader.factory'
import {MessageRoom} from '../../models/message-room';
import {ClientCallService} from '../../call-services/client-call.service';
import {ExpertCallService} from '../../call-services/expert-call.service';
import {CurrentCall} from '../../models/current-call';
import {CurrentClientCall} from '../../models/current-client-call';
import {CurrentExpertCall} from '../../models/current-expert-call';
import {Message} from 'ratel-sdk-js'
import {IMessageContext} from '../message-context'

export class MessengerMaximizedComponentController implements ng.IController, IMessengerMaximizedComponentBindings {

  public callCost: MoneyDto
  public isMessenger: boolean
  public minimizeMessenger: () => void
  public callLength: number

  public participantAvatar = ''
  public isTyping = false
  public groupedMessages: Message[][] = []
  public uploadedFile: {
    progress?: boolean,
    file?: File
  } = {}
  public isFileUploadError = false

  private messagesScroll = angular.element('.messenger-scroll')
  private indicateTypingDebounceTimeout = 1000
  public indicateTypingDebounce = (): void => {
  }
  private typingTimeout = 2000
  private fileUploadErrorMessageTimeout = 15000
  private uploader: UploaderService

  private messageRoom: MessageRoom
  public expertName: string = ''

  /* @ngInject */
  constructor(private $log: ng.ILogService, private $timeout: ng.ITimeoutService,
              private $element: ng.IRootElementService,
              private clientCallService: ClientCallService,
              private expertCallService: ExpertCallService,
              uploaderFactory: UploaderFactory) {

    this.uploader = uploaderFactory.getInstance()
    this.messagesScroll.perfectScrollbar()

    this.clientCallService.onNewCall(this.clientInit)
    this.expertCallService.onNewCall(this.expertInit)
    this.expertCallService.onCallPull((currentExpertCall) => {
      if (!this.messageRoom) this.expertInit(currentExpertCall)
    })

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
    this.sendMessage(messageBody, {
      mimeType: 'text/plain',
      content: messageBody,
    })

  private clientInit = (currentClientCall: CurrentClientCall): void => {
    this.destroy()
    const expert = currentClientCall.getExpert()

    if (expert.expertDetails && expert.expertDetails.avatar) {
      this.participantAvatar = expert.expertDetails.avatar
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

  private addGroupedMessage = (message: Message): void => {
    if (this.groupedMessages.length === 0) {
      this.groupedMessages.push([message])
    } else {
      const lastMessageGroup = this.groupedMessages[this.groupedMessages.length - 1]
      const firstElementOfLastMessageGroup = _.head(lastMessageGroup)
      if (firstElementOfLastMessageGroup && firstElementOfLastMessageGroup.user === message.user) {
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

  private addMessage = (msg: Message): void => {
    this.addGroupedMessage(msg)
    this.onTypingEnd()
  }

  private onMessageSendError = (err: any): void =>
    this.$log.error('msg send err:', err)

  private sendMessage = (messageObject: string, context: IMessageContext): Promise<void> =>
    this.messageRoom.sendMessage(messageObject, context)
      .catch(this.onMessageSendError)

  private onUploadProgess = (res: any): void =>
    this.$log.debug(res)

  private postProcessOptions: PostProcessOption = {
    croppingDetails: undefined
  }

  private onFileUpload = (res: any): void => {
    this.uploadedFile.progress = false
    this.sendMessage(res.name, {
      mimeType: res.contentType,
      content: res.token,
      description: res.name
    })
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
