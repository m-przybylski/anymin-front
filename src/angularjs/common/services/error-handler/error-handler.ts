import * as angular from 'angular';
import { ErrorHandlerService } from './error-handler.service';
import topAlertModule from '../top-alert/top-alert';
import translatorModule from '../translator/translator';

const errorHandlerModule = angular.module('profitelo.services.error-handler', [
  topAlertModule,
  translatorModule
])
.service('errorHandler', ErrorHandlerService)
  .name;

export default errorHandlerModule;
