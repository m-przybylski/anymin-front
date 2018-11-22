// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { MoneyDto } from '@anymind-ng/api';

export enum BalanceApiActionTypes {
  LoadBalanceSuccess = '[Balance API] Load Balance Success',
  LoadBalanceFailure = '[Balance API] Load Balance Failure',
}

export class LoadBalanceSuccessAction implements Action {
  public readonly type = BalanceApiActionTypes.LoadBalanceSuccess;

  constructor(public payload: MoneyDto) {}
}

export class LoadBalanceFailureAction implements Action {
  public readonly type = BalanceApiActionTypes.LoadBalanceFailure;

  // tslint:disable-next-line:no-any
  constructor(public payload: any) {}
}

export type BalanceApiActionUnion = LoadBalanceSuccessAction | LoadBalanceFailureAction;
