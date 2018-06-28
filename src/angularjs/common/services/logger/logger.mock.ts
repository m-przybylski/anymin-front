// tslint:disable:no-empty
// tslint:disable:no-any
import * as angular from 'angular';
import { LoggerService } from '@anymind-ng/core';

export const loggerServiceMock: LoggerService = <any>{
  debug(): void {},
  info(): void {},
  warn(): void {},
  error(): void {}
};

const loggerMockModule = angular.module('profitelo.services.logger', [
])
  .service('logger', () => loggerServiceMock)
  .name;

export default loggerMockModule;
