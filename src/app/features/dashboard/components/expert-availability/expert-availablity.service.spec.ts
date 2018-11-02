import { ExpertAvailabilityService } from './expert-availablity.service';
import { LongPollingService } from '../../../../core/services/long-polling/long-polling.service';
import { PresenceService } from '@anymind-ng/api';
import { Deceiver } from 'deceiver-core';
import { cold } from 'jasmine-marbles';

describe('ExpertAvailabilityService', () => {
  let expertAvailabilityService: ExpertAvailabilityService;
  let pollingService: LongPollingService;
  let presenceService: PresenceService;
  beforeEach(() => {
    pollingService = Deceiver(LongPollingService, { longPollData: jasmine.createSpy('longPollData') });
    presenceService = Deceiver(PresenceService, { userPresenceRoute: jasmine.createSpy('userPresenceRoute') });
    expertAvailabilityService = new ExpertAvailabilityService(pollingService, presenceService);
  });

  it('should fech data from api', () => {
    const expertAvailability = cold('-a---a---a---a', { a: [{ expertId: 'asdf', status: true }] });
    (presenceService.userPresenceRoute as jasmine.Spy).and.returnValue(cold('a|', { a: true }));
    (pollingService.longPollData as jasmine.Spy).and.returnValue(expertAvailability);
    expect(expertAvailabilityService.getExpertPresence('asdf')).toBeObservable(cold('-a---a---a---a', { a: true }));
  });

  it('should return any value only from response from backend', () => {
    const expertAvailability = cold('-a---a---a---a', { a: [{ expertId: 'asdf', status: true }] });
    (presenceService.userPresenceRoute as jasmine.Spy).and.returnValue(cold('a|', { a: true }));
    (pollingService.longPollData as jasmine.Spy).and.returnValue(expertAvailability);
    expertAvailabilityService.getExpertPresence('asdf1');
    expertAvailabilityService.getExpertPresence('asdf2');
    expertAvailabilityService.getExpertPresence('asdf3');
    expect(expertAvailabilityService.getExpertPresence('asdf')).toBeObservable(cold('-a---a---a---a', { a: true }));
    expect(expertAvailabilityService.getExpertPresence('asdf3')).toBeObservable(cold('---'));
  });

  it('should clean after destroy', () => {
    const expertAvailability = cold('-a---a---a---a', { a: [{ expertId: 'asdf', status: true }] });
    (pollingService.longPollData as jasmine.Spy).and.returnValue(expertAvailability);
    expertAvailabilityService.getExpertPresence('asdf');
    expertAvailabilityService.ngOnDestroy();
    expect(expertAvailabilityService.getExpertPresence('asdf')).toBeObservable(cold('|'));
  });
});
