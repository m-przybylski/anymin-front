// tslint:disable:no-any
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, of, Subject, fromEvent, EMPTY, concat, throwError, timer } from 'rxjs';
import { switchMap, startWith, delay, tap, skip, retryWhen, mergeMap } from 'rxjs/operators';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';

const second = 1000;
const power = 2;
const defaultRetryConfiguration = {
  retryAttempts: 5,
  maxDelay: 30000,
  delayFunction: (attempt: number): number => Math.pow(attempt, power) * second,
};

@Injectable()
export class LongPollingService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  public longPollData = <T>(request$: Observable<T>, interval: number): Observable<T> => {
    // helper subject to used to determine when trigger fetch
    const trigger$: Subject<void> = new Subject<void>();
    // modify request with retry strategy
    const inner = request$.pipe(retryWhen(this.retryStrategy({ retryAttempts: 0 })));
    // refresh rate. This will be trigger after request completes.
    const refresh$ = of(undefined).pipe(
      delay(interval),
      tap(() => trigger$.next(undefined)),
      skip(1),
    );
    const result = fromEvent(this.document as FromEventTarget<Document>, 'visibilitychange').pipe(
      startWith(undefined),
      switchMap(() => {
        if (!this.pageIsActive()) {
          return EMPTY;
        }

        return trigger$.pipe(
          startWith(undefined),
          switchMap(() => concat(inner, refresh$)),
        );
      }),
    );

    return result as Observable<T>;
  };

  private pageIsActive = (): boolean => !this.document.hidden;

  /**
   * strategy to retry on pull
   * @param options options object retryAttempts keeps information how any times retry before fail
   */
  private retryStrategy({
    retryAttempts,
    maxDelay = defaultRetryConfiguration.maxDelay,
    delayFunction = defaultRetryConfiguration.delayFunction,
  }: IRetryStrategyConfiguration): (source: Observable<any>) => Observable<number> {
    return (source: Observable<any>): Observable<number> =>
      source.pipe(
        mergeMap((_error, i) => {
          const attemptCount = i + 1;
          if (retryAttempts !== 0 && attemptCount > retryAttempts) {
            return throwError(new Error('Attempt limit reached'));
          }
          const delayTime = Math.min(maxDelay, delayFunction(attemptCount));

          return timer(delayTime);
        }),
      );
  }
}

interface IRetryStrategyFunction {
  /**
   * function to that generated delay
   * @param attempt attempt of execution starts with 1
   * @return delay in seconds
   */
  delayFunction?(attempt: number): number;
}
export interface IRetryStrategyConfiguration extends IRetryStrategyFunction {
  /**
   * how many times retry to fech
   * if 0 is provided it never stops
   */
  retryAttempts: number;
  /**
   * maxDelay between attempts in seconds
   */
  maxDelay?: number;
}
