// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { GetProfileActivities, GetProfileActivity } from '@anymind-ng/api';
import { IActivitiesData } from '@platform/features/dashboard/views/activities/activities.interface';

export enum ActivitiesApiActionTypes {
  LoadActivitiesSuccess = '[Activities API] Load Activities Success',
  LoadActivitiesFailure = '[Activities API] Load Activities Failure',
  LoadActivitiesWithImportantSuccess = '[Activities API] Load All Activities Success',
  LoadActivitiesWithImportantFailure = '[Activities API] Load All Activities Failure',
  LoadActivitySuccess = '[Activities API] Load Activity Success',
  LoadActivityFailure = '[Activities API] Load Activity Failure',
  LoadFilteredActivitiesSuccess = '[Activities API] Load Filtered Activities Success',
  LoadFilteredActivitiesFailure = '[Activities API] Load Filtered Activities Failure',
}

export class LoadActivitiesWithImportantSuccessAction implements Action {
  public readonly type = ActivitiesApiActionTypes.LoadActivitiesWithImportantSuccess;

  constructor(public payload: IActivitiesData) {}
}

export class LoadActivitiesWithImportantFailureAction implements Action {
  public readonly type = ActivitiesApiActionTypes.LoadActivitiesWithImportantFailure;

  // tslint:disable-next-line:no-any
  constructor(public payload: any) {}
}

export class LoadActivitiesSuccessAction implements Action {
  public readonly type = ActivitiesApiActionTypes.LoadActivitiesSuccess;

  constructor(public payload: GetProfileActivities) {}
}

export class LoadActivitiesFailureAction implements Action {
  public readonly type = ActivitiesApiActionTypes.LoadActivitiesFailure;

  // tslint:disable-next-line:no-any
  constructor(public payload: any) {}
}

export class LoadActivitySuccessAction implements Action {
  public readonly type = ActivitiesApiActionTypes.LoadActivitySuccess;

  constructor(public payload: GetProfileActivity) {}
}

export class LoadActivityFailureAction implements Action {
  public readonly type = ActivitiesApiActionTypes.LoadActivityFailure;

  // tslint:disable-next-line:no-any
  constructor(public payload: any) {}
}

export class LoadFilteredActivitiesSuccessAction implements Action {
  public readonly type = ActivitiesApiActionTypes.LoadFilteredActivitiesSuccess;

  constructor(public payload: GetProfileActivities) {}
}

export class LoadFilteredActivitiesFailureAction implements Action {
  public readonly type = ActivitiesApiActionTypes.LoadFilteredActivitiesFailure;

  // tslint:disable-next-line:no-any
  constructor(public payload: any) {}
}

export type ActivitiesApiActionUnion =
  | LoadActivitiesWithImportantSuccessAction
  | LoadActivitiesWithImportantFailureAction
  | LoadActivitiesSuccessAction
  | LoadActivitiesFailureAction
  | LoadActivitySuccessAction
  | LoadActivityFailureAction
  | LoadFilteredActivitiesSuccessAction
  | LoadFilteredActivitiesFailureAction;
