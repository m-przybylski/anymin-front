// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

export enum SessionActionTypes {
  FetchSessionFromServer = '[UI session] Fetch',
  FetchSessionFromServerForProfileCreation = '[UI Menu] Profile Creation Fetch',
}

export class FetchSessionAction implements Action {
  public readonly type = SessionActionTypes.FetchSessionFromServer;
}

export class FetchSessionForProfileCreationAction implements Action {
  public readonly type = SessionActionTypes.FetchSessionFromServerForProfileCreation;
}

export type FetchActionsUnion = FetchSessionAction | FetchSessionForProfileCreationAction;
