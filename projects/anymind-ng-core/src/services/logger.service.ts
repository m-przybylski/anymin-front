// tslint:disable:readonly-array
import { Inject, Injectable, Optional } from '@angular/core';
import { LogLevel } from '../enums/log-level.enum';
import { LOG_LEVEL, LOG_PREFIX } from '../shared/injection-tokens/injection-tokens';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  private logger = console;
  constructor(
    @Inject(LOG_LEVEL) private logLevel: LogLevel,
    @Inject(LOG_PREFIX) @Optional() private logPrefix?: string,
  ) {}

  public log(msg: any, ...args: any[]): void {
    this.print(this.logger.log.bind(this), msg, args);
  }

  public trace(msg: any, ...args: any[]): void {
    this.print(this.logger.trace.bind(this), msg, args);
  }

  public debug(msg: any, ...args: any[]): void {
    if (this.logLevel <= LogLevel.DEBUG) {
      this.print(this.logger.debug.bind(this), msg, args);
    }
  }
  public info(msg: any, ...args: any[]): void {
    if (this.logLevel <= LogLevel.INFO) {
      this.print(this.logger.info.bind(this), msg, args);
    }
  }
  public warn(msg: any, ...args: any[]): void {
    if (this.logLevel <= LogLevel.WARN) {
      this.print(this.logger.warn.bind(this), msg, args);
    }
  }

  public error(msg: any, ...args: any[]): void {
    if (this.logLevel <= LogLevel.ERROR) {
      this.print(this.logger.error.bind(this), msg, args);
    }
  }

  private print(fn: (msg: any, ...args: any[]) => void, msg: any, args: any[]): void {
    const formattedMsg = this.logPrefix ? `${this.logPrefix}: ${msg}` : msg;
    fn(formattedMsg, ...args);
  }
}
