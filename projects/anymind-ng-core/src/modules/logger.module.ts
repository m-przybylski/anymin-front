import { NgModule, ModuleWithProviders } from '@angular/core';
import { LogLevel } from '../enums/log-level.enum';
import { LOG_LEVEL, LOG_PREFIX } from '../shared/injection-tokens/injection-tokens';

@NgModule()
export class LoggerModule {
  /**
   * Use in AppModule: new instance of LoggerService.
   */
  public static forRoot(logLevel: () => LogLevel, logPrefix = 'root'): ModuleWithProviders {
    return {
      ngModule: LoggerModule,
      providers: [
        {
          provide: LOG_LEVEL,
          useFactory: logLevel,
        },
        {
          provide: LOG_PREFIX,
          useValue: logPrefix,
        },
      ],
    };
  }
}
