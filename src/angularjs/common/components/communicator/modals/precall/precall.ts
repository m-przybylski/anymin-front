import * as angular from 'angular';
import { PrecallModalController } from './precall.controller';
import apiModule from 'profitelo-api-ng/api.module';
import inputModule from '../../../interface/input/input';
import commonSettingsModule from '../../../../services/common-settings/common-settings';
import filtersModule from '../../../../filters/filters';
import voiceVolumeBarModule from '../../../interface/voice-volume-bar/voice-volume-bar';
import ValidationAlertModule from '../../../interface/alert/validation-alert/validation-alert';

const precallModalModule = angular.module('profitelo.components.communicator.modals.precall.precall', [
  'ui.bootstrap',
  'profitelo.components.interface.preloader',
  'profitelo.components.interface.dropdown-primary',
  apiModule,
  inputModule,
  commonSettingsModule,
  filtersModule,
  voiceVolumeBarModule,
  ValidationAlertModule
])
.controller('precallModalController', PrecallModalController)
  .name;

export default precallModalModule;
