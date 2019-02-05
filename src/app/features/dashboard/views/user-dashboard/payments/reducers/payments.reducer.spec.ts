import {
  PaymentsApiActions,
  PaymentsInitActions,
} from '@platform/features/dashboard/views/user-dashboard/payments/actions';
import { IState, reducer } from '@platform/features/dashboard/views/user-dashboard/payments/reducers/payments.reducer';
import { GetCreditCard, GetDefaultPaymentMethod, GetPromoCode, MoneyDto } from '@anymind-ng/api';

describe('payments.reducer', () => {
  const initialState: IState = {
    paymentsList: [],
    defaultPaymentMethod: {},
    promoCodesList: [],
    isPending: false,
  };

  describe('undefined Action', () => {
    it('should return the default state', () => {
      const result = reducer(initialState, {} as any);
      expect(result).toMatchSnapshot(initialState);
    });
  });

  describe('FetchPaymentsDetailsInit', () => {
    it('should start FetchPaymentsDetailsInit action', () => {
      const state = {
        paymentsList: [],
        promoCodesList: [],
        defaultPaymentMethod: {},
        isPending: true,
      };

      const result = reducer(state, new PaymentsInitActions.FetchPaymentsDetailsInitAction());
      expect(result).toMatchSnapshot();
    });
  });

  describe('FetchInitPromoCodesAction', () => {
    it('should start FetchInitPromoCodesAction action', () => {
      const state = {
        paymentsList: [],
        promoCodesList: [],
        defaultPaymentMethod: {},
        isPending: false,
      };

      const result = reducer(state, new PaymentsInitActions.FetchInitPromoCodesAction());
      expect(result).toMatchSnapshot();
    });
  });

  describe('LoadDefaultPaymentsMethodSuccessAction', () => {
    it('should start LoadDefaultPaymentsMethodSuccessAction action', () => {
      const date = new Date(0);

      const payload: ReadonlyArray<GetPromoCode> = [
        {
          id: 'string',
          token: 'string',
          amount: {
            value: 2,
            currency: 'PLN',
          },
          issuer: 'string',
          status: GetPromoCode.StatusEnum.NEW,
          expiresAt: date,
          createdAt: date,
          updatedAt: date,
        },
      ];

      const state = {
        paymentsList: [],
        promoCodesList: [
          {
            id: 'string',
            token: 'string',
            amount: {
              value: 2,
              currency: 'PLN',
            },
            issuer: 'string',
            status: GetPromoCode.StatusEnum.NEW,
            expiresAt: date,
            createdAt: date,
            updatedAt: date,
          },
        ],
        defaultPaymentMethod: {},
        isPending: false,
      };

      const result = reducer(state, new PaymentsApiActions.LoadPromoCodesSuccessAction(payload));
      expect(result).toMatchSnapshot();
    });
  });

  describe('LoadPaymentsMethodSuccessAction', () => {
    it('should start LoadPaymentsMethodSuccessAction action', () => {
      const date = new Date(0);

      const payload: ReadonlyArray<GetCreditCard> = [
        {
          maskedNumber: 'string',
          id: 'string',
          expiryDate: 'string',
          cardType: GetCreditCard.CardTypeEnum.VISA,
          createdAt: date,
        },
      ];

      const state = {
        paymentsList: [
          {
            maskedNumber: 'string',
            id: 'string',
            expiryDate: 'string',
            cardType: GetCreditCard.CardTypeEnum.VISA,
            createdAt: date,
          },
        ],
        promoCodesList: [],
        defaultPaymentMethod: {},
        isPending: false,
      };

      const result = reducer(state, new PaymentsApiActions.LoadPaymentsMethodSuccessAction(payload));
      expect(result).toMatchSnapshot();
    });
  });

  describe('LoadDefaultPaymentsMethodSuccessAction', () => {
    it('should start LoadDefaultPaymentsMethodSuccessAction action', () => {
      const payload: GetDefaultPaymentMethod = {
        creditCardId: 'string',
        promoCodeId: 'string',
      };

      const state = {
        paymentsList: [],
        promoCodesList: [],
        defaultPaymentMethod: {
          creditCardId: 'string',
          promoCodeId: 'string',
        },
        isPending: false,
      };

      const result = reducer(state, new PaymentsApiActions.LoadDefaultPaymentsMethodSuccessAction(payload));
      expect(result).toMatchSnapshot();
    });
  });

  describe('LoadPaymentsMethodError', () => {
    it('should start LoadPaymentsMethodError action', () => {
      const error = 'error';

      const state = {
        paymentsList: [],
        promoCodesList: [],
        defaultPaymentMethod: {},
        isPending: false,
      };

      const result = reducer(state, new PaymentsApiActions.LoadPaymentsMethodErrorAction(error));
      expect(result).toMatchSnapshot();
    });
  });
});
