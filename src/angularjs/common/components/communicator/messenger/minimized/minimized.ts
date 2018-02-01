import * as angular from 'angular';
import { MessengerMinimizedComponent } from './minimized.component';
import { Message } from 'ratel-sdk-js';

export interface IMessengerMinimizedComponentBindings {
  onMessageClick(msg: Message): void;
}

const messengerMinimizedModule = angular.module('profitelo.components.communicator.messenger.minimized', [])
  .component('messengerMinimized', new MessengerMinimizedComponent)
  .name;

export default messengerMinimizedModule;
