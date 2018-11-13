import { MoneyDto } from '@anymind-ng/api';
import { BalanceApiActions, ExpertActivitiesWsActions } from '../actions';

const moneyDivider = 100;

export interface IState {
  balance: MoneyDto;
  isLoaded: boolean;
}

const initialState: IState = {
  balance: {
    amount: 0,
    currency: '',
  },
  isLoaded: false,
};

// tslint:disable-next-line:only-arrow-functions
export function reducer(
  state = initialState,
  action: BalanceApiActions.BalanceApiActionUnion | ExpertActivitiesWsActions.BalanceUpdateAction,
): IState {
  switch (action.type) {
    case BalanceApiActions.BalanceApiActionTypes.LoadExpertBalanceSuccess:
    case ExpertActivitiesWsActions.ExpertActivitiesWsActionTypes.BalanceUpdate:
      return {
        isLoaded: true,
        balance: action.payload,
      };

    case BalanceApiActions.BalanceApiActionTypes.LoadExpertBalanceFailure:
      return {
        ...state,
        isLoaded: true,
      };
    default:
      return state;
  }
}

export const getBalance = (state: IState): MoneyDto => ({
  ...state.balance,
  amount: state.balance.amount / moneyDivider,
});
export const getIsLoaded = (state: IState): boolean => state.isLoaded;
