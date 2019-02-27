// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { GetService } from '@anymind-ng/api';

export enum CompanyProfilePageActionTypes {
  Load = '[Comp profile page] Load Profile',
  LeaveConsultation = '[Comp profile page] Leave consultation',
  RemoveExpertFromConsultation = '[Comp profile page] Remove expert from consultation',
  UpdateProfile = '[Comp profile page] Update profile',
  AddConsultation = '[Comp profile page] Add Consultation',
}

export class LoadProfileAction implements Action {
  public readonly type = CompanyProfilePageActionTypes.Load;
  constructor(public payload: string) {}
}

export class LeaveConsultationAction implements Action {
  public readonly type = CompanyProfilePageActionTypes.LeaveConsultation;
  constructor(public payload: string) {}
}

export class RemoveExpertFromConsultationAction implements Action {
  public readonly type = CompanyProfilePageActionTypes.RemoveExpertFromConsultation;
  constructor(public payload: string) {}
}

export class UpdateProfileAction implements Action {
  public readonly type = CompanyProfilePageActionTypes.UpdateProfile;
  constructor(public payload: string) {}
}

export class AddConsultationAction implements Action {
  public readonly type = CompanyProfilePageActionTypes.AddConsultation;
  constructor(public payload: GetService) {}
}

export type CompanyProfilePageActionsUnion =
  | LoadProfileAction
  | LeaveConsultationAction
  | RemoveExpertFromConsultationAction
  | UpdateProfileAction
  | AddConsultationAction;
