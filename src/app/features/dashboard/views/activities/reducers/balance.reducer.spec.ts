import { IState, reducer } from './balance.reducer';
import { BalanceApiActions } from '../actions';

describe('balance.reducer', () => {
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
        new BalanceApiActions.LoadBalanceSuccessAction({
          profileAmount: {
            value: 5,
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
        }),
      );
      expect(result).toEqual({
        balance: {
          profileAmount: {
            value: 5,
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
        isLoaded: true,
      });
    });
  });
  describe('LoadBalanceFailre', () => {
    it('should update store failed', () => {
      const result = reducer(initialState, new BalanceApiActions.LoadBalanceFailureAction('oups'));
      expect(result).toEqual({
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
        isLoaded: true,
      });
    });
  });
});
