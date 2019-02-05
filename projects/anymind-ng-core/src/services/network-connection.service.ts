import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoggerFactory } from '../factories/logger.factory';

@Injectable({ providedIn: 'root' })
export class NetworkConnectionService {
  private changeEvent = new Subject<void>();

  constructor(loggerFactory: LoggerFactory) {
    const logger = loggerFactory.createLoggerService('NetworkConnectionService');
    try {
      const navigator = window.navigator as any;
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      connection.addEventListener('typechange', () => this.changeEvent.next());
    } catch (e) {
      logger.warn('connection typechange is not supported');
    }

    try {
      window.addEventListener('offline', () => this.changeEvent.next());
    } catch (e) {
      logger.warn('window offline is not supported');
    }
  }

  public get change$(): Observable<void> {
    return this.changeEvent.asObservable();
  }
}
