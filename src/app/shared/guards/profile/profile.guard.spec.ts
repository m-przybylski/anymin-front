// tslint:disable:no-unbound-method
import { ProfileGuard } from './profile.guard';
import { UserSessionService } from '../../../core/services/user-session/user-session.service';
import { Router } from '@angular/router';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProfileGuard', () => {
  let guard: ProfileGuard;
  let userSessionService: UserSessionService;
  let loggerFactory: any;
  let router: Router;
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
      imports: [RouterTestingModule],
    });
  });

  beforeEach(() => {
    userSessionService = jasmine.createSpyObj('userSessionService', ['getSession']);
    loggerFactory = {
      createLoggerService: (_: string): any => ({
        debug: jasmine.createSpy('debug').and.stub(),
      }),
    };
    router = TestBed.get(Router);
    spyOn(router, 'navigate').and.stub();
    guard = new ProfileGuard(userSessionService, router, loggerFactory, routerConfig);
  });

  it('should not redirect when user is logged and logged path is active', fakeAsync(() => {
    (userSessionService.getSession as jasmine.Spy).and.returnValue(Promise.resolve({}));
    guard.canActivate(undefined as any, { url: 'dashboard/user/profile/123' } as any).subscribe(canActivate => {
      tick();
      expect(router.navigate).not.toHaveBeenCalled();
      expect(canActivate).toBeTruthy();
    });
  }));

  it('should redirect when user is logged and not logged path is active', fakeAsync(() => {
    (userSessionService.getSession as jasmine.Spy).and.returnValue(Promise.resolve({}));
    guard.canActivate(undefined as any, { url: 'browse/user/profile/123' } as any).subscribe(() => {
      tick();
      const navigate: jasmine.Spy = router.navigate as jasmine.Spy;
      expect(navigate.calls.count()).toBe(1, 'navigate called once');
      expect(navigate.calls.mostRecent().args).toEqual(
        [['dashboard', 'user', 'profile', '123']],
        'navigate to specific path',
      );
    });
  }));

  it('should redirect when user is not logged and logged path is active', fakeAsync(() => {
    (userSessionService.getSession as jasmine.Spy).and.returnValue(Promise.reject({ status: 401 }));
    guard.canActivate(undefined as any, { url: 'dashboard/user/profile/123' } as any).subscribe(() => {
      tick();
      const navigate: jasmine.Spy = router.navigate as jasmine.Spy;
      expect(navigate.calls.count()).toBe(1, 'navigate called once');
      expect(navigate.calls.mostRecent().args).toEqual(
        [['browse', 'user', 'profile', '123']],
        'navigate to specific path',
      );
    });
  }));
});
