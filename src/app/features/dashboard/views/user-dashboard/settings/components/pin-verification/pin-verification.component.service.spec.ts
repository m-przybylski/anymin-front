// tslint:disable:no-empty
// tslint:disable:max-file-line-count
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AccountService, RecoverPasswordService } from '@anymind-ng/api';
import createSpyObj = jasmine.createSpyObj;
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { of, throwError } from 'rxjs';
import { PinVerificationComponentService, PinVerificationStatus } from './pin-verification.component.service';
import { BackendErrors } from '../../../../../../../shared/models/backend-error/backend-error';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserSessionService } from '../../../../../../../core/services/user-session/user-session.service';

describe('Service: PinVerificationComponentService', () => {

  const mockPhoneNumber = '+48555555555';
  const mockToken = 'token';
  const logger: LoggerService = new LoggerService(1);
  let pinVerificationComponentService: PinVerificationComponentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        PinVerificationComponentService,
        {
          provide: RecoverPasswordService,
          useValue: createSpyObj('RecoverPasswordService',
            ['postRecoverPasswordVerifyMsisdnRoute', 'postRecoverPasswordRoute'])
        },
        {
          provide: AccountService,
          useValue: createSpyObj('AccountService', ['confirmMsisdnVerificationRoute', 'newMsisdnVerificationRoute'])
        },
        {
          provide: NgbActiveModal,
          useValue: createSpyObj('NgbActiveModal', ['close'])
        },
        {
          provide: UserSessionService,
          useValue: createSpyObj('UserSessionService', ['getSession'])
        },
        {provide: AlertService, useValue: createSpyObj('AlertService', ['pushDangerAlert'])},
        {provide: LoggerFactory, useValue: createSpyObj('LoggerFactory', ['createLoggerService'])},
      ]
    });
    TestBed.get(LoggerFactory).createLoggerService.and.returnValue(logger);
    TestBed.get(UserSessionService).getSession.and.returnValue(Promise.resolve({}));
    pinVerificationComponentService = TestBed.get(PinVerificationComponentService);
  }));

  it('should return SUCCESS status when verify recover password token pass', fakeAsync(() => {
    const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);

    mockRecoverPasswordService.postRecoverPasswordVerifyMsisdnRoute.and.returnValue(of({}));

    pinVerificationComponentService.verifyResetPasswordPinToken(mockToken, mockPhoneNumber)
      .subscribe((status: PinVerificationStatus) => {
        expect(status).toEqual(PinVerificationStatus.SUCCESS);
      });
    tick();
  }));

  it('should return INVALID_TOKEN status when check pin token failed with backend error' +
    'MsisdnVerificationTokenIncorrect', fakeAsync(() => {
    const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);

    mockRecoverPasswordService.postRecoverPasswordVerifyMsisdnRoute.and.returnValue(throwError({
      error: {
        code: BackendErrors.MsisdnVerificationTokenIncorrect,
        error: {},
        message: 'errorMessage'
      }
    }));

    pinVerificationComponentService.verifyResetPasswordPinToken(mockToken, mockPhoneNumber)
      .subscribe(() => {
      }, (err: PinVerificationStatus) => {
        expect(err).toEqual(PinVerificationStatus.INVALID_TOKEN);
      });
    tick();
  }));

  it('should return CAN_NOT_FIND_TOKEN status when check pin token failed with backend error CannotFindMsisdnToken',
    fakeAsync(() => {
      const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);

      mockRecoverPasswordService.postRecoverPasswordVerifyMsisdnRoute.and.returnValue(throwError({
        error: {
          code: BackendErrors.CannotFindMsisdnToken,
          error: {},
          message: 'errorMessage'
        }
      }));

      pinVerificationComponentService.verifyResetPasswordPinToken(mockToken, mockPhoneNumber)
        .subscribe(() => {
        }, (err: PinVerificationStatus) => {
          expect(err).toEqual(PinVerificationStatus.CAN_NOT_FIND_TOKEN);
        });
      tick();
    }));

  it('should return TOO_MANY_ATTEMPTS status when check pin token failed with backend error TooManyMsisdnTokenAttempts',
    fakeAsync(() => {
      const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);

      mockRecoverPasswordService.postRecoverPasswordVerifyMsisdnRoute.and.returnValue(throwError({
        error: {
          code: BackendErrors.TooManyMsisdnTokenAttempts,
          error: {},
          message: 'errorMessage'
        }
      }));

      pinVerificationComponentService.verifyResetPasswordPinToken(mockToken, mockPhoneNumber)
        .subscribe(() => {
        }, (err: PinVerificationStatus) => {
          expect(err).toEqual(PinVerificationStatus.TOO_MANY_ATTEMPTS);
        });
      tick();
    }));

  it('should return INVALID_TOKEN status when check pin token failed with backend error IncorrectValidation',
    fakeAsync(() => {
      const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);

      mockRecoverPasswordService.postRecoverPasswordVerifyMsisdnRoute.and.returnValue(throwError({
        error: {
          code: BackendErrors.IncorrectValidation,
          error: {},
          message: 'errorMessage'
        }
      }));

      pinVerificationComponentService.verifyResetPasswordPinToken(mockToken, mockPhoneNumber)
        .subscribe(() => {
        }, (err: PinVerificationStatus) => {
          expect(err).toEqual(PinVerificationStatus.INVALID_TOKEN);
        });
      tick();
    }));

  it('should return ERROR status and show alert when check pin token failed with unhandled backend error',
    fakeAsync(() => {
      const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
      const mockAlertService = TestBed.get(AlertService);

      mockRecoverPasswordService.postRecoverPasswordVerifyMsisdnRoute.and.returnValue(throwError({
        error: {
          code: 1,
          error: {},
          message: 'errorMessage'
        }
      }));

      pinVerificationComponentService.verifyResetPasswordPinToken(mockToken, mockPhoneNumber)
        .subscribe(() => {
        }, (err: PinVerificationStatus) => {
          expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
          expect(err).toEqual(PinVerificationStatus.ERROR);
        });
      tick();
    }));

  it('should return ERROR status and show alert when check pin token failed without backend error',
    fakeAsync(() => {
      const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
      const mockAlertService = TestBed.get(AlertService);

      mockRecoverPasswordService.postRecoverPasswordVerifyMsisdnRoute.and.returnValue(throwError({
        error: {
          error: {}
        }
      }));

      pinVerificationComponentService.verifyResetPasswordPinToken(mockToken, mockPhoneNumber)
        .subscribe(() => {
        }, (err: PinVerificationStatus) => {
          expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
          expect(err).toEqual(PinVerificationStatus.ERROR);
        });
      tick();
    }));

  it('should return SUCCESS status when verify change msisdn token pass', fakeAsync(() => {
    const mockAccountService = TestBed.get(AccountService);

    mockAccountService.confirmMsisdnVerificationRoute.and.returnValue(of({}));

    pinVerificationComponentService.verifyChangeMsisdnPinToken(mockToken)
      .subscribe((status: PinVerificationStatus) => {
        expect(status).toEqual(PinVerificationStatus.SUCCESS);
      });
    tick();
  }));

  it('should return CAN_NOT_FIND_TOKEN status when check pin token failed with backend error' +
    'CanNotFindMsisdnVerification', fakeAsync(() => {
      const mockAccountService = TestBed.get(AccountService);

      mockAccountService.confirmMsisdnVerificationRoute.and.returnValue(throwError({
        error: {
          code: BackendErrors.CanNotFindMsisdnVerification,
          error: {},
          message: 'errorMessage'
        }
      }));

      pinVerificationComponentService.verifyChangeMsisdnPinToken(mockToken)
        .subscribe(() => {
        }, (err: PinVerificationStatus) => {
          expect(err).toEqual(PinVerificationStatus.CAN_NOT_FIND_TOKEN);
        });
      tick();
    }));

  it('should show danger alert when send new recover password token failed', fakeAsync(() => {
    const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
    const mockAlertService = TestBed.get(AlertService);

    mockRecoverPasswordService.postRecoverPasswordRoute.and.returnValue(throwError({}));

    pinVerificationComponentService.sendNewRecoverPasswordToken(mockPhoneNumber)
      .subscribe(() => {
        expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
      });
    tick();
  }));

  it('should show danger alert when send new change msisdn token failed', fakeAsync(() => {
    const mockAccountService = TestBed.get(AccountService);
    const mockAlertService = TestBed.get(AlertService);

    mockAccountService.newMsisdnVerificationRoute.and.returnValue(throwError({}));

    pinVerificationComponentService.sendNewChangeMsisdnToken(mockPhoneNumber)
      .subscribe(() => {
        expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
      });
    tick();
  }));

});
