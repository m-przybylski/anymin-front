import {MoneyDto} from 'profitelo-api-ng/model/models'

export class TimerService {

  private static readonly milisecondsInSecond: number = 1000
  private static readonly secondsInMinute: number = 60
  private timer: ng.IPromise<any>
  private startTime: number
  private isPaused: boolean = false
  private pausedTime: number

  constructor(private $interval: ng.IIntervalService, private money: MoneyDto, private freeMinutesCount: number,
              private interval: number) {
  }

  public start = (cb: (obj: {time: number, money: MoneyDto}) => void): void => {
    this.startTime = Date.now()
    this.timer = this.$interval(() => {
      if (!this.isPaused) {
        const _time = (Date.now() - this.startTime) / TimerService.milisecondsInSecond
        cb({
          time: _time,
          money: {
            amount: (this.money.amount * Math.max(
              0, _time - (TimerService.secondsInMinute * this.freeMinutesCount)) / TimerService.secondsInMinute),
            currency: this.money.currency
          }
        })
      }
    }, this.interval)
  }

  public stop = (): void => {
    this.$interval.cancel(this.timer)
  }

  public pause = (): void => {
    this.isPaused = true
    this.pausedTime = Date.now()
  }

  public resume = (): void => {
    this.isPaused = false
    this.startTime = this.startTime  - (this.pausedTime - Date.now())
  }
}
