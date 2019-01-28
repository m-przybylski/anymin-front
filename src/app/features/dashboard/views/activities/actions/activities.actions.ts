// tslint:disable:max-classes-per-file

import { Action } from '@ngrx/store';

export enum ActivitiesActionTypes {
  LoadExpertActivitiesWithBalance = '[Activity Guard] Load Expert Activities with Balance',
  LoadCompanyActivitiesWithBalance = '[Activity Guard] Load Company Activities with Balance',
  LoadClientActivities = '[Activity Guard] Load Client Activities',
}

export class LoadExpertActivitiesWithBalanceAction implements Action {
  public readonly type = ActivitiesActionTypes.LoadExpertActivitiesWithBalance;
}

export class LoadCompanyActivitiesWithBalanceAction implements Action {
  public readonly type = ActivitiesActionTypes.LoadCompanyActivitiesWithBalance;
}

export class LoadClientActivitiesAction implements Action {
  public readonly type = ActivitiesActionTypes.LoadClientActivities;
}

export type ActivitiesActionUnion =
  | LoadExpertActivitiesWithBalanceAction
  | LoadCompanyActivitiesWithBalanceAction
  | LoadClientActivitiesAction;
