// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

export enum ExpertDashboardActionTypes {
  Load = '[Expert Dashboard] Load',
  ReloadAfterConsultations = '[Expert Dashboard] Reload after consultations',
  ReloadAfterEditProfile = '[Expert Dashboard] Reload after edit profile',
  ReloadAfterCreateConsultation = '[Expert Dashboard] Reload after create consultation',
}

export class LoadExpertDashboardAction implements Action {
  public readonly type = ExpertDashboardActionTypes.Load;

  constructor(public payload: string) {}
}

export class ReloadExpertDashboardAfterConsultationsAction implements Action {
  public readonly type = ExpertDashboardActionTypes.ReloadAfterConsultations;

  constructor(public payload: string) {}
}

export class ReloadExpertDashboardAfterEditProfileAction implements Action {
  public readonly type = ExpertDashboardActionTypes.ReloadAfterEditProfile;

  constructor(public payload: string) {}
}

export class ReloadExpertDashboardAfterCreateConsultationAction implements Action {
  public readonly type = ExpertDashboardActionTypes.ReloadAfterCreateConsultation;

  constructor(public payload: string) {}
}

export type ExpertDashboardActionUnion =
  | LoadExpertDashboardAction
  | ReloadExpertDashboardAfterConsultationsAction
  | ReloadExpertDashboardAfterEditProfileAction
  | ReloadExpertDashboardAfterCreateConsultationAction;
