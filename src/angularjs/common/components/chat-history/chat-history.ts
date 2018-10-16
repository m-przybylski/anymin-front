import * as angular from 'angular';
import { ChatHistoryComponent } from './chat-history.component';

export interface IChatHistoryBindings {
  roomId?: string;
}

const chatHistoryModule = angular.module('profitelo.components.chat-history', [
  'pascalprecht.translate'
])
.component('chatHistory', new ChatHistoryComponent())
  .name;

export default chatHistoryModule;
