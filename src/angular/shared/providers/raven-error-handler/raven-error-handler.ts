import { ErrorHandler } from '@angular/core';
import * as Raven from 'raven-js';
import { environment } from '../../../../environments/environment';
import { Config } from '../../../../config';
import { CommonConfig } from '../../../../../generated_modules/common-config/common-config';
import { VERSION } from '../../../../../generated_modules/version';

export class RavenErrorHandler implements ErrorHandler {

  constructor() {
    Raven
      .config(Config.sentryUrl,
        { release: VERSION.hash, environment: CommonConfig.settings.environment, extra: VERSION.version })
      .install();
  }

  public handleError(err: any): void {
    if (environment.production) {
      Raven.captureException(err);
    }
  }

}
