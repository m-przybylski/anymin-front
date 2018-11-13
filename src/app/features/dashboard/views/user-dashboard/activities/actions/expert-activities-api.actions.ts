// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { IActivitiesData } from '../services/expert-activities.service';
import { GetProfileActivities, GetProfileActivity } from '@anymind-ng/api';

export enum ExpertActivitiesApiActionTypes {
  LoadExpertActivitiesSuccess = '[Activities API] Load Expert Activities Success',
  LoadExpertActivitiesFailure = '[Activities API] Load Expert Activities Failure',
  LoadExpertActivitiesWithImportantSuccess = '[Activities API] Load Expert All Activities Success',
  LoadExpertActivitiesWithImportantFailure = '[Activities API] Load Expert All Activities Failure',
  LoadExpertActivitySuccess = '[Activities API] Load Expert Activity Success',
  LoadExpertActivityFailure = '[Activities API] Load Expert Activity Failure',
}

export class LoadExpertActivitiesWithImportantSuccessAction implements Action {
  public readonly type = ExpertActivitiesApiActionTypes.LoadExpertActivitiesWithImportantSuccess;

  constructor(public payload: IActivitiesData) {}
}

export class LoadExpertActivitiesWithImportantFailureAction implements Action {
  public readonly type = ExpertActivitiesApiActionTypes.LoadExpertActivitiesWithImportantFailure;

  // tslint:disable-next-line:no-any
  constructor(public payload: any) {}
}

export class LoadExpertActivitiesSuccessAction implements Action {
  public readonly type = ExpertActivitiesApiActionTypes.LoadExpertActivitiesSuccess;

  constructor(public payload: GetProfileActivities) {}
}

export class LoadExpertActivitiesFailureAction implements Action {
  public readonly type = ExpertActivitiesApiActionTypes.LoadExpertActivitiesFailure;

  // tslint:disable-next-line:no-any
  constructor(public payload: any) {}
}

export class LoadExpertActivitySuccessAction implements Action {
  public readonly type = ExpertActivitiesApiActionTypes.LoadExpertActivitySuccess;

  constructor(public payload: GetProfileActivity) {}
}

export class LoadExpertActivityFailureAction implements Action {
  public readonly type = ExpertActivitiesApiActionTypes.LoadExpertActivityFailure;

  // tslint:disable-next-line:no-any
  constructor(public payload: any) {}
}
export type ExpertActivitiesApiActionUnion =
  | LoadExpertActivitiesWithImportantSuccessAction
  | LoadExpertActivitiesWithImportantFailureAction
  | LoadExpertActivitiesSuccessAction
  | LoadExpertActivitiesFailureAction
  | LoadExpertActivitySuccessAction
  | LoadExpertActivityFailureAction;
