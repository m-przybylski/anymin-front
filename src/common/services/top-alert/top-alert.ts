import * as angular from 'angular'
import {TopAlertService} from './top-alert.service'

const topAlertModule = angular.module('profitelo.services.top-alert', [
  'ngLodash',
  'pascalprecht.translate'
])
  .service('topAlertService', TopAlertService)
  .name

export default topAlertModule;
