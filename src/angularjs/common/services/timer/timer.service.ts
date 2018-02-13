import { LoggerService } from '@anymind-ng/core';
import { MoneyDto } from 'profitelo-api-ng/model/models';

export class TimerService {

  private static readonly milisecondsInSecond = 1000;
  private static readonly secondsInMinute = 60;
  private timer?: ng.IPromise<any>;
  private startTime: number;
  private isPaused = false;
  private pausedCount = 0;
  private pausedTime: number;

  constructor(private logger: LoggerService, private $interval: ng.IIntervalService, private money: MoneyDto,
              private interval: number) {
  }

  public start = (cb: (obj: { time: number, money: MoneyDto }) => void, freeSeconds = 0): void => {
    this.isPaused = false;
    this.pausedCount = 0;
    if (this.startTime) {
      this.logger.info('TimerService: Start time is already defined, not updating');
    } else {
      this.startTime = Date.now();
    }
    // Init the cost
    this.notifyChange(cb, freeSeconds);
    this.timer = this.$interval(() => {
      if (!this.isPaused) {
        this.notifyChange(cb, freeSeconds);
      }
    }, this.interval);
  }

  public stop = (): void => {
    if (this.timer) {
      this.$interval.cancel(this.timer);
    } else {
      this.logger.error('TimerService: Cannot stop, there is no timer');
    }
  }

  public pause = (): void => {
    if (!this.isPaused) {
      this.isPaused = true;
      this.pausedTime = Date.now();
    }
    this.pausedCount++;
  }

  public resume = (): void => {
    if (this.pausedCount === 1) {
      this.pausedCount = 0;
      this.isPaused = false;
      this.startTime = this.startTime - (this.pausedTime - Date.now());
    } else if (this.pausedCount > 1) {
      this.pausedCount--;
    } else {
      this.logger.error('TimerService: Cannot resume, nothing is paused');
    }
  }

  public setStartTime = (time: number): void => {
    this.startTime = time;
  }

  private notifyChange = (cb: (obj: { time: number, money: MoneyDto }) => void, freeSeconds: number): void => {
    const _time = (Date.now() - this.startTime) / TimerService.milisecondsInSecond;
    cb({
      time: _time,
      money: {
        amount: this.setAmountValue(_time, freeSeconds),
        currency: this.money.currency
      }
    });
  }

  private setAmountValue = (time: number, freeSeconds: number): number => {
    const paidCallTime = time - freeSeconds;
    return paidCallTime > 0 ? (this.money.amount * Math.max(
      0, paidCallTime) / TimerService.secondsInMinute) : 0;
  }
}
