import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RegistrationService } from '@anymind-ng/api';
import { ActivatedRoute, Router } from '@angular/router';
import createSpyObj = jasmine.createSpyObj;
import { Alerts, AlertService, LoggerService } from '@anymind-ng/core';
import { PinCodeServiceStatus, PinCodeViewService } from './pin-code.view.service';
import { of, throwError } from 'rxjs';
import { BackendErrors } from '../../../../shared/models/backend-error/backend-error';
import { provideMockFactoryLogger } from 'testing/testing';
import { Deceiver } from 'deceiver-core';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import { EventsService } from 'angularjs/common/services/events/events.service';

describe('Service: PinCode service', () => {
  const mockPhoneNumber = '+48555555555';
  let mockRegistrationService: RegistrationService;
  let pinCodeViewService: PinCodeViewService;
  let mockAlertService: AlertService;
  let router: Router;
  let logger: LoggerService;

  beforeEach(async(() => {
    logger = Deceiver(LoggerService);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
        }),
      ],
      providers: [
        PinCodeViewService,
        provideMockFactoryLogger(logger),
        { provide: ActivatedRoute, useValue: createSpyObj('ActivatedRoute', ['params']) },
        { provide: RegistrationService, useValue: createSpyObj('RegistrationService', ['confirmVerificationRoute']) },
        { provide: AlertService, useValue: createSpyObj('AlertService', ['pushDangerAlert']) },
        { provide: Router, useValue: createSpyObj('Router', ['navigate']) },
        { provide: EventsService, useValue: Deceiver(EventsService, { emit: jasmine.createSpy('') }) },
      ],
    });
    TestBed.get(ActivatedRoute).params = of({ msisdn: mockPhoneNumber });
    pinCodeViewService = TestBed.get(PinCodeViewService);
    router = TestBed.get(Router);
    mockRegistrationService = TestBed.get(RegistrationService);
    mockAlertService = TestBed.get(AlertService);
  }));

  it('should redirect user to set password', fakeAsync(() => {
    (mockRegistrationService.confirmVerificationRoute as jasmine.Spy).and.returnValue(
      of({
        accountId: '12',
      }),
    );
    pinCodeViewService.handleRegistration('123', 'token').subscribe();
    tick();
    expect(router.navigate).toHaveBeenCalledWith(['/account/set-password']);
  }));

  it('should not be able to redirect user to set password and display alert to user', fakeAsync(() => {
    (mockRegistrationService.confirmVerificationRoute as jasmine.Spy).and.returnValue(
      of({
        accountId: '12',
      }),
    );
    (router.navigate as jasmine.Spy).and.returnValue(Promise.resolve(false));
    spyOn(logger, 'warn');

    pinCodeViewService.handleRegistration('123', 'token').subscribe();
    tick();
    expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrongWithRedirect);
    expect(logger.warn).toHaveBeenCalledWith('Error when redirect to account/set-password');
  }));

  it('should display error if user try to create another token', fakeAsync(() => {
    (mockRegistrationService.confirmVerificationRoute as jasmine.Spy).and.returnValue(
      throwError({
        error: {
          code: BackendErrors.CreateAnotherPinCodeTokenRecently,
          error: {},
          message: 'errorMessage',
        },
      }),
    );
    (router.navigate as jasmine.Spy).and.returnValue(Promise.resolve(false));

    pinCodeViewService.handleRegistration('123', 'token').subscribe();
    tick();
    expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.CreateAnotherPinCodeTokenTooRecently);
  }));

  it('should display error if user try to send pin code too recently', fakeAsync(() => {
    (mockRegistrationService.confirmVerificationRoute as jasmine.Spy).and.returnValue(
      throwError({
        error: {
          code: BackendErrors.PincodeSentTooRecently,
          error: {},
          message: 'errorMessage',
        },
      }),
    );
    (router.navigate as jasmine.Spy).and.returnValue(Promise.resolve(false));

    pinCodeViewService.handleRegistration('123', 'token').subscribe();
    tick();
    expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.PincodeSentTooRecently);
  }));

  it('should return status incorrect verification of token', fakeAsync(() => {
    (mockRegistrationService.confirmVerificationRoute as jasmine.Spy).and.returnValue(
      throwError({
        error: {
          code: BackendErrors.MsisdnVerificationTokenIncorrect,
          error: {},
          message: 'errorMessage',
        },
      }),
    );
    (router.navigate as jasmine.Spy).and.returnValue(Promise.resolve(false));
    pinCodeViewService.handleRegistration('123', 'token').subscribe(
      _ => _,
      (error: PinCodeServiceStatus) => {
        expect(error).toBe(PinCodeServiceStatus.MSISDN_VERIFICATION_TOKEN_INCORRECT);
      },
    );
    tick();
  }));

  it('should return status can not find the token ', fakeAsync(() => {
    (mockRegistrationService.confirmVerificationRoute as jasmine.Spy).and.returnValue(
      throwError({
        error: {
          code: BackendErrors.CannotFindMsisdnToken,
          error: {},
          message: 'errorMessage',
        },
      }),
    );
    (router.navigate as jasmine.Spy).and.returnValue(Promise.resolve(false));

    pinCodeViewService.handleRegistration('123', 'token').subscribe(
      _ => _,
      (error: PinCodeServiceStatus) => {
        expect(error).toBe(PinCodeServiceStatus.CAN_NOT_FIND_MSISDN_TOKEN);
      },
    );
    tick();
  }));

  it('should return status incorrect validation', fakeAsync(() => {
    (mockRegistrationService.confirmVerificationRoute as jasmine.Spy).and.returnValue(
      throwError({
        error: {
          code: BackendErrors.IncorrectValidation,
          error: {},
          message: 'errorMessage',
        },
      }),
    );
    (router.navigate as jasmine.Spy).and.returnValue(Promise.resolve(false));

    pinCodeViewService.handleRegistration('123', 'token').subscribe(
      _ => _,
      (error: PinCodeServiceStatus) => {
        expect(error).toBe(PinCodeServiceStatus.INVALID);
      },
    );
    tick();
  }));

  it('should return status too many msisdn token attempts', fakeAsync(() => {
    (mockRegistrationService.confirmVerificationRoute as jasmine.Spy).and.returnValue(
      throwError({
        error: {
          code: BackendErrors.TooManyMsisdnTokenAttempts,
          error: {},
          message: 'errorMessage',
        },
      }),
    );
    (router.navigate as jasmine.Spy).and.returnValue(Promise.resolve(false));

    pinCodeViewService.handleRegistration('123', 'token').subscribe(
      _ => _,
      (error: PinCodeServiceStatus) => {
        expect(error).toBe(PinCodeServiceStatus.TOO_MANY_MSISDN_TOKEN_ATTEMPTS);
      },
    );
    tick();
  }));

  it('should display alert and return error status on unhandled backend error', fakeAsync(() => {
    (mockRegistrationService.confirmVerificationRoute as jasmine.Spy).and.returnValue(
      throwError({
        error: {
          code: 123,
          error: {},
          message: 'errorMessage',
        },
      }),
    );
    (router.navigate as jasmine.Spy).and.returnValue(Promise.resolve(false));
    pinCodeViewService.handleRegistration('123', 'token').subscribe(
      _ => _,
      (error: PinCodeServiceStatus) => {
        expect(error).toBe(PinCodeServiceStatus.ERROR);
      },
    );
    tick();
    expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
  }));

  it('should display alert and return error status on undefined errors from backend', fakeAsync(() => {
    (mockRegistrationService.confirmVerificationRoute as jasmine.Spy).and.returnValue(
      throwError({
        error: {},
      }),
    );
    (router.navigate as jasmine.Spy).and.returnValue(Promise.resolve(false));

    pinCodeViewService.handleRegistration('123', 'token').subscribe(
      _ => _,
      (error: PinCodeServiceStatus) => {
        expect(error).toBe(PinCodeServiceStatus.ERROR);
      },
    );
    tick();
    expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
  }));
});
