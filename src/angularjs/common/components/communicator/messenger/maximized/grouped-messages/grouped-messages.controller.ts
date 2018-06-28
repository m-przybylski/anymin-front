// tslint:disable:strict-boolean-expressions
import { IGroupedMessagesComponentBindings } from './grouped-messages';
import { roomEvents } from 'ratel-sdk-js';
import { CommunicatorService } from '@anymind-ng/core';

export class GroupedMessagesComponentController implements ng.IController, IGroupedMessagesComponentBindings {

  public static $inject = ['communicatorService'];
  public messages: roomEvents.CustomMessageSent[] = [];
  public participantAvatar = '';
  public isMine = false;

  constructor(private communicatorService: CommunicatorService) {
  }

  public $onChanges = (): void => {
    if (this.messages) {
      const message = this.messages[0];
      const clientSession = this.communicatorService.getSession();
      this.isMine = typeof clientSession !== 'undefined' && clientSession.id === message.authorId;
    }
  }

}
