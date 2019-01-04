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
    pollingService = Deceiver(LongPollingService, { longPollData: jest.fn() });
    presenceService = Deceiver(PresenceService, { userPresenceRoute: jest.fn() });
    expertAvailabilityService = new ExpertAvailabilityService(pollingService, presenceService);
  });

  it('should fech data from api', () => {
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
