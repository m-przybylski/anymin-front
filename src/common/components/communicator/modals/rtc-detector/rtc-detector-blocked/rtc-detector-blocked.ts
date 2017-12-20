import * as angular from 'angular'
import {RtcDetectorBlockedModalController} from './rtc-detector-blocked.controller'
import './rtc-detector-blocked.sass'
import commonSettingsModule from '../../../../../services/common-settings/common-settings'

const rtcDetectorBlockedModal =
  angular.module('profitelo.components.communicator.modals.rtc-detector.rtc-detector-blocked', [
  'ui.bootstrap',
  commonSettingsModule
])
  .controller('rtcDetectorBlockedModal', RtcDetectorBlockedModalController)
    .name

export default rtcDetectorBlockedModal
