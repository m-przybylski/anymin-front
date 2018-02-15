import { LoggerService } from '@anymind-ng/core';
import { MoneyDto } from 'profitelo-api-ng/model/models';

export class TimerService {

  private static readonly secondsInMinute = 60;
  private static readonly milisecondsInSecond = 1000;
  private timer?: ng.IPromise<any>;
  private currentDuration: number;
  private isPaused = false;
  private pausedCount = 0;

  constructor(private logger: LoggerService, private $interval: ng.IIntervalService, private money: MoneyDto) {
  }

  public start = (cb: (obj: { time: number, money: MoneyDto }) => void, freeSeconds = 0): void => {
    this.isPaused = false;
    this.pausedCount = 0;
    if (this.currentDuration) {
      this.logger.info('TimerService: Duration is already set, do not setting 0');
    } else {
      this.currentDuration = 0;
    }
    // Init the cost
    this.notifyChange(cb, freeSeconds);
    this.timer = this.$interval(() => {
      if (!this.isPaused) {
        this.notifyChange(cb, freeSeconds);
      }
    }, TimerService.milisecondsInSecond);
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
    }
    this.pausedCount++;
  }

  public resume = (): void => {
    if (this.pausedCount === 1) {
      this.pausedCount = 0;
      this.isPaused = false;
    } else if (this.pausedCount > 1) {
      this.pausedCount--;
    } else {
      this.logger.error('TimerService: Cannot resume, nothing is paused');
    }
  }

  public setCurrentDuration = (timeInSeconds: number): void => {
    this.currentDuration = timeInSeconds;
  }

  private notifyChange = (cb: (obj: { time: number, money: MoneyDto }) => void, freeSeconds: number): void => {
    this.currentDuration += 1;
    cb({
      time: this.currentDuration,
      money: {
        amount: this.setAmountValue(this.currentDuration, freeSeconds),
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
