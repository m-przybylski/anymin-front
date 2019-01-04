// tslint:disable:no-magic-numbers
// tslint:disable:no-parameter-reassignment
import { TestBed, inject, fakeAsync, tick as _tick } from '@angular/core/testing';
import { Subscriber, Observable } from 'rxjs';
import { async } from 'rxjs/scheduler/async';
import { LongPollingService } from './long-polling.service';

describe('LongPollingService', () => {
  const interval = 30;
  const observer: (attempts: number) => (obs: Subscriber<any>) => void = (executionAttempts = 0): any => (
    obs: Subscriber<any>,
  ): any => {
    if (executionAttempts === 0) {
      obs.error();
      executionAttempts = executionAttempts + 1;

      return;
    }

    if (executionAttempts === 1) {
      obs.next(1);
      executionAttempts = executionAttempts + 1;

      return;
    }

    if (executionAttempts === 2) {
      obs.error();
      executionAttempts = executionAttempts + 1;

      return;
    }
    if (executionAttempts === 3) {
      obs.error();
      executionAttempts = executionAttempts + 1;

      return;
    }
    if (executionAttempts === 4) {
      obs.next(2);
      executionAttempts = executionAttempts + 1;

      return;
    }

    obs.complete();
  };

  // tslint:disable-next-line:no-let
  let tick: (millis: number) => void;
  beforeEach(() => {
    // fix tick to affect rxjs scheduler timers
    tick = ((): ((millis: number) => void) => {
      // tslint:disable-next-line
      let currentTime = 0;
      jest.spyOn(async, 'now').mockImplementation(() => currentTime);

      return (millis: number): void => {
        currentTime = millis;
        _tick(millis);
      };
    })();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LongPollingService],
    });
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should be created', inject([LongPollingService], (service: LongPollingService) => {
    expect(service).toBeTruthy();
  }));

  it('should start polling data from observable', fakeAsync(
    inject([LongPollingService], (service: LongPollingService) => {
      const request$ = new Observable(observer(1));
      const callback = jest.fn();
      service.longPollData(request$, interval).subscribe(callback);
      expect(callback).toHaveBeenCalled();
    }),
  ));

  it('should retry to poll data after one interval and expect result', fakeAsync(
    inject([LongPollingService], (service: LongPollingService) => {
      const stream$ = new Observable(observer(0));
      const callback = jest.fn();
      service.longPollData(stream$, interval).subscribe(callback);
      expect(callback).not.toHaveBeenCalled();
      jest.runAllTimers();
      expect(callback).toHaveBeenCalledWith(1);
    }),
  ));

  it('should retry to poll data three times and wait total of 5 seconds', fakeAsync(
    inject([LongPollingService], (service: LongPollingService) => {
      const stream$ = new Observable(observer(2));
      const callback = jest.fn();
      service.longPollData(stream$, interval).subscribe(callback);
      jest.advanceTimersByTime(4999);
      expect(callback).not.toHaveBeenCalled();
      jest.advanceTimersByTime(5000);
      expect(callback).toHaveBeenCalledWith(2);
    }),
  ));
});
