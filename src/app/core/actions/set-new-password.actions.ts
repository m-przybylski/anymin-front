import { Action } from '@ngrx/store';
import { GetSessionWithAccount, PostRecoverPassword } from '@anymind-ng/api';

export interface ISetNewPasswordActionsPayload {
  session: GetSessionWithAccount;
  appType?: PostRecoverPassword.ClientAppTypeEnum;
}

export enum SetNewPasswordActionsTypes {
  SetNewPasswordSuccess = '[setNewPassword] SetNewPasswordSuccess',
  SetNewPasswordRedirectDashboard = '[setNewPassword] SetNewPasswordRedirectDashboard',
}

export class SetNewPasswordSuccessAction implements Action {
  public readonly type = SetNewPasswordActionsTypes.SetNewPasswordSuccess;

  constructor(public payload: ISetNewPasswordActionsPayload) {}
}

export class SetNewPasswordRedirectDashboardAction implements Action {
  public readonly type = SetNewPasswordActionsTypes.SetNewPasswordRedirectDashboard;

  constructor(public payload: ISetNewPasswordActionsPayload) {}
}

export type SetNewPasswordActionsUnion = SetNewPasswordSuccessAction | SetNewPasswordRedirectDashboardAction;
