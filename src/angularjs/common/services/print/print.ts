import * as angular from 'angular';
import { PrintService } from './print.service';

const printModule = angular.module('profitelo.services.print', [
  'ui.bootstrap'
])
  .service('printService', PrintService)
  .name;

export default printModule;
