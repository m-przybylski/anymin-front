import * as angular from 'angular'
import {RtcDetectorBlockedModalController} from './rtc-detector-blocked.controller'
import './rtc-detector-blocked.sass'

const rtcDetectorBlockedModal = angular.module('profitelo.components.communicator.modals.rtc-detector-blocked', [
  'ui.bootstrap'
])
  .controller('rtcDetectorBlockedModal', RtcDetectorBlockedModalController)
    .name

export default rtcDetectorBlockedModal
