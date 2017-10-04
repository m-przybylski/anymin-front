import * as angular from 'angular'
import {MessengerMaximizedComponent} from './maximized.component'
import urlModule from '../../../../services/url/url'
import uploaderModule from '../../../../services/uploader/uploader'
import filtersModule from '../../../../filters/filters'
import './grouped-messages/grouped-messages'
import './maximized.sass'
import messengerInputModule from './messenger-input/messenger-input'
import userAvatarModule from '../../../interface/user-avatar/user-avatar'

export interface IMessengerMaximizedComponentBindings {
  isMessenger: boolean
  minimizeMessenger: () => void
}

const messengerMaximizedModule = angular.module('profitelo.components.communicator.messenger.maximized', [
  urlModule,
  uploaderModule,
  filtersModule,
  'profitelo.components.communicator.messenger.maximized.grouped-messages',
  messengerInputModule,
  userAvatarModule
])
  .component('messengerMaximized', new MessengerMaximizedComponent)
  .name

export default messengerMaximizedModule;
