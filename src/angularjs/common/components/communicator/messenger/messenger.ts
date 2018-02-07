import * as angular from 'angular';
import 'angular-sanitize';
import soundsModule from '../../../services/sounds/sounds';
import { MessengerComponent } from './messenger.component';
import messengerMinimizedModule from './minimized/minimized';
import messengerMaximizedModule from './maximized/maximized';
import { MessengerService } from './messenger.service';

export interface IMessengerComponentBindings {
  isMessenger: boolean;
}

const messengerModule = angular.module('profitelo.components.communicator.messenger', [
  'ngSanitize',
  soundsModule,
  messengerMaximizedModule,
  messengerMinimizedModule
])
  .config(['$qProvider', ($qProvider: ng.IQProvider): any => {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .component('messenger', new MessengerComponent)
  .service('messengerService', MessengerService)
  .name;

export default messengerModule;
