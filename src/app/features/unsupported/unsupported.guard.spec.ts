import { TestBed } from '@angular/core/testing';
import { Deceiver } from 'deceiver-core';
import { Router } from '@angular/router';
import { UnsupportedService } from '@platform/core/services/unsupported/unsupported.service';
import { UnsupportedGuard } from '@platform/features/unsupported/unsupported.guard';
import { AlertService } from '@anymind-ng/core';
import { UserAgentService } from '@platform/core/services/unsupported/user-agent.service';
import { provideMockFactoryLogger } from 'testing/testing';

describe('UnsupportedGuard', () => {
  let guard: UnsupportedGuard;
  let service: UnsupportedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnsupportedService,
        UnsupportedGuard,
        UserAgentService,
        {
          provide: Router,
          useValue: Deceiver(Router, { navigate: jest.fn() }),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService, { pushDangerAlert: jest.fn() }),
        },
        provideMockFactoryLogger(),
      ],
    });

    guard = TestBed.get(UnsupportedGuard);
    service = TestBed.get(UnsupportedService);
  });

  it('can activate if supported', () => {
    jest.spyOn(service, 'isSupported').mockReturnValue(true);

    expect(guard.canActivate()).toBeTruthy();
    expect(service.isSupported).toHaveBeenCalled();
  });

  it('can not activate and redirect to unsupported if not supported', () => {
    jest.spyOn(service, 'isSupported').mockReturnValue(false);
    const router = TestBed.get(Router);
    jest.spyOn(router, 'navigate').mockReturnValue(Promise.resolve());

    expect(guard.canActivate()).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledWith(['/unsupported']);
    expect(service.isSupported).toHaveBeenCalled();
  });
});
