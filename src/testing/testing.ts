import { Provider, ModuleWithProviders } from '@angular/core';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Deceiver } from 'deceiver-core';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import * as fromCore from '@platform/core/reducers';
import { AuthActions } from '@platform/core/actions';

const mockLoggerService = Deceiver(LoggerService, {
  warn: jasmine.createSpy('warn'),
  debug: jasmine.createSpy('debug'),
  error: jasmine.createSpy('error'),
  info: jasmine.createSpy('info'),
  log: jasmine.createSpy('log'),
  trace: jasmine.createSpy('trace'),
});

export const provideMockFactoryLogger = (loggerService?: LoggerService): Provider => ({
  provide: LoggerFactory,
  useValue: Deceiver(LoggerFactory, {
    createLoggerService: jasmine
      .createSpy('')
      .and.returnValue(typeof loggerService === 'undefined' ? mockLoggerService : loggerService),
  }),
});

export const importStore = (): ModuleWithProviders =>
  StoreModule.forRoot({
    ...fromRoot.reducers,
    core: combineReducers(fromCore.reducers),
  });

export const dispatchLoggedUser = (store: Store<any>, loginPayload: any): void => {
  store.dispatch(new AuthActions.LoginSuccessAction(loginPayload));
};
