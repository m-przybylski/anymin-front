import { MoneyDto } from 'profitelo-api-ng/model/models';

// tslint:disable:member-ordering
export class TimerService {

  public static $inject = ['$interval', 'money', 'freeMinutesCount', 'interval'];
  private static readonly milisecondsInSecond = 1000;
  private static readonly secondsInMinute = 60;
  private timer: ng.IPromise<any>;
  private startTime: number;
  private isPaused = false;
  private pausedTime: number;

  constructor(private $interval: ng.IIntervalService, private money: MoneyDto,
              private interval: number) {
  }

  public start = (cb: (obj: {time: number, money: MoneyDto}) => void, freeSeconds = 0): void => {
    this.startTime = Date.now();
    this.timer = this.$interval(() => {
      if (!this.isPaused) {
        const _time = (Date.now() - this.startTime) / TimerService.milisecondsInSecond;
        cb({
          time: _time,
          money: {
            amount: this.setAmountValue(_time, freeSeconds),
            currency: this.money.currency
          }
        });
      }
    }, this.interval);
  }

  public stop = (): void => {
    this.$interval.cancel(this.timer);
  }

  public pause = (): void => {
    this.isPaused = true;
    this.pausedTime = Date.now();
  }

  public resume = (): void => {
    this.isPaused = false;
    this.startTime = this.startTime  - (this.pausedTime - Date.now());
  }

  public setStartTime = (time: number): void => {
    this.startTime = time;
  }

  private setAmountValue = (time: number, freeSeconds: number): number => {
    const paidCallTime = time - freeSeconds;
    return paidCallTime > 0 ? (this.money.amount * Math.max(
      0, paidCallTime) / TimerService.secondsInMinute) : 0;
  }
}
