import * as angular from 'angular'
import './chat-history.sass'
import {ChatHistoryComponent} from './chat-history.component'
import groupedMessagesModule from '../communicator/messenger/maximized/grouped-messages/grouped-messages'

export interface IChatHistoryBindings {
  roomId?: string
}

const chatHistoryModule = angular.module('profitelo.components.chat-history', [
  'pascalprecht.translate',
  groupedMessagesModule
])
.component('chatHistory', new ChatHistoryComponent())
  .name

export default chatHistoryModule;
