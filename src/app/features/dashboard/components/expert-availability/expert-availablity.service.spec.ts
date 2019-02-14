import { ExpertAvailabilityService } from './expert-availablity.service';
import { LongPollingService } from '../../../../core/services/long-polling/long-polling.service';
import { PresenceService } from '@anymind-ng/api';
import { Deceiver } from 'deceiver-core';
import { cold } from 'jasmine-marbles';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SCHEDULER } from '@platform/core/tokens';
import { asyncScheduler } from 'rxjs';

describe('ExpertAvailabilityService', () => {
  let expertAvailabilityService: ExpertAvailabilityService;
  let pollingService: LongPollingService;
  let presenceService: PresenceService;

  describe('mocked pollingService', () => {
    beforeEach(() => {
      pollingService = Deceiver(LongPollingService, { longPollData: jest.fn() });
      presenceService = Deceiver(PresenceService, { userPresenceRoute: jest.fn() });
      expertAvailabilityService = new ExpertAvailabilityService(pollingService, presenceService);
    });
    it('should fetch data from api', () => {
      const expertAvailability = cold('-a---a---a---a', { a: [{ expertId: 'asdf', status: true }] });
      (presenceService.userPresenceRoute as jest.Mock).mockReturnValue(cold('a|', { a: true }));
      (pollingService.longPollData as jest.Mock).mockReturnValue(expertAvailability);
      expect(expertAvailabilityService.getExpertPresence('asdf')).toBeObservable(cold('-a---a---a---a', { a: true }));
    });

    it('should return any value only from response from backend', () => {
      const expertAvailability = cold('-a---a---a---a', { a: [{ expertId: 'asdf', status: true }] });
      (presenceService.userPresenceRoute as jest.Mock).mockReturnValue(cold('a|', { a: true }));
      (pollingService.longPollData as jest.Mock).mockReturnValue(expertAvailability);
      expertAvailabilityService.getExpertPresence('asdf1');
      expertAvailabilityService.getExpertPresence('asdf2');
      expertAvailabilityService.getExpertPresence('asdf3');
      expect(expertAvailabilityService.getExpertPresence('asdf')).toBeObservable(cold('-a---a---a---a', { a: true }));
      expect(expertAvailabilityService.getExpertPresence('asdf3')).toBeObservable(cold('---'));
    });

    it('should clean after destroy', () => {
      const expertAvailability = cold('-a---a---a---a', { a: [{ expertId: 'asdf', status: true }] });
      (pollingService.longPollData as jest.Mock).mockReturnValue(expertAvailability);
      expertAvailabilityService.getExpertPresence('asdf');
      expertAvailabilityService.ngOnDestroy();
      expect(expertAvailabilityService.getExpertPresence('asdf')).toBeObservable(cold('|'));
    });
  });

  describe('real http implementation', () => {
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          ExpertAvailabilityService,
          PresenceService,
          LongPollingService,
          { provide: SCHEDULER, useValue: asyncScheduler },
        ],
      });
    });

    beforeEach(() => {
      expertAvailabilityService = TestBed.get(ExpertAvailabilityService);
      pollingService = TestBed.get(LongPollingService);
      presenceService = TestBed.get(PresenceService);
      httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should stop making requests', fakeAsync(() => {
      /**
       * This test is written based on service implementation.
       * create subscription
       */
      const sub = expertAvailabilityService.getExpertPresence('asdf').subscribe();
      const firstRequest = httpTestingController.match({ method: 'POST' });
      /**
       * get response for first request
       */
      firstRequest[0].flush([{ expertId: 'asdf', status: 'available' }]);
      sub.unsubscribe();
      /**
       * wait pulling rate
       */
      tick(parseInt('5000', 10));
      /**
       * second request will be trigger.
       */
      const secondRequest = httpTestingController.match({ method: 'POST' });
      secondRequest[0].flush([{ expertId: 'asdf', status: 'available' }]);
      tick(parseInt('10000', 10));
      /**
       * with the response it will stop pulling data.
       */
      httpTestingController.verify();
    }));
  });
});
