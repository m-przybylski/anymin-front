import * as angular from 'angular';
import { RtcDetectorService } from './rtc-detector.service';
import modalsModule from '../modals/modals';
import loggerModule from '../logger/logger';

const RtcDetectorModule = angular.module('profitelo.services.rtc-detector', [
  'ui.bootstrap',
  modalsModule,
  loggerModule
])
.service('rtcDetectorService', RtcDetectorService)
  .name;

export default RtcDetectorModule;
