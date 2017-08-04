import * as angular from 'angular'
import {RtcDetectorNoBrowserSupportModalController} from './rtc-detector-no-browser-support.controller'
import './rtc-detector-no-browser-support.sass'

const rtcDetectorNoBrowserSupportModal = angular.module('profitelo.components.communicator.modals.rtc-detector.rtc-detector-no-browser-support', [
  'ui.bootstrap'
])
  .controller('rtcDetectorNoBrowserSupportModal', RtcDetectorNoBrowserSupportModalController)
    .name

export default rtcDetectorNoBrowserSupportModal
