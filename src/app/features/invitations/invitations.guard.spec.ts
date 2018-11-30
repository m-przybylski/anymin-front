import { fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import * as fromCore from '@platform/core/reducers';
import { InvitationsGuard } from '@platform/features/invitations/invitations.guard';
import { RegistrationInvitationService } from '@platform/shared/services/registration-invitation/registration-invitation.service';
import { Deceiver } from 'deceiver-core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { InvitationService } from '@anymind-ng/api';
import * as SessionActions from '@platform/core/actions/session.actions';
import { cold, getTestScheduler } from 'jasmine-marbles';
import * as AuthActions from '@platform/core/actions/login.actions';

describe('InvitationsGuard', () => {
  let guard: InvitationsGuard;
  let store: Store<any>;
  let dispatchSpy: jasmine.Spy;
  let routeParams = {};
  const invitionMock = {
    token: '123',
    id: '123',
    msisdn: undefined,
    email: undefined,
  };
  const router: Router = Deceiver(Router, {
    navigate: jasmine.createSpy('navigate'),
  });
  const alertService: AlertService = Deceiver(AlertService, {
    pushDangerAlert: jasmine.createSpy('pushDangerAlert'),
  });
  const registrationInvitationService: RegistrationInvitationService = Deceiver(RegistrationInvitationService, {
    setInvitationObject: jasmine.createSpy('setInvitationObject'),
  });
  const invitationService: InvitationService = Deceiver(InvitationService, {
    getInvitationRoute: jasmine.createSpy('getInvitationRoute'),
  });
  const loggerFactory: LoggerFactory = Deceiver(LoggerFactory, {
    createLoggerService: jasmine.createSpy('createLoggerService').and.returnValue(Deceiver(LoggerService)),
  });
  const route: ActivatedRouteSnapshot = Deceiver(ActivatedRouteSnapshot, {
    params: jasmine.createSpy('params'),
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

    routeParams = {};
    store = TestBed.get(Store);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    guard = new InvitationsGuard(
      store,
      router,
      alertService,
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

  it('should redirect to login if user has not got session', fakeAsync(() => {
    const getInvitation = cold('-a|', { a: invitionMock });
    const action = new SessionActions.FetchSessionErrorAction('401');
    (router.navigate as jasmine.Spy).and.returnValue(Promise.resolve(true));
    (invitationService.getInvitationRoute as jasmine.Spy).and.returnValue(getInvitation);
    route.params = { token: invitionMock.token };

    store.dispatch(action);
    guard.canActivate(route).subscribe();
    /* Run getInvitation observable */
    getTestScheduler().flush();
    /* Resolve all pending promises */
    flushMicrotasks();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(registrationInvitationService.setInvitationObject).toHaveBeenCalledWith(invitionMock);
  }));

  it('should redirect to invitation view if user has session', fakeAsync(() => {
    const getInvitation = cold('-a|', { a: invitionMock });
    const action = new AuthActions.LoginSuccessAction({} as any);
    store.dispatch(action);

    (router.navigate as jasmine.Spy).and.returnValue(Promise.resolve(true));
    (invitationService.getInvitationRoute as jasmine.Spy).and.returnValue(getInvitation);
    route.params = { token: invitionMock.token };

    store.dispatch(action);
    guard.canActivate(route).subscribe();
    /* Run getInvitation observable */
    getTestScheduler().flush();
    /* Resolve all pending promises */
    flushMicrotasks();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard/user/invitations']);
    expect(registrationInvitationService.setInvitationObject).toHaveBeenCalledWith(invitionMock);
  }));

  it('should throw error if invitation does not exist', () => {
    const getInvitation = cold('-#', {}, 'Something went wrong');
    const action = new SessionActions.FetchSessionErrorAction('401');
    (router.navigate as jasmine.Spy).and.returnValue(Promise.resolve(true));
    (invitationService.getInvitationRoute as jasmine.Spy).and.returnValue(getInvitation);
    route.params = { token: invitionMock.token };
    const expected = cold('-(b|)', { b: false });
    store.dispatch(action);
    expect(guard.canActivate(route)).toBeObservable(expected);
  });
});
