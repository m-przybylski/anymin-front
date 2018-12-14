import { GetProfileBalance, MoneyDto } from '@anymind-ng/api';
import { BalanceApiActions, ActivitiesWsActions } from '../actions';
import { Config } from '../../../../../../config';

const moneyDivider = Config.moneyDivider;

export interface IState {
  balance: GetProfileBalance;
  isLoaded: boolean;
}

const initialState: IState = {
  balance: {
    profileAmount: {
      value: 0,
      currency: 'PLN',
    },
    partnerAmount: {
      value: 0,
      currency: 'PLN',
    },
    profileBlockedAmount: {
      value: 0,
      currency: 'PLN',
    },
    partnerBlockedAmount: {
      value: 0,
      currency: 'PLN',
    },
  },
  isLoaded: false,
};

// tslint:disable-next-line:only-arrow-functions
export function reducer(
  state = initialState,
  action: BalanceApiActions.BalanceApiActionUnion | ActivitiesWsActions.BalanceUpdateAction,
): IState {
  switch (action.type) {
    case BalanceApiActions.BalanceApiActionTypes.LoadBalanceSuccess:
    case ActivitiesWsActions.ActivitiesWsActionTypes.BalanceUpdate:
      return {
        isLoaded: true,
        balance: action.payload,
      };

    case BalanceApiActions.BalanceApiActionTypes.LoadBalanceFailure:
      return {
        ...state,
        isLoaded: true,
      };
    default:
      return state;
  }
}

export const getBalance = (state: IState): GetProfileBalance => ({
  ...state.balance,
});

export const getWholeBalance = (state: IState): MoneyDto => ({
  value: (state.balance.partnerAmount.value + state.balance.profileAmount.value) / moneyDivider,
  currency: state.balance.profileAmount.currency,
});

export const getBlockedBalance = (state: IState): MoneyDto => ({
  value: (state.balance.partnerBlockedAmount.value + state.balance.profileBlockedAmount.value) / moneyDivider,
  currency: state.balance.profileBlockedAmount.currency,
});

export const getIsLoaded = (state: IState): boolean => state.isLoaded;
