// tslint:disable:no-empty
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RecoverPasswordService } from '@anymind-ng/api';
import createSpyObj = jasmine.createSpyObj;
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { of } from 'rxjs/observable/of';
import { PinVerificationComponentService, RecoverPasswordStatus } from './pin-verification.component.service';
import { _throw } from 'rxjs/observable/throw';
import { BackendErrors } from '../../../../../../../../shared/models/backend-error/backend-error';

describe('Service: PinVerificationComponentService', () => {

  const mockPhoneNumber = '+48555555555';
  const mockToken = 'token';
  const logger: LoggerService = new LoggerService(1);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        PinVerificationComponentService,
        {
          provide: RecoverPasswordService,
          useValue: createSpyObj('RecoverPasswordService', ['postRecoverPasswordVerifyMsisdnRoute'])
        },
        {provide: AlertService, useValue: createSpyObj('AlertService', ['pushDangerAlert'])},
        {provide: LoggerFactory, useValue: createSpyObj('LoggerFactory', ['createLoggerService'])},
      ]
    });
    TestBed.get(LoggerFactory).createLoggerService.and.returnValue(logger);
  }));

  it('should return SUCCESS status when check pin token pass', fakeAsync(() => {
    const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
    const pinVerificationComponentService = TestBed.get(PinVerificationComponentService);

    mockRecoverPasswordService.postRecoverPasswordVerifyMsisdnRoute.and.returnValue(of({}));

    pinVerificationComponentService.checkPinToken(mockToken, mockPhoneNumber)
      .subscribe((status: RecoverPasswordStatus) => {
        expect(status).toEqual(RecoverPasswordStatus.SUCCESS);
      });
    tick();
  }));

  it('should return INVALID_TOKEN status when check pin token failed with backend error' +
    'MsisdnVerificationTokenIncorrect', fakeAsync(() => {
    const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
    const pinVerificationComponentService = TestBed.get(PinVerificationComponentService);

    mockRecoverPasswordService.postRecoverPasswordVerifyMsisdnRoute.and.returnValue(_throw({
      error: {
        code: BackendErrors.MsisdnVerificationTokenIncorrect,
        error: {},
        message: 'errorMessage'
      }
    }));

    pinVerificationComponentService.checkPinToken(mockToken, mockPhoneNumber)
      .subscribe(() => {
      }, (err: RecoverPasswordStatus) => {
        expect(err).toEqual(RecoverPasswordStatus.INVALID_TOKEN);
      });
    tick();
  }));

  it('should return CAN_NOT_FIND_TOKEN status when check pin token failed with backend error CannotFindMsisdnToken',
    fakeAsync(() => {
      const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
      const pinVerificationComponentService = TestBed.get(PinVerificationComponentService);

      mockRecoverPasswordService.postRecoverPasswordVerifyMsisdnRoute.and.returnValue(_throw({
        error: {
          code: BackendErrors.CannotFindMsisdnToken,
          error: {},
          message: 'errorMessage'
        }
      }));

      pinVerificationComponentService.checkPinToken(mockToken, mockPhoneNumber)
        .subscribe(() => {
        }, (err: RecoverPasswordStatus) => {
          expect(err).toEqual(RecoverPasswordStatus.CAN_NOT_FIND_TOKEN);
        });
      tick();
    }));

  it('should return TOO_MANY_ATTEMPTS status when check pin token failed with backend error TooManyMsisdnTokenAttempts',
    fakeAsync(() => {
      const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
      const pinVerificationComponentService = TestBed.get(PinVerificationComponentService);

      mockRecoverPasswordService.postRecoverPasswordVerifyMsisdnRoute.and.returnValue(_throw({
        error: {
          code: BackendErrors.TooManyMsisdnTokenAttempts,
          error: {},
          message: 'errorMessage'
        }
      }));

      pinVerificationComponentService.checkPinToken(mockToken, mockPhoneNumber)
        .subscribe(() => {
        }, (err: RecoverPasswordStatus) => {
          expect(err).toEqual(RecoverPasswordStatus.TOO_MANY_ATTEMPTS);
        });
      tick();
    }));

  it('should return INVALID_TOKEN status when check pin token failed with backend error IncorrectValidation',
    fakeAsync(() => {
      const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
      const pinVerificationComponentService = TestBed.get(PinVerificationComponentService);

      mockRecoverPasswordService.postRecoverPasswordVerifyMsisdnRoute.and.returnValue(_throw({
        error: {
          code: BackendErrors.IncorrectValidation,
          error: {},
          message: 'errorMessage'
        }
      }));

      pinVerificationComponentService.checkPinToken(mockToken, mockPhoneNumber)
        .subscribe(() => {
        }, (err: RecoverPasswordStatus) => {
          expect(err).toEqual(RecoverPasswordStatus.INVALID_TOKEN);
        });
      tick();
    }));

  it('should return ERROR status and show alert when check pin token failed with unhandled backend error',
    fakeAsync(() => {
      const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
      const mockAlertService = TestBed.get(AlertService);
      const pinVerificationComponentService = TestBed.get(PinVerificationComponentService);

      mockRecoverPasswordService.postRecoverPasswordVerifyMsisdnRoute.and.returnValue(_throw({
        error: {
          code: 1,
          error: {},
          message: 'errorMessage'
        }
      }));

      pinVerificationComponentService.checkPinToken(mockToken, mockPhoneNumber)
        .subscribe(() => {
        }, (err: RecoverPasswordStatus) => {
          expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
          expect(err).toEqual(RecoverPasswordStatus.ERROR);
        });
      tick();
    }));

  it('should return ERROR status and show alert when check pin token failed without backend error',
    fakeAsync(() => {
      const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
      const mockAlertService = TestBed.get(AlertService);
      const pinVerificationComponentService = TestBed.get(PinVerificationComponentService);

      mockRecoverPasswordService.postRecoverPasswordVerifyMsisdnRoute.and.returnValue(_throw({
        error: {
          error: {}
        }
      }));

      pinVerificationComponentService.checkPinToken(mockToken, mockPhoneNumber)
        .subscribe(() => {
        }, (err: RecoverPasswordStatus) => {
          expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
          expect(err).toEqual(RecoverPasswordStatus.ERROR);
        });
      tick();
    }));

});
