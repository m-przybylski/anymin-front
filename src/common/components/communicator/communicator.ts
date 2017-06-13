import * as angular from 'angular'
import 'angular-translate'
import 'angular-sanitize'
import {CommunicatorComponent} from './communicator.component'
import {CommunicatorService} from './communicator.service'
import callbacksModule from '../../services/callbacks/callbacks'
import apiModule from 'profitelo-api-ng/api.module'
import userModule from '../../services/user/user'
import urlModule from '../../services/url/url'
import soundsModule from '../../services/sounds/sounds'
import modalsModule from '../../services/modals/modals'
import timerModule from '../../services/timer/timer'
import filtersModule from '../../filters/filters'
import './navigation/navigation'
import './messenger/messenger'
import ratelSdkModule from '../ratel-sdk/ratel-sdk'
import eventsModule from '../../services/events/events'
import './communicator.sass'
import {ClientCallService} from './call-services/client-call.service';
import {ExpertCallService} from './call-services/expert-call.service';
import userAvatarModule from '../interface/user-avatar/user-avatar';

const communicatorModule = angular.module('profitelo.components.communicator', [
  'pascalprecht.translate',
  urlModule,
  userModule,
  apiModule,
  apiModule,
  timerModule,
  userModule,
  callbacksModule,
  modalsModule,
  eventsModule,
  soundsModule,
  userAvatarModule,
  'ngSanitize',
  'commonConfig',
  callbacksModule,
  filtersModule,
  ratelSdkModule,
  'profitelo.components.communicator.navigation',
  'profitelo.components.communicator.messenger'
])
  .config(($qProvider: ng.IQProvider) => {
    $qProvider.errorOnUnhandledRejections(false)
  })
  .component('communicator', new CommunicatorComponent)
  .service('communicatorService', CommunicatorService)
  .service('clientCallService', ClientCallService)
  .service('expertCallService', ExpertCallService)
  .name

export default communicatorModule;
