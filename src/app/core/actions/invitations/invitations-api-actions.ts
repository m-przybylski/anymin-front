// tslint:disable:max-classes-per-file

import { Action } from '@ngrx/store';

export enum InvitationsApiActionTypes {
  FetchApiInvitationsSucces = '[API Navbar] Fetch invitations SUCCESS',
  FetchApiInvitationsError = '[API Navbar] Fetch invitations ERROR',
  DecrementInvitationsCounter = '[API Navbar] Decrement invitations counter',
}

export class FetchApiInvitationsSuccessAction implements Action {
  public readonly type = InvitationsApiActionTypes.FetchApiInvitationsSucces;

  constructor(public payload: number) {}
}

export class FetchApiInvitationsErrorAction implements Action {
  public readonly type = InvitationsApiActionTypes.FetchApiInvitationsError;
}

export class DecrementApiInvitationsCounterAction implements Action {
  public readonly type = InvitationsApiActionTypes.DecrementInvitationsCounter;
}

export type InvitationsApiActionsUnion =
  | FetchApiInvitationsSuccessAction
  | FetchApiInvitationsErrorAction
  | DecrementApiInvitationsCounterAction;
