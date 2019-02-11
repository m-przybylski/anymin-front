import { TestBed } from '@angular/core/testing';
import { AccountService } from '@anymind-ng/api';
import { Alerts, AlertService } from '@anymind-ng/core';
import { of, throwError } from 'rxjs';
import { ChangeEmailStatusEnum, ChangeEmailViewComponentService } from './change-email.view.component.service';
import { BackendErrors } from '../../../../../../../shared/models/backend-error/backend-error';
import { Deceiver } from 'deceiver-core';
import { importStore, provideMockFactoryLogger, dispatchLoggedUser } from 'testing/testing';
import { Store } from '@ngrx/store';

describe('Service: ChangeEmailViewComponentService', () => {
  const mockNewEmail = 'new@email.com';
  let store: Store<any>;
  let mockAccountService: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [importStore()],
      providers: [
        ChangeEmailViewComponentService,
        {
          provide: AccountService,
          useValue: Deceiver(AccountService, { putEmailRoute: jest.fn() }),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService, { pushDangerAlert: jest.fn() }),
        },
        provideMockFactoryLogger(),
      ],
    });
  });

  beforeEach(() => {
    mockAccountService = TestBed.get(AccountService);
    store = TestBed.get(Store);
    dispatchLoggedUser(store, { account: { id: '123' } });
  });

  it('should return SUCCESS status when set email pass', () => {
    const changeEmailViewComponentService = TestBed.get(ChangeEmailViewComponentService);

    (mockAccountService.putEmailRoute as jest.Mock).mockReturnValue(of({}));

    changeEmailViewComponentService.changeEmail(mockNewEmail).subscribe((status: ChangeEmailStatusEnum) => {
      expect(status).toEqual(ChangeEmailStatusEnum.SUCCESS);
    });
  });

  it('should return INVALID status when try to set email with backend error IncorrectValidation', () => {
    const changeEmailViewComponentService = TestBed.get(ChangeEmailViewComponentService);

    (mockAccountService.putEmailRoute as jest.Mock).mockReturnValue(
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
    const changeEmailViewComponentService = TestBed.get(ChangeEmailViewComponentService);

    (mockAccountService.putEmailRoute as jest.Mock).mockReturnValue(
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
    const mockAlertService = TestBed.get(AlertService);
    const changeEmailViewComponentService = TestBed.get(ChangeEmailViewComponentService);

    (mockAccountService.putEmailRoute as jest.Mock).mockReturnValue(
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
    const mockAlertService = TestBed.get(AlertService);
    const changeEmailViewComponentService = TestBed.get(ChangeEmailViewComponentService);

    (mockAccountService.putEmailRoute as jest.Mock).mockReturnValue(throwError({}));

    changeEmailViewComponentService.changeEmail(mockNewEmail).subscribe((status: ChangeEmailStatusEnum) => {
      expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
      expect(status).toEqual(ChangeEmailStatusEnum.ERROR);
    });
  });
});
