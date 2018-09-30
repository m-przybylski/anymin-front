import { async, TestBed } from '@angular/core/testing';
import { AccountService } from '@anymind-ng/api';
import createSpyObj = jasmine.createSpyObj;
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { of, throwError } from 'rxjs';
import { ChangeEmailStatusEnum, ChangeEmailViewComponentService } from './change-email.view.component.service';
import { UserSessionService } from '../../../../../../../core/services/user-session/user-session.service';
import { BackendErrors } from '../../../../../../../shared/models/backend-error/backend-error';

describe('Service: ChangeEmailViewComponentService', () => {
  const mockNewEmail = 'new@email.com';
  const logger: LoggerService = new LoggerService(1);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ChangeEmailViewComponentService,
        {
          provide: AccountService,
          useValue: createSpyObj('AccountService', ['patchUpdateAccountRoute']),
        },
        {
          provide: UserSessionService,
          useValue: createSpyObj('UserSessionService', ['getSession']),
        },
        { provide: AlertService, useValue: createSpyObj('AlertService', ['pushDangerAlert']) },
        { provide: LoggerFactory, useValue: createSpyObj('LoggerFactory', ['createLoggerService']) },
      ],
    });
    TestBed.get(LoggerFactory).createLoggerService.and.returnValue(logger);
    TestBed.get(UserSessionService).getSession.and.returnValue(Promise.resolve({}));
  }));

  it('should return SUCCESS status when set email pass', () => {
    const mockAccountService = TestBed.get(AccountService);
    const changeEmailViewComponentService = TestBed.get(ChangeEmailViewComponentService);

    mockAccountService.patchUpdateAccountRoute.and.returnValue(of({}));

    changeEmailViewComponentService.changeEmail(mockNewEmail).subscribe((status: ChangeEmailStatusEnum) => {
      expect(status).toEqual(ChangeEmailStatusEnum.SUCCESS);
    });
  });

  it('should return INVALID status when try to set email with backend error IncorrectValidation', () => {
    const mockAccountService = TestBed.get(AccountService);
    const changeEmailViewComponentService = TestBed.get(ChangeEmailViewComponentService);

    mockAccountService.patchUpdateAccountRoute.and.returnValue(
      throwError({
        error: {
          code: BackendErrors.IncorrectValidation,
          error: {},
          message: 'errorMessage',
        },
      }),
    );

    changeEmailViewComponentService.changeEmail(mockNewEmail).subscribe((status: ChangeEmailStatusEnum) => {
      expect(status).toEqual(ChangeEmailStatusEnum.INVALID);
    });
  });

  it('should return ALREADY_EXIST status when try to set email with backend error EmailAlreadyExists', () => {
    const mockAccountService = TestBed.get(AccountService);
    const changeEmailViewComponentService = TestBed.get(ChangeEmailViewComponentService);

    mockAccountService.patchUpdateAccountRoute.and.returnValue(
      throwError({
        error: {
          code: BackendErrors.EmailAlreadyExists,
          error: {},
          message: 'errorMessage',
        },
      }),
    );

    changeEmailViewComponentService.changeEmail(mockNewEmail).subscribe((status: ChangeEmailStatusEnum) => {
      expect(status).toEqual(ChangeEmailStatusEnum.ALREADY_EXIST);
    });
  });

  it('should return ERROR status and show danger alert when try to set email with unhandled backend error', () => {
    const mockAccountService = TestBed.get(AccountService);
    const mockAlertService = TestBed.get(AlertService);
    const changeEmailViewComponentService = TestBed.get(ChangeEmailViewComponentService);

    mockAccountService.patchUpdateAccountRoute.and.returnValue(
      throwError({
        error: {
          code: 1,
          error: {},
          message: 'errorMessage',
        },
      }),
    );

    changeEmailViewComponentService.changeEmail(mockNewEmail).subscribe((status: ChangeEmailStatusEnum) => {
      expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
      expect(status).toEqual(ChangeEmailStatusEnum.ERROR);
    });
  });

  it('should return ERROR status and show danger alert when try to set email with not backend error', () => {
    const mockAccountService = TestBed.get(AccountService);
    const mockAlertService = TestBed.get(AlertService);
    const changeEmailViewComponentService = TestBed.get(ChangeEmailViewComponentService);

    mockAccountService.patchUpdateAccountRoute.and.returnValue(throwError({}));

    changeEmailViewComponentService.changeEmail(mockNewEmail).subscribe((status: ChangeEmailStatusEnum) => {
      expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
      expect(status).toEqual(ChangeEmailStatusEnum.ERROR);
    });
  });
});
