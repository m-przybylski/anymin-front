import { Injectable } from '@angular/core';
import { TimerService } from '../services/timer.service';
import { LoggerFactory } from './logger.factory';

@Injectable({ providedIn: 'root' })
export class TimerFactory {
  constructor(private loggerFactory: LoggerFactory) {}

  public createTimerService(): TimerService {
    return new TimerService(this.loggerFactory);
  }
}
