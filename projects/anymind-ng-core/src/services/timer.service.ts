import { MoneyDto } from '@anymind-ng/api';
import { LoggerFactory } from '../core';
import { LoggerService } from './logger.service';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject, interval as observableInterval } from 'rxjs';

export interface ITimeMoney {
  time: number;
  money: MoneyDto;
}

export class TimerService {
  private logger: LoggerService;
  private timer: Observable<ITimeMoney>;
  private startTime: number;
  private stopEvent = new Subject<void>();
  private readonly oneSecondInMs: number = 1000;
  private readonly oneMinuteSeconds: number = 60;
  private readonly interval = 1000;
  private readonly numbersAfterComma = 2;

  constructor(loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('TimerService');
  }

  public start = (servicePrice: MoneyDto, freeMinutesCount: number): Observable<ITimeMoney> => {
    this.startTime = Date.now();

    return (this.timer = observableInterval(this.interval)
      .pipe(takeUntil(this.stopEvent))
      .pipe(
        map(() => {
          const _time = Math.abs((Math.floor(Date.now()) - this.startTime) / this.oneSecondInMs);

          return {
            time: Number(_time.toFixed(this.numbersAfterComma)),
            money: {
              value: this.getMoneyAmount(_time - freeMinutesCount, servicePrice.value),
              currency: servicePrice.currency,
            },
          };
        }),
      ));
  };

  public stop = (): void => {
    if (this.timer) {
      this.stopEvent.next();
    } else {
      this.logger.warn('TimerService: Cannot stop, there is no timer');
    }
  };
  private getMoneyAmount = (paidCallTime: number, servicePrice: number): number =>
    paidCallTime > 0 ? (servicePrice * Math.max(0, paidCallTime)) / this.oneMinuteSeconds : 0;
}
