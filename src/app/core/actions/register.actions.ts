import { Action } from '@ngrx/store';
import { GetSessionWithAccount, PostAccount } from '@anymind-ng/api';

export enum RegisterActionsTypes {
  Register = '[register] Register',
  RedirectToDashboard = '[register] RedirectToDashboard',
}

export class RegisterAction implements Action {
  public readonly type = RegisterActionsTypes.Register;

  constructor(public payload: PostAccount) {}
}
export class RegisterRedirectToDashboardsAction implements Action {
  public readonly type = RegisterActionsTypes.RedirectToDashboard;

  constructor(public payload: GetSessionWithAccount) {}
}

export type RegisterActionsUnion = RegisterAction | RegisterRedirectToDashboardsAction;
