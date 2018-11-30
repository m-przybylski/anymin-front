// tslint:disable:only-arrow-functions
import { UserConfig } from 'machoke-sdk';
import { Environment, EnvironmentService } from '@platform/core/services/environment/environment.service';

export function CommunicatorConfigFactory(): UserConfig {
  const chatUrl = new URL(`${window.location.origin}/artichoke/`);
  const productionLogLevel = 2;

  return {
    /**
     * DEBUG = 0, INFO = 1, WARN = 2, ERROR = 3, NONE = 4
     */
    logLevel: EnvironmentService.get() === Environment.PRODUCTION ? productionLogLevel : 0,
    server: chatUrl.href,
    callstats:
      EnvironmentService.get() === Environment.PRODUCTION
        ? {
            appId: '855932209',
            appSecret: 'pz3m+iOw8/JF:DsraQEDX6LqyBCiOop5+z5jYKn3CDstcV7+9RhCATcU=',
          }
        : undefined,
  };
}
