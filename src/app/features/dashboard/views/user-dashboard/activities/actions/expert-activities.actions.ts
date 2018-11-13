import { Action } from '@ngrx/store';

export enum ExpertActivitiesActionTypes {
  LoadExpertActivitiesWithBalance = '[Activity Guard] Load Expert Activities with Balance',
}

export class LoadExpertActivitiesWithBalance implements Action {
  public readonly type = ExpertActivitiesActionTypes.LoadExpertActivitiesWithBalance;
}

export type ExpertActivitiesActionUnion = LoadExpertActivitiesWithBalance;
