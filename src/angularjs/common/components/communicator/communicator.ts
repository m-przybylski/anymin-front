import { downgradeInjectable } from '@angular/upgrade/static';
import * as angular from 'angular';
import 'angular-translate';
import 'angular-sanitize';
import { CommunicatorComponent } from './communicator.component';
import apiModule from 'profitelo-api-ng/api.module';
import userModule from '../../services/user/user';
import urlModule from '../../services/url/url';
import soundsModule from '../../services/sounds/sounds';
import modalsModule from '../../services/modals/modals';
import timerModule from '../../services/timer/timer';
import filtersModule from '../../filters/filters';
import './navigation/navigation';
import './messenger/messenger';
import ratelSdkModule from '../ratel-sdk/ratel-sdk';
import eventsModule from '../../services/events/events';
import { ExpertCallService } from './call-services/expert-call.service';
import userAvatarModule from '../interface/user-avatar/user-avatar';
import navigationModule from './navigation/navigation';
import RtcDetectorModule from '../../services/rtc-detector/rtc-detector';
import translatorModule from '../../services/translator/translator';
import { MicrophoneService } from './microphone-service/microphone.service';
import { CommunicatorService } from '@anymind-ng/core';

const communicatorModule = angular.module('profitelo.components.communicator', [
  'pascalprecht.translate',
  urlModule,
  userModule,
  apiModule,
  apiModule,
  timerModule,
  userModule,
  modalsModule,
  eventsModule,
  soundsModule,
  userAvatarModule,
  navigationModule,
  'ngSanitize',
  filtersModule,
  ratelSdkModule,
  translatorModule,
  RtcDetectorModule,
  'profitelo.components.communicator.navigation',
  'profitelo.components.communicator.messenger'
])
  .config(['$qProvider', ($qProvider: ng.IQProvider): void => {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .component('communicator', new CommunicatorComponent)
  .factory('communicatorService', downgradeInjectable(CommunicatorService))
  .service('expertCallService', ExpertCallService)
  .service('microphoneService', MicrophoneService)
  .name;

export default communicatorModule;
