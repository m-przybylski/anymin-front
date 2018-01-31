import * as angular from 'angular';
import { TopWaitingLoaderService } from './top-waiting-loader.service';

const topWaitingLoader = angular.module('profitelo.services.pro-top-waiting-loader-service', [
  'pascalprecht.translate'
])
  .service('topWaitingLoaderService', TopWaitingLoaderService)
  .name;

export default topWaitingLoader;
