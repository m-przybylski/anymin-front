import * as angular from 'angular'
import {IGroupedMessagesComponentBindings} from './grouped-messages';

export class GroupedMessagesComponentController implements ng.IController, IGroupedMessagesComponentBindings {

  public messages: Array<any> = []
  public participantAvatar: string = ''
  public isMine: boolean = false

  /* @ngInject */
  constructor() {
  }

  $onInit = (): void => {
    const message = this.messages[0]
    this.isMine = (angular.isDefined(message) && angular.isDefined(message.isMine) && message.isMine)
  }
}
