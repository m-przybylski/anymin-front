import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { SessionEffects } from '@platform/core/effects/session.effects';
import { SessionService } from '@anymind-ng/api';
import { Deceiver } from 'deceiver-core';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { SessionActions, AuthActions } from '@platform/core/actions';

describe('SessionEffects', () => {
  let sessionEffects: SessionEffects;
  let sessionService: SessionService;
  let actions$: Observable<any>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SessionEffects,
        {
          provide: SessionService,
          useValue: Deceiver(SessionService, { checkRoute: jasmine.createSpy('SessionService.login') }),
        },
        provideMockActions(() => actions$),
      ],
    });

    sessionEffects = TestBed.get(SessionEffects);
    sessionService = TestBed.get(SessionService);
    actions$ = TestBed.get(Actions);
  });

  describe('fetchSession$', () => {
    it('should return a FetchSessionSuccessAction, with session if fetch succeeds', () => {
      const session = {} as any;
      const action = new SessionActions.FetchSessionAction();
      const completion = new SessionActions.FetchSessionSuccessAction(session);

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: session });
      const expected = cold('--b', { b: completion });
      sessionService.checkRoute = jasmine.createSpy('').and.returnValue(response);

      expect(sessionEffects.fetchSession$).toBeObservable(expected);
    });

    it('should return a FetchSessionErrorAction, with error if fetch fails', () => {
      const error = 'Something is wrong';
      const action = new SessionActions.FetchSessionAction();
      const completion = new SessionActions.FetchSessionErrorAction(error);

      actions$ = hot('-a---', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--b', { b: completion });
      sessionService.checkRoute = jasmine.createSpy('').and.returnValue(response);

      expect(sessionEffects.fetchSession$).toBeObservable(expected);
    });
  });

  describe('fetchSessionError$', () => {
    it('should return Auth.LoginRedirectAction, if fetch fails', () => {
      const error = 'Something is wrong';
      const action = new SessionActions.FetchSessionErrorAction(error);
      const completion = new AuthActions.LoginRedirectAction();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(sessionEffects.fetchSessionError$).toBeObservable(expected);
    });
  });
});
