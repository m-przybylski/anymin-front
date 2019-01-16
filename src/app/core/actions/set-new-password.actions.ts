import { Action } from '@ngrx/store';
import { GetSessionWithAccount } from '@anymind-ng/api';

export enum SetNewPasswordActionsTypes {
  SetNewPasswordSuccess = '[setNewPassword] SetNewPasswordSuccess',
}

export class SetNewPasswordSuccessAction implements Action {
  public readonly type = SetNewPasswordActionsTypes.SetNewPasswordSuccess;

  constructor(public payload: GetSessionWithAccount) {}
}
