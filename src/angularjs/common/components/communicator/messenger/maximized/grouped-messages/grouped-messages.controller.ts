import { IGroupedMessagesComponentBindings } from './grouped-messages';
import { Message } from 'ratel-sdk-js';
import { CommunicatorService } from '@anymind-ng/core';

export class GroupedMessagesComponentController implements ng.IController, IGroupedMessagesComponentBindings {

  public static $inject = ['communicatorService'];
  public messages: Message[] = [];
  public participantAvatar = '';
  public isMine = false;

  constructor(private communicatorService: CommunicatorService) {
  }

  public $onChanges = (): void => {
    if (this.messages) {
      const message = this.messages[0];
      const clientSession = this.communicatorService.getSession();
      this.isMine = typeof clientSession !== 'undefined' && clientSession.id === message.userId;
    }
  }

}
