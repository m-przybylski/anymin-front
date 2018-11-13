// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { MoneyDto } from '@anymind-ng/api';

export enum ExpertActivitiesWsActionTypes {
  NewActivityNotification = '[Activities WS] New Activity Notification',
  BalanceUpdate = '[Activities WS] Balance Update',
}

export class NewActivityNotificationAction implements Action {
  public readonly type = ExpertActivitiesWsActionTypes.NewActivityNotification;

  constructor(public payload: string) {}
}

export class BalanceUpdateAction implements Action {
  public readonly type = ExpertActivitiesWsActionTypes.BalanceUpdate;

  constructor(public payload: MoneyDto) {}
}
export type ExpertActivitiesWsActionUnion = NewActivityNotificationAction | BalanceUpdateAction;
