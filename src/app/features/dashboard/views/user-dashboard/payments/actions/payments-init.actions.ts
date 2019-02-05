// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

export enum PaymentsInitActionTypes {
  FetchPaymentsDetailsInit = '[Payments Init] Init payments methods & promo codes',
  FetchInitPaymentsMethod = '[Payments Init] Init payments methods',
  FetchInitPromoCodes = '[Payments Init] Init promo codes',
  FetchInitDefaultPaymentMethod = '[Payments Init] Init Default payment method',
}

export class FetchPaymentsDetailsInitAction implements Action {
  public readonly type = PaymentsInitActionTypes.FetchPaymentsDetailsInit;
}

export class FetchInitPaymentsMethodAction implements Action {
  public readonly type = PaymentsInitActionTypes.FetchInitPaymentsMethod;
}

export class FetchInitPromoCodesAction implements Action {
  public readonly type = PaymentsInitActionTypes.FetchInitPromoCodes;
}

export class FetchInitDefaultPaymentMethodAction implements Action {
  public readonly type = PaymentsInitActionTypes.FetchInitDefaultPaymentMethod;
}

export type PaymentsInitActionUnion =
  | FetchInitPaymentsMethodAction
  | FetchInitPromoCodesAction
  | FetchPaymentsDetailsInitAction
  | FetchInitDefaultPaymentMethodAction;
