import { ExpertAvailabilityService } from './expert-availablity.service';
import { LongPollingService } from '../../../../core/services/long-polling/long-polling.service';
import { PresenceService } from '@anymind-ng/api';
import { of } from 'rxjs';

describe('ExpertAvailabilityService', () => {
  // tslint:disable:no-let
  // tslint:disable:no-unbound-method
  let expertAvailabilityService: ExpertAvailabilityService;
  let pollingService: LongPollingService;
  let presenceService: PresenceService;
  beforeEach(() => {
    pollingService = jasmine.createSpyObj('pollingService', ['longPollData']);
    presenceService = jasmine.createSpyObj('presenceService', ['userPresenceRoute']);
    (pollingService.longPollData as jasmine.Spy).and.returnValue(of([]));
    expertAvailabilityService = new ExpertAvailabilityService(pollingService, presenceService);
  });

  it('should fech data from api', () => {
    expertAvailabilityService.getExpertPresence('asdf');
    expect(presenceService.userPresenceRoute as jasmine.Spy).toHaveBeenCalledTimes(1);
    expect((presenceService.userPresenceRoute as jasmine.Spy).calls.mostRecent().args).toEqual([
      {
        expertIds: ['asdf'],
      },
    ]);
  });

  it('should not make extra call when asked for the same expert', () => {
    expertAvailabilityService.getExpertPresence('asdf');
    expertAvailabilityService.getExpertPresence('asdf');
    expect(presenceService.userPresenceRoute as jasmine.Spy).toHaveBeenCalledTimes(1);
  });

  it('should crean after itself', () => {
    expertAvailabilityService.getExpertPresence('asdf');
    const spy = spyOn(expertAvailabilityService, 'ngOnDestroy');
    expertAvailabilityService.ngOnDestroy();
    expect(spy).not.toThrow();
  });
});
