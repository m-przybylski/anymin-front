// tslint:disable:readonly-array
import * as angular from 'angular';
import filtersModule from '../../../../../filters/filters';
import { GroupedMessagesComponent } from './grouped-messages.component';
import { roomEvents } from 'ratel-sdk-js';

export interface IGroupedMessagesComponentBindings {
  messages: roomEvents.CustomMessageSent[];
  participantAvatar: string;
}

const groupedMessagesModule = angular.module('profitelo.components.communicator.messenger.maximized.grouped-messages', [
  filtersModule
])
  .component('groupedMessages', new GroupedMessagesComponent())
  .name;

export default groupedMessagesModule;
