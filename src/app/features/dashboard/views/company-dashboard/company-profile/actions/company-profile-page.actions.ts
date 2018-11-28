// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

export enum CompanyProfilePageActionTypes {
  LeaveConsultation = '[Comp profile page] Leave consultation',
  RemoveExpertFromConsultation = '[Comp profile page] Remove expert from consultation',
}

export class LeaveConsultationAction implements Action {
  public readonly type = CompanyProfilePageActionTypes.LeaveConsultation;
  constructor(public payload: string) {}
}

export class RemoveExpertFromConsultationAction implements Action {
  public readonly type = CompanyProfilePageActionTypes.RemoveExpertFromConsultation;
  constructor(public payload: string) {}
}

export type CompanyProfilePageActionsUnion = LeaveConsultationAction | RemoveExpertFromConsultationAction;
