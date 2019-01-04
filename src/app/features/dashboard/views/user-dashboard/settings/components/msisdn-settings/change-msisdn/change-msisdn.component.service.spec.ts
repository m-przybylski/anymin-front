import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AccountService } from '@anymind-ng/api';

import { AlertService } from '@anymind-ng/core';
import { ChangeMsisdnComponentService, VerifyMsisdnStatusEnum } from './change-msisdn.component.service';
import { of, throwError } from 'rxjs';
import { BackendErrors } from '@platform/shared/models/backend-error/backend-error';
import { provideMockFactoryLogger } from '../../../../../../../../../testing/testing';
import { Deceiver } from 'deceiver-core';

describe('Service: ChangeMsisdnComponentService', () => {
  const mockMsisdn = '+48555555555';
  let mockAccountService: AccountService;
  let changeMsisdnComponentService: ChangeMsisdnComponentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ChangeMsisdnComponentService,
        {
          provide: AccountService,
          useValue: Deceiver(AccountService, { newMsisdnVerificationRoute: jest.fn() }),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService, { pushDangerAlert: jest.fn() }),
        },
        provideMockFactoryLogger(),
      ],
    });
    mockAccountService = TestBed.get(AccountService);
    changeMsisdnComponentService = TestBed.get(ChangeMsisdnComponentService);
  }));

  it('should return SUCCESS status when verify msisdn pass', fakeAsync(() => {
    mockAccountService.newMsisdnVerificationRoute = jest.fn(() => of({}));

    changeMsisdnComponentService.verifyMsisdn(mockMsisdn).subscribe((status: VerifyMsisdnStatusEnum) => {
      expect(status).toEqual(VerifyMsisdnStatusEnum.SUCCESS);
    });
    tick();
  }));

  it('should return WRONG_MSISDN status when verify msisdn failed with backend error IncorrectValidation', fakeAsync(() => {
    mockAccountService.newMsisdnVerificationRoute = jest.fn(() =>
      throwError({
        error: {
          code: BackendErrors.IncorrectValidation,
          error: {},
          message: 'errorMessage',
        },
      }),
    );

    changeMsisdnComponentService.verifyMsisdn(mockMsisdn).subscribe((status: VerifyMsisdnStatusEnum) => {
      expect(status).toEqual(VerifyMsisdnStatusEnum.WRONG_MSISDN);
    });
    tick();
  }));

  it('should return ALREADY_EXISTS status when verify msisdn failed with backend error AccountAlreadyExists', fakeAsync(() => {
    mockAccountService.newMsisdnVerificationRoute = jest.fn(() =>
      throwError({
        error: {
          code: BackendErrors.AccountAlreadyExists,
          error: {},
          message: 'errorMessage',
        },
      }),
    );

    changeMsisdnComponentService.verifyMsisdn(mockMsisdn).subscribe((status: VerifyMsisdnStatusEnum) => {
      expect(status).toEqual(VerifyMsisdnStatusEnum.ALREADY_EXISTS);
    });
    tick();
  }));

  it('should return BLOCKED status when verify msisdn failed with backend error MsisdnBlocked', fakeAsync(() => {
    mockAccountService.newMsisdnVerificationRoute = jest.fn(() =>
      throwError({
        error: {
          code: BackendErrors.MsisdnBlocked,
          error: {},
          message: 'errorMessage',
        },
      }),
    );

    changeMsisdnComponentService.verifyMsisdn(mockMsisdn).subscribe((status: VerifyMsisdnStatusEnum) => {
      expect(status).toEqual(VerifyMsisdnStatusEnum.BLOCKED);
    });
    tick();
  }));

  it(
    'should return CREATE_PIN_CODE_TOO_RECENTLY status when' +
      'verify msisdn failed with backend error CreateAnotherPinCodeTokenRecently',
    fakeAsync(() => {
      mockAccountService.newMsisdnVerificationRoute = jest.fn(() =>
        throwError({
          error: {
            code: BackendErrors.CreateAnotherPinCodeTokenRecently,
            error: {},
            message: 'errorMessage',
          },
        }),
      );

      changeMsisdnComponentService.verifyMsisdn(mockMsisdn).subscribe((status: VerifyMsisdnStatusEnum) => {
        expect(status).toEqual(VerifyMsisdnStatusEnum.CREATE_PIN_CODE_TOO_RECENTLY);
      });
      tick();
    }),
  );

  it(
    'should show danger alert and return ERROR status when' + 'verify msisdn failed with unhandled backend error',
    fakeAsync(() => {
      mockAccountService.newMsisdnVerificationRoute = jest.fn(() =>
        throwError({
          error: {
            code: 1,
            error: {},
            message: 'errorMessage',
          },
        }),
      );

      changeMsisdnComponentService.verifyMsisdn(mockMsisdn).subscribe((status: VerifyMsisdnStatusEnum) => {
        expect(status).toEqual(VerifyMsisdnStatusEnum.ERROR);
      });
      tick();
    }),
  );

  it(
    'should show danger alert and return ERROR status when' + 'verify msisdn failed without backend error',
    fakeAsync(() => {
      mockAccountService.newMsisdnVerificationRoute = jest.fn(() =>
        throwError({
          error: {
            error: {},
          },
        }),
      );

      changeMsisdnComponentService.verifyMsisdn(mockMsisdn).subscribe((status: VerifyMsisdnStatusEnum) => {
        expect(status).toEqual(VerifyMsisdnStatusEnum.ERROR);
      });
      tick();
    }),
  );
});
