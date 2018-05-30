import * as angular from 'angular';
import { CommonSettingsService } from './common-settings.service';

const commonSettingsModule = angular.module('profitelo.services.commonSettings', [
])
  .service('CommonSettingsService', CommonSettingsService)
    .name;

export default commonSettingsModule;
