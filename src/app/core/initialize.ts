import { APP_INITIALIZER, Provider } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from '@anymind-ng/core';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { filter, map, switchMap, take } from 'rxjs/operators';

// tslint:disable-next-line:only-arrow-functions
export function appInitializerFactory(
  translate: TranslateService,
  loggerService: LoggerService,
  store: Store<fromCore.IState>,
): () => Promise<void> {
  return (): Promise<void> =>
    new Promise<void>(
      (resolve): void => {
        translate.addLangs(['en', 'pl']);
        translate.setDefaultLang('pl');
        const browserLang = translate.getBrowserLang();

        store
          .pipe(
            select(fromCore.selectSession),
            filter(session => !session.isPending),
            map(session => session.session),
            switchMap(session => {
              if (session === undefined) {
                return translate.use(browserLang.match(/en|pl/) ? browserLang : 'en');
              } else {
                return translate.use(session.account.language);
              }
            }),
            take(1),
          )
          .subscribe(
            _ => {
              loggerService.debug(`Successfully initialized language.'`);
            },
            err => {
              loggerService.error(`Problem with language initialization.'`, err);
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
    deps: [TranslateService, LoggerService, Store],
    multi: true,
  };
}
