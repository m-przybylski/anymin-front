// tslint:disable:no-magic-numbers
import { TestBed } from '@angular/core/testing';
import { getTestScheduler, cold } from 'jasmine-marbles';
import { LongPollingService } from './long-polling.service';
import { DOCUMENT } from '@angular/common';
import { SCHEDULER } from '@platform/core/tokens';
import { Deceiver } from 'deceiver-core';
describe('LongPollingService', () => {
  const documentHidden = Deceiver(Document, {
    addEventListener: (_eventType: any, listener: any): void => {
      listener();
    },
    removeEventListener: (): void => void 0,
    hidden: true,
  });
  const documentShown = Deceiver(Document, {
    addEventListener: (_eventType: any, listener: any): void => {
      listener();
    },
    removeEventListener: (): void => void 0,
    hidden: false,
  });

  let service: LongPollingService;
  const interval = 30;

  describe('document visible', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          LongPollingService,
          { provide: DOCUMENT, useValue: documentShown },
          { provide: SCHEDULER, useValue: getTestScheduler() },
        ],
      });
    });
    beforeEach(() => {
      service = TestBed.get(LongPollingService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should start polling data from observable', () => {
      const request$ = cold('-a|', { a: 'ok' });
      const expected = cold('-a----a----a----a----a----a----a----a----a----a----a----a----a----a----a', { a: 'ok' });
      expect(service.longPollData(request$, interval)).toBeObservable(expected);
    });

    it('should retry couple of times and error out', () => {
      /**
       * default retry is 3 retry attempts so there will be 4 requests
       * -# 1s -# 4s -# 9s -# -> 14s 40ms # because error triggers retry in the same frame
       */
      const request$ = cold('-#', undefined, '💩💩💩💩💩');

      const scheduler = getTestScheduler();
      /**
       * for some reason static helpers for cold hot does not support time progression
       */
      scheduler.run(helpers => {
        const expectedMarble = '14040ms #';
        const expectedError = '💩💩💩💩💩';
        helpers
          .expectObservable(service.longPollData(request$, interval))
          .toBe(expectedMarble, undefined, expectedError);
      });
    });
  });

  describe('document not visible', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          LongPollingService,
          { provide: DOCUMENT, useValue: documentHidden },
          { provide: SCHEDULER, useValue: getTestScheduler() },
        ],
      });
    });
    beforeEach(() => {
      service = TestBed.get(LongPollingService);
    });

    it('should not poll when document is hidden', () => {
      const request$ = cold('-a|', { a: 'ok' });
      expect(service.longPollData(request$, interval)).toBeObservable(cold('--'));
    });
  });
});
