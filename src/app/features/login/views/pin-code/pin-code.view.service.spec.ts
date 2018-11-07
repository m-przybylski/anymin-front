// tslint:disable:max-file-line-count
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AccountService, RegistrationService } from '@anymind-ng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Alerts, AlertService, LoggerService } from '@anymind-ng/core';
import { PinCodeServiceStatus, PinCodeViewService } from './pin-code.view.service';
import { of, throwError } from 'rxjs';
import { BackendErrors } from '../../../../shared/models/backend-error/backend-error';
import { provideMockFactoryLogger } from 'testing/testing';
import { Deceiver } from 'deceiver-core';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import { SessionActions } from '@platform/core/actions';
import * as fromCore from '@platform/core/reducers';

describe('Service: PinCode service', () => {
  const mockPhoneNumber = '+48555555555';
  let mockRegistrationService: RegistrationService;
  let pinCodeViewService: PinCodeViewService;
  let mockAlertService: AlertService;
  let router: Router;
  let logger: LoggerService;
  let store: Store<any>;
  let dispatchSpy: jasmine.Spy;
  let accountService: AccountService;
  beforeEach(async(() => {
    logger = Deceiver(LoggerService);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          core: combineReducers(fromCore.reducers),
        }),
      ],
      providers: [
        PinCodeViewService,
        provideMockFactoryLogger(logger),
        { provide: ActivatedRoute, useValue: jasmine.createSpyObj('ActivatedRoute', ['params']) },
        {
          provide: RegistrationService,
          useValue: Deceiver(RegistrationService),
        },
        { provide: AlertService, useValue: jasmine.createSpyObj('AlertService', ['pushDangerAlert']) },
        { provide: AccountService, useValue: Deceiver(AccountService) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
      ],
    });
    TestBed.get(ActivatedRoute).params = of({ msisdn: mockPhoneNumber });
    pinCodeViewService = TestBed.get(PinCodeViewService);
    router = TestBed.get(Router);
    accountService = TestBed.get(AccountService);
    mockRegistrationService = TestBed.get(RegistrationService);
    mockAlertService = TestBed.get(AlertService);
    store = TestBed.get(Store);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
  }));

  it('should redirect user to set password', fakeAsync(() => {
    accountService.putMarketingSettingsRoute = jasmine.createSpy('putMarketingSettingsRoute').and.returnValue(of({}));
    mockRegistrationService.confirmVerificationRoute = jasmine.createSpy('confirmVerificationRoute').and.returnValue(
      of({
        session: {
          accountId: '12',
        },
      }),
    );
    const action = new SessionActions.FetchSessionSuccessAction(of({ session: {} }) as any);
    store.dispatch(action);
    (router.navigate as jasmine.Spy).and.returnValue(Promise.resolve(true));
    pinCodeViewService.handleRegistration('123', 'token').subscribe();
    tick();
    expect(router.navigate).toHaveBeenCalledWith(['/account/set-password']);
  }));

  it('should not be able to redirect user to set password and display alert to user', fakeAsync(() => {
    accountService.putMarketingSettingsRoute = jasmine.createSpy('putMarketingSettingsRoute').and.returnValue(of({}));
    mockRegistrationService.confirmVerificationRoute = jasmine.createSpy('confirmVerificationRoute').and.returnValue(
      of({
        session: {
          accountId: '12',
        },
      }),
    );
    const action = new SessionActions.FetchSessionSuccessAction(of({ session: {} }) as any);
    store.dispatch(action);
    (router.navigate as jasmine.Spy).and.returnValue(Promise.resolve(false));
    spyOn(logger, 'warn');

    pinCodeViewService.handleRegistration('123', 'token').subscribe();
    tick();
    expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrongWithRedirect);
    expect(logger.warn).toHaveBeenCalledWith('Error when redirect to account/set-password');
  }));

  it('should display error if user try to create another token', fakeAsync(() => {
    mockRegistrationService.confirmVerificationRoute = jasmine.createSpy('confirmVerificationRoute').and.returnValue(
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
    mockRegistrationService.confirmVerificationRoute = jasmine.createSpy('confirmVerificationRoute').and.returnValue(
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
    mockRegistrationService.confirmVerificationRoute = jasmine.createSpy('confirmVerificationRoute').and.returnValue(
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
    mockRegistrationService.confirmVerificationRoute = jasmine.createSpy('confirmVerificationRoute').and.returnValue(
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
    mockRegistrationService.confirmVerificationRoute = jasmine.createSpy('confirmVerificationRoute').and.returnValue(
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
    mockRegistrationService.confirmVerificationRoute = jasmine.createSpy('confirmVerificationRoute').and.returnValue(
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
    mockRegistrationService.confirmVerificationRoute = jasmine.createSpy('confirmVerificationRoute').and.returnValue(
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
    mockRegistrationService.confirmVerificationRoute = jasmine.createSpy('confirmVerificationRoute').and.returnValue(
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
