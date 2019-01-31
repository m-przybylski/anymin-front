// tslint:disable:only-arrow-functions
import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { LoggerService, LogLevel } from '@anymind-ng/core';

// tslint:disable-next-line:no-empty-interface
export interface IState {}
export const reducers: ActionReducerMap<IState> = {};

export function logger(reducer: ActionReducer<IState>): ActionReducer<IState> {
  const loggerService = new LoggerService(LogLevel.DEBUG, 'ActionLogger');

  // tslint:disable-next-line:no-any
  return (state: IState, action: any): IState => {
    loggerService.debug('state', state);
    loggerService.debug('action', action);

    return reducer(state, action);
  };
}

// tslint:disable-next-line:readonly-array
export const metaReducers: MetaReducer<IState>[] = !environment.production ? [logger, storeFreeze] : [];
