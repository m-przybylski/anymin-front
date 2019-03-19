import { TestBed } from '@angular/core/testing';
import { Deceiver } from 'deceiver-core';
import { Router } from '@angular/router';
import { UnsupportedService } from '@platform/core/services/unsupported/unsupported.service';
import { AlertService } from '@anymind-ng/core';
import { SupportedGuard } from '@platform/features/unsupported/supported.guard';
import { UserAgentService } from '@platform/core/services/crawler/user-agent.service';
import { provideMockFactoryLogger } from 'testing/testing';
import { CrawlerService } from '@platform/core/services/crawler/crawler.service';

describe('SupportedGuard', () => {
  let guard: SupportedGuard;
  let service: UnsupportedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnsupportedService,
        SupportedGuard,
        CrawlerService,
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

    guard = TestBed.get(SupportedGuard);
    service = TestBed.get(UnsupportedService);
  });

  it('can activate if not supported', () => {
    jest.spyOn(service, 'isSupported').mockReturnValue(false);

    expect(guard.canActivate()).toBeTruthy();
    expect(service.isSupported).toHaveBeenCalled();
  });

  it('can not activate and redirect to root if supported', () => {
    jest.spyOn(service, 'isSupported').mockReturnValue(true);
    const router = TestBed.get(Router);
    jest.spyOn(router, 'navigate').mockReturnValue(Promise.resolve());

    expect(guard.canActivate()).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(service.isSupported).toHaveBeenCalled();
  });
});
