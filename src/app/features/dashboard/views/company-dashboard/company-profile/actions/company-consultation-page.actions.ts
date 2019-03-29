// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { GetSessionWithAccount } from '@anymind-ng/api';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';

export enum CompanyConsultationPageActionTypes {
  Load = '[Comp consult page] Load consultation',
  LoadInvites = '[Comp consult page] Load pending invites',
  Clear = '[Comp consult page] Clear',
  DeleteEmployment = '[Comp consult page] Delete employment',
  DeleteInvite = '[Comp consult page] Delete invite',
}

export class LoadConsultationsAction implements Action {
  public readonly type = CompanyConsultationPageActionTypes.Load;

  constructor(
    public payload: {
      serviceId: string;
      getSessionWithAccount?: GetSessionWithAccount;
      userType?: UserTypeEnum;
    },
  ) {}
}

export class LoadPendingInvitesAction implements Action {
  public readonly type = CompanyConsultationPageActionTypes.LoadInvites;

  constructor(public payload: string) {}
}

export class ClearAction implements Action {
  public readonly type = CompanyConsultationPageActionTypes.Clear;
}

export class DeleteEmploymentAction implements Action {
  public readonly type = CompanyConsultationPageActionTypes.DeleteEmployment;

  constructor(public payload: string) {}
}

export class DeleteInviteAction implements Action {
  public readonly type = CompanyConsultationPageActionTypes.DeleteInvite;

  constructor(public payload: string) {}
}

export type CompanyConsultationPageActionsUnion =
  | LoadConsultationsAction
  | LoadPendingInvitesAction
  | ClearAction
  | DeleteEmploymentAction
  | DeleteInviteAction;
