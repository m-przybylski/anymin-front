// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { ICompanyConsultationDetails, ICompanyEmployeeRowComponent } from '../services/company-consultation.service';

export enum CompanyConsultationApiActionTypes {
  LoadSuccess = '[Comp consult API] Load consultation success',
  LoadFailure = '[Comp consult API] Load consultation failure',
  LoadInvitesSuccess = '[Comp consult API] Load invites success',
  LoadInvitesFailure = '[Comp consult API] Load invites failure',
  DeleteEmploymentSuccess = '[Comp consult API] Delete employment success',
  DeleteEmploymentFailure = '[Comp consult API] Delete employment failure',
  DeleteInviteSuccess = '[Comp consult API] Delete invite success',
  DeleteInviteFailure = '[Comp consult API] Delete invite failure',
}

export class LoadConsultationSuccessAction implements Action {
  public readonly type = CompanyConsultationApiActionTypes.LoadSuccess;

  constructor(public payload: ICompanyConsultationDetails) {}
}

export class LoadConsultationFailureAction implements Action {
  public readonly type = CompanyConsultationApiActionTypes.LoadFailure;

  constructor(public payload: any) {}
}

export class LoadInvitesSuccessAction implements Action {
  public readonly type = CompanyConsultationApiActionTypes.LoadInvitesSuccess;

  constructor(public payload: ReadonlyArray<ICompanyEmployeeRowComponent>) {}
}

export class LoadInvitesFailureAction implements Action {
  public readonly type = CompanyConsultationApiActionTypes.LoadInvitesFailure;

  constructor(public payload: any) {}
}

export class DeleteEmploymentSuccessAction implements Action {
  public readonly type = CompanyConsultationApiActionTypes.DeleteEmploymentSuccess;

  constructor(public payload: string) {}
}

export class DeleteEmploymentFailureAction implements Action {
  public readonly type = CompanyConsultationApiActionTypes.DeleteEmploymentFailure;

  constructor(public payload: any) {}
}

export class DeleteInviteSuccessAction implements Action {
  public readonly type = CompanyConsultationApiActionTypes.DeleteInviteSuccess;

  constructor(public payload: string) {}
}

export class DeleteInviteFailureAction implements Action {
  public readonly type = CompanyConsultationApiActionTypes.DeleteInviteFailure;

  constructor(public payload: any) {}
}

export type CompanyConsultationApiActionsUnion =
  | LoadConsultationSuccessAction
  | LoadConsultationFailureAction
  | LoadInvitesSuccessAction
  | LoadInvitesFailureAction
  | DeleteEmploymentSuccessAction
  | DeleteEmploymentFailureAction;
