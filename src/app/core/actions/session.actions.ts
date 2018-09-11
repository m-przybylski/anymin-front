import { Action } from '@ngrx/store';
import { GetSessionWithAccount } from '@anymind-ng/api';

export enum SessionActionTypes {
  FetchSessionFromServer = '[session] Fetch',
  FetchSessionFromServerError = '[session] Fetch error',
  FetchSessionFromServerSuccess = '[session] Fetch success',
}

export class FetchSessionAction implements Action {
  public readonly type = SessionActionTypes.FetchSessionFromServer;
}
export class FetchSessionErrorAction implements Action {
  public readonly type = SessionActionTypes.FetchSessionFromServerError;

  // tslint:disable-next-line:no-any
  constructor(public payload: any) {}
}
export class FetchSessionSuccessAction implements Action {
  public readonly type = SessionActionTypes.FetchSessionFromServerSuccess;

  constructor(public payload: GetSessionWithAccount) {}
}

export type FetchActionsUnion = FetchSessionAction | FetchSessionErrorAction | FetchSessionSuccessAction;
