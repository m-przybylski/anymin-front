// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { GetProfileActivity } from '@anymind-ng/api';

export enum ExpertActivitiesPageActionTypes {
  LoadMoreExpertActivities = '[Activities Page] Load More Expert Activities',
  ShowImportantActivities = '[Activities Page] Show Important Activities',
  HideImportantActivities = '[Activities Page] Hide Important Activities',
  ActivityDetailsClosed = '[Activities Page] Activity Details Closed',
  ActivityRowClick = '[Activity Page] Activity Row Click',
}

export class LoadMoreExpertActivitiesAction implements Action {
  public readonly type = ExpertActivitiesPageActionTypes.LoadMoreExpertActivities;

  constructor(public payload: { currentOffset: number; offsetIterator: number }) {}
}

export class ShowImportantActivitiesAction implements Action {
  public readonly type = ExpertActivitiesPageActionTypes.ShowImportantActivities;
}

export class HideImportantActivitiesAction implements Action {
  public readonly type = ExpertActivitiesPageActionTypes.HideImportantActivities;
}

export class ActivityDetailsClosedAction implements Action {
  public readonly type = ExpertActivitiesPageActionTypes.ActivityDetailsClosed;

  constructor(public payload: GetProfileActivity) {}
}

export class ActivityRowClickAction implements Action {
  public readonly type = ExpertActivitiesPageActionTypes.ActivityRowClick;

  constructor(public payload: { getProfileActivity: GetProfileActivity; isImportant: boolean }) {}
}

export type ExpertActivitiesPageActionUnion =
  | LoadMoreExpertActivitiesAction
  | HideImportantActivitiesAction
  | ShowImportantActivitiesAction
  | ActivityDetailsClosedAction
  | ActivityRowClickAction;
