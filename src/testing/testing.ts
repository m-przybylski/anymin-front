import { Provider } from '@angular/core';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Deceiver } from 'deceiver-core';

const mockLoggerService = Deceiver(LoggerService, {
  warn: jasmine.createSpy('warn'),
  debug: jasmine.createSpy('debug'),
  error: jasmine.createSpy('error'),
  info: jasmine.createSpy('info'),
  log: jasmine.createSpy('log'),
  trace: jasmine.createSpy('trace'),
});

// tslint:disable:only-arrow-functions
export const provideMockFactoryLogger = (loggerService?: LoggerService): Provider => ({
  provide: LoggerFactory,
  useValue: Deceiver(LoggerFactory, {
    createLoggerService: jasmine
      .createSpy('')
      .and.returnValue(typeof loggerService === 'undefined' ? mockLoggerService : loggerService),
  }),
});
