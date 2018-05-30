import { ErrorHandler } from '@angular/core';
import * as Raven from 'raven-js';
import { Config } from '../../../../config';
import { CommonConfig } from '../../../../common-config';

export class RavenErrorHandler implements ErrorHandler {

  constructor() {
    Raven
      .config(Config.sentry.url, Config.sentry.options)
      .install();
  }

  public handleError(err: any): void {
    if (RavenErrorHandler.isSentryEnabled()) {
      Raven.captureException(<any>RavenErrorHandler.serializeError(err));
    }
    // tslint:disable-next-line:no-console
    console.error(err);
  }

  private static serializeError = (err?: any): string => {
    if (typeof err === 'string') {
      return err;
    } else {
      try {
        return JSON.stringify(err);
      } catch (ex) {
        return `Was not able to stringify error: ${err}, exception: ${ex}`;
      }
    }
  }

  private static isSentryEnabled = (): boolean =>
    Config.sentry.enabledEnvironments.includes(CommonConfig.getCommonConfig().environment)

}
