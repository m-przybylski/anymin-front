import { PaymentsEffects } from '@platform/features/dashboard/views/user-dashboard/payments/effects/payments.effects';
import {
  GetCreditCard,
  GetDefaultPaymentMethod,
  GetPromoCode,
  PaymentsService,
  PromoCodesService,
} from '@anymind-ng/api';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Deceiver } from 'deceiver-core';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import {
  PaymentsApiActions,
  PaymentsInitActions,
} from '@platform/features/dashboard/views/user-dashboard/payments/actions';
import { cold, hot } from 'jasmine-marbles';
import { AlertService, LoggerService } from '@anymind-ng/core';
import { provideMockFactoryLogger } from 'testing/testing';

describe('PaymentsEffects', () => {
  let paymentsEffects: PaymentsEffects;
  let promoCodesService: PromoCodesService;
  let paymentsService: PaymentsService;
  let actions$: Observable<any>;

  const date = new Date();
  const loggerService: LoggerService = Deceiver(LoggerService, {
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PaymentsEffects,
        {
          provide: PromoCodesService,
          useValue: Deceiver(PromoCodesService, {
            getActivePromoCodesRoute: jest.fn(),
          }),
        },
        {
          provide: PaymentsService,
          useValue: Deceiver(PaymentsService, {
            getCreditCardsRoute: jest.fn(),
            getDefaultPaymentMethodRoute: jest.fn(),
          }),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService, {
            pushDangerAlert: jest.fn(),
            closeAllAlerts: jest.fn(),
          }),
        },
        provideMockFactoryLogger(loggerService),
        provideMockActions(() => actions$),
      ],
    });

    paymentsEffects = TestBed.get(PaymentsEffects);
    paymentsService = TestBed.get(PaymentsService);
    promoCodesService = TestBed.get(PromoCodesService);
    (loggerService.error as jest.Mock).mockClear();
    (loggerService.warn as jest.Mock).mockClear();
    (loggerService.debug as jest.Mock).mockClear();
    actions$ = TestBed.get(Actions);
  });

  it('should dispach FetchPaymentsDetailsInitAction on success', () => {
    const getCreditCard: ReadonlyArray<GetCreditCard> = [
      {
        maskedNumber: 'string',
        id: 'string',
        expiryDate: 'string',
        cardType: GetCreditCard.CardTypeEnum.VISA,
        createdAt: date,
      },
    ];

    const getPromoCode: ReadonlyArray<GetPromoCode> = [
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

    const getDefaultPaymentMethod: GetDefaultPaymentMethod = {
      creditCardId: 'string',
    };

    const action = new PaymentsInitActions.FetchPaymentsDetailsInitAction();
    const resultB = new PaymentsApiActions.LoadPaymentsMethodSuccessAction(getCreditCard);
    const resultC = new PaymentsApiActions.LoadPromoCodesSuccessAction(getPromoCode);
    const resultD = new PaymentsApiActions.LoadDefaultPaymentsMethodSuccessAction(getDefaultPaymentMethod);

    actions$ = hot('-a---', { a: action });

    const responseCreditCards = cold('-a|', { a: getCreditCard });
    const responseDefaultPaymentsMethod = cold('-a|', { a: getDefaultPaymentMethod });
    const responseActivePromoCodes = cold('-a|', { a: getPromoCode });

    paymentsService.getCreditCardsRoute = jest.fn(() => responseCreditCards);
    paymentsService.getDefaultPaymentMethodRoute = jest.fn(() => responseDefaultPaymentsMethod);
    promoCodesService.getActivePromoCodesRoute = jest.fn(() => responseActivePromoCodes);

    const expected = cold('---(bcd)', { b: resultB, c: resultC, d: resultD });
    expect(paymentsEffects.fetchPaymentsDetails$).toBeObservable(expected);
  });

  it('should dispach FetchPaymentsDetailsInitAction on error', () => {
    const getCreditCard: ReadonlyArray<GetCreditCard> = [
      {
        maskedNumber: 'string',
        id: 'string',
        expiryDate: 'string',
        cardType: GetCreditCard.CardTypeEnum.VISA,
        createdAt: date,
      },
    ];

    const getPromoCode: ReadonlyArray<GetPromoCode> = [
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

    const getDefaultPaymentMethod = 'error';

    const action = new PaymentsInitActions.FetchPaymentsDetailsInitAction();
    const resultB = new PaymentsApiActions.LoadPaymentsMethodSuccessAction(getCreditCard);
    const resultC = new PaymentsApiActions.LoadPromoCodesSuccessAction(getPromoCode);
    const resultD = new PaymentsApiActions.LoadDefaultPaymentsMethodErrorAction(getDefaultPaymentMethod);

    actions$ = hot('-a---', { a: action });

    const responseCreditCards = cold('-a|', { a: getCreditCard });
    const responseDefaultPaymentsMethod = cold('-#', {});
    const responseActivePromoCodes = cold('-a|', { a: getPromoCode });

    paymentsService.getCreditCardsRoute = jest.fn(() => responseCreditCards);
    paymentsService.getDefaultPaymentMethodRoute = jest.fn(() => responseDefaultPaymentsMethod);
    promoCodesService.getActivePromoCodesRoute = jest.fn(() => responseActivePromoCodes);

    const expected = cold('---(bcd)', { b: resultB, c: resultC, d: resultD });
    expect(paymentsEffects.fetchPaymentsDetails$).toBeObservable(expected);
  });

  it('should return a LoadPaymentsMethodSuccessAction, when response if fetch succeeds', () => {
    const payload: ReadonlyArray<GetCreditCard> = [
      {
        maskedNumber: 'string',
        id: 'string',
        expiryDate: 'string',
        cardType: GetCreditCard.CardTypeEnum.VISA,
        createdAt: date,
      },
    ];

    const action = new PaymentsApiActions.LoadPaymentsMethodOnDeleteSuccessAction();
    const result = new PaymentsApiActions.LoadPaymentsMethodSuccessAction(payload);

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: payload });
    const expected = cold('--b', { b: result });

    paymentsService.getCreditCardsRoute = jest.fn(() => response);
    expect(paymentsEffects.fetchPaymentsMethod$).toBeObservable(expected);
  });

  it('should return a LoadPaymentsMethodErrorAction, when response if fetch error', () => {
    const error: any = 'error';

    const action = new PaymentsApiActions.LoadPaymentsMethodOnDeleteSuccessAction();
    const result = new PaymentsApiActions.LoadPaymentsMethodErrorAction(error);

    actions$ = hot('-a---', { a: action });
    const response = cold('-#', {});
    const expected = cold('--b', { b: result });

    paymentsService.getCreditCardsRoute = jest.fn(() => response);
    expect(paymentsEffects.fetchPaymentsMethod$).toBeObservable(expected);
  });

  it('should return a LoadDefaultPaymentsMethodSuccessAction, when response if fetch succeeds', () => {
    const payload: GetDefaultPaymentMethod = {
      creditCardId: 'id',
    };

    const action = new PaymentsInitActions.FetchInitDefaultPaymentMethodAction();
    const result = new PaymentsApiActions.LoadDefaultPaymentsMethodSuccessAction(payload);

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: payload });
    const expected = cold('--b', { b: result });

    paymentsService.getDefaultPaymentMethodRoute = jest.fn(() => response);
    expect(paymentsEffects.fetchDefaultPaymentMethod$).toBeObservable(expected);
  });

  it('should return a LoadDefaultPaymentsMethodErrorAction, when response if fetch error', () => {
    const error: any = 'error';

    const action = new PaymentsInitActions.FetchInitDefaultPaymentMethodAction();
    const result = new PaymentsApiActions.LoadDefaultPaymentsMethodErrorAction(error);

    actions$ = hot('-a---', { a: action });
    const response = cold('-#', {});
    const expected = cold('--b', { b: result });

    paymentsService.getDefaultPaymentMethodRoute = jest.fn(() => response);
    expect(paymentsEffects.fetchDefaultPaymentMethod$).toBeObservable(expected);
  });

  it('should return a FetchInitPromoCodesAction, when response if fetch succeeds', () => {
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

    const action = new PaymentsInitActions.FetchInitPromoCodesAction();
    const result = new PaymentsApiActions.LoadPromoCodesSuccessAction(payload);

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: payload });
    const expected = cold('--b', { b: result });

    promoCodesService.getActivePromoCodesRoute = jest.fn(() => response);
    expect(paymentsEffects.fetchPromoCodes$).toBeObservable(expected);
  });

  it('should return a LoadPromoCodesErrorAction, when response if fetch error', () => {
    const error: any = 'error';

    const action = new PaymentsInitActions.FetchInitPromoCodesAction();
    const result = new PaymentsApiActions.LoadPromoCodesErrorAction(error);

    actions$ = hot('-a---', { a: action });
    const response = cold('-#', {});
    const expected = cold('--b', { b: result });

    promoCodesService.getActivePromoCodesRoute = jest.fn(() => response);
    expect(paymentsEffects.fetchPromoCodes$).toBeObservable(expected);
  });
});
