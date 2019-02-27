// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { EmploymentWithService } from '@anymind-ng/api';

export enum ExpertDashboardActionTypes {
  Load = '[Expert Dashboard] Load',
  ReloadAfterEditProfile = '[Expert Dashboard] Reload after edit profile',
  AddConsultation = '[Expert Dashboard] Add consultation',
}

export class LoadExpertDashboardAction implements Action {
  public readonly type = ExpertDashboardActionTypes.Load;

  constructor(public payload: string) {}
}

export class ReloadExpertDashboardAfterEditProfileAction implements Action {
  public readonly type = ExpertDashboardActionTypes.ReloadAfterEditProfile;

  constructor(public payload: string) {}
}

export class AddConsultationAction implements Action {
  public readonly type = ExpertDashboardActionTypes.AddConsultation;
  constructor(public payload: EmploymentWithService) {}
}

export type ExpertDashboardActionUnion =
  | LoadExpertDashboardAction
  | ReloadExpertDashboardAfterEditProfileAction
  | AddConsultationAction;
