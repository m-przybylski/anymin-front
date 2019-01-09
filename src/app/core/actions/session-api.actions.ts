// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { Account, GetSessionWithAccount } from '@anymind-ng/api';

export enum SessionWithAccountApiActionTypes {
  UpdateAccount = '[API Session with Account] update Account',
  FetchSessionError = '[API session] Fetch error',
  FetchSessionSuccess = '[API session] Fetch success',
  VerifyAccountByEmail = '[API session] Verify Account by Email',
  VerifyAccountByPin = '[API session] Verify Account By PIN',
}

export class UpdateAccountInSession implements Action {
  public readonly type = SessionWithAccountApiActionTypes.UpdateAccount;

  constructor(public payload: Account) {}
}

export class FetchSessionErrorAction implements Action {
  public readonly type = SessionWithAccountApiActionTypes.FetchSessionError;

  // tslint:disable-next-line:no-any
  constructor(public payload: any) {}
}
export class FetchSessionSuccessAction implements Action {
  public readonly type = SessionWithAccountApiActionTypes.FetchSessionSuccess;

  constructor(public payload: GetSessionWithAccount) {}
}

export class VerifyAccountByEmailAction implements Action {
  public readonly type = SessionWithAccountApiActionTypes.VerifyAccountByEmail;

  constructor(public payload: GetSessionWithAccount) {}
}

export class VerifyAccountByPinAction implements Action {
  public readonly type = SessionWithAccountApiActionTypes.VerifyAccountByPin;

  constructor(public payload: GetSessionWithAccount) {}
}

export type SessionAPIActionUnion =
  | UpdateAccountInSession
  | FetchSessionErrorAction
  | FetchSessionSuccessAction
  | VerifyAccountByPinAction
  | VerifyAccountByEmailAction;
