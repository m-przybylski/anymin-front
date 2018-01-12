import {IChatHistoryBindings} from './chat-history'
import * as RatelSdk from 'ratel-sdk-js';
import {CommunicatorService} from '../communicator/communicator.service'
import {Paginated} from 'ratel-sdk-js/dist/protocol/protocol'
import {Message} from 'ratel-sdk-js'
import * as _ from 'lodash'

export class ChatHistoryComponentController implements IChatHistoryBindings {

  public chatMessages: Message[]
  public roomId?: string
  public isLoading: boolean = true
  public isChatHistory: boolean = true
  public isError: boolean = false
  public groupedMessages: Message[][] = []
  private session?: RatelSdk.Session
  private static readonly chatHistoryLimit: number = 500

  static $inject = ['communicatorService', '$log', '$scope'];

    constructor(private communicatorService: CommunicatorService,
              private $log: ng.ILogService,
              private $scope: ng.IScope) {
  }

  $onInit(): void {
    this.session = this.communicatorService.getClientSession()
    this.getMessages()
  }

  public getMessages = (): void => {
    this.isLoading = true
    if (this.session && this.roomId) {
      this.session.chat.getRoom(this.roomId)
      .then((room) => room.getMessages(0, ChatHistoryComponentController.chatHistoryLimit)
      .then(this.onGetMessages, this.onReject))
    } else {
      this.onReject('Session or roomId not found')
    }
  }

  private onReject = (err: any): void => {
    this.isLoading = false
    this.isError = true
    this.$log.error(err)
  }

  private onGetMessages = (messages: Paginated<Message>): void => {
    this.chatMessages = messages.items.filter(message => message.tag === 'MESSAGE')
    this.isChatHistory = this.chatMessages.length > 0
    this.isLoading = false
    this.isError = false
    this.chatMessages.forEach((message) => {
      this.addGroupedMessage(message)
    })
    this.$scope.$apply()
  }

  private addGroupedMessage = (message: Message): void => {
    if (this.groupedMessages.length === 0) {
      this.groupedMessages.push([message])
    } else {
      const lastMessageGroup = this.groupedMessages[this.groupedMessages.length - 1]
      const firstElementOfLastMessageGroup = _.head(lastMessageGroup)
      if (firstElementOfLastMessageGroup && firstElementOfLastMessageGroup.userId === message.userId) {
        lastMessageGroup.push(message)
      } else {
        this.groupedMessages.push([message])
      }
    }
  }

}
