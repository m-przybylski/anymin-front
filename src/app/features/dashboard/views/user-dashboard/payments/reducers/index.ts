import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import * as fromPaymentsMethod from './payments.reducer';

export interface IPaymentsState {
  paymentsMethod: fromPaymentsMethod.IState;
}

export interface IState extends fromRoot.IState {
  payments: IPaymentsState;
}

// tslint:disable-next-line:no-any
export const reducers: ActionReducerMap<IPaymentsState, any> = {
  paymentsMethod: fromPaymentsMethod.reducer,
};

export const selectPaymentsState = createFeatureSelector<IState, IPaymentsState>('payments');

export const getPaymentsMethod = createSelector(
  selectPaymentsState,
  (state: IPaymentsState) => state.paymentsMethod,
);

export const getPaymentsMethodList = createSelector(
  getPaymentsMethod,
  fromPaymentsMethod.getPaymentsMethodList,
);
export const getPromoCodesList = createSelector(
  getPaymentsMethod,
  fromPaymentsMethod.getPromoCodesList,
);
export const getDefaultPaymentMethod = createSelector(
  getPaymentsMethod,
  fromPaymentsMethod.getDefaultPaymentMethod,
);
export const isPaymentMethodsPending = createSelector(
  getPaymentsMethod,
  fromPaymentsMethod.isPaymentMethodsPending,
);
