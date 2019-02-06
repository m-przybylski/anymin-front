// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

export enum SessionActionTypes {
  FetchSessionFromServer = '[UI session] Fetch',
}
export class FetchSessionAction implements Action {
  public readonly type = SessionActionTypes.FetchSessionFromServer;
}

export type FetchActionsUnion = FetchSessionAction;
