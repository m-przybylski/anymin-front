import * as angular from 'angular';
import { ChatHistoryComponent } from './chat-history.component';
import communicatorModule from '../../services/communicator/communicator.service';
import groupedMessagesModule from '../grouped-message/grouped-messages';

export interface IChatHistoryBindings {
  roomId?: string;
}

const chatHistoryModule = angular
  .module('profitelo.components.chat-history', ['pascalprecht.translate', communicatorModule, groupedMessagesModule])
  .component('chatHistory', new ChatHistoryComponent()).name;

export default chatHistoryModule;
