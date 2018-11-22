// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { MoneyDto } from '@anymind-ng/api';

export enum ActivitiesWsActionTypes {
  NewActivityNotification = '[Activities WS] New Activity Notification',
  BalanceUpdate = '[Activities WS] Balance Update',
}

export class NewActivityNotificationAction implements Action {
  public readonly type = ActivitiesWsActionTypes.NewActivityNotification;

  constructor(public payload: string) {}
}

export class BalanceUpdateAction implements Action {
  public readonly type = ActivitiesWsActionTypes.BalanceUpdate;

  constructor(public payload: MoneyDto) {}
}
export type ActivitiesWsActionUnion = NewActivityNotificationAction | BalanceUpdateAction;
