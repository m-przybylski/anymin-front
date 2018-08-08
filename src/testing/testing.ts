import { Provider } from '@angular/core';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Deceiver } from 'deceiver-core';

// tslint:disable:only-arrow-functions
export const provideMockFactoryLogger = (loggerService?: LoggerService): Provider => ({
  provide: LoggerFactory,
  useValue: Deceiver(LoggerFactory, {
    createLoggerService: jasmine
      .createSpy('')
      .and.returnValue(typeof loggerService === 'undefined' ? Deceiver(LoggerService) : loggerService),
  }),
});
