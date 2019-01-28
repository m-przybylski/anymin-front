// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { GetProfileActivities } from '@anymind-ng/api';
import {
  IActivitiesClientData,
  IActivitiesData,
  IActivity,
  IGetActivities,
} from '@platform/features/dashboard/views/activities/activities.interface';

export enum ActivitiesApiActionTypes {
  LoadActivitiesSuccess = '[Activities API] Load Activities Success',
  LoadActivitiesFailure = '[Activities API] Load Activities Failure',
  LoadActivitiesWithImportantSuccess = '[Activities API] Load All Activities Success',
  LoadActivitiesWithImportantFailure = '[Activities API] Load All Activities Failure',
  LoadActivitySuccess = '[Activities API] Load Activity Success',
  LoadActivityFailure = '[Activities API] Load Activity Failure',
  LoadClientActivitiesWithImportantSuccess = '[Activities API] Load Client Activity Success',
  LoadClientActivitiesWithImportantFailure = '[Activities API] Load Client Activity Failure',
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

export class LoadClientActivitiesWithImportantSuccessAction implements Action {
  public readonly type = ActivitiesApiActionTypes.LoadClientActivitiesWithImportantSuccess;

  constructor(public payload: IActivitiesClientData) {}
}

export class LoadClientActivitiesWithImportantFailureAction implements Action {
  public readonly type = ActivitiesApiActionTypes.LoadClientActivitiesWithImportantFailure;

  // tslint:disable-next-line:no-any
  constructor(public payload: any) {}
}

export class LoadActivitiesSuccessAction implements Action {
  public readonly type = ActivitiesApiActionTypes.LoadActivitiesSuccess;

  constructor(public payload: IGetActivities) {}
}

export class LoadActivitiesFailureAction implements Action {
  public readonly type = ActivitiesApiActionTypes.LoadActivitiesFailure;

  // tslint:disable-next-line:no-any
  constructor(public payload: any) {}
}

export class LoadActivitySuccessAction implements Action {
  public readonly type = ActivitiesApiActionTypes.LoadActivitySuccess;

  constructor(public payload: IActivity) {}
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
  | LoadClientActivitiesWithImportantSuccessAction
  | LoadClientActivitiesWithImportantFailureAction
  | LoadActivitiesSuccessAction
  | LoadActivitiesFailureAction
  | LoadActivitySuccessAction
  | LoadActivityFailureAction
  | LoadFilteredActivitiesSuccessAction
  | LoadFilteredActivitiesFailureAction;
