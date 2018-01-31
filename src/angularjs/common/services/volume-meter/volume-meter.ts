import * as angular from 'angular';
import { VolumeMeterService } from './volume-meter.service';

const volumeMeterModule = angular.module('profitelo.services.volume-meter', [

])
.service('volumeMeter', VolumeMeterService)
  .name;

export default volumeMeterModule;
