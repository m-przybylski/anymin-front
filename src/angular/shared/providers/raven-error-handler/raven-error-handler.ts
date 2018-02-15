import { ErrorHandler } from '@angular/core';
import * as Raven from 'raven-js';
import { Config } from '../../../../config';
import { CommonConfig } from '../../../../../generated_modules/common-config/common-config';

export class RavenErrorHandler implements ErrorHandler {

  constructor() {
    Raven
      .config(Config.sentry.url, Config.sentry.options)
      .install();
  }

  public handleError(err: any): void {
    if (RavenErrorHandler.isSentryEnabled()) {
      Raven.captureException(err);
    }
    // tslint:disable-next-line:no-console
    console.error(err);
  }

  private static isSentryEnabled = (): boolean =>
    Config.sentry.enabledEnvironments.includes(CommonConfig.settings.environment)

}
