import {
  PaymentsApiActions,
  PaymentsInitActions,
} from '@platform/features/dashboard/views/user-dashboard/payments/actions';
import { GetCreditCard, GetDefaultPaymentMethod, GetPromoCode } from '@anymind-ng/api';

export interface IState {
  paymentsList: ReadonlyArray<GetCreditCard>;
  defaultPaymentMethod: GetDefaultPaymentMethod;
  promoCodesList: ReadonlyArray<GetPromoCode>;
  isPending: boolean;
}

const initialState: IState = {
  paymentsList: [],
  defaultPaymentMethod: {},
  promoCodesList: [],
  isPending: false,
};

// tslint:disable-next-line:only-arrow-functions
export function reducer(
  state = initialState,
  action: PaymentsApiActions.PaymentsApiActionUnion | PaymentsInitActions.PaymentsInitActionUnion,
): IState {
  switch (action.type) {
    case PaymentsApiActions.PaymentsApiActionTypes.LoadPaymentsMethodOnDeleteSuccess:
    case PaymentsInitActions.PaymentsInitActionTypes.FetchPaymentsDetailsInit:
      return {
        ...state,
        isPending: true,
      };

    case PaymentsApiActions.PaymentsApiActionTypes.LoadPaymentsMethodSuccess:
      return {
        ...state,
        paymentsList: action.payload,
        isPending: false,
      };

    case PaymentsApiActions.PaymentsApiActionTypes.LoadPromoCodesSuccess:
      return {
        ...state,
        promoCodesList: action.payload,
        isPending: false,
      };

    case PaymentsApiActions.PaymentsApiActionTypes.LoadDefaultPaymentsMethodSuccess:
      return {
        ...state,
        defaultPaymentMethod: action.payload,
        isPending: false,
      };

    case PaymentsApiActions.PaymentsApiActionTypes.LoadDefaultPaymentsMethodError:
    case PaymentsApiActions.PaymentsApiActionTypes.LoadPromoCodesError:
    case PaymentsApiActions.PaymentsApiActionTypes.LoadPaymentsMethodError:
      return {
        ...state,
        isPending: false,
      };

    default:
      return state;
  }
}

export const getPaymentsMethodList = (state: IState): any => state.paymentsList;
export const getPromoCodesList = (state: IState): any => state.promoCodesList;
export const getDefaultPaymentMethod = (state: IState): any => state.defaultPaymentMethod;
export const isPaymentMethodsPending = (state: IState): any => state.isPending;
