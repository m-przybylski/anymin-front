import * as angular from 'angular';
import { downgradeInjectable } from '@angular/upgrade/static';
import { LoggerService } from '@anymind-ng/core';

const loggerModule = angular.module('profitelo.services.logger', [
])
  .service('logger', downgradeInjectable(LoggerService))
  .name;

export default loggerModule;
