// tslint:disable:no-empty
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RegistrationService } from '@anymind-ng/api';
import { ActivatedRoute, Router } from '@angular/router';
import createSpyObj = jasmine.createSpyObj;
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';
import { PinCodeServiceStatus, PinCodeViewService } from './pin-code.view.service';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { BackendErrors } from '../../../../shared/models/backend-error/backend-error';
import { EventsService } from '../../../../../angularjs/common/services/events/events.service';

// tslint:disable:max-file-line-count
// tslint:disable:no-unbound-method
describe('Service: PinCode service', () => {

  const mockPhoneNumber = '+48555555555';
  const logger: LoggerService = new LoggerService(1);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        PinCodeViewService,
        {provide: ActivatedRoute, useValue: createSpyObj('ActivatedRoute', ['params'])},
        {provide: RegistrationService, useValue: createSpyObj('RegistrationService', ['confirmVerificationRoute'])},
        {provide: AlertService, useValue: createSpyObj('AlertService', ['pushDangerAlert'])},
        {provide: LoggerFactory, useValue: createSpyObj('LoggerFactory', ['createLoggerService'])},
        {provide: UserSessionService, useValue: createSpyObj('UserSessionService', ['getSession'])},
        {provide: Router, useValue: createSpyObj('Router', ['navigate'])},
        {provide: EventsService, useValue: createSpyObj('EventsService', ['emit'])}
      ]
    });
    TestBed.get(LoggerFactory).createLoggerService.and.returnValue(logger);
    TestBed.get(ActivatedRoute).params = of({msisdn: mockPhoneNumber});
  }));

  it('should redirect user to set password', fakeAsync(() => {
    const mockRegistrationService = TestBed.get(RegistrationService);
    const mockUserSessionService = TestBed.get(UserSessionService);
    const pinCodeViewService = TestBed.get(PinCodeViewService);
    const router = TestBed.get(Router);

    mockRegistrationService.confirmVerificationRoute.and.returnValue(of({
      accountId: '12'
    }));

    router.navigate.and.returnValue(Promise.resolve(true));

    mockUserSessionService.getSession.and.returnValue(Promise.resolve({}));

    pinCodeViewService.handleRegistration('123', 'token').subscribe();
    tick();
    expect(router.navigate).toHaveBeenCalledWith(['/account/set-password']);

  }));

  it('should not be able to redirect user to set password and display alert to user', fakeAsync(() => {
    const mockRegistrationService = TestBed.get(RegistrationService);
    const mockUserSessionService = TestBed.get(UserSessionService);
    const pinCodeViewService = TestBed.get(PinCodeViewService);
    const router = TestBed.get(Router);
    const mockAlertService = TestBed.get(AlertService);

    mockRegistrationService.confirmVerificationRoute.and.returnValue(of({
      accountId: '12'
    }));
    router.navigate.and.returnValue(Promise.resolve(false));
    mockUserSessionService.getSession.and.returnValue(Promise.resolve({}));
    spyOn(logger, 'warn');

    pinCodeViewService.handleRegistration('123', 'token').subscribe();
    tick();
    expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrongWithRedirect);
    expect(logger.warn).toHaveBeenCalledWith('Error when redirect to account/set-password');

  }));

  it('should display error if user try to create another token', fakeAsync(() => {
    const mockRegistrationService = TestBed.get(RegistrationService);
    const mockUserSessionService = TestBed.get(UserSessionService);
    const pinCodeViewService = TestBed.get(PinCodeViewService);
    const router = TestBed.get(Router);
    const mockAlertService = TestBed.get(AlertService);

    mockRegistrationService.confirmVerificationRoute.and.returnValue(_throw({
      error: {
        code: BackendErrors.CreateAnotherPinCodeTokenRecently,
        error: {},
        message: 'errorMessage'
      }
    }));
    router.navigate.and.returnValue(Promise.resolve(false));
    mockUserSessionService.getSession.and.returnValue(Promise.resolve({}));

    pinCodeViewService.handleRegistration('123', 'token').subscribe(() => {
    }, () => {
      expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.CreateAnotherPinCodeTokenTooRecently);
    });
    tick();
  }));

  it('should display error if user try to send pin code too recently', fakeAsync(() => {
    const mockRegistrationService = TestBed.get(RegistrationService);
    const mockUserSessionService = TestBed.get(UserSessionService);
    const pinCodeViewService = TestBed.get(PinCodeViewService);
    const router = TestBed.get(Router);
    const mockAlertService = TestBed.get(AlertService);

    mockRegistrationService.confirmVerificationRoute.and.returnValue(_throw({
      error: {
        code: BackendErrors.PincodeSentTooRecently,
        error: {},
        message: 'errorMessage'
      }
    }));
    router.navigate.and.returnValue(Promise.resolve(false));
    mockUserSessionService.getSession.and.returnValue(Promise.resolve({}));

    pinCodeViewService.handleRegistration('123', 'token').subscribe(() => {
    }, () => {
      expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.PincodeSentTooRecently);
    });
    tick();
  }));

  it('should return status incorrect verification of token', fakeAsync(() => {
    const mockRegistrationService = TestBed.get(RegistrationService);
    const mockUserSessionService = TestBed.get(UserSessionService);
    const pinCodeViewService = TestBed.get(PinCodeViewService);
    const router = TestBed.get(Router);

    mockRegistrationService.confirmVerificationRoute.and.returnValue(_throw({
      error: {
        code: BackendErrors.MsisdnVerificationTokenIncorrect,
        error: {},
        message: 'errorMessage'
      }
    }));
    router.navigate.and.returnValue(Promise.resolve(false));
    mockUserSessionService.getSession.and.returnValue(Promise.resolve({}));

    pinCodeViewService.handleRegistration('123', 'token').subscribe(() => {
    }, (error: PinCodeServiceStatus) => {
      expect(error).toBe(PinCodeServiceStatus.MSISDN_VERIFICATION_TOKEN_INCORRECT);
    });
    tick();
  }));

  it('should return status can not find the token ', fakeAsync(() => {
    const mockRegistrationService = TestBed.get(RegistrationService);
    const mockUserSessionService = TestBed.get(UserSessionService);
    const pinCodeViewService = TestBed.get(PinCodeViewService);
    const router = TestBed.get(Router);

    mockRegistrationService.confirmVerificationRoute.and.returnValue(_throw({
      error: {
        code: BackendErrors.CannotFindMsisdnToken,
        error: {},
        message: 'errorMessage'
      }
    }));
    router.navigate.and.returnValue(Promise.resolve(false));
    mockUserSessionService.getSession.and.returnValue(Promise.resolve({}));

    pinCodeViewService.handleRegistration('123', 'token').subscribe(() => {
    }, (error: PinCodeServiceStatus) => {
      expect(error).toBe(PinCodeServiceStatus.CAN_NOT_FIND_MSISDN_TOKEN);
    });
    tick();
  }));

  it('should return status incorrect validation', fakeAsync(() => {
    const mockRegistrationService = TestBed.get(RegistrationService);
    const mockUserSessionService = TestBed.get(UserSessionService);
    const pinCodeViewService = TestBed.get(PinCodeViewService);
    const router = TestBed.get(Router);

    mockRegistrationService.confirmVerificationRoute.and.returnValue(_throw({
      error: {
        code: BackendErrors.IncorrectValidation,
        error: {},
        message: 'errorMessage'
      }
    }));
    router.navigate.and.returnValue(Promise.resolve(false));
    mockUserSessionService.getSession.and.returnValue(Promise.resolve({}));

    pinCodeViewService.handleRegistration('123', 'token').subscribe(() => {
    }, (error: PinCodeServiceStatus) => {
      expect(error).toBe(PinCodeServiceStatus.INVALID);
    });
    tick();
  }));

  it('should return status too many msisdn token attempts', fakeAsync(() => {
    const mockRegistrationService = TestBed.get(RegistrationService);
    const mockUserSessionService = TestBed.get(UserSessionService);
    const pinCodeViewService = TestBed.get(PinCodeViewService);
    const router = TestBed.get(Router);

    mockRegistrationService.confirmVerificationRoute.and.returnValue(_throw({
      error: {
        code: BackendErrors.TooManyMsisdnTokenAttempts,
        error: {},
        message: 'errorMessage'
      }
    }));
    router.navigate.and.returnValue(Promise.resolve(false));
    mockUserSessionService.getSession.and.returnValue(Promise.resolve({}));

    pinCodeViewService.handleRegistration('123', 'token').subscribe(() => {
    }, (error: PinCodeServiceStatus) => {
      expect(error).toBe(PinCodeServiceStatus.TOO_MANY_MSISDN_TOKEN_ATTEMPTS);
    });
    tick();
  }));

  it('should display alert and return error status on unhandled backend error', fakeAsync(() => {
    const mockRegistrationService = TestBed.get(RegistrationService);
    const mockUserSessionService = TestBed.get(UserSessionService);
    const pinCodeViewService = TestBed.get(PinCodeViewService);
    const router = TestBed.get(Router);
    const mockAlertService = TestBed.get(AlertService);

    mockRegistrationService.confirmVerificationRoute.and.returnValue(_throw({
      error: {
        code: 123,
        error: {},
        message: 'errorMessage'
      }
    }));
    router.navigate.and.returnValue(Promise.resolve(false));
    mockUserSessionService.getSession.and.returnValue(Promise.resolve({}));

    pinCodeViewService.handleRegistration('123', 'token').subscribe(() => {
    }, (error: PinCodeServiceStatus) => {
      expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
      expect(error).toBe(PinCodeServiceStatus.ERROR);
    });
    tick();
  }));

  it('should display alert and return error status on undefined errors from backend', fakeAsync(() => {
    const mockRegistrationService = TestBed.get(RegistrationService);
    const mockUserSessionService = TestBed.get(UserSessionService);
    const pinCodeViewService = TestBed.get(PinCodeViewService);
    const router = TestBed.get(Router);
    const mockAlertService = TestBed.get(AlertService);

    mockRegistrationService.confirmVerificationRoute.and.returnValue(_throw({
      error: {}
    }));
    router.navigate.and.returnValue(Promise.resolve(false));
    mockUserSessionService.getSession.and.returnValue(Promise.resolve({}));

    pinCodeViewService.handleRegistration('123', 'token').subscribe(() => {
    }, (error: PinCodeServiceStatus) => {
      expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
      expect(error).toBe(PinCodeServiceStatus.ERROR);
    });
    tick();
  }));
});
