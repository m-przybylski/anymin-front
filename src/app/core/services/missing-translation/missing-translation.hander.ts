import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

export class PlatMissingTranslationHandler implements MissingTranslationHandler {
  public handle(params: MissingTranslationHandlerParams): string {
    if (params.interpolateParams && params.interpolateParams.hasOwnProperty('missing')) {
      // tslint:disable-next-line:no-any
      return (params.interpolateParams as any).missing;
    }

    return params.key;
  }
}
