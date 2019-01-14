// tslint:disable:no-magic-numbers
import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { Observable, Observer, throwError, of } from 'rxjs';
import { getTestScheduler, cold } from 'jasmine-marbles';
import { LongPollingService } from './long-polling.service';
import { SCHEDULER } from '@platform/core/tokens';
import { TestScheduler } from 'rxjs/testing';
import { map, switchMap, observeOn } from 'rxjs/operators';

describe('LongPollingService', () => {
  let testScheduler: TestScheduler;
  let service: LongPollingService;
  const interval = 30;
  // const observer:
  // (attempts: number) =>
  //   (obs: Subscriber<any>) => void =
  // (executionAttempts = 0): any => (
  //   obs: Subscriber<any>,
  // ): any => {
  //   if (executionAttempts === 0) {
  //     obs.error();
  //     executionAttempts = executionAttempts + 1;

  //     return;
  //   }

  //   if (executionAttempts === 1) {
  //     obs.next(1);
  //     executionAttempts = executionAttempts + 1;

  //     return;
  //   }

  //   if (executionAttempts === 2) {
  //     obs.error();
  //     executionAttempts = executionAttempts + 1;

  //     return;
  //   }
  //   if (executionAttempts === 3) {
  //     obs.error();
  //     executionAttempts = executionAttempts + 1;

  //     return;
  //   }
  //   if (executionAttempts === 4) {
  //     obs.next(2);
  //     executionAttempts = executionAttempts + 1;

  //     return;
  //   }

  //   obs.complete();
  // };

  beforeEach(() => {
    testScheduler = getTestScheduler();
    TestBed.configureTestingModule({
      providers: [
        LongPollingService,
        {
          provide: SCHEDULER,
          useValue: testScheduler,
        },
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

  /*
    The newest version of Jest is not working with RXJS timers
    those test should be write on marbles.
    https://jestjs.io/blog/2016/09/01/jest-15.html
  */
  // it('should retry to poll data after one interval and expect result',
  // (done: () => void) => {
  // let error = 0;
  /**
   * first subscription result an error second actual value
   */
  // const stream$ = cold('-(a|)', { a: 'ok' }).pipe(
  //   observeOn(getTestScheduler()),
  //   map(obj => {
  //     if (error === 0) {
  //       error++;
  //       console.error('------ERROR!!!!!');

  //       throw new Error('oups');
  //     } else {
  //       error++;
  //       console.error('------NO--ERROR!!!!!');

  //       return obj;
  //     }
  //   }),
  // );
  // stream$.subscribe(_ => _, err => {
  //   console.error(err);
  //   expect(err).toEqual(new Error('oups'));

  // }, () => {
  //   console.error('completed!');
  //   done();
  // });

  // service.longPollData(stream$, interval).subscribe(
  //   result => {
  //     expect(result).toEqual({ a: 'ok' });
  //     done();
  //   },
  //   err => expect('was called').toBeFalsy(),
  //   () => console.log('completed')
  // );
  // testScheduler.flush();
  // },
  // );

  // it.skip('should retry to poll data three times and wait total of 5 seconds', fakeAsync(
  //   inject([LongPollingService], (service: LongPollingService) => {
  //     const stream$ = new Observable(observer(2));
  //     const callback = jest.fn();
  //     service.longPollData(stream$, interval).subscribe(callback);
  //     jest.advanceTimersByTime(4999);
  //     expect(callback).not.toHaveBeenCalled();
  //     jest.advanceTimersByTime(5000);
  //     expect(callback).toHaveBeenCalledWith(2);
  //   }),
  // ));
});
