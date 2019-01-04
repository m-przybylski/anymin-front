// tslint:disable:no-empty
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RegistrationService } from '@anymind-ng/api';
import { Router } from '@angular/router';
import { AlertService, LoggerFactory } from '@anymind-ng/core';
import { RegistrationInvitationService } from '../../../../shared/services/registration-invitation/registration-invitation.service';
import { PasswordLoginStatus, PasswordViewService } from './password.view.service';
import { LocalStorageWrapperService } from '../../../../shared/services/local-storage/local-storage.service';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { throwError } from 'rxjs';
import { Deceiver } from 'deceiver-core';
import { provideMockFactoryLogger } from 'testing/testing';

describe('Service: PasswordService', () => {
  const correctPhoneNumber = '+48555555555';
  const correctPassword = 'Password1234';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PasswordViewService,
        {
          provide: RegistrationService,
          useValue: Deceiver(RegistrationService, { checkRegistrationStatusRoute: jest.fn() }),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService, { pushDangerAlert: jest.fn() }),
        },
        provideMockFactoryLogger(),
        {
          provide: UserSessionService,
          useValue: Deceiver(UserSessionService, { login: jest.fn() }),
        },
        {
          provide: LocalStorageWrapperService,
          useValue: Deceiver(LocalStorageWrapperService, { removeItem: jest.fn() }),
        },
        {
          provide: RegistrationInvitationService,
          useValue: Deceiver(RegistrationInvitationService, { getInvitationObject: jest.fn() }),
        },
        { provide: Router, useValue: Deceiver(Router, { navigate: jest.fn() }) },
      ],
    });
    TestBed.get(LoggerFactory).createLoggerService.mockReturnValue({
      warn: (): void => {},
      error: (): void => {},
    });
  });

  it('should return TOO_MANY_ATTEMPTS status when user login unsuccessful too many times', fakeAsync(() => {
    const passwordService = TestBed.get(PasswordViewService);
    const userSessionService = TestBed.get(UserSessionService);
    const registrationService = TestBed.get(RegistrationInvitationService);
    const expectedStatus: PasswordLoginStatus = PasswordLoginStatus.TOO_MANY_ATTEMPTS;

    userSessionService.login.mockReturnValue(throwError({ error: { code: 345, message: 'errorMessage' } }));
    registrationService.getInvitationObject.mockReturnValue({});
    passwordService.login(correctPhoneNumber, correctPassword).subscribe((status: PasswordLoginStatus) => {
      expect(status).toEqual(expectedStatus);
    });
    tick();
  }));

  it('should return WRONG_PASSWORD status when password does not match regexp', fakeAsync(() => {
    const passwordService = TestBed.get(PasswordViewService);
    const userSessionService = TestBed.get(UserSessionService);
    const registrationService = TestBed.get(RegistrationInvitationService);
    const expectedStatus: PasswordLoginStatus = PasswordLoginStatus.WRONG_PASSWORD;

    userSessionService.login.mockReturnValue(throwError({ error: { code: 200, message: 'errorMessage' } }));
    registrationService.getInvitationObject.mockReturnValue({});
    passwordService.login(correctPhoneNumber, correctPassword).subscribe((status: PasswordLoginStatus) => {
      expect(status).toEqual(expectedStatus);
    });
    tick();
  }));

  it('should return WRONG_PASSWORD status when password is wrong', fakeAsync(() => {
    const passwordService = TestBed.get(PasswordViewService);
    const userSessionService = TestBed.get(UserSessionService);
    const registrationService = TestBed.get(RegistrationInvitationService);
    const expectedStatus: PasswordLoginStatus = PasswordLoginStatus.WRONG_PASSWORD;

    userSessionService.login.mockReturnValue(throwError({ error: { code: 101, message: 'errorMessage' } }));
    registrationService.getInvitationObject.mockReturnValue({});
    passwordService.login(correctPhoneNumber, correctPassword).subscribe((status: PasswordLoginStatus) => {
      expect(status).toEqual(expectedStatus);
    });
    tick();
  }));

  it('should return ERROR status when backend error is unhandled', fakeAsync(() => {
    const passwordService = TestBed.get(PasswordViewService);
    const userSessionService = TestBed.get(UserSessionService);
    const registrationService = TestBed.get(RegistrationInvitationService);
    const expectedStatus: PasswordLoginStatus = PasswordLoginStatus.ERROR;

    userSessionService.login.mockReturnValue(throwError({ error: { code: 0, message: 'errorMessage' } }));
    registrationService.getInvitationObject.mockReturnValue({});
    passwordService.login(correctPhoneNumber, correctPassword).subscribe((status: PasswordLoginStatus) => {
      expect(status).toEqual(expectedStatus);
    });
    tick();
  }));

  it('should return ERROR status when login fails', fakeAsync(() => {
    const passwordService = TestBed.get(PasswordViewService);
    const userSessionService = TestBed.get(UserSessionService);
    const registrationService = TestBed.get(RegistrationInvitationService);
    const expectedStatus: PasswordLoginStatus = PasswordLoginStatus.ERROR;

    userSessionService.login.mockReturnValue(throwError(Error('error')));
    registrationService.getInvitationObject.mockReturnValue({});
    passwordService.login(correctPhoneNumber, correctPassword).subscribe((status: PasswordLoginStatus) => {
      expect(status).toEqual(expectedStatus);
    });
    tick();
  }));
});
