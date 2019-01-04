// tslint:disable:no-empty
// tslint:disable:max-line-length
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RecoverPasswordService } from '@anymind-ng/api';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { of, throwError } from 'rxjs';
import { SetNewPasswordComponentService, SetNewPasswordStatusEnum } from './set-new-password.component.service';
import { BackendErrors } from '@platform/shared/models/backend-error/backend-error';
import { Deceiver } from 'deceiver-core';
import { provideMockFactoryLogger } from 'testing/testing';

describe('Service: SetNewPasswordComponentService', () => {
  const mockPassword = 'password';
  const mockPhoneNumber = '+48555555555';
  const mockToken = 'token';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        SetNewPasswordComponentService,
        {
          provide: RecoverPasswordService,
          useValue: Deceiver(RecoverPasswordService, { putRecoverPasswordMsisdnRoute: jest.fn() }),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService, { pushDangerAlert: jest.fn(), pushSuccessAlert: jest.fn() }),
        },
        provideMockFactoryLogger(),
      ],
    });
  }));

  it('should return SUCCESS status and show success alert when set new password pass', fakeAsync(() => {
    const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
    const mockAlertService = TestBed.get(AlertService);
    const setNewPasswordComponentService = TestBed.get(SetNewPasswordComponentService);

    mockRecoverPasswordService.putRecoverPasswordMsisdnRoute.mockReturnValue(of({}));

    setNewPasswordComponentService
      .setNewPassword(mockPhoneNumber, mockToken, mockPassword)
      .subscribe((status: SetNewPasswordStatusEnum) => {
        expect(mockAlertService.pushSuccessAlert).toHaveBeenCalledWith(Alerts.ChangePasswordSuccess);
        expect(status).toEqual(SetNewPasswordStatusEnum.SUCCESS);
      });
    tick();
  }));

  it('should return ERROR status and show danger alert when set password failed without backend error', fakeAsync(() => {
    const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
    const mockAlertService = TestBed.get(AlertService);
    const setNewPasswordComponentService = TestBed.get(SetNewPasswordComponentService);

    mockRecoverPasswordService.putRecoverPasswordMsisdnRoute.mockReturnValue(
      throwError({
        error: {
          error: {},
        },
      }),
    );

    setNewPasswordComponentService.setNewPassword(mockPhoneNumber, mockToken, mockPassword).subscribe(
      () => {},
      (err: SetNewPasswordStatusEnum) => {
        expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
        expect(err).toEqual(SetNewPasswordStatusEnum.ERROR);
      },
    );
    tick();
  }));

  it('should return ERROR status and show danger alert when set password failed with unhandled backend error', fakeAsync(() => {
    const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
    const mockAlertService = TestBed.get(AlertService);
    const setNewPasswordComponentService = TestBed.get(SetNewPasswordComponentService);

    mockRecoverPasswordService.putRecoverPasswordMsisdnRoute.mockReturnValue(
      throwError({
        error: {
          code: 1,
          error: {},
          message: 'errorMessage',
        },
      }),
    );

    setNewPasswordComponentService.setNewPassword(mockPhoneNumber, mockToken, mockPassword).subscribe(
      () => {},
      (err: SetNewPasswordStatusEnum) => {
        expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
        expect(err).toEqual(SetNewPasswordStatusEnum.ERROR);
      },
    );
    tick();
  }));

  it(
    'should return NO_TOKEN status and show danger alert when set password failed with' +
      'CannotFindMsisdnToken backend error',
    fakeAsync(() => {
      const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
      const mockAlertService = TestBed.get(AlertService);
      const setNewPasswordComponentService = TestBed.get(SetNewPasswordComponentService);

      mockRecoverPasswordService.putRecoverPasswordMsisdnRoute.mockReturnValue(
        throwError({
          error: {
            code: BackendErrors.CannotFindMsisdnToken,
            error: {},
            message: 'errorMessage',
          },
        }),
      );

      setNewPasswordComponentService.setNewPassword(mockPhoneNumber, mockToken, mockPassword).subscribe(
        () => {},
        (err: SetNewPasswordStatusEnum) => {
          expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.CannotFindMsisdnToken);
          expect(err).toEqual(SetNewPasswordStatusEnum.NO_TOKEN);
        },
      );
      tick();
    }),
  );

  it('should return INVALID status alert when set password failed with IncorrectValidation backend error', fakeAsync(() => {
    const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
    const setNewPasswordComponentService = TestBed.get(SetNewPasswordComponentService);

    mockRecoverPasswordService.putRecoverPasswordMsisdnRoute.mockReturnValue(
      throwError({
        error: {
          code: BackendErrors.IncorrectValidation,
          error: {},
          message: 'errorMessage',
        },
      }),
    );

    setNewPasswordComponentService.setNewPassword(mockPhoneNumber, mockToken, mockPassword).subscribe(
      () => {},
      (err: SetNewPasswordStatusEnum) => {
        expect(err).toEqual(SetNewPasswordStatusEnum.INVALID);
      },
    );
    tick();
  }));
});
