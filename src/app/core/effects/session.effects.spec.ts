import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { SessionEffects } from '@platform/core/effects/session.effects';
import { SessionService } from '@anymind-ng/api';
import { Deceiver } from 'deceiver-core';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { SessionActions } from '@platform/core/actions';
import { ApiKeyService } from '@platform/core/services/api-key/api-key.service';

describe('SessionEffects', () => {
  let sessionEffects: SessionEffects;
  let sessionService: SessionService;
  let actions$: Observable<any>;
  let apiKeyService: ApiKeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SessionEffects,
        {
          provide: SessionService,
          useValue: Deceiver(SessionService, { checkRoute: jasmine.createSpy('SessionService.login') }),
        },
        {
          provide: ApiKeyService,
          useValue: Deceiver(ApiKeyService),
        },
        provideMockActions(() => actions$),
      ],
    });

    sessionEffects = TestBed.get(SessionEffects);
    sessionService = TestBed.get(SessionService);
    actions$ = TestBed.get(Actions);
    apiKeyService = TestBed.get(ApiKeyService);
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

  describe('fetchSessionSuccess$', () => {
    it('should call setApiKey method from apiKeyService', fakeAsync(() => {
      apiKeyService.setApiKey = jasmine.createSpy('setApiKey');
      const session = {
        session: {
          apiKey: 'mockApiKey',
        },
      } as any;
      const action = new SessionActions.FetchSessionSuccessAction(session);

      actions$ = hot('-a---', { a: action });
      sessionEffects.fetchSessionSuccess$.subscribe(() => {
        expect(apiKeyService.setApiKey).toHaveBeenCalled();
      });
      tick();
    }));
  });
});
