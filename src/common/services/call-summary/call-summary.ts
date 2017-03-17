import * as angular from 'angular'
import {CallSummaryService} from './call-summary.service'
import callbacksModule from '../callbacks/callbacks'
import profiteloWebsocketModule from '../profitelo-websocket/profitelo.websocket'

const callSummaryModule = angular.module('profitelo.services.call-summary', [
  callbacksModule,
  profiteloWebsocketModule,

])
  .service('callSummaryService', CallSummaryService)
  .name

export default callSummaryModule;
