import * as angular from 'angular'
import {MoneyDto} from 'profitelo-api-ng/model/models'
import {MessengerMaximizedComponent} from './maximized.component'
import urlModule from '../../../../services/url/url'
import uploaderModule from '../../../../services/uploader/uploader'
import filtersModule from '../../../../filters/filters'
import './grouped-messages/grouped-messages'
import './messenger-input/messenger-input'
import './maximized.sass'

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
  'profitelo.components.communicator.messenger.maximized.messenger-input'
])
  .component('messengerMaximized', new MessengerMaximizedComponent)
  .name

export default messengerMaximizedModule;
