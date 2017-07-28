import {MoneyDto} from 'profitelo-api-ng/model/models'

export class TimerService {

  private timer: ng.IPromise<any>
  private static readonly milisecondsInSecond: number = 1000
  private static readonly secondsInMinute: number = 60

  constructor(private $interval: ng.IIntervalService, private money: MoneyDto, private freeMinutesCount: number,
              private interval: number) {
  }

  public start = (cb: (obj: {time: number, money: MoneyDto}) => void): void => {
    const start = Date.now()

    this.timer = this.$interval(() => {
      const _time = (Date.now() - start) / TimerService.milisecondsInSecond
      cb({
        time: _time,
        money: {
          amount: (this.money.amount * Math.max(
            0, _time - (TimerService.secondsInMinute * this.freeMinutesCount)) / TimerService.secondsInMinute),
          currency: this.money.currency
        }
      })
    }, this.interval)
  }

  public stop = (): void => {
    this.$interval.cancel(this.timer)
  }
}
