import {GroupedMessagesComponentController} from './grouped-messages.controller';

export class GroupedMessagesComponent {
  template = require('./grouped-messages.html')
  controller: ng.Injectable<ng.IControllerConstructor> = GroupedMessagesComponentController
  bindings: {[boundProperty: string]: string} = {
    messages: '<',
    participantAvatar: '@'
  }
}
