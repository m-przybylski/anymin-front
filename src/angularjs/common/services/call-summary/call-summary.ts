import * as angular from 'angular';
import { CallSummaryService } from './call-summary.service';
import profiteloWebsocketModule from '../profitelo-websocket/profitelo-websocket';
import apiModule  from 'profitelo-api-ng/api.module';

const callSummaryModule = angular.module('profitelo.services.call-summary', [
  profiteloWebsocketModule,
  apiModule,
])
  .service('callSummaryService', CallSummaryService)
  .name;

export default callSummaryModule;
