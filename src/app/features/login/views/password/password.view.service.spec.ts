// tslint:disable:no-empty
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RegistrationService } from '@anymind-ng/api';
import { Router } from '@angular/router';
import createSpyObj = jasmine.createSpyObj;
import { AlertService, LoggerFactory } from '@anymind-ng/core';
import {
  RegistrationInvitationService
} from '../../../../shared/services/registration-invitation/registration-invitation.service';
import { PasswordLoginStatus, PasswordViewService } from './password.view.service';
import { LocalStorageWrapperService } from '../../../../shared/services/local-storage/local-storage.service';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';

describe('Service: PasswordService', () => {

  const correctPhoneNumber = '+48555555555';
  const correctPassword = 'Password1234';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PasswordViewService,
        {provide: RegistrationService, useValue: createSpyObj('RegistrationService', ['checkRegistrationStatusRoute'])},
        {provide: AlertService, useValue: createSpyObj('AlertService', ['pushDangerAlert'])},
        {provide: LoggerFactory, useValue: createSpyObj('LoggerFactory', ['createLoggerService'])},
        {provide: UserSessionService, useValue: createSpyObj('UserSessionService', ['login'])},
        {provide: LocalStorageWrapperService, useValue: createSpyObj('LocalStorageWrapperService', ['removeItem'])},
        {
          provide: RegistrationInvitationService,
          useValue: createSpyObj('RegistrationInvitationService', ['getInvitationObject'])
        },
        {provide: Router, useValue: createSpyObj('Router', ['navigate'])}
      ]
    });
    TestBed.get(LoggerFactory).createLoggerService.and.returnValue({
      warn: (): void => {
      },
      error: (): void => {
      }
    });
  });

  it('should return TOO_MANY_ATTEMPTS status when user login unsuccessful too many times', fakeAsync(() => {
    const passwordService = TestBed.get(PasswordViewService);
    const userSessionService = TestBed.get(UserSessionService);
    const registrationService = TestBed.get(RegistrationInvitationService);
    const expectedStatus: PasswordLoginStatus = PasswordLoginStatus.TOO_MANY_ATTEMPTS;

    userSessionService.login.and.returnValue(Promise.reject({error: {code: 345, message: 'errorMessage'}}));
    registrationService.getInvitationObject.and.returnValue({});
    passwordService.login(correctPhoneNumber, correctPassword).then((status: PasswordLoginStatus) => {
      expect(status).toEqual(expectedStatus);
    });
    tick();
  }));

  it('should return WRONG_PASSWORD status when password does not match regexp', fakeAsync(() => {
    const passwordService = TestBed.get(PasswordViewService);
    const userSessionService = TestBed.get(UserSessionService);
    const registrationService = TestBed.get(RegistrationInvitationService);
    const expectedStatus: PasswordLoginStatus = PasswordLoginStatus.WRONG_PASSWORD;

    userSessionService.login.and.returnValue(Promise.reject({error: {code: 200, message: 'errorMessage'}}));
    registrationService.getInvitationObject.and.returnValue({});
    passwordService.login(correctPhoneNumber, correctPassword).then((status: PasswordLoginStatus) => {
      expect(status).toEqual(expectedStatus);
    });
    tick();
  }));

  it('should return WRONG_PASSWORD status when password is wrong', fakeAsync(() => {
    const passwordService = TestBed.get(PasswordViewService);
    const userSessionService = TestBed.get(UserSessionService);
    const registrationService = TestBed.get(RegistrationInvitationService);
    const expectedStatus: PasswordLoginStatus = PasswordLoginStatus.WRONG_PASSWORD;

    userSessionService.login.and.returnValue(Promise.reject({error: {code: 101, message: 'errorMessage'}}));
    registrationService.getInvitationObject.and.returnValue({});
    passwordService.login(correctPhoneNumber, correctPassword).then((status: PasswordLoginStatus) => {
      expect(status).toEqual(expectedStatus);
    });
    tick();
  }));

  it('should return ERROR status when backend error is unhandled', fakeAsync(() => {
    const passwordService = TestBed.get(PasswordViewService);
    const userSessionService = TestBed.get(UserSessionService);
    const registrationService = TestBed.get(RegistrationInvitationService);
    const expectedStatus: PasswordLoginStatus = PasswordLoginStatus.ERROR;

    userSessionService.login.and.returnValue(Promise.reject({error: {code: 0, message: 'errorMessage'}}));
    registrationService.getInvitationObject.and.returnValue({});
    passwordService.login(correctPhoneNumber, correctPassword).then((status: PasswordLoginStatus) => {
      expect(status).toEqual(expectedStatus);
    });
    tick();
  }));

  it('should return ERROR status when login fails', fakeAsync(() => {
    const passwordService = TestBed.get(PasswordViewService);
    const userSessionService = TestBed.get(UserSessionService);
    const registrationService = TestBed.get(RegistrationInvitationService);
    const expectedStatus: PasswordLoginStatus = PasswordLoginStatus.ERROR;

    userSessionService.login.and.returnValue(Promise.reject(Error('error')));
    registrationService.getInvitationObject.and.returnValue({});
    passwordService.login(correctPhoneNumber, correctPassword).then((status: PasswordLoginStatus) => {
      expect(status).toEqual(expectedStatus);
    });
    tick();
  }));

});
