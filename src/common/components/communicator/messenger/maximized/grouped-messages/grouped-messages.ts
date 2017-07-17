import * as angular from 'angular'
import filtersModule from '../../../../../filters/filters'
import './grouped-messages.sass'
import {GroupedMessagesComponent} from './grouped-messages.component';

export interface IGroupedMessagesComponentBindings {
  messages: Array<any>
  participantAvatar: string
}

const groupedMessagesModule = angular.module('profitelo.components.communicator.messenger.maximized.grouped-messages', [
  filtersModule
])
  .component('groupedMessages', new GroupedMessagesComponent())
  .name

export default groupedMessagesModule
