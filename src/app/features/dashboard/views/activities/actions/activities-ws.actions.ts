// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { MoneyDto } from '@anymind-ng/api';

export enum ActivitiesWsActionTypes {
  NewExpertActivityNotification = '[Activities WS] New Expert Activity Notification',
  NewCompanyActivityNotification = '[Activities WS] New Company Activity Notification',
  BalanceUpdate = '[Activities WS] Balance Update',
}

export class NewExpertActivityNotificationAction implements Action {
  public readonly type = ActivitiesWsActionTypes.NewExpertActivityNotification;

  constructor(public payload: string) {}
}

export class NewCompanyActivityNotificationAction implements Action {
  public readonly type = ActivitiesWsActionTypes.NewCompanyActivityNotification;

  constructor(public payload: string) {}
}

export class BalanceUpdateAction implements Action {
  public readonly type = ActivitiesWsActionTypes.BalanceUpdate;

  constructor(public payload: MoneyDto) {}
}
export type ActivitiesWsActionUnion =
  | NewExpertActivityNotificationAction
  | NewCompanyActivityNotificationAction
  | BalanceUpdateAction;
