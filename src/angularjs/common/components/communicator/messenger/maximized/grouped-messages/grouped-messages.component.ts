import { GroupedMessagesComponentController } from './grouped-messages.controller';

// tslint:disable:member-ordering
export class GroupedMessagesComponent {
  public template = require('./grouped-messages.html');
  public controller: ng.Injectable<ng.IControllerConstructor> = GroupedMessagesComponentController;
  public bindings: {[boundProperty: string]: string} = {
    messages: '<',
    participantAvatar: '@'
  };
}
