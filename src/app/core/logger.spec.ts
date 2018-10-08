// tslint:disable:max-classes-per-file
import { Logger } from '@platform/core/logger';
import { LoggerFactory } from '@anymind-ng/core';
import { Deceiver } from 'deceiver-core';

describe('Logger', () => {
  const loggerFactory = Deceiver(LoggerFactory, { createLoggerService: jasmine.createSpy('createLoggerService') });

  it('should create logger with specific name', () => {
    class SomeName extends Logger {
      constructor(loggerFactoryInstance: any) {
        super(loggerFactoryInstance);
      }
    }
    const a = new SomeName(loggerFactory);
    expect(a).toBeTruthy();
    expect(loggerFactory.createLoggerService).toHaveBeenCalledWith('SomeName');
  });
  it('should act correctly in prototype chain', () => {
    class A extends Logger {
      constructor(loggerFactoryInstance: any) {
        super(loggerFactoryInstance);
      }
    }

    class B extends A {}

    const a = new B(loggerFactory);
    expect(a).toBeTruthy();
    expect(loggerFactory.createLoggerService).toHaveBeenCalledWith('B');
  });
});
