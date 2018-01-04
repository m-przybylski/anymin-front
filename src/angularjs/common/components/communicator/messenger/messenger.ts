import * as angular from 'angular'
import 'angular-sanitize'
import soundsModule from '../../../services/sounds/sounds'
import {MessengerComponent} from './messenger.component'
import messengerMinimizedModule from './minimized/minimized'
import messengerMaximizedModule from './maximized/maximized'

export interface IMessengerComponentBindings {
  isMessenger: boolean
}

const messengerModule = angular.module('profitelo.components.communicator.messenger', [
  'ngSanitize',
  soundsModule,
  messengerMaximizedModule,
  messengerMinimizedModule
])
  .config(['$qProvider', ($qProvider: ng.IQProvider): any => {
    $qProvider.errorOnUnhandledRejections(false)
  }])
  .component('messenger', new MessengerComponent)
  .name

export default messengerModule;
