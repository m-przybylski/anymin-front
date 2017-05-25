import * as angular from 'angular'
import {MoneyDto} from 'profitelo-api-ng/model/models'
import {MessengerMaximizedComponent} from './maximized.component'
import urlModule from '../../../../services/url/url'
import uploaderModule from '../../../../services/uploader/uploader'
import filtersModule from '../../../../filters/filters'
import './grouped-messages/grouped-messages'
import './maximized.sass'
import messengerInputModule from './messenger-input/messenger-input'

export interface IMessengerMaximizedComponentBindings {
  callCost: MoneyDto
  isMessenger: boolean
  minimizeMessenger: () => void
  callLength: number
}

const messengerMaximizedModule = angular.module('profitelo.components.communicator.messenger.maximized', [
  urlModule,
  uploaderModule,

  filtersModule,
  'profitelo.components.communicator.messenger.maximized.grouped-messages',
  messengerInputModule
])
  .component('messengerMaximized', new MessengerMaximizedComponent)
  .name

export default messengerMaximizedModule;
