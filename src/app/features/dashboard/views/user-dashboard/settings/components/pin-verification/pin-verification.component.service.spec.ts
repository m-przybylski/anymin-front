// tslint:disable:max-file-line-count
// tslint:disable:max-line-length
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AccountService, RecoverPasswordService } from '@anymind-ng/api';
import { Alerts, AlertService } from '@anymind-ng/core';
import { of, throwError } from 'rxjs';
import { PinVerificationComponentService, PinVerificationStatus } from './pin-verification.component.service';
import { BackendErrors } from '../../../../../../../shared/models/backend-error/backend-error';
import { Deceiver } from 'deceiver-core';
import { provideMockFactoryLogger, importStore, dispatchLoggedUser } from 'testing/testing';
import { Store } from '@ngrx/store';

describe('Service: PinVerificationComponentService', () => {
  const mockPhoneNumber = '+48555555555';
  const mockToken = 'token';
  let pinVerificationComponentService: PinVerificationComponentService;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [importStore()],
      providers: [
        PinVerificationComponentService,
        {
          provide: RecoverPasswordService,
          useValue: Deceiver(RecoverPasswordService, {
            postRecoverPasswordVerifyMsisdnRoute: jest.fn(),
            postRecoverPasswordRoute: jest.fn(),
          }),
        },
        {
          provide: AccountService,
          useValue: Deceiver(AccountService, {
            confirmMsisdnVerificationRoute: jest.fn(),
            newMsisdnVerificationRoute: jest.fn(),
          }),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService, { pushDangerAlert: jest.fn() }),
        },
        provideMockFactoryLogger(),
      ],
    });
    pinVerificationComponentService = TestBed.get(PinVerificationComponentService);
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    dispatchLoggedUser(store, { account: { id: '123' } });
  });

  it('should return SUCCESS status when verify recover password token pass', fakeAsync(() => {
    const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);

    mockRecoverPasswordService.postRecoverPasswordVerifyMsisdnRoute.mockReturnValue(of({}));

    pinVerificationComponentService
      .verifyResetPasswordPinToken(mockToken, mockPhoneNumber)
      .subscribe((status: PinVerificationStatus) => {
        expect(status).toEqual(PinVerificationStatus.SUCCESS);
      });
    tick();
  }));

  it(
    'should return INVALID_TOKEN status when check pin token failed with backend error' +
      'MsisdnVerificationTokenIncorrect',
    () => {
      const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);

      mockRecoverPasswordService.postRecoverPasswordVerifyMsisdnRoute.mockReturnValue(
        throwError({
          error: {
            code: BackendErrors.MsisdnVerificationTokenIncorrect,
            error: {},
            message: 'errorMessage',
          },
        }),
      );

      pinVerificationComponentService
        .verifyResetPasswordPinToken(mockToken, mockPhoneNumber)
        .subscribe((err: PinVerificationStatus) => {
          expect(err).toEqual(PinVerificationStatus.INVALID_TOKEN);
        });
    },
  );

  it('should return CAN_NOT_FIND_TOKEN status when check pin token failed with backend error CannotFindMsisdnToken', () => {
    const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);

    mockRecoverPasswordService.postRecoverPasswordVerifyMsisdnRoute.mockReturnValue(
      throwError({
        error: {
          code: BackendErrors.CannotFindMsisdnToken,
          error: {},
          message: 'errorMessage',
        },
      }),
    );

    pinVerificationComponentService
      .verifyResetPasswordPinToken(mockToken, mockPhoneNumber)
      .subscribe((err: PinVerificationStatus) => {
        expect(err).toEqual(PinVerificationStatus.CAN_NOT_FIND_TOKEN);
      });
  });

  it('should return TOO_MANY_ATTEMPTS status when check pin token failed with backend error TooManyMsisdnTokenAttempts', () => {
    const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);

    mockRecoverPasswordService.postRecoverPasswordVerifyMsisdnRoute.mockReturnValue(
      throwError({
        error: {
          code: BackendErrors.TooManyMsisdnTokenAttempts,
          error: {},
          message: 'errorMessage',
        },
      }),
    );

    pinVerificationComponentService
      .verifyResetPasswordPinToken(mockToken, mockPhoneNumber)
      .subscribe((err: PinVerificationStatus) => {
        expect(err).toEqual(PinVerificationStatus.TOO_MANY_ATTEMPTS);
      });
  });

  it('should return INVALID_TOKEN status when check pin token failed with backend error IncorrectValidation', () => {
    const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);

    mockRecoverPasswordService.postRecoverPasswordVerifyMsisdnRoute.mockReturnValue(
      throwError({
        error: {
          code: BackendErrors.IncorrectValidation,
          error: {},
          message: 'errorMessage',
        },
      }),
    );

    pinVerificationComponentService
      .verifyResetPasswordPinToken(mockToken, mockPhoneNumber)
      .subscribe((err: PinVerificationStatus) => {
        expect(err).toEqual(PinVerificationStatus.INVALID_TOKEN);
      });
  });

  it('should return ERROR status and show alert when check pin token failed with unhandled backend error', () => {
    const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
    const mockAlertService = TestBed.get(AlertService);

    mockRecoverPasswordService.postRecoverPasswordVerifyMsisdnRoute.mockReturnValue(
      throwError({
        error: {
          code: 1,
          error: {},
          message: 'errorMessage',
        },
      }),
    );

    pinVerificationComponentService
      .verifyResetPasswordPinToken(mockToken, mockPhoneNumber)
      .subscribe((err: PinVerificationStatus) => {
        expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
        expect(err).toEqual(PinVerificationStatus.ERROR);
      });
  });

  it('should return ERROR status and show alert when check pin token failed without backend error', () => {
    const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
    const mockAlertService = TestBed.get(AlertService);

    mockRecoverPasswordService.postRecoverPasswordVerifyMsisdnRoute.mockReturnValue(
      throwError({
        error: {
          error: {},
        },
      }),
    );

    pinVerificationComponentService
      .verifyResetPasswordPinToken(mockToken, mockPhoneNumber)
      .subscribe((err: PinVerificationStatus) => {
        expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
        expect(err).toEqual(PinVerificationStatus.ERROR);
      });
  });

  it('should return SUCCESS status when verify change msisdn token pass', () => {
    const mockAccountService = TestBed.get(AccountService);

    mockAccountService.confirmMsisdnVerificationRoute.mockReturnValue(of({}));

    pinVerificationComponentService.verifyChangeMsisdnPinToken(mockToken).subscribe((status: PinVerificationStatus) => {
      expect(status).toEqual(PinVerificationStatus.SUCCESS);
    });
  });

  it(
    'should return CAN_NOT_FIND_TOKEN status when check pin token failed with backend error' +
      'CanNotFindMsisdnVerification',
    () => {
      const mockAccountService = TestBed.get(AccountService);

      mockAccountService.confirmMsisdnVerificationRoute.mockReturnValue(
        throwError({
          error: {
            code: BackendErrors.CanNotFindMsisdnVerification,
            error: {},
            message: 'errorMessage',
          },
        }),
      );

      pinVerificationComponentService.verifyChangeMsisdnPinToken(mockToken).subscribe((err: PinVerificationStatus) => {
        expect(err).toEqual(PinVerificationStatus.CAN_NOT_FIND_TOKEN);
      });
    },
  );

  it('should show danger alert when send new recover password token failed', () => {
    const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
    const mockAlertService = TestBed.get(AlertService);

    mockRecoverPasswordService.postRecoverPasswordRoute.mockReturnValue(throwError({}));

    pinVerificationComponentService.sendNewRecoverPasswordToken(mockPhoneNumber).subscribe();
    expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
  });

  it('should show danger alert when send new change msisdn token failed', () => {
    const mockAccountService = TestBed.get(AccountService);
    const mockAlertService = TestBed.get(AlertService);

    mockAccountService.newMsisdnVerificationRoute.mockReturnValue(throwError({}));

    pinVerificationComponentService.sendNewChangeMsisdnToken(mockPhoneNumber).subscribe();
    expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
  });
});
