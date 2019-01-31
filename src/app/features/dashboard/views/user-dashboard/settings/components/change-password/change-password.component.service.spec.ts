// tslint:disable:no-empty
// tslint:disable:max-line-length
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AccountService, RecoverPasswordService } from '@anymind-ng/api';
import { Alerts, AlertService } from '@anymind-ng/core';
import { of, throwError } from 'rxjs';
import { ChangePasswordComponentService, ChangePasswordStatusEnum } from './change-password.component.service';
import { Deceiver } from 'deceiver-core';
import { provideMockFactoryLogger } from 'testing/testing';
import { BackendErrors } from '@platform/shared/models/backend-error/backend-error';
import { UserSessionService } from '@platform/core/services/user-session/user-session.service';
import { cold, getTestScheduler } from 'jasmine-marbles';

describe('Service: ChangePasswordComponentService', () => {
  const mockActualPassword = 'actualPassword';
  const mockNewPassword = 'newPassword';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ChangePasswordComponentService,
        {
          provide: AccountService,
          useValue: Deceiver(AccountService, { changePasswordRoute: jest.fn() }),
        },
        {
          provide: RecoverPasswordService,
          useValue: Deceiver(RecoverPasswordService, { postRecoverPasswordRoute: jest.fn() }),
        },
        {
          provide: UserSessionService,
          useValue: Deceiver(UserSessionService, { removeAllSessionsExceptCurrent: jest.fn() }),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService, {
            pushDangerAlert: jest.fn(),
            pushSuccessAlert: jest.fn(),
          }),
        },
        provideMockFactoryLogger(),
      ],
    });
  }));

  it('should return SUCCESS status and show success alert when change password pass', fakeAsync(() => {
    const mockAccountService = TestBed.get(AccountService);
    const mockAlertService = TestBed.get(AlertService);
    const changePasswordComponentService = TestBed.get(ChangePasswordComponentService);

    mockAccountService.changePasswordRoute.mockReturnValue(of({}));

    changePasswordComponentService
      .changePassword(mockActualPassword, mockNewPassword)
      .subscribe((status: ChangePasswordStatusEnum) => {
        expect(mockAlertService.pushSuccessAlert).toHaveBeenCalledWith(Alerts.ChangePasswordSuccess);
        expect(status).toEqual(ChangePasswordStatusEnum.SUCCESS);
      });
    tick();
  }));

  it('should return ERROR status and show danger alert when change password failed without backend error', () => {
    const mockAccountService = TestBed.get(AccountService);
    const mockAlertService = TestBed.get(AlertService);
    const changePasswordComponentService = TestBed.get(ChangePasswordComponentService);

    mockAccountService.changePasswordRoute.mockReturnValue(
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
  });
  it(
    'should return ERROR status and show danger alert when change password failed with' + 'unhandled backend error',
    fakeAsync(() => {
      const mockAccountService = TestBed.get(AccountService);
      const mockAlertService = TestBed.get(AlertService);
      const changePasswordComponentService = TestBed.get(ChangePasswordComponentService);

      mockAccountService.changePasswordRoute.mockReturnValue(
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

    mockAccountService.changePasswordRoute.mockReturnValue(
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

      mockAccountService.changePasswordRoute.mockReturnValue(
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

      mockAccountService.changePasswordRoute.mockReturnValue(
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

  it('should remove all session after password change', () => {
    const mockAccountService: AccountService = TestBed.get(AccountService);
    const userSessionService: UserSessionService = TestBed.get(UserSessionService);
    const changePasswordComponentService: ChangePasswordComponentService = TestBed.get(ChangePasswordComponentService);
    (mockAccountService.changePasswordRoute as jest.Mock).mockReturnValue(cold('--a|', { a: undefined }));
    getTestScheduler().flush();
    expect(changePasswordComponentService.changePassword('🔥🔥🔥', '🌊🌊🌊')).toBeObservable(
      cold('--a|', { a: ChangePasswordStatusEnum.SUCCESS }),
    );
    expect(userSessionService.removeAllSessionsExceptCurrent).toHaveBeenCalled();
  });
});
