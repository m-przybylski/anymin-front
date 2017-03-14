import * as angular from "angular"
import "angular-translate"
import "angular-sanitize"
import {CommunicatorComponent} from "./communicator.component"
import {CommunicatorService} from "./communicator.service"
import callbacksModule from "../../services/callbacks/callbacks"
import apiModule from "../../api/api.module"
import userModule from "../../services/user/user"
import urlModule from "../../services/url/url"
import soundsModule from "../../services/sounds/sounds"
import modalsModule from "../../services/modals/modals"
import timerModule from "../../services/timer/timer"
import navigatorModule from "../../services/navigator/navigator"
import filtersModule from "../../filters/filters"
import "./navigation/navigation"
import "./messenger/messenger"
import ratelSdkModule from "../ratel-sdk/ratel-sdk"
import {CallService} from "./call.service"

const communicatorModule = angular.module('profitelo.components.communicator', [
  'pascalprecht.translate',
  urlModule,
  userModule,
  apiModule,
  navigatorModule,
  apiModule,
  timerModule,
  userModule,
  callbacksModule,
  modalsModule,
  soundsModule,
  'ngSanitize',
  'commonConfig',
  'ngLodash',
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
  .service('callService', CallService)
  .name

export default communicatorModule;
