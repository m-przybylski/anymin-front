// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { IExpertCompanyDashboardResolverData } from '../../../common/resolver-helpers';
import { IExpertProfile } from '../services/expert-dashboard.service';

export enum ExpertDashboardApiActionTypes {
  LoadSuccess = '[Expert Dashboard] Load Success',
  LoadFailure = '[Expert Dashboard] Load Failure',
}

export class LoadExpertDashboardSuccessAction implements Action {
  public readonly type = ExpertDashboardApiActionTypes.LoadSuccess;

  constructor(public payload: IExpertCompanyDashboardResolverData<IExpertProfile>) {}
}

export class LoadExpertDashboardFailureAction implements Action {
  public readonly type = ExpertDashboardApiActionTypes.LoadFailure;

  constructor(public payload: any) {}
}

export type ExpertDashboardActionUnion = LoadExpertDashboardSuccessAction | LoadExpertDashboardFailureAction;
