import { APP_INITIALIZER, Provider } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from '@anymind-ng/core';

// tslint:disable-next-line:only-arrow-functions
function appInitializerFactory(translate: TranslateService, loggerService: LoggerService): () => Promise<void> {
  return (): Promise<void> =>
    new Promise<void>(
      (resolve): void => {
        const langToSet = 'pl-pl';
        translate.use(langToSet).subscribe(
          () => {
            loggerService.debug(`Successfully initialized '${langToSet}' language.'`);
          },
          err => {
            loggerService.error(`Problem with '${langToSet}' language initialization.'`, err);
          },
          () => {
            resolve();
          },
        );
      },
    );
}

// tslint:disable-next-line:only-arrow-functions
export function provideTranslations(): Provider {
  return {
    provide: APP_INITIALIZER,
    useFactory: appInitializerFactory,
    deps: [TranslateService, LoggerService],
    multi: true,
  };
}
