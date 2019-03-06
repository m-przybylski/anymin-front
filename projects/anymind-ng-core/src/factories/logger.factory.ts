import { Inject, Injectable } from '@angular/core';
import { LogLevel } from '../enums/log-level.enum';
import { LoggerService } from '../services/logger.service';
import { LOG_LEVEL } from '../shared/injection-tokens/injection-tokens';

@Injectable({ providedIn: 'root' })
export class LoggerFactory {
  constructor(@Inject(LOG_LEVEL) private logLevel: LogLevel) {}

  public createLoggerService(logPrefix?: string): LoggerService {
    return new LoggerService(this.logLevel, logPrefix);
  }
}
