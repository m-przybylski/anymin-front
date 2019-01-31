import { importStore, dispatchLoggedUser } from 'testing/testing';
import { TestBed } from '@angular/core/testing';
import { UserSessionService } from './user-session.service';
import { Store } from '@ngrx/store';
import { Deceiver } from 'deceiver-core';
import { SessionService } from '@anymind-ng/api';
import { cold, getTestScheduler } from 'jasmine-marbles';

describe('UserSessionService', () => {
  let store: Store<any>;
  let service: UserSessionService;
  const sessionService = Deceiver(SessionService, {
    getSessionsRoute: jest.fn(),
    logoutRoute: jest.fn(),
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [importStore()],
      providers: [UserSessionService, { provide: SessionService, useValue: sessionService }],
    });
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    dispatchLoggedUser(store, { session: { apiKey: '❤️❤️❤️' } });
    service = TestBed.get(UserSessionService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should logout all users and leave current session', () => {
    const sessions = cold('--a|', { a: [{ apiKey: '❤️❤️❤️' }, { apiKey: '😍😍😍' }, { apiKey: '👍👍' }] });
    (sessionService.getSessionsRoute as jest.Mock).mockReturnValue(sessions);
    (sessionService.logoutRoute as jest.Mock).mockReturnValue(cold('-a', { a: undefined }));
    service.removeAllSessionsExceptCurrent();
    getTestScheduler().flush();
    expect(sessionService.logoutRoute).toHaveBeenCalledTimes(parseInt('2', 10));
  });
});
