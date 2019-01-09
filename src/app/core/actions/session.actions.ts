// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

export enum SessionActionTypes {
  FetchSessionFromServer = '[UI session] Fetch',
  FetchSessionFromServerError = '[API session] Fetch error',
  FetchSessionFromServerSuccess = '[API session] Fetch success',
}
export class FetchSessionAction implements Action {
  public readonly type = SessionActionTypes.FetchSessionFromServer;
}

export type FetchActionsUnion = FetchSessionAction;
