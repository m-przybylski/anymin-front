// tslint:disable:max-file-line-count
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { Deceiver } from 'deceiver-core';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { AuthActions } from '@platform/core/actions';
import { LoginEffects } from '@platform/core/effects/login.effects';
import { SessionService, LoginCredentials } from '@anymind-ng/api';
import { Router } from '@angular/router';
import { AlertService, LoggerService } from '@anymind-ng/core';
import { provideMockFactoryLogger } from 'testing/testing';
import { RouterPaths } from '@platform/shared/routes/routes';
import { CallInvitationService } from '@platform/core/services/call/call-invitation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationInvitationService } from '@platform/shared/services/registration-invitation/registration-invitation.service';

describe('LoginEffects', () => {
  let loginEffects: LoginEffects;
  let sessionService: SessionService;
  let registrationInvitationService: RegistrationInvitationService;
  let callInvitationService: CallInvitationService;
  let actions$: Observable<any>;
  const loggerService: LoggerService = Deceiver(LoggerService, {
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginEffects,
        {
          provide: SessionService,
          useValue: Deceiver(SessionService, { checkRoute: jest.fn() }),
        },
        {
          provide: RegistrationInvitationService,
          useValue: Deceiver(RegistrationInvitationService, {
            removeInvitationForDifferentUser: jest.fn(),
            getInvitationObject: jest.fn(),
          }),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService, {
            pushDangerAlert: jest.fn(),
            closeAllAlerts: jest.fn(),
          }),
        },
        {
          provide: Router,
          useValue: Deceiver(Router, { navigate: jest.fn() }),
        },
        provideMockFactoryLogger(loggerService),
        provideMockActions(() => actions$),
        {
          provide: NgbModal,
          useValue: Deceiver(NgbModal, { dismissAll: jest.fn() }),
        },
        {
          provide: CallInvitationService,
          useValue: Deceiver(CallInvitationService, {
            unregisterFromPushNotifications: jest.fn(),
          }),
        },
      ],
    });

    loginEffects = TestBed.get(LoginEffects);
    sessionService = TestBed.get(SessionService);
    registrationInvitationService = TestBed.get(RegistrationInvitationService);
    actions$ = TestBed.get(Actions);
    callInvitationService = TestBed.get(CallInvitationService);
    (loggerService.error as jest.Mock).mockClear();
    (loggerService.warn as jest.Mock).mockClear();
    (loggerService.debug as jest.Mock).mockClear();
  });

  describe('login$', () => {
    it('should return a FetchSessionSuccessAction, with session if fetch succeeds', () => {
      const user: LoginCredentials = { msisdn: 'dog', password: 'woof' };
      const session = {} as any;
      const action = new AuthActions.LoginAction(user);
      const completionLoginSuccess = new AuthActions.LoginSuccessAction(session);
      const completionDashboardRedirect = new AuthActions.DashboardRedirectAction(session);

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: session });
      const expected = cold('--(bc)', { b: completionLoginSuccess, c: completionDashboardRedirect });
      sessionService.login = jest.fn().mockReturnValue(response);

      expect(loginEffects.login$).toBeObservable(expected);
    });

    it('should return a FetchSessionErrorAction, with error if fetch fails', () => {
      const user: LoginCredentials = { msisdn: 'dog', password: 'woof' };
      const error = 'Something went wrong';
      const action = new AuthActions.LoginAction(user);
      const completion = new AuthActions.LoginErrorAction(error);

      actions$ = hot('-a---', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--b', { b: completion });
      sessionService.login = jest.fn().mockReturnValue(response);

      expect(loginEffects.login$).toBeObservable(expected);
    });
  });
  describe('loginRedirect$', () => {
    it('should call router.navigate when action received', fakeAsync(() => {
      const two = 2;
      const router: Router = TestBed.get(Router);
      const action = new AuthActions.LoginRedirectAction();
      actions$ = of(action);
      (router.navigate as jest.Mock).mockReturnValue(Promise.resolve(true));
      loginEffects.loginRedirect$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
      });
      tick();
      expect(loggerService.debug).toHaveBeenCalledTimes(two);
    }));

    it('should call router.navigate when action received', fakeAsync(() => {
      const router: Router = TestBed.get(Router);
      const action = new AuthActions.LoginRedirectAction();
      actions$ = of(action);
      (router.navigate as jest.Mock).mockReturnValue(Promise.resolve(false));
      loginEffects.loginRedirect$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
      });
      tick();
      expect(loggerService.debug).toHaveBeenCalledTimes(1);
      expect(loggerService.warn).toHaveBeenCalledTimes(1);
    }));

    it('should call router.navigate when action received', fakeAsync(() => {
      const router: Router = TestBed.get(Router);
      const alertServide: AlertService = TestBed.get(AlertService);
      const action = new AuthActions.LoginRedirectAction();
      actions$ = of(action);
      (router.navigate as jest.Mock).mockReturnValue(Promise.reject('error'));
      loginEffects.loginRedirect$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
      });
      tick();
      expect(loggerService.debug).toHaveBeenCalledTimes(1);
      expect(loggerService.error).toHaveBeenCalledTimes(1);
      expect(alertServide.pushDangerAlert).toHaveBeenCalledTimes(1);
    }));
  });
  describe('logout$', () => {
    it('should return Auth.LogoutSuccessAction if logout is succeeded', () => {
      const action = new AuthActions.LogoutAction();
      const completion = new AuthActions.LogoutSuccessAction();

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: undefined });
      const pushResponse = cold('-|');
      const expected = cold('---c', { c: completion });
      sessionService.logoutCurrentRoute = jest.fn().mockReturnValue(response);
      (callInvitationService.unregisterFromPushNotifications as jest.Mock).mockReturnValue(pushResponse);

      expect(loginEffects.logout$).toBeObservable(expected);
    });
    it('should return Auth.LogoutErrorAction if logout is succeeded', () => {
      const error = 'Something went wrong';
      const action = new AuthActions.LogoutAction();
      const completion = new AuthActions.LogoutErrorAction(error);

      actions$ = hot('-a---', { a: action });
      const response = cold('-#', {}, error);
      const pushResponse = cold('-|');
      const expected = cold('---b', { b: completion });
      sessionService.logoutCurrentRoute = jest.fn().mockReturnValue(response);
      (callInvitationService.unregisterFromPushNotifications as jest.Mock).mockReturnValue(pushResponse);

      expect(loginEffects.logout$).toBeObservable(expected);
    });
  });
  describe('logoutSuccess$', () => {
    it('should return Auth.LoginRedirectAction', () => {
      const action = new AuthActions.LogoutSuccessAction();
      const completion = new AuthActions.LoginRedirectAction();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(loginEffects.logoutSuccess$).toBeObservable(expected);
    });
  });
  describe('logoutRemote$', () => {
    it('should return Auth.LoginRedirectAction', () => {
      const action = new AuthActions.LogoutRemoteAction();
      const completion = new AuthActions.LoginRedirectAction();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(loginEffects.logoutSuccess$).toBeObservable(expected);
    });
  });
  describe('dashboardRedirect$', () => {
    it('should call router.navigate when action received', fakeAsync(() => {
      const two = 2;
      const router: Router = TestBed.get(Router);
      const payload = { account: { email: 'spoko@janek.com' } } as any;
      const action = new AuthActions.DashboardRedirectAction(payload);
      actions$ = of(action);
      (router.navigate as jest.Mock).mockReturnValue(Promise.resolve(true));
      loginEffects.dashboardRedirect$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith([RouterPaths.dashboard.user.welcome.asPath]);
      });
      tick();
      expect(loggerService.debug).toHaveBeenCalledTimes(two);
    }));

    it('should call router.navigate when action received', fakeAsync(() => {
      const router: Router = TestBed.get(Router);
      const payload = { account: { email: 'spoko@janek.com' } } as any;
      const action = new AuthActions.DashboardRedirectAction(payload);
      actions$ = of(action);
      (router.navigate as jest.Mock).mockReturnValue(Promise.resolve(false));
      loginEffects.dashboardRedirect$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith([RouterPaths.dashboard.user.welcome.asPath]);
      });
      tick();
      expect(loggerService.debug).toHaveBeenCalledTimes(1);
      expect(loggerService.warn).toHaveBeenCalledTimes(1);
    }));

    it('should call router.navigate when action received', fakeAsync(() => {
      const router: Router = TestBed.get(Router);
      const payload = { account: { email: 'spoko@janek.com' } } as any;
      const alertService: AlertService = TestBed.get(AlertService);
      const action = new AuthActions.DashboardRedirectAction(payload);
      actions$ = of(action);
      (router.navigate as jest.Mock).mockReturnValue(Promise.reject('error'));
      loginEffects.dashboardRedirect$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith([RouterPaths.dashboard.user.welcome.asPath]);
      });
      tick();
      expect(loggerService.debug).toHaveBeenCalledTimes(1);
      expect(loggerService.error).toHaveBeenCalledTimes(1);
      expect(alertService.pushDangerAlert).toHaveBeenCalledTimes(1);
    }));

    it('should call navigate to invitations when action received and there is invitation object in local storage', fakeAsync(() => {
      const two = 2;
      const router: Router = TestBed.get(Router);
      const payload = { account: { email: 'spoko@janek.com' } } as any;
      const action = new AuthActions.DashboardRedirectAction(payload);
      actions$ = of(action);
      (router.navigate as jest.Mock).mockReturnValue(Promise.resolve(true));
      (registrationInvitationService.getInvitationObject as jest.Mock).mockReturnValue({ invitationId: '123' });
      loginEffects.dashboardRedirect$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith([RouterPaths.dashboard.user.invitations.asPath]);
      });
      tick();
      expect(loggerService.debug).toHaveBeenCalledTimes(two);
    }));
  });
});
