import * as angular from 'angular';
import { RtcDetectorModalController } from './rtc-detector.controller';

const rtcDetectorModal = angular.module('profitelo.components.communicator.modals.rtc-detector', [
  'ui.bootstrap'
])
  .controller('rtcDetectorModal', RtcDetectorModalController)
    .name;

export default rtcDetectorModal;
