import { PaymentsService, PostAddNewCard } from '@anymind-ng/api';
import { AlertService } from '@anymind-ng/core';
import { TPayService } from '@platform/shared/services/tpay/tpay.service';
import { Deceiver } from 'deceiver-core';
import { TestBed } from '@angular/core/testing';
import { AddPaymentCardFormComponentService } from './add-payment-card-form.component.service';
import { cold, getTestScheduler } from 'jasmine-marbles';

describe('AddPaymentCardFormComponentService', () => {
  let paymentsService: PaymentsService;
  let alertService: AlertService;
  let tpayService: TPayService;

  let addPaymentCardFormComponentService: AddPaymentCardFormComponentService;

  const fromValues = {
    codeCVControlName: 'codeCVC',
    cardNumberControlName: 'cardNumber',
    expireDateControlName: '2020',
    nameSurnameControl: 'nameSurname',
    emailControl: 'emailControl',
    cvcCardType: 'VISA',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddPaymentCardFormComponentService,
        { provide: PaymentsService, useValue: Deceiver(PaymentsService) },
        { provide: AlertService, useValue: Deceiver(AlertService) },
        { provide: TPayService, useValue: Deceiver(TPayService) },
      ],
    });
  });

  beforeEach(() => {
    paymentsService = TestBed.get(PaymentsService);
    alertService = TestBed.get(AlertService);
    tpayService = TestBed.get(TPayService);
    addPaymentCardFormComponentService = TestBed.get(AddPaymentCardFormComponentService);
  });

  it('should be able to create a service', () => {
    expect(addPaymentCardFormComponentService).toBeTruthy();
  });

  describe('with correct data', () => {
    beforeEach(() => {
      const encryptedCard = cold('(a|)', { a: '🌹🌹🌹🌹' });
      const postCreditCardRoute = cold('--a|', { a: '🖤🖤🖤' });
      tpayService.encryptCardData = jest.fn(() => encryptedCard);
      paymentsService.postCreditCardRoute = jest.fn(() => postCreditCardRoute);
    });

    it('should set payment method', () => {
      alertService.pushSuccessAlert = jest.fn();
      const result = cold('--a|', { a: '🖤🖤🖤' });
      expect(
        addPaymentCardFormComponentService.sendPaymentCard({
          value: fromValues,
        } as any),
      ).toBeObservable(result);
      expect(alertService.pushSuccessAlert).toHaveBeenCalled();
    });

    it('should set payment method with correct values', () => {
      addPaymentCardFormComponentService
        .sendPaymentCard({
          value: fromValues,
        } as any)
        .subscribe();
      getTestScheduler().flush();
      expect((paymentsService.postCreditCardRoute as jest.Mock).mock.calls).toHaveLength(1);
      const functionPayload: PostAddNewCard = (paymentsService.postCreditCardRoute as jest.Mock).mock.calls[0][0];
      expect(functionPayload.expiryDate).toBe('20/20');
      expect(functionPayload.encryptedCard).toBe('🌹🌹🌹🌹');
    });
  });

  describe('with not correct data', () => {
    beforeEach(() => {
      const encryptedCard = cold('(a|)', { a: '🌹🌹🌹🌹' });
      tpayService.encryptCardData = jest.fn(() => encryptedCard);
    });

    it('should return the same error when not known', () => {
      const result = cold('--#', {}, 'error');
      const postCreditCardRoute = cold('--#', {}, 'error');
      paymentsService.postCreditCardRoute = jest.fn(() => postCreditCardRoute);
      expect(
        addPaymentCardFormComponentService.sendPaymentCard({
          value: fromValues,
        } as any),
      ).toBeObservable(result);
    });

    it('should return the same error when not known', () => {
      const result = cold('--|');
      const postCreditCardRoute = cold('--#', {}, { error: { code: 418, message: 'Im teapot' } });
      paymentsService.postCreditCardRoute = jest.fn(() => postCreditCardRoute);
      alertService.pushDangerAlert = jest.fn();
      expect(
        addPaymentCardFormComponentService.sendPaymentCard({
          value: fromValues,
        } as any),
      ).toBeObservable(result);
      expect(alertService.pushDangerAlert).toHaveBeenCalled();
    });

    it('should return the same error when not known', () => {
      const controls = {};
      const setErrorsSpy = jest.fn();
      const handler = {
        get: (): any => ({
          setErrors: setErrorsSpy,
        }),
      };
      const form = {
        value: fromValues,
        controls: new Proxy(controls, handler),
      };
      const result = cold('--|');
      const postCreditCardRoute = cold('--#', {}, { error: { code: 466, message: 'Im teapot' } });
      paymentsService.postCreditCardRoute = jest.fn(() => postCreditCardRoute);
      alertService.pushDangerAlert = jest.fn();
      expect(addPaymentCardFormComponentService.sendPaymentCard(form as any)).toBeObservable(result);
      expect(alertService.pushDangerAlert).not.toHaveBeenCalled();
      expect(setErrorsSpy).toHaveBeenCalled();
    });

    it('should complain about card number if invalid form field is not populated', () => {
      const controls = {};
      const setErrorsSpy = jest.fn();
      const handler = {
        get: (): any => ({
          setErrors: setErrorsSpy,
        }),
      };
      const form = {
        value: fromValues,
        controls: new Proxy(controls, handler),
      };
      (fromValues.cvcCardType as any) = undefined;
      const result = cold('|');
      expect(addPaymentCardFormComponentService.sendPaymentCard(form as any)).toBeObservable(result);
    });
  });
});
