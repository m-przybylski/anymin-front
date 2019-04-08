import { Action } from '@ngrx/store';
import { GetSessionWithAccount, PostAccount } from '@anymind-ng/api';

export enum RegisterActionsTypes {
  Register = '[register] Register',
  RegisterByModal = '[register] Register by modal',
  RedirectToDashboardInvitations = '[register] Redirect to invitation list',
  RedirectToDashboardActivities = '[register] Register to activities',
}

export class RegisterAction implements Action {
  public readonly type = RegisterActionsTypes.Register;

  constructor(public payload: PostAccount) {}
}
export class RegisterByModalAction implements Action {
  public readonly type = RegisterActionsTypes.RegisterByModal;

  constructor(public payload: PostAccount) {}
}
export class RegisterRedirectToDashboardsInvitationsAction implements Action {
  public readonly type = RegisterActionsTypes.RedirectToDashboardInvitations;

  constructor(public payload: GetSessionWithAccount) {}
}

export class RegisterRedirectToDashboardsActivitiesAction implements Action {
  public readonly type = RegisterActionsTypes.RedirectToDashboardActivities;
}

export type RegisterActionsUnion =
  | RegisterAction
  | RegisterByModalAction
  | RegisterRedirectToDashboardsInvitationsAction
  | RegisterRedirectToDashboardsActivitiesAction;
