import { CommunicatorGuard } from './communicator.guard';
import { TestBed } from '@angular/core/testing';
import { Deceiver } from 'deceiver-core';
import { CallService } from '@platform/core/services/call/call.service';
import { Router } from '@angular/router';
import { provideMockFactoryLogger } from 'testing/testing';
import { cold } from 'jasmine-marbles';
import { CallState } from '@anymind-ng/core';

describe('CommunicatorGuard', () => {
  let communicatorGuard: CommunicatorGuard;
  let callService: CallService;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommunicatorGuard,
        {
          provide: CallService,
          useValue: Deceiver(CallService),
        },
        {
          provide: Router,
          useValue: Deceiver(Router, { navigate: jest.fn() }),
        },
        provideMockFactoryLogger(),
      ],
    });
  });

  beforeEach(() => {
    communicatorGuard = TestBed.get(CommunicatorGuard);
    callService = TestBed.get(CallService);
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(communicatorGuard).toBeTruthy();
  });

  it('should not allow to navigate if call is not available', () => {
    (callService.newCall$ as any) = cold('a', { a: undefined });
    expect(communicatorGuard.canActivate()).toBeObservable(cold('a', { a: false }));
    expect(router.navigate).toHaveBeenCalled();
  });

  describe('expert call', () => {
    beforeEach(() => {
      (callService.isExpertCall as any) = jest.fn(() => true);
    });
    it('should allow to navigate if call is available and it correct status', () => {
      (callService.newCall$ as any) = cold('a', {
        a: {
          currentExpertCall: { getState: jest.fn(() => CallState.PENDING) },
        },
      });
      expect(communicatorGuard.canActivate()).toBeObservable(cold('a', { a: true }));
    });

    it('should not allow to navigate if call is in invalid status', () => {
      (callService.newCall$ as any) = cold('a', {
        a: {
          currentExpertCall: { getState: jest.fn(() => CallState.ENDED) },
        },
      });
      expect(communicatorGuard.canActivate()).toBeObservable(cold('a', { a: false }));
      expect(router.navigate).toHaveBeenCalled();
    });
  });

  describe('client call', () => {
    beforeEach(() => {
      (callService.isExpertCall as any) = jest.fn(() => false);
    });
    it('should allow to navigate if call is available and it correct status', () => {
      (callService.newCall$ as any) = cold('a', {
        a: {
          currentClientCall: { getState: jest.fn(() => CallState.NEW) },
        },
      });
      expect(communicatorGuard.canActivate()).toBeObservable(cold('a', { a: true }));
    });

    it('should not allow to navigate if call is in invalid status', () => {
      (callService.newCall$ as any) = cold('a', {
        a: {
          currentClientCall: { getState: jest.fn(() => CallState.ENDED) },
        },
      });
      expect(communicatorGuard.canActivate()).toBeObservable(cold('a', { a: false }));
      expect(router.navigate).toHaveBeenCalled();
    });
  });
});
