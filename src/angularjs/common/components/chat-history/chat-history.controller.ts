// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
// tslint:disable:no-any
import { IChatHistoryBindings } from './chat-history';
import { Session, protocol, roomEvents } from 'ratel-sdk-js';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import { CommunicatorService } from '@anymind-ng/core';

// tslint:disable:member-ordering
export class ChatHistoryComponentController implements IChatHistoryBindings {

  public chatMessages: roomEvents.CustomMessageSent[];
  public roomId?: string;
  public isLoading = true;
  public isChatHistory = true;
  public isError = false;
  public groupedMessages: roomEvents.CustomMessageSent[][] = [];
  private session?: Session;
  private static readonly chatHistoryLimit = 500;

  public static $inject = ['communicatorService', '$log', '$scope'];

  constructor(private communicatorService: CommunicatorService,
              private $log: ng.ILogService,
              private $scope: ng.IScope) {
  }

  public $onInit(): void {
    this.session = this.communicatorService.getSession();
    this.getMessages();
  }

  public getMessages = (): void => {
    if (this.session && this.roomId) {
      this.isLoading = true;
      this.session.chat.getRoom(this.roomId)
        .then(room => room.getMessages(0, ChatHistoryComponentController.chatHistoryLimit)
          .then(this.onGetMessages, this.onReject))
        .catch(this.onReject)
        .then(() => {
          this.isLoading = false;
        });
    } else {
      this.onReject('Session or roomId not found');
    }
  }

  private onReject = (err: any): void => {
    this.isError = true;
    this.isLoading = false;
    this.$log.error(err);
  }

  private onGetMessages = (messages: protocol.Paginated<roomEvents.RoomEvent>): void => {
    this.chatMessages = messages.items
      .filter(m => ChatHistoryComponentController.isCustomMessageSent(m))
      .map(m => m as roomEvents.CustomMessageSent)
      .filter(message => message.tag === 'room_custom_message_sent');
    this.isChatHistory = this.chatMessages.length > 0;
    this.isError = false;
    this.chatMessages.forEach((message) => {
      this.addGroupedMessage(message);
    });
    this.$scope.$apply();
  }

  private static isCustomMessageSent = (e: roomEvents.RoomEvent): e is roomEvents.CustomMessageSent =>
    e.tag === roomEvents.CustomMessageSent.tag

  private addGroupedMessage = (message: roomEvents.CustomMessageSent): void => {
    if (this.groupedMessages.length === 0) {
      this.groupedMessages.push([message]);
    } else {
      const lastMessageGroup = this.groupedMessages[this.groupedMessages.length - 1];
      const firstElementOfLastMessageGroup = _.head(lastMessageGroup);
      if (firstElementOfLastMessageGroup && firstElementOfLastMessageGroup.authorId === message.authorId) {
        lastMessageGroup.push(message);
      } else {
        this.groupedMessages.push([message]);
      }
    }
  }

}
