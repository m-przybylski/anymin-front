import * as angular from 'angular'
import urlModule from '../../../services/url/url'
import {VoiceVolumeBarComponent} from './voice-volume-bar.component'
import volumeMeterModule from '../../../services/volume-meter/volume-meter'
import './voice-volume-bar.sass'

export interface IVoiceVolumeBarComponentBindings extends ng.IController {
  stream?: MediaStream
}

const voiceVolumeBarModule = angular.module('profitelo.components.interface.voice-volume-bar', [
  urlModule,
  volumeMeterModule
])
.component('voiceVolumeBar', new VoiceVolumeBarComponent())
  .name

export default voiceVolumeBarModule
