// tslint:disable:no-empty
// tslint:disable:max-file-line-count
// tslint:disable:max-line-length
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AccountService, RecoverPasswordService, GetRecoverMethod } from '@anymind-ng/api';
import createSpyObj = jasmine.createSpyObj;
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { of, throwError } from 'rxjs';
import {
  ChangePasswordComponentService,
  ChangePasswordStatusEnum,
  ResetPasswordStatusEnum,
} from './change-password.component.service';
import { BackendErrors } from '../../../../../../../../shared/models/backend-error/backend-error';

describe('Service: ChangePasswordComponentService', () => {
  const mockActualPassword = 'actualPassword';
  const mockNewPassword = 'newPassword';
  const mockPhoneNumber = '+48555555555';
  const logger: LoggerService = new LoggerService(1);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ChangePasswordComponentService,
        {
          provide: AccountService,
          useValue: createSpyObj('AccountService', ['changePasswordRoute']),
        },
        {
          provide: RecoverPasswordService,
          useValue: createSpyObj('RecoverPasswordService', ['postRecoverPasswordRoute']),
        },
        { provide: AlertService, useValue: createSpyObj('AlertService', ['pushDangerAlert', 'pushSuccessAlert']) },
        { provide: LoggerFactory, useValue: createSpyObj('LoggerFactory', ['createLoggerService']) },
      ],
    });
    TestBed.get(LoggerFactory).createLoggerService.and.returnValue(logger);
  }));

  it('should return SUCCESS status and show success alert when change password pass', fakeAsync(() => {
    const mockAccountService = TestBed.get(AccountService);
    const mockAlertService = TestBed.get(AlertService);
    const changePasswordComponentService = TestBed.get(ChangePasswordComponentService);

    mockAccountService.changePasswordRoute.and.returnValue(of({}));

    changePasswordComponentService
      .changePassword(mockActualPassword, mockNewPassword)
      .subscribe((status: ChangePasswordStatusEnum) => {
        expect(mockAlertService.pushSuccessAlert).toHaveBeenCalledWith(Alerts.ChangePasswordSuccess);
        expect(status).toEqual(ChangePasswordStatusEnum.SUCCESS);
      });
    tick();
  }));

  it('should return ERROR status and show danger alert when change password failed without backend error', fakeAsync(() => {
    const mockAccountService = TestBed.get(AccountService);
    const mockAlertService = TestBed.get(AlertService);
    const changePasswordComponentService = TestBed.get(ChangePasswordComponentService);

    mockAccountService.changePasswordRoute.and.returnValue(
      throwError({
        error: {
          error: {},
        },
      }),
    );

    changePasswordComponentService.changePassword(mockActualPassword, mockNewPassword).subscribe(
      () => {},
      (err: ChangePasswordStatusEnum) => {
        expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
        expect(err).toEqual(ChangePasswordStatusEnum.ERROR);
      },
    );
    tick();
  }));

  it(
    'should return ERROR status and show danger alert when change password failed with' + 'unhandled backend error',
    fakeAsync(() => {
      const mockAccountService = TestBed.get(AccountService);
      const mockAlertService = TestBed.get(AlertService);
      const changePasswordComponentService = TestBed.get(ChangePasswordComponentService);

      mockAccountService.changePasswordRoute.and.returnValue(
        throwError({
          error: {
            code: 1,
            error: {},
            message: 'errorMessage',
          },
        }),
      );

      changePasswordComponentService.changePassword(mockActualPassword, mockNewPassword).subscribe(
        () => {},
        (err: ChangePasswordStatusEnum) => {
          expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
          expect(err).toEqual(ChangePasswordStatusEnum.ERROR);
        },
      );
      tick();
    }),
  );

  it('should return WRONG_PASSWORD status when change password failed with IncorrectValidation backend error', fakeAsync(() => {
    const mockAccountService = TestBed.get(AccountService);
    const changePasswordComponentService = TestBed.get(ChangePasswordComponentService);

    mockAccountService.changePasswordRoute.and.returnValue(
      throwError({
        error: {
          code: BackendErrors.IncorrectValidation,
          error: {},
          message: 'errorMessage',
        },
      }),
    );

    changePasswordComponentService.changePassword(mockActualPassword, mockNewPassword).subscribe(
      () => {},
      (err: ChangePasswordStatusEnum) => {
        expect(err).toEqual(ChangePasswordStatusEnum.WRONG_PASSWORD);
      },
    );
    tick();
  }));

  it(
    'should return WRONG_PASSWORD status when change password failed with BadAuthenticationCredentials' +
      'backend error',
    fakeAsync(() => {
      const mockAccountService = TestBed.get(AccountService);
      const changePasswordComponentService = TestBed.get(ChangePasswordComponentService);

      mockAccountService.changePasswordRoute.and.returnValue(
        throwError({
          error: {
            code: BackendErrors.BadAuthenticationCredentials,
            error: {},
            message: 'errorMessage',
          },
        }),
      );

      changePasswordComponentService.changePassword(mockActualPassword, mockNewPassword).subscribe(
        () => {},
        (err: ChangePasswordStatusEnum) => {
          expect(err).toEqual(ChangePasswordStatusEnum.WRONG_PASSWORD);
        },
      );
      tick();
    }),
  );

  it(
    'should return TOO_MANY_ATTEMPTS status when change password failed with ToManyIncorrectPasswordAttempts' +
      'backend error',
    fakeAsync(() => {
      const mockAccountService = TestBed.get(AccountService);
      const changePasswordComponentService = TestBed.get(ChangePasswordComponentService);

      mockAccountService.changePasswordRoute.and.returnValue(
        throwError({
          error: {
            code: BackendErrors.ToManyIncorrectPasswordAttempts,
            error: {},
            message: 'errorMessage',
          },
        }),
      );

      changePasswordComponentService.changePassword(mockActualPassword, mockNewPassword).subscribe(
        () => {},
        (err: ChangePasswordStatusEnum) => {
          expect(err).toEqual(ChangePasswordStatusEnum.TOO_MANY_ATTEMPTS);
        },
      );
      tick();
    }),
  );

  it('should return RECOVER_BY_EMAIL status when recover password method is email', fakeAsync(() => {
    const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
    const changePasswordComponentService = TestBed.get(ChangePasswordComponentService);

    mockRecoverPasswordService.postRecoverPasswordRoute.and.returnValue(
      of({
        method: GetRecoverMethod.MethodEnum.EMAIL,
      }),
    );

    changePasswordComponentService.resetPassword(mockPhoneNumber).subscribe((status: ResetPasswordStatusEnum) => {
      expect(status).toEqual(ResetPasswordStatusEnum.RECOVER_BY_EMAIL);
    });
    tick();
  }));

  it('should return RECOVER_BY_SMS status when recover password method is sms', fakeAsync(() => {
    const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
    const changePasswordComponentService = TestBed.get(ChangePasswordComponentService);

    mockRecoverPasswordService.postRecoverPasswordRoute.and.returnValue(
      of({
        method: GetRecoverMethod.MethodEnum.SMS,
      }),
    );

    changePasswordComponentService.resetPassword(mockPhoneNumber).subscribe((status: ResetPasswordStatusEnum) => {
      expect(status).toEqual(ResetPasswordStatusEnum.RECOVER_BY_SMS);
    });
    tick();
  }));

  it('should return ERROR status and show danger alert when recover password method is unhandled', fakeAsync(() => {
    const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
    const changePasswordComponentService = TestBed.get(ChangePasswordComponentService);
    const alertService = TestBed.get(AlertService);

    mockRecoverPasswordService.postRecoverPasswordRoute.and.returnValue(
      of({
        method: 'unknown',
      }),
    );

    changePasswordComponentService.resetPassword(mockPhoneNumber).subscribe((status: ResetPasswordStatusEnum) => {
      expect(alertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
      expect(status).toEqual(ResetPasswordStatusEnum.ERROR);
    });
    tick();
  }));

  it(
    'should return CREATE_PIN_CODE_TOO_RECENTLY status and show danger alert when recover password failed' +
      'with backend error CreateAnotherPinCodeTokenRecently',
    fakeAsync(() => {
      const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
      const changePasswordComponentService = TestBed.get(ChangePasswordComponentService);
      const alertService = TestBed.get(AlertService);

      mockRecoverPasswordService.postRecoverPasswordRoute.and.returnValue(
        throwError({
          error: {
            code: BackendErrors.CreateAnotherPinCodeTokenRecently,
            error: {},
            message: 'errorMessage',
          },
        }),
      );

      changePasswordComponentService.resetPassword(mockPhoneNumber).subscribe((status: ResetPasswordStatusEnum) => {
        expect(alertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.CreateAnotherPinCodeTokenTooRecently);
        expect(status).toEqual(ResetPasswordStatusEnum.CREATE_PIN_CODE_TOO_RECENTLY);
      });
      tick();
    }),
  );

  it(
    'should return CREATE_PIN_CODE_TOO_RECENTLY status and show danger alert when recover password failed' +
      'with backend error PincodeSentTooRecently',
    fakeAsync(() => {
      const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
      const changePasswordComponentService = TestBed.get(ChangePasswordComponentService);
      const alertService = TestBed.get(AlertService);

      mockRecoverPasswordService.postRecoverPasswordRoute.and.returnValue(
        throwError({
          error: {
            code: BackendErrors.PincodeSentTooRecently,
            error: {},
            message: 'errorMessage',
          },
        }),
      );

      changePasswordComponentService.resetPassword(mockPhoneNumber).subscribe((status: ResetPasswordStatusEnum) => {
        expect(alertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.PincodeSentTooRecently);
        expect(status).toEqual(ResetPasswordStatusEnum.CREATE_PIN_CODE_TOO_RECENTLY);
      });
      tick();
    }),
  );

  it(
    'should return ERROR status and show danger alert when recover password failed' + 'with unhandled backend error',
    fakeAsync(() => {
      const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
      const changePasswordComponentService = TestBed.get(ChangePasswordComponentService);
      const alertService = TestBed.get(AlertService);

      mockRecoverPasswordService.postRecoverPasswordRoute.and.returnValue(
        throwError({
          error: {
            code: 1,
            error: {},
            message: 'errorMessage',
          },
        }),
      );

      changePasswordComponentService.resetPassword(mockPhoneNumber).subscribe((status: ResetPasswordStatusEnum) => {
        expect(alertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
        expect(status).toEqual(ResetPasswordStatusEnum.ERROR);
      });
      tick();
    }),
  );

  it(
    'should return ERROR status and show danger alert when recover password failed' + 'without backend error',
    fakeAsync(() => {
      const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
      const changePasswordComponentService = TestBed.get(ChangePasswordComponentService);
      const alertService = TestBed.get(AlertService);

      mockRecoverPasswordService.postRecoverPasswordRoute.and.returnValue(throwError({}));

      changePasswordComponentService.resetPassword(mockPhoneNumber).subscribe((status: ResetPasswordStatusEnum) => {
        expect(alertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
        expect(status).toEqual(ResetPasswordStatusEnum.ERROR);
      });
      tick();
    }),
  );
});
