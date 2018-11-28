// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { GetImportantActivitiesCounters } from '@anymind-ng/api';

export enum DashboardActionTypes {
  FetchImportantActivitiesCounterFromServer = '[dashboard] Fetch activities counter from backend',
  FetchImportantActivitiesCounterFromServerError = '[dashboard] Fetch activities counter error',
  FetchImportantActivitiesCounterFromServerSuccess = '[dashboard] Fetch activities counter success ',
  IncrementImportantExpertActivitiesCounter = '[dashboard] Increment expert activities counter',
  IncrementImportantClientActivitiesCounter = '[dashboard] Increment client activities counter',
  DecrementImportantExpertActivitiesCounter = '[dashboard] Decrement expert activities counter',
  DecrementImportantClientActivitiesCounter = '[dashboard] Decrement client activities counter',
  IncrementImportantOrganizationActivitiesCounter = '[dashboard] Increment organization activities counter',
  DecrementImportantOrganizationActivitiesCounter = '[dashboard] Decrement organization activities counter',
}

export class FetchImportantActivitiesCounterAction implements Action {
  public readonly type = DashboardActionTypes.FetchImportantActivitiesCounterFromServer;
}

export class FetchImportantActivitiesCounterErrorAction implements Action {
  public readonly type = DashboardActionTypes.FetchImportantActivitiesCounterFromServerError;

  // tslint:disable-next-line:no-any
  constructor(public payload: any) {}
}

export class FetchImportantActivitiesCounterSuccessAction implements Action {
  public readonly type = DashboardActionTypes.FetchImportantActivitiesCounterFromServerSuccess;

  constructor(public payload: GetImportantActivitiesCounters) {}
}

export class IncrementImportantExpertActivitiesCounterAction implements Action {
  public readonly type = DashboardActionTypes.IncrementImportantExpertActivitiesCounter;
}

export class IncrementImportantClientActivitiesCounterAction implements Action {
  public readonly type = DashboardActionTypes.IncrementImportantClientActivitiesCounter;
}

export class DecrementImportantExpertActivitiesCounterAction implements Action {
  public readonly type = DashboardActionTypes.DecrementImportantExpertActivitiesCounter;
}

export class DecrementImportantClientActivitiesCounterAction implements Action {
  public readonly type = DashboardActionTypes.DecrementImportantClientActivitiesCounter;
}

export class IncrementImportantOrganizationActivitiesCounterAction implements Action {
  public readonly type = DashboardActionTypes.IncrementImportantOrganizationActivitiesCounter;
}

export class DecrementImportantOrganizationActivitiesCounterAction implements Action {
  public readonly type = DashboardActionTypes.DecrementImportantOrganizationActivitiesCounter;
}

export type DashboardActionsUnion =
  | FetchImportantActivitiesCounterAction
  | FetchImportantActivitiesCounterErrorAction
  | FetchImportantActivitiesCounterSuccessAction
  | IncrementImportantExpertActivitiesCounterAction
  | IncrementImportantClientActivitiesCounterAction
  | DecrementImportantExpertActivitiesCounterAction
  | DecrementImportantClientActivitiesCounterAction
  | IncrementImportantOrganizationActivitiesCounterAction
  | DecrementImportantOrganizationActivitiesCounterAction;
