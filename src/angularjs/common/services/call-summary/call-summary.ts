import * as angular from 'angular';
import { CallSummaryService } from './call-summary.service';
import profiteloWebsocketModule from '../profitelo-websocket/profitelo-websocket';

const callSummaryModule = angular.module('profitelo.services.call-summary', [
  profiteloWebsocketModule,
])
  .service('callSummaryService', CallSummaryService)
  .name;

export default callSummaryModule;
