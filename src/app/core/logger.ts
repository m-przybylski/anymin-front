import { LoggerFactory, LoggerService } from '@anymind-ng/core';

export class Logger {
  protected loggerService: LoggerService;
  constructor(loggerFactory: LoggerFactory) {
    this.loggerService = loggerFactory.createLoggerService(this.constructor.name);
  }
}
