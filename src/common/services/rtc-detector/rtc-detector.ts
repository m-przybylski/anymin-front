import * as angular from 'angular'
import {RtcDetectorService} from './rtc-detector.service'
import modalsModule from '../modals/modals'

const RtcDetectorModule = angular.module('profitelo.services.rtc-detector', [
  'ui.bootstrap',
  modalsModule
])
.service('rtcDetectorService', RtcDetectorService)
  .name

export default RtcDetectorModule
