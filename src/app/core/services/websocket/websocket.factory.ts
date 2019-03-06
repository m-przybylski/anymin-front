import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service.rxjs';
import { LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';

@Injectable()
export class WebSocketServiceFactory<T> extends Logger {
  constructor(loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('WebSocketService'));
  }

  public create(endpointUrl: string): WebSocketService<T> {
    return new WebSocketService(this.loggerService, endpointUrl);
  }
}
