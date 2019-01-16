import { Action } from '@ngrx/store';
import { GetSessionWithAccount } from '@anymind-ng/api';

export enum RegisterApiActionsTypes {
  RegisterError = '[API register] RegisterError',
  RegisterSuccess = '[API register] RegisterSuccess',
}

export class RegisterErrorAction implements Action {
  public readonly type = RegisterApiActionsTypes.RegisterError;

  constructor(public payload: any) {}
}

export class RegisterSuccessAction implements Action {
  public readonly type = RegisterApiActionsTypes.RegisterSuccess;

  constructor(public payload: GetSessionWithAccount) {}
}

export type RegisterAPIActionsUnion = RegisterErrorAction | RegisterSuccessAction;
