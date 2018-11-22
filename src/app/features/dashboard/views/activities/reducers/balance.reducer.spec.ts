import { IState, reducer } from './balance.reducer';
import { BalanceApiActions } from '../actions';

describe('balance.reducer', () => {
  const initialState: IState = {
    balance: {
      amount: 0,
      currency: '',
    },
    isLoaded: false,
  };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toEqual(initialState);
    });
  });

  describe('LoadBalanceSuccess', () => {
    it('should update store', () => {
      const result = reducer(
        initialState,
        new BalanceApiActions.LoadBalanceSuccessAction({ amount: 5, currency: 'PLN' }),
      );
      expect(result).toEqual({
        balance: {
          amount: 5,
          currency: 'PLN',
        },
        isLoaded: true,
      });
    });
  });
  describe('LoadBalanceFailre', () => {
    it('should update store', () => {
      const result = reducer(initialState, new BalanceApiActions.LoadBalanceFailureAction('oups'));
      expect(result).toEqual({
        balance: {
          amount: 0,
          currency: '',
        },
        isLoaded: true,
      });
    });
  });
});
