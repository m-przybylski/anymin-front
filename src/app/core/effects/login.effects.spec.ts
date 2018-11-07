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
import { ModalStack } from '@platform/core/services/modal/modal.service';
import { RouterPaths } from '@platform/shared/routes/routes';

describe('LoginEffects', () => {
  let loginEffects: LoginEffects;
  let sessionService: SessionService;
  let actions$: Observable<any>;
  const loggerService: LoggerService = Deceiver(LoggerService, {
    debug: jasmine.createSpy(''),
    warn: jasmine.createSpy(''),
    error: jasmine.createSpy(''),
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginEffects,
        {
          provide: SessionService,
          useValue: Deceiver(SessionService, { checkRoute: jasmine.createSpy('SessionService.login') }),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService, {
            pushDangerAlert: jasmine.createSpy('pushDangerAlert'),
            closeAllAlerts: jasmine.createSpy('closeAllAlerts'),
          }),
        },
        {
          provide: Router,
          useValue: Deceiver(Router, { navigate: jasmine.createSpy('') }),
        },
        provideMockFactoryLogger(loggerService),
        provideMockActions(() => actions$),
        {
          provide: ModalStack,
          useValue: Deceiver(ModalStack, { dismissAll: jasmine.createSpy('dismissAll') }),
        },
      ],
    });

    loginEffects = TestBed.get(LoginEffects);
    sessionService = TestBed.get(SessionService);
    actions$ = TestBed.get(Actions);
    (loggerService.error as jasmine.Spy).calls.reset();
    (loggerService.warn as jasmine.Spy).calls.reset();
    (loggerService.debug as jasmine.Spy).calls.reset();
  });

  describe('login$', () => {
    it('should return a FetchSessionSuccessAction, with session if fetch succeeds', () => {
      const user: LoginCredentials = { msisdn: 'dog', password: 'woof' };
      const session = {} as any;
      const action = new AuthActions.LoginAction(user);
      const completion = new AuthActions.LoginSuccessAction(session);

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: session });
      const expected = cold('--b', { b: completion });
      sessionService.login = jasmine.createSpy('').and.returnValue(response);

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
      sessionService.login = jasmine.createSpy('').and.returnValue(response);

      expect(loginEffects.login$).toBeObservable(expected);
    });
  });
  describe('loginRedirect$', () => {
    it('should call router.navigate when action received', fakeAsync(() => {
      const two = 2;
      const router: Router = TestBed.get(Router);
      const action = new AuthActions.LoginRedirectAction();
      actions$ = of(action);
      (router.navigate as jasmine.Spy).and.returnValue(Promise.resolve(true));
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
      (router.navigate as jasmine.Spy).and.returnValue(Promise.resolve(false));
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
      (router.navigate as jasmine.Spy).and.returnValue(Promise.reject('error'));
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
    it('should return Auth.LogoutSuccessAction if logout is succeded', () => {
      const action = new AuthActions.LogoutAction();
      const completion = new AuthActions.LogoutSuccessAction();

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: undefined });
      const expected = cold('--b', { b: completion });
      sessionService.logoutCurrentRoute = jasmine.createSpy('').and.returnValue(response);

      expect(loginEffects.logout$).toBeObservable(expected);
    });
    it('should return Auth.LogoutSuccessAction if logout is succeded', () => {
      const error = 'Something went wrong';
      const action = new AuthActions.LogoutAction();
      const completion = new AuthActions.LogoutErrorAction(error);

      actions$ = hot('-a---', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--b', { b: completion });
      sessionService.logoutCurrentRoute = jasmine.createSpy('').and.returnValue(response);

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
      const action = new AuthActions.DashboardRedirectAction();
      actions$ = of(action);
      (router.navigate as jasmine.Spy).and.returnValue(Promise.resolve(true));
      loginEffects.dashboardRedirect$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith([RouterPaths.dashboard.user.welcome.asPath]);
      });
      tick();
      expect(loggerService.debug).toHaveBeenCalledTimes(two);
    }));

    it('should call router.navigate when action received', fakeAsync(() => {
      const router: Router = TestBed.get(Router);
      const action = new AuthActions.DashboardRedirectAction();
      actions$ = of(action);
      (router.navigate as jasmine.Spy).and.returnValue(Promise.resolve(false));
      loginEffects.dashboardRedirect$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith([RouterPaths.dashboard.user.welcome.asPath]);
      });
      tick();
      expect(loggerService.debug).toHaveBeenCalledTimes(1);
      expect(loggerService.warn).toHaveBeenCalledTimes(1);
    }));

    it('should call router.navigate when action received', fakeAsync(() => {
      const router: Router = TestBed.get(Router);
      const alertServide: AlertService = TestBed.get(AlertService);
      const action = new AuthActions.DashboardRedirectAction();
      actions$ = of(action);
      (router.navigate as jasmine.Spy).and.returnValue(Promise.reject('error'));
      loginEffects.dashboardRedirect$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith([RouterPaths.dashboard.user.welcome.asPath]);
      });
      tick();
      expect(loggerService.debug).toHaveBeenCalledTimes(1);
      expect(loggerService.error).toHaveBeenCalledTimes(1);
      expect(alertServide.pushDangerAlert).toHaveBeenCalledTimes(1);
    }));
  });
});
