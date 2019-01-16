import { Action } from '@ngrx/store';

export enum ForgotPasswordApiActionsTypes {
  SetMsisdnToken = '[API forgotPassword] SetMsisdnToken',
  DeleteMsisdnToken = '[API forgotPassword] DeleteMsisdnToken',
}

export class SetMsisdnToken implements Action {
  public readonly type = ForgotPasswordApiActionsTypes.SetMsisdnToken;

  constructor(public payload: string) {}
}

export class UnsetMsisdnTokenAction implements Action {
  public readonly type = ForgotPasswordApiActionsTypes.DeleteMsisdnToken;
}

export type ForgotPasswordApiActionsUnion = SetMsisdnToken | UnsetMsisdnTokenAction;
