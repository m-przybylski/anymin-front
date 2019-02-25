// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { IOrganizationProfile } from '../services/company-profile.service';
import { IExpertCompanyDashboardResolverData } from '../../../common/resolver-helpers';

export enum CompanyProfileApiActionTypes {
  LoadProfileActionSuccess = '[Comp profile API] Load profile success',
  LoadProfileActionFailure = '[Comp profile API] Load profile failure',
  DeleteEmploymentSuccess = '[Comp profile API] Delete employment success',
  DeleteEmploymentFailure = '[Comp profile API] Delete employment failure',
}

export class LoadProfileActionSuccess implements Action {
  public readonly type = CompanyProfileApiActionTypes.LoadProfileActionSuccess;

  constructor(public payload: IExpertCompanyDashboardResolverData<IOrganizationProfile>) {}
}

export class LoadProfileActionFailure implements Action {
  public readonly type = CompanyProfileApiActionTypes.LoadProfileActionFailure;

  constructor(public payload: IOrganizationProfile) {}
}

export class DeleteEmploymentSuccessAction implements Action {
  public readonly type = CompanyProfileApiActionTypes.DeleteEmploymentSuccess;
  constructor(public payload: string) {}
}

export class DeleteEmploymentFailureAction implements Action {
  public readonly type = CompanyProfileApiActionTypes.DeleteEmploymentFailure;
  constructor(public payload: any) {}
}

export type CompanyProfileApiActionsUnion =
  | LoadProfileActionSuccess
  | LoadProfileActionFailure
  | DeleteEmploymentSuccessAction
  | DeleteEmploymentFailureAction;
