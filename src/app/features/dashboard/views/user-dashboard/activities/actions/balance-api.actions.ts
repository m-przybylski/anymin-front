// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { MoneyDto } from '@anymind-ng/api';

export enum BalanceApiActionTypes {
  LoadExpertBalanceSuccess = '[Balance API] Load Balance Success',
  LoadExpertBalanceFailure = '[Balance API] Load Balance Failure',
}

export class LoadExpertBalanceSuccessAction implements Action {
  public readonly type = BalanceApiActionTypes.LoadExpertBalanceSuccess;

  constructor(public payload: MoneyDto) {}
}

export class LoadExpertBalanceFailureAction implements Action {
  public readonly type = BalanceApiActionTypes.LoadExpertBalanceFailure;

  // tslint:disable-next-line:no-any
  constructor(public payload: any) {}
}

export type BalanceApiActionUnion = LoadExpertBalanceSuccessAction | LoadExpertBalanceFailureAction;
