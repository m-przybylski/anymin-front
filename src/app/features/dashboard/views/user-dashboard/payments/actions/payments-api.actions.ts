// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { GetCreditCard, GetDefaultPaymentMethod, GetPromoCode } from '@anymind-ng/api';

export enum PaymentsApiActionTypes {
  LoadPaymentsMethodSuccess = '[Payments API] Load Payments Success',
  LoadPaymentsMethodOnDeleteSuccess = '[Payments API] Load payments on delete card success',
  LoadPaymentsMethodError = '[Payments API] Load Payments Error',
  LoadDefaultPaymentsMethodSuccess = '[Payments API] Load default payment method success',
  LoadDefaultPaymentsMethodError = '[Payments API] Load default payment method error',
  LoadPromoCodesSuccess = '[Payments API] Load Promo Codes Success',
  LoadPromoCodesError = '[Payments API] Load Promo Codes Error',
}

export class LoadPaymentsMethodSuccessAction implements Action {
  public readonly type = PaymentsApiActionTypes.LoadPaymentsMethodSuccess;

  constructor(public payload: ReadonlyArray<GetCreditCard>) {}
}

export class LoadPaymentsMethodOnDeleteSuccessAction implements Action {
  public readonly type = PaymentsApiActionTypes.LoadPaymentsMethodOnDeleteSuccess;
}

export class LoadPaymentsMethodErrorAction implements Action {
  public readonly type = PaymentsApiActionTypes.LoadPaymentsMethodError;

  // tslint:disable-next-line:no-any
  constructor(public payload: any) {}
}

export class LoadDefaultPaymentsMethodSuccessAction implements Action {
  public readonly type = PaymentsApiActionTypes.LoadDefaultPaymentsMethodSuccess;

  constructor(public payload: GetDefaultPaymentMethod) {}
}

export class LoadDefaultPaymentsMethodErrorAction implements Action {
  public readonly type = PaymentsApiActionTypes.LoadDefaultPaymentsMethodError;

  // tslint:disable-next-line:no-any
  constructor(public payload: any) {}
}

export class LoadPromoCodesSuccessAction implements Action {
  public readonly type = PaymentsApiActionTypes.LoadPromoCodesSuccess;

  constructor(public payload: ReadonlyArray<GetPromoCode>) {}
}

export class LoadPromoCodesErrorAction implements Action {
  public readonly type = PaymentsApiActionTypes.LoadPromoCodesError;

  // tslint:disable-next-line:no-any
  constructor(public payload: any) {}
}

export type PaymentsApiActionUnion =
  | LoadPaymentsMethodSuccessAction
  | LoadPaymentsMethodErrorAction
  | LoadDefaultPaymentsMethodSuccessAction
  | LoadDefaultPaymentsMethodErrorAction
  | LoadPromoCodesSuccessAction
  | LoadPaymentsMethodOnDeleteSuccessAction
  | LoadPromoCodesErrorAction;
