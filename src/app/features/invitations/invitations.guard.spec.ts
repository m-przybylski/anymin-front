import { fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import * as fromCore from '@platform/core/reducers';
import { InvitationsGuard } from '@platform/features/invitations/invitations.guard';
import { RegistrationInvitationService } from '@platform/shared/services/registration-invitation/registration-invitation.service';
import { Deceiver } from 'deceiver-core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Account, AccountService, InvitationService } from '@anymind-ng/api';
import * as SessionActions from '@platform/core/actions/session.actions';
import { cold, getTestScheduler } from 'jasmine-marbles';
import * as AuthActions from '@platform/core/actions/login.actions';
import { SessionApiActions } from '@platform/core/actions';
import { BackendErrors } from '@platform/shared/models/backend-error/backend-error';

describe('InvitationsGuard', () => {
  let guard: InvitationsGuard;
  let store: Store<any>;
  let dispatchSpy: jest.SpyInstance;
  const invitationMock = {
    token: '123',
    id: '123',
    msisdn: undefined,
    email: undefined,
  };
  const mockAccount: Account = {
    id: 'someId',
    email: 'szybki@marian.com',
    registeredAt: new Date(),
    isBlocked: false,
    isAnonymous: false,
    details: {
      clientId: '1234',
    },
    currency: 'PLN',
    countryISO: 'pl-pl',
  };
  const router: Router = Deceiver(Router, {
    navigate: jest.fn(),
  });
  const alertService: AlertService = Deceiver(AlertService, {
    pushDangerAlert: jest.fn(),
  });
  const registrationInvitationService: RegistrationInvitationService = Deceiver(RegistrationInvitationService, {
    setInvitationObject: jest.fn(),
  });
  const accountService: AccountService = Deceiver(AccountService, { postConfirmEmailViaInvitationRoute: jest.fn() });
  const invitationService: InvitationService = Deceiver(InvitationService, {
    getInvitationRoute: jest.fn(),
  });
  const loggerFactory: LoggerFactory = Deceiver(LoggerFactory, {
    createLoggerService: jest.fn().mockReturnValue(Deceiver(LoggerService)),
  });
  const route: ActivatedRouteSnapshot = Deceiver(ActivatedRouteSnapshot, {
    params: jest.fn(),
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          core: combineReducers(fromCore.reducers),
        }),
      ],
      providers: [InvitationsGuard],
    });

    store = TestBed.get(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');
    guard = new InvitationsGuard(
      store,
      router,
      alertService,
      accountService,
      registrationInvitationService,
      invitationService,
      loggerFactory,
    );
  });

  it('should dispatch call for session action when not in store', fakeAsync(() => {
    guard.canActivate(route).subscribe();
    tick();
    expect(dispatchSpy).toHaveBeenCalledWith(new SessionActions.FetchSessionAction());
  }));

  it('should redirect to login if user has not got session and confirm email succeed', fakeAsync(() => {
    const getInvitation = cold('-a|', { a: invitationMock });
    const confirmEmail = cold('-a|', { a: mockAccount });
    const action = new SessionApiActions.FetchSessionErrorAction('401');
    (router.navigate as jest.Mock).mockReturnValue(Promise.resolve(true));
    (invitationService.getInvitationRoute as jest.Mock).mockReturnValue(getInvitation);
    (accountService.postConfirmEmailViaInvitationRoute as jest.Mock).mockReturnValue(confirmEmail);
    route.params = { token: invitationMock.token };

    store.dispatch(action);
    guard.canActivate(route).subscribe();
    /* Run getInvitation observable */
    getTestScheduler().flush();
    /* Resolve all pending promises */
    flushMicrotasks();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(registrationInvitationService.setInvitationObject).toHaveBeenCalledWith(invitationMock);
  }));

  it('should redirect to invitation view if user has session  and confirm email succeed', fakeAsync(() => {
    const getInvitation = cold('-a|', { a: invitationMock });
    const confirmEmail = cold('-a|', { a: mockAccount });
    const action = new AuthActions.LoginSuccessAction({} as any);

    (router.navigate as jest.Mock).mockReturnValue(Promise.resolve(true));
    (invitationService.getInvitationRoute as jest.Mock).mockReturnValue(getInvitation);
    (accountService.postConfirmEmailViaInvitationRoute as jest.Mock).mockReturnValue(confirmEmail);
    route.params = { token: invitationMock.token };

    store.dispatch(action);
    guard.canActivate(route).subscribe();
    /* Run getInvitation observable */
    getTestScheduler().flush();
    /* Resolve all pending promises */
    flushMicrotasks();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard/user/invitations']);
    expect(registrationInvitationService.setInvitationObject).toHaveBeenCalledWith(invitationMock);
  }));

  it(
    'should redirect to login if user has not got session and confirm email failed because user already ' +
      'confirmed email',
    fakeAsync(() => {
      const error = {
        error: {
          code: BackendErrors.AccountAlreadyconfirmedEmail,
          message: 'error',
        },
      };
      const getInvitation = cold('-a|', { a: invitationMock });
      const confirmEmail = cold('-#', {}, error);
      const action = new SessionApiActions.FetchSessionErrorAction('401');
      (router.navigate as jest.Mock).mockReturnValue(Promise.resolve(true));
      (invitationService.getInvitationRoute as jest.Mock).mockReturnValue(getInvitation);
      (accountService.postConfirmEmailViaInvitationRoute as jest.Mock).mockReturnValue(confirmEmail);
      route.params = { token: invitationMock.token };

      store.dispatch(action);
      guard.canActivate(route).subscribe();
      /* Run getInvitation observable */
      getTestScheduler().flush();
      /* Resolve all pending promises */
      flushMicrotasks();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      expect(registrationInvitationService.setInvitationObject).toHaveBeenCalledWith(invitationMock);
    }),
  );

  it(
    'should redirect to invitation view if user has session and confirm email failed because user already' +
      'confirmed email',
    fakeAsync(() => {
      const error = {
        error: {
          code: BackendErrors.AccountAlreadyconfirmedEmail,
          message: 'error',
        },
      };
      const getInvitation = cold('-a|', { a: invitationMock });
      const confirmEmail = cold('-#', {}, error);
      const action = new AuthActions.LoginSuccessAction({} as any);

      (router.navigate as jest.Mock).mockReturnValue(Promise.resolve(true));
      (invitationService.getInvitationRoute as jest.Mock).mockReturnValue(getInvitation);
      (accountService.postConfirmEmailViaInvitationRoute as jest.Mock).mockReturnValue(confirmEmail);
      route.params = { token: invitationMock.token };

      store.dispatch(action);
      guard.canActivate(route).subscribe();
      /* Run getInvitation observable */
      getTestScheduler().flush();
      /* Resolve all pending promises */
      flushMicrotasks();
      expect(router.navigate).toHaveBeenCalledWith(['/dashboard/user/invitations']);
      expect(registrationInvitationService.setInvitationObject).toHaveBeenCalledWith(invitationMock);
    }),
  );

  it(
    'should redirect to login if user has not got session and confirm email failed because user there is ' +
      'no such account in database',
    fakeAsync(() => {
      const error = {
        error: {
          code: BackendErrors.NoSuchAccount,
          message: 'error',
        },
      };
      const getInvitation = cold('-a|', { a: invitationMock });
      const confirmEmail = cold('-#', {}, error);
      const action = new SessionApiActions.FetchSessionErrorAction('401');
      (router.navigate as jest.Mock).mockReturnValue(Promise.resolve(true));
      (invitationService.getInvitationRoute as jest.Mock).mockReturnValue(getInvitation);
      (accountService.postConfirmEmailViaInvitationRoute as jest.Mock).mockReturnValue(confirmEmail);
      route.params = { token: invitationMock.token };

      store.dispatch(action);
      guard.canActivate(route).subscribe();
      /* Run getInvitation observable */
      getTestScheduler().flush();
      /* Resolve all pending promises */
      flushMicrotasks();
      expect(router.navigate).toHaveBeenCalledWith(['/register']);
      expect(registrationInvitationService.setInvitationObject).toHaveBeenCalledWith(invitationMock);
    }),
  );

  it('should redirect to login if confirm email request filed', fakeAsync(() => {
    const error = {
      status: 500,
    };
    const getInvitation = cold('-a|', { a: invitationMock });
    const confirmEmail = cold('-#', {}, error);
    const action = new SessionApiActions.FetchSessionErrorAction('401');
    (router.navigate as jest.Mock).mockReturnValue(Promise.resolve(true));
    (invitationService.getInvitationRoute as jest.Mock).mockReturnValue(getInvitation);
    (accountService.postConfirmEmailViaInvitationRoute as jest.Mock).mockReturnValue(confirmEmail);
    route.params = { token: invitationMock.token };

    store.dispatch(action);
    guard.canActivate(route).subscribe();
    /* Run getInvitation observable */
    getTestScheduler().flush();
    /* Resolve all pending promises */
    flushMicrotasks();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(registrationInvitationService.setInvitationObject).toHaveBeenCalledWith(invitationMock);
  }));

  it('should throw error if invitation does not exist', () => {
    const getInvitation = cold('-#', {}, 'Something went wrong');
    const action = new SessionApiActions.FetchSessionErrorAction('401');
    (router.navigate as jest.Mock).mockReturnValue(Promise.resolve(true));
    (invitationService.getInvitationRoute as jest.Mock).mockReturnValue(getInvitation);
    route.params = { token: invitationMock.token };
    const expected = cold('-(b|)', { b: false });
    store.dispatch(action);
    expect(guard.canActivate(route)).toBeObservable(expected);
  });
});
