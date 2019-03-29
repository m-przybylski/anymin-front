import { Provider, ModuleWithProviders } from '@angular/core';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Deceiver } from 'deceiver-core';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import * as fromCore from '@platform/core/reducers';
import { AuthActions } from '@platform/core/actions';

const mockLoggerService = Deceiver(LoggerService, {
  warn: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  log: jest.fn(),
  trace: jest.fn(),
});

export const provideMockFactoryLogger = (loggerService?: LoggerService): Provider => ({
  provide: LoggerFactory,
  useValue: Deceiver(LoggerFactory, {
    createLoggerService: jest.fn(() => (typeof loggerService === 'undefined' ? mockLoggerService : loggerService)),
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

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer K>
    ? ReadonlyArray<DeepPartial<K>>
    : DeepPartial<T[P]>
};
