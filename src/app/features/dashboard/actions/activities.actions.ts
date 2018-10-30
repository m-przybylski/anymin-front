// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { GetImportantActivitiesCounters } from '@anymind-ng/api';

export enum ActivitiesActionTypes {
  FetchImportantActivitiesCounterFromServer = '[activities] Fetch activities counter from backend',
  FetchImportantActivitiesCounterFromServerError = '[activities] Fetch error',
  FetchImportantActivitiesCounterFromServerSuccess = '[activities] Fetch success',
  IncrementImportantProfileActivitiesCounter = '[activities] Increment profile activities counter',
  IncrementImportantClientActivitiesCounter = '[activities] Increment client activities counter',
  DecrementImportantProfileActivitiesCounter = '[activities] Decrement profile activities counter',
  DecrementImportantClientActivitiesCounter = '[activities] Decrement client activities counter',
}

export class FetchImportantActivitiesCounterAction implements Action {
  public readonly type = ActivitiesActionTypes.FetchImportantActivitiesCounterFromServer;
}

export class FetchImportantActivitiesCounterErrorAction implements Action {
  public readonly type = ActivitiesActionTypes.FetchImportantActivitiesCounterFromServerError;

  // tslint:disable-next-line:no-any
  constructor(public payload: any) {}
}

export class FetchImportantActivitiesCounterSuccessAction implements Action {
  public readonly type = ActivitiesActionTypes.FetchImportantActivitiesCounterFromServerSuccess;

  constructor(public payload: GetImportantActivitiesCounters) {}
}

export class IncrementImportantProfileActivitiesCounterAction implements Action {
  public readonly type = ActivitiesActionTypes.IncrementImportantProfileActivitiesCounter;
}

export class IncrementImportantClientActivitiesCounterAction implements Action {
  public readonly type = ActivitiesActionTypes.IncrementImportantClientActivitiesCounter;
}

export class DecrementImportantProfileActivitiesCounterAction implements Action {
  public readonly type = ActivitiesActionTypes.DecrementImportantProfileActivitiesCounter;
}

export class DecrementImportantClientActivitiesCounterAction implements Action {
  public readonly type = ActivitiesActionTypes.DecrementImportantClientActivitiesCounter;
}

export type ActivitiesActionsUnion =
  | FetchImportantActivitiesCounterAction
  | FetchImportantActivitiesCounterErrorAction
  | FetchImportantActivitiesCounterSuccessAction
  | IncrementImportantProfileActivitiesCounterAction
  | IncrementImportantClientActivitiesCounterAction
  | DecrementImportantProfileActivitiesCounterAction
  | DecrementImportantClientActivitiesCounterAction;
