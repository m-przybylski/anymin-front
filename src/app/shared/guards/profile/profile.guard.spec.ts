import { ProfileGuard } from './profile.guard';
import { Router } from '@angular/router';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { importStore } from 'testing/testing';
import { Store } from '@ngrx/store';
import { AuthActions } from '@platform/core/actions';
import { cold } from 'jasmine-marbles';
import { Deceiver } from 'deceiver-core';

describe('ProfileGuard', () => {
  let guard: ProfileGuard;
  let loggerFactory: any;
  let router: Router;
  let store: Store<any>;
  const routerConfig: any = {
    dashboard: {
      asPath: 'dashboard',
      getName: 'dashboard',
      user: {
        asPath: 'dashboard/user',
        getName: 'user',
        profile: {
          asPath: 'dashboard/user/profile/:expertId',
          getName: 'profile/:expertId',
          params: {
            expertId: 'expertId',
          },
        },
      },
      company: {
        asPath: 'dashboard/company',
        getName: 'company',
        profile: {
          asPath: 'dashboard/company/profile/:profileId',
          getName: 'profile/:profileId',
          params: {
            profileId: 'profileId',
          },
        },
      },
      notfound: {
        asPath: 'dashboard/not-found',
        getName: 'not-found',
      },
    },
    browse: {
      asPath: 'browse',
      getName: 'browse',
      user: {
        asPath: 'browse/user/profile/:expertId',
        getName: 'user/profile/:expertId',
        params: {
          expertId: 'expertId',
        },
      },
      company: {
        asPath: 'browse/company/profile/:profileId',
        getName: 'company/profile/:profileId',
        params: {
          profileId: 'profileId',
        },
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [importStore(), RouterTestingModule],
    });
  });

  beforeEach(() => {
    loggerFactory = {
      createLoggerService: (_: string): any => ({
        debug: jest.fn(),
      }),
    };

    store = TestBed.get(Store);
    router = TestBed.get(Router);
    router.navigate = jest.fn();
    guard = new ProfileGuard(router, store, loggerFactory, routerConfig);
  });

  it('should not redirect when user is logged and logged path is active', () => {
    const session: any = {};
    const action = new AuthActions.LoginSuccessAction(session);
    store.dispatch(action);
    const expected = cold('(a|)', { a: true });
    expect(guard.canActivate(undefined as any, { url: 'dashboard/user/profile/123' } as any)).toBeObservable(expected);
  });

  it('should redirect when user is logged and not logged path is active', fakeAsync(() => {
    const session: any = {};
    const action = new AuthActions.LoginSuccessAction(session);
    store.dispatch(action);
    const expected = cold('(a|)', { a: false });
    expect(guard.canActivate(undefined as any, { url: 'browse/user/profile/123' } as any)).toBeObservable(expected);
    tick();
    const navigate: jest.Mock = router.navigate as jest.Mock;
    expect(navigate.mock.calls.length).toBe(1);
    expect(navigate.mock.calls[0]).toEqual([['dashboard', 'user', 'profile', '123']]);
  }));

  it('should redirect when user is not logged and logged path is active', fakeAsync(() => {
    const error: any = 'error, error, error';
    const action = new AuthActions.LoginErrorAction(error);
    store.dispatch(action);
    const expected = cold('(a|)', { a: false });
    expect(guard.canActivate(undefined as any, { url: 'dashboard/user/profile/123' } as any)).toBeObservable(expected);
    tick();
    const navigate: jest.Mock = router.navigate as jest.Mock;
    expect(navigate.mock.calls.length).toBe(1);
    expect(navigate.mock.calls[0]).toEqual([['browse', 'user', 'profile', '123']]);
  }));
});
